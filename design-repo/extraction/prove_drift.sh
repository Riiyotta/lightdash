#!/usr/bin/env bash
# prove_drift.sh: proves extraction/verify_all.py actually CATCHES drift (not just that it passes on a good repo).
#
# For each case a scratch copy of this repo is mutated and verify_all.py must exit non-zero; finally the untouched copy
# must exit 0. Cases that need the sibling source tree (../src, ../package.json) are skipped with a notice when it is absent.
# Usage:  bash extraction/prove_drift.sh        (exit 0 only if every injected defect was caught and the real repo passes)
set -u
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO="$(dirname "$HERE")"
PROJECT="$(dirname "$REPO")"
WORK="$(mktemp -d "${TMPDIR:-/tmp}/design-repo-drift.XXXXXX")"
trap 'rm -rf "$WORK"' EXIT
FAILED=0
HAVE_SRC=no
[ -d "$PROJECT/src" ] && [ -f "$PROJECT/package.json" ] && grep -q '"lightdash-clone"' "$PROJECT/package.json" && HAVE_SRC=yes

run_case () {  # name, python-mutation (operates on cwd = copy root), [link-source-tree]
  local name="$1" mutation="$2" link="${3:-no}"
  local proj="$WORK/$name"
  mkdir -p "$proj"
  cp -R "$REPO" "$proj/design-repo"
  find "$proj/design-repo" -name __pycache__ -type d -prune -exec rm -rf {} +
  if [ "$link" = "yes" ]; then
    for f in "$PROJECT"/* "$PROJECT"/.[!.]*; do
      b="$(basename "$f")"; [ "$b" = "design-repo" ] && continue
      [ -e "$f" ] && ln -s "$f" "$proj/$b"
    done
  fi
  ( cd "$proj/design-repo" && python3 - <<PYEOF
import json, os, re
def load(p): return json.load(open(p))
def save(p, d): json.dump(d, open(p, 'w'), indent=2, ensure_ascii=False)
$mutation
PYEOF
  ) || { echo "  case $name: mutation script failed"; FAILED=1; return; }
  local want; want="$(want_for "$name")"
  if python3 "$proj/design-repo/extraction/verify_all.py" >"$proj/out.txt" 2>&1; then
    echo "  MISSED  $name (verify_all.py still passed)"; FAILED=1
  elif ! grep -q "^$want" "$proj/out.txt"; then
    echo "  WRONG-CHECK $name (failed, but the intended check '$want' did not fail): $(grep -m1 '^FAIL' "$proj/out.txt" | cut -c1-100)"; FAILED=1
  else
    echo "  caught  $name -> $(grep -m1 "^$want" "$proj/out.txt" | cut -c1-120)"
  fi
}

# the verify_all.py check that MUST be among the failures for each injected defect
want_for () {
  case "$1" in
    phantom_allowlist_entry|orphan_contract|phantom_primitive) echo "FAIL allowlist parity";;
    citation_not_in_measured_values|citation_in_range_but_wrong|citation_beyond_real_file) echo "FAIL citations";;
    wrong_manifest_count|wrong_template_count|wrong_readme_count|wrong_changelog_count) echo "FAIL manifest counts";;
    allowlist_version_drift|catalog_version_drift|version_note_removed) echo "FAIL allowlistVersion";;
    pinned_asset_role_changed|pinned_map_and_role_both_changed|invented_policy_value|live_host_pattern_removed|asset_role_removed_from_registry) echo "FAIL assets";;
    dangling_script_reference|drift_script_deleted|stray_zip_inside|ds_store_inside) echo "FAIL packaging";;
    absolute_path_leak|manifest_entrypoint_outside) echo "FAIL self-containment";;
    reduced_motion_basis_overclaimed|section_fallback_diverges_from_pattern|schema_motion_lock_drift) echo "FAIL motion";;
    schema_motion_opened|example_invalid) echo "FAIL schema";;
    schema_maxwords_drift|contract_maxwords_below_observed|wordcount_spec_hand_edited|wordcount_sample_not_in_source) echo "FAIL maxwords";;
    route_double_assigned|route_registry_mismatch|template_chrome_inconsistent|route_template_differs_from_ia|route_missing_from_ia|unpublished_route_recreated) echo "FAIL routes";;
    template_node_unstructured|section_missing_from_template|contract_not_closed|contract_without_responsive_or_note|app_view_made_composable) echo "FAIL structure";;
    graph_rule_without_implementation|graph_exception_stale|graph_exception_removed) echo "FAIL graph";;
    token_catalog_drift|token_policy_unreal_key|theme_misses_a_semantic_key|token_evidence_quote_wrong|tailwind_colour_drift|typography_value_drift) echo "FAIL tokens";;
    framework_version_drift|anomaly_keyword_vanished) echo "FAIL source-claims";;
    *) echo "FAIL";;
  esac
}

echo "== injected drift must be rejected =="
run_case phantom_allowlist_entry "p='tokens/llm/component-allowlist.json'; d=load(p); d['sections'].append('hero.ghost'); save(p,d)"
run_case orphan_contract "p='tokens/llm/component-allowlist.json'; d=load(p); d['sections'].remove('hero.pricing'); save(p,d)"
run_case phantom_primitive "p='tokens/llm/component-allowlist.json'; d=load(p); d['primitives'].append('ghost-button'); save(p,d)"
run_case citation_not_in_measured_values "p='sections/hero.pricing.json'; d=load(p); d['measuredFrom'].append('src/App.jsx:1'); save(p,d)"
run_case wrong_manifest_count "p='registry.manifest.json'; d=load(p); d['counts']['sections']+=1; save(p,d)"
run_case wrong_template_count "p='registry.manifest.json'; d=load(p); d['counts']['templates']-=1; save(p,d)"
run_case wrong_readme_count "t=open('README.md').read(); t=re.sub(r'\"routes\": \d+', '\"routes\": 999', t, count=1); open('README.md','w').write(t)"
run_case wrong_changelog_count "t=open('CHANGELOG.md').read(); t=re.sub(r'\"primitives\": \d+', '\"primitives\": 99', t, count=1); open('CHANGELOG.md','w').write(t)"
run_case allowlist_version_drift "p='registry.manifest.json'; d=load(p); d['allowlistVersion']='9.9.9'; save(p,d)"
run_case catalog_version_drift "p='tokens/llm/token-catalog.json'; d=load(p); d['allowlistVersion']='9.9.9'; save(p,d)"
run_case version_note_removed "p='registry.manifest.json'; d=load(p); d['versionFieldNote']='versions are important'; save(p,d)"
run_case pinned_asset_role_changed "p='assets/asset-roles.json'; d=load(p); d['roles']['embed.booking-cal']['generationPolicy']='may-generate-new'; save(p,d)"
run_case pinned_map_and_role_both_changed "p='assets/asset-roles.json'; d=load(p); d['roles']['form.submission-endpoint']['generationPolicy']='may-generate-new'; d['pinnedPolicies']['form.submission-endpoint']='may-generate-new'; save(p,d)"
run_case invented_policy_value "p='assets/asset-roles.json'; d=load(p); d['roles']['logo.customer-partner']['generationPolicy']='anything-goes'; save(p,d)"
run_case asset_role_removed_from_registry "p='assets/asset-roles.json'; d=load(p); del d['roles']['embed.youtube']; save(p,d)"
run_case live_host_pattern_removed "p='assets/asset-roles.json'; d=load(p); d['forbiddenLiveHostPatterns']=[x for x in d['forbiddenLiveHostPatterns'] if 'cal' not in x['pattern']]; save(p,d)"
run_case dangling_script_reference "open('README.md','a').write('\nRun extraction/' + 'missing_helper' + '.py for details.\n')"
run_case drift_script_deleted "os.remove('extraction/prove_drift.sh')"
run_case absolute_path_leak "p='registry.manifest.json'; d=load(p); d['generatedBy']='/'+'Users'+'/someone/design-repo'; save(p,d)"
run_case manifest_entrypoint_outside "p='registry.manifest.json'; d=load(p); d['entryPoints']['external']='../ia/ia.json'; d['entryPoints']['readme']='../README.md'; save(p,d)"
run_case reduced_motion_basis_overclaimed "p='tokens/00-foundation/motion-patterns.json'; d=load(p); d['patterns']['faq-accordion']['reducedMotionBasis']='source-implemented'; save(p,d)"
run_case section_fallback_diverges_from_pattern "p='sections/content.faq.json'; d=load(p); d['motion']['reducedMotionFallbacks']['faq-accordion']='static-final-state'; save(p,d)"
run_case schema_motion_lock_drift "p='schema/pagespec.schema.json'; d=load(p); r=next(r for r in d['definitions']['motion']['allOf'] if r['if']['properties']['pattern']['const']=='faq-accordion'); r['then']['properties']['reducedMotionBasis']['const']='source-implemented'; save(p,d)"
run_case schema_motion_opened "p='schema/pagespec.schema.json'; d=load(p); d['definitions']['motion']['additionalProperties']=True; save(p,d)"
run_case schema_maxwords_drift "p='schema/pagespec.schema.json'; d=load(p); a=next(a for a in d['definitions']['node']['oneOf'] if a['title']=='hero.pricing'); a['properties']['content']['properties']['heading']['x-maxWords']=999; save(p,d)"
run_case contract_maxwords_below_observed "p='sections/hero.pricing.json'; d=load(p); d['content']['fields']['heading']['maxWords']=2; save(p,d)"
run_case wordcount_spec_hand_edited "p='extraction/wordcount_spec.json'; d=load(p); k=next(iter(d['entries'])); d['entries'][k]['observedMax']+=7; save(p,d)"
run_case route_double_assigned "p='templates/templates.json'; d=load(p); d['templates']['pricing']['routes'].append('/about'); save(p,d)"
run_case unpublished_route_recreated "p='templates/templates.json'; d=load(p); d['routes']['/old-home']={'template':'home','evidence':{'level':'measured','ref':'reference/original-1440.png'}}; d['templates']['home']['routes'].append('/old-home'); save(p,d); q='registry.manifest.json'; m=load(q); m['counts']['routes']+=1; save(q,m)"
run_case template_chrome_inconsistent "p='templates/templates.json'; d=load(p); d['templates']['pricing']['chrome']='light-no-cta'; save(p,d)"
run_case route_registry_mismatch "p='templates/templates.json'; d=load(p); d['routes']['/pricing']['template']='about'; save(p,d)"
run_case template_node_unstructured "p='templates/templates.json'; d=load(p); d['templates']['pricing']['nodes'][3]='hero.pricing'; save(p,d)"
run_case section_missing_from_template "p='templates/templates.json'; d=load(p); d['templates']['pricing']['nodes']=[n for n in d['templates']['pricing']['nodes'] if n['section']!='conversion.plan-comparison']; save(p,d)"
run_case graph_rule_without_implementation "p='compatibility/graph.json'; d=load(p); d['rules'].append({'id':'GHOST_RULE','severity':'error','params':{},'description':'x','exceptions':[]}); save(p,d)"
run_case graph_exception_stale "p='compatibility/graph.json'; d=load(p); r=next(r for r in d['rules'] if r['id']=='MAX_RUN_SAME_CATEGORY'); r['exceptions'].append({'template':'pricing','reason':'not actually needed'}); save(p,d)"
run_case graph_exception_removed "p='compatibility/graph.json'; d=load(p); r=next(r for r in d['rules'] if r['id']=='OPENER_IS_HERO'); r['exceptions']=[e for e in r['exceptions'] if e['template']!='start']; save(p,d)"
run_case token_catalog_drift "p='tokens/llm/token-catalog.json'; d=load(p); d['categories']['color']['brand-purple']['\$value']='#000001'; save(p,d)"
run_case token_policy_unreal_key "p='tokens/llm/token-policy.json'; d=load(p); d['rawValueRestrictions']['shadow']={'rule':'x','enforcement':'convention'}; save(p,d)"
run_case theme_misses_a_semantic_key "p='tokens/themes/light.json'; d=load(p); d['resolves'].pop('color.text.body'); save(p,d)"
run_case example_invalid "p='schema/example.pagespec.json'; d=load(p); d['nodes'][3]['content']['heading']=' '.join(['w']*50); save(p,d)"
run_case contract_not_closed "p='sections/hero.pricing.json'; d=load(p); d['content']['additionalProperties']=True; save(p,d)"
run_case contract_without_responsive_or_note "p='sections/hero.pricing.json'; d=load(p); d['responsive']=[]; d.pop('responsiveNote',None); save(p,d)"
run_case app_view_made_composable "p='sections/app.view-pricing.json'; d=load(p); d['composable']=True; save(p,d)"
run_case stray_zip_inside "open('design-repo.zip','wb').write(b'PK')"
run_case ds_store_inside "open('.DS_Store','wb').write(b'x')"
if [ "$HAVE_SRC" = "yes" ]; then
  run_case citation_in_range_but_wrong "p='extraction/measured-values.json'; d=load(p); d['citationChecks'][0]['contains']=['THIS TEXT IS NOT IN THE CITED RANGE']; save(p,d)" yes
  run_case citation_beyond_real_file "p='sections/hero.pricing.json'; d=load(p); ref='src/pages/Pricing.jsx:99999-100000'; d['measuredFrom'].append(ref); save(p,d); q='extraction/measured-values.json'; m=load(q); m['citationChecks'].append({'ref':ref,'contains':[]}); save(q,m); r='registry.manifest.json'; k=load(r); k['counts']['citationChecks']+=1; save(r,k)" yes
  run_case token_evidence_quote_wrong "p='tokens/00-foundation/color.json'; d=load(p); d['color']['brand-purple']['evidence'][0]['quote']='#123456'; save(p,d)" yes
  run_case tailwind_colour_drift "p='tokens/00-foundation/color.json'; d=load(p); d['color']['ld-dark']['\$value']='#1A1B26'; save(p,d); q='tokens/llm/token-catalog.json'; c=load(q); c['categories']['color']['ld-dark']['\$value']='#1A1B26'; save(q,c)" yes
  run_case typography_value_drift "p='tokens/00-foundation/typography.json'; d=load(p); d['typography']['h2-48']['\$value']['fontSize']=49; save(p,d); q='tokens/llm/token-catalog.json'; c=load(q); c['categories']['typography']['h2-48']['\$value']['fontSize']=49; save(q,c)" yes
  run_case wordcount_sample_not_in_source "p='extraction/wordcount_spec.json'; d=load(p); s=d['entries']['hero.pricing.heading']['samples'][0]; s['text']='totally invented words that never appear anywhere in the source'; s['parts']=[s['text']]; save(p,d)" yes
  run_case anomaly_keyword_vanished "p='extraction/measured-values.json'; d=load(p); d['anomalies'][0]['keyword']='THIS KEYWORD IS NOT IN THE SOURCE'; save(p,d)" yes
  run_case framework_version_drift "p='extraction/measured-values.json'; d=load(p); d['frameworkSnapshot']['declared']['react']='^19.0.0'; save(p,d)" yes
  run_case route_missing_from_ia "p='templates/templates.json'; d=load(p); d['templates']['about']['routes'].remove('/about'); d['routes'].pop('/about'); save(p,d); q='registry.manifest.json'; m=load(q); m['counts']['routes']-=1; save(q,m)" yes
  run_case route_template_differs_from_ia "p='templates/templates.json'; d=load(p); d['templates']['about']['routes'].remove('/about'); d['templates']['roadmap']['routes'].append('/about'); d['routes']['/about']['template']='roadmap'; save(p,d)" yes
else
  echo "  (skipped 10 cases that need the sibling source tree: ../src and ../package.json)"
fi

echo "== the untouched repo must pass =="
CLEAN="$WORK/clean"; mkdir -p "$CLEAN"; cp -R "$REPO" "$CLEAN/design-repo"; find "$CLEAN/design-repo" -name __pycache__ -type d -prune -exec rm -rf {} +
if python3 "$CLEAN/design-repo/extraction/verify_all.py" >"$CLEAN/out.txt" 2>&1; then
  echo "  real repo (no source tree) passes: $(grep '^SUMMARY' "$CLEAN/out.txt")"
else
  echo "  REAL REPO FAILED verify_all.py (standalone)"; sed -n '1,40p' "$CLEAN/out.txt"; FAILED=1
fi
if python3 "$REPO/extraction/verify_all.py" >"$WORK/real.txt" 2>&1; then
  echo "  real repo in place passes: $(grep '^SUMMARY' "$WORK/real.txt")"
else
  echo "  REAL REPO FAILED verify_all.py (in place)"; sed -n '1,40p' "$WORK/real.txt"; FAILED=1
fi
[ "$FAILED" = "0" ] && echo "DRIFT PROOF OK" || echo "DRIFT PROOF FAILED"
exit "$FAILED"
