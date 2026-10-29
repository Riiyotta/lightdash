#!/usr/bin/env python3
"""prove_drift.py: proves extraction/verify_all.py CATCHES injected drift (not just that it passes on a good repo).

Usage:  python3 extraction/prove_drift.py [--scratch DIR] [--only NAME[,NAME]]
  --scratch DIR   work in DIR (created if needed, left in place for inspection); default: a fresh OS temp dir, removed after
  --only          run only the named cases

For every case a scratch copy of this repo is mutated and verify_all.py must FAIL with the intended check among its failures;
finally an untouched copy (standalone, no source tree) and the real repo in place must PASS. Cases marked needs-source link the
sibling project files (src/, specs/, package.json ...) next to the copy and are skipped with a notice when no source tree exists.
Ported from the former shell drift proof (every case of the shell version) plus the mode / availability / generation / retrieval /
contract / wrapper-gate / policy / token-rule cases. Runs verify_all.py with the same interpreter (sys.executable). Root from __file__.
"""
import json
import os
import shutil
import subprocess
import sys
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
PROJECT = os.path.dirname(REPO)

# (name, the verify_all.py check that must be among the failures, needs-source-tree, python mutation run with cwd = the copy)
CASES = [
    ('phantom_allowlist_entry', 'FAIL allowlist parity', False, "p='tokens/llm/component-allowlist.json'; d=load(p); d['sections'].append('hero.ghost'); save(p,d)"),
    ('orphan_contract', 'FAIL allowlist parity', False, "p='tokens/llm/component-allowlist.json'; d=load(p); d['sections'].remove('hero.pricing'); save(p,d)"),
    ('phantom_primitive', 'FAIL allowlist parity', False, "p='tokens/llm/component-allowlist.json'; d=load(p); d['primitives'].append('ghost-button'); save(p,d)"),
    ('citation_not_in_measured_values', 'FAIL citations', False, "p='sections/hero.pricing.json'; d=load(p); d['measuredFrom'].append('src/App.jsx:1'); save(p,d)"),
    ('wrong_manifest_count', 'FAIL manifest counts', False, "p='registry.manifest.json'; d=load(p); d['counts']['sections']+=1; save(p,d)"),
    ('wrong_template_count', 'FAIL manifest counts', False, "p='registry.manifest.json'; d=load(p); d['counts']['templates']-=1; save(p,d)"),
    ('wrong_readme_count', 'FAIL manifest counts', False, 't=open(\'README.md\').read(); t=re.sub(r\'"routes": \\d+\', \'"routes": 999\', t, count=1); open(\'README.md\',\'w\').write(t)'),
    ('wrong_changelog_count', 'FAIL manifest counts', False, 't=open(\'CHANGELOG.md\').read(); t=re.sub(r\'"primitives": \\d+\', \'"primitives": 99\', t, count=1); open(\'CHANGELOG.md\',\'w\').write(t)'),
    ('allowlist_version_drift', 'FAIL allowlistVersion', False, "p='registry.manifest.json'; d=load(p); d['allowlistVersion']='9.9.9'; save(p,d)"),
    ('catalog_version_drift', 'FAIL allowlistVersion', False, "p='tokens/llm/token-catalog.json'; d=load(p); d['allowlistVersion']='9.9.9'; save(p,d)"),
    ('version_note_removed', 'FAIL allowlistVersion', False, "p='registry.manifest.json'; d=load(p); d['versionFieldNote']='versions are important'; save(p,d)"),
    ('pinned_asset_role_changed', 'FAIL assets', False, "p='assets/asset-roles.json'; d=load(p); d['roles']['embed.booking-cal']['generationPolicy']='may-generate-new'; save(p,d)"),
    ('pinned_map_and_role_both_changed', 'FAIL assets', False, "p='assets/asset-roles.json'; d=load(p); d['roles']['form.submission-endpoint']['generationPolicy']='may-generate-new'; d['pinnedPolicies']['form.submission-endpoint']='may-generate-new'; save(p,d)"),
    ('invented_policy_value', 'FAIL assets', False, "p='assets/asset-roles.json'; d=load(p); d['roles']['logo.customer-partner']['generationPolicy']='anything-goes'; save(p,d)"),
    ('asset_role_removed_from_registry', 'FAIL assets', False, "p='assets/asset-roles.json'; d=load(p); del d['roles']['embed.youtube']; save(p,d)"),
    ('live_host_pattern_removed', 'FAIL assets', False, "p='assets/asset-roles.json'; d=load(p); d['forbiddenLiveHostPatterns']=[x for x in d['forbiddenLiveHostPatterns'] if 'cal' not in x['pattern']]; save(p,d)"),
    ('dangling_script_reference', 'FAIL packaging', False, "open('README.md','a').write('\\nRun extraction/' + 'missing_helper' + '.py for details.\\n')"),
    ('drift_script_deleted', 'FAIL packaging', False, "os.remove('extraction/prove_drift.py')"),
    ('absolute_path_leak', 'FAIL self-containment', False, "p='registry.manifest.json'; d=load(p); d['generatedBy']='/'+'Users'+'/someone/design-repo'; save(p,d)"),
    ('manifest_entrypoint_outside', 'FAIL self-containment', False, "p='registry.manifest.json'; d=load(p); d['entryPoints']['external']='../ia/ia.json'; d['entryPoints']['readme']='../README.md'; save(p,d)"),
    ('reduced_motion_basis_overclaimed', 'FAIL motion', False, "p='tokens/00-foundation/motion-patterns.json'; d=load(p); d['patterns']['faq-accordion']['reducedMotionBasis']='source-implemented'; save(p,d)"),
    ('section_fallback_diverges_from_pattern', 'FAIL motion', False, "p='sections/content.faq.json'; d=load(p); d['motion']['reducedMotionFallbacks']['faq-accordion']='static-final-state'; save(p,d)"),
    ('schema_motion_lock_drift', 'FAIL motion', False, "p='schema/pagespec.schema.json'; d=load(p); r=next(r for r in d['definitions']['motion']['allOf'] if r['if']['properties']['pattern']['const']=='faq-accordion'); r['then']['properties']['reducedMotionBasis']['const']='source-implemented'; save(p,d)"),
    ('schema_motion_opened', 'FAIL schema', False, "p='schema/pagespec.schema.json'; d=load(p); d['definitions']['motion']['additionalProperties']=True; save(p,d)"),
    ('schema_maxwords_drift', 'FAIL maxwords', False, "p='schema/pagespec.schema.json'; d=load(p); a=next(a for a in d['definitions']['node']['oneOf'] if a['title']=='hero.pricing'); a['properties']['content']['properties']['heading']['x-maxWords']=999; save(p,d)"),
    ('contract_maxwords_below_observed', 'FAIL maxwords', False, "p='sections/hero.pricing.json'; d=load(p); d['content']['fields']['heading']['maxWords']=2; save(p,d)"),
    ('wordcount_spec_hand_edited', 'FAIL maxwords', False, "p='extraction/wordcount_spec.json'; d=load(p); k=next(iter(d['entries'])); d['entries'][k]['observedMax']+=7; save(p,d)"),
    ('route_double_assigned', 'FAIL routes', False, "p='templates/templates.json'; d=load(p); d['templates']['pricing']['routes'].append('/about'); save(p,d)"),
    ('unpublished_route_recreated', 'FAIL routes', False, "p='templates/templates.json'; d=load(p); d['routes']['/old-home']={'template':'home','evidence':{'level':'measured','ref':'reference/original-1440.png'}}; d['templates']['home']['routes'].append('/old-home'); save(p,d); q='registry.manifest.json'; m=load(q); m['counts']['routes']+=1; save(q,m)"),
    ('template_chrome_inconsistent', 'FAIL routes', False, "p='templates/templates.json'; d=load(p); d['templates']['pricing']['chrome']='light-no-cta'; save(p,d)"),
    ('route_registry_mismatch', 'FAIL routes', False, "p='templates/templates.json'; d=load(p); d['routes']['/pricing']['template']='about'; save(p,d)"),
    ('template_node_unstructured', 'FAIL structure', False, "p='templates/templates.json'; d=load(p); d['templates']['pricing']['nodes'][3]='hero.pricing'; save(p,d)"),
    ('section_missing_from_template', 'FAIL structure', False, "p='templates/templates.json'; d=load(p); d['templates']['pricing']['nodes']=[n for n in d['templates']['pricing']['nodes'] if n['section']!='conversion.plan-comparison']; save(p,d)"),
    ('graph_rule_without_implementation', 'FAIL graph', False, "p='compatibility/graph.json'; d=load(p); d['rules'].append({'id':'GHOST_RULE','severity':'error','params':{},'description':'x','exceptions':[]}); save(p,d)"),
    ('graph_exception_stale', 'FAIL graph', False, "p='compatibility/graph.json'; d=load(p); r=next(r for r in d['rules'] if r['id']=='MAX_RUN_SAME_CATEGORY'); r['exceptions'].append({'template':'pricing','reason':'not actually needed'}); save(p,d)"),
    ('graph_exception_removed', 'FAIL graph', False, "p='compatibility/graph.json'; d=load(p); r=next(r for r in d['rules'] if r['id']=='OPENER_IS_HERO'); r['exceptions']=[e for e in r['exceptions'] if e['template']!='start']; save(p,d)"),
    ('token_catalog_drift', 'FAIL tokens', False, "p='tokens/llm/token-catalog.json'; d=load(p); d['categories']['color']['brand-purple']['$value']='#000001'; save(p,d)"),
    ('token_policy_unreal_key', 'FAIL tokens', False, "p='tokens/llm/token-policy.json'; d=load(p); d['rawValueRestrictions']['shadow']={'rule':'x','enforcement':'convention'}; save(p,d)"),
    ('theme_misses_a_semantic_key', 'FAIL tokens', False, "p='tokens/themes/light.json'; d=load(p); d['resolves'].pop('color.text.body'); save(p,d)"),
    ('example_invalid', 'FAIL schema', False, "p='schema/example.pagespec.json'; d=load(p); d['nodes'][3]['content']['heading']=' '.join(['w']*50); save(p,d)"),
    ('contract_not_closed', 'FAIL structure', False, "p='sections/hero.pricing.json'; d=load(p); d['content']['additionalProperties']=True; save(p,d)"),
    ('contract_without_responsive_or_note', 'FAIL structure', False, "p='sections/hero.pricing.json'; d=load(p); d['responsive']=[]; d.pop('responsiveNote',None); save(p,d)"),
    ('app_view_made_composable', 'FAIL structure', False, "p='sections/app.view-pricing.json'; d=load(p); d['composable']=True; save(p,d)"),
    ('stray_zip_inside', 'FAIL packaging', False, "open('design-repo.zip','wb').write(b'PK')"),
    ('ds_store_inside', 'FAIL packaging', False, "open('.DS_Store','wb').write(b'x')"),
    ('citation_in_range_but_wrong', 'FAIL citations', True, "p='extraction/measured-values.json'; d=load(p); d['citationChecks'][0]['contains']=['THIS TEXT IS NOT IN THE CITED RANGE']; save(p,d)"),
    ('citation_beyond_real_file', 'FAIL citations', True, "p='sections/hero.pricing.json'; d=load(p); ref='src/pages/Pricing.jsx:99999-100000'; d['measuredFrom'].append(ref); save(p,d); q='extraction/measured-values.json'; m=load(q); m['citationChecks'].append({'ref':ref,'contains':[]}); save(q,m); r='registry.manifest.json'; k=load(r); k['counts']['citationChecks']+=1; save(r,k)"),
    ('token_evidence_quote_wrong', 'FAIL tokens', True, "p='tokens/00-foundation/color.json'; d=load(p); d['color']['brand-purple']['evidence'][0]['quote']='#123456'; save(p,d)"),
    ('tailwind_colour_drift', 'FAIL tokens', True, "p='tokens/00-foundation/color.json'; d=load(p); d['color']['ld-dark']['$value']='#1A1B26'; save(p,d); q='tokens/llm/token-catalog.json'; c=load(q); c['categories']['color']['ld-dark']['$value']='#1A1B26'; save(q,c)"),
    ('typography_value_drift', 'FAIL tokens', True, "p='tokens/00-foundation/typography.json'; d=load(p); d['typography']['h2-48']['$value']['fontSize']=49; save(p,d); q='tokens/llm/token-catalog.json'; c=load(q); c['categories']['typography']['h2-48']['$value']['fontSize']=49; save(q,c)"),
    ('wordcount_sample_not_in_source', 'FAIL maxwords', True, "p='extraction/wordcount_spec.json'; d=load(p); s=d['entries']['hero.pricing.heading']['samples'][0]; s['text']='totally invented words that never appear anywhere in the source'; s['parts']=[s['text']]; save(p,d)"),
    ('anomaly_keyword_vanished', 'FAIL source-claims', True, "p='extraction/measured-values.json'; d=load(p); d['anomalies'][0]['keyword']='THIS KEYWORD IS NOT IN THE SOURCE'; save(p,d)"),
    ('framework_version_drift', 'FAIL source-claims', True, "p='extraction/measured-values.json'; d=load(p); d['frameworkSnapshot']['declared']['react']='^19.0.0'; save(p,d)"),
    ('route_missing_from_ia', 'FAIL routes', True, "p='templates/templates.json'; d=load(p); d['templates']['about']['routes'].remove('/about'); d['routes'].pop('/about'); save(p,d); q='registry.manifest.json'; m=load(q); m['counts']['routes']-=1; save(q,m)"),
    ('route_template_differs_from_ia', 'FAIL routes', True, "p='templates/templates.json'; d=load(p); d['templates']['about']['routes'].remove('/about'); d['templates']['roadmap']['routes'].append('/about'); d['routes']['/about']['template']='roadmap'; save(p,d)"),
    ('availability_registry_loosened', 'FAIL generation', False, "p='assets/asset-roles.json'; d=load(p); d['roles']['screenshot.product-ui']['availability']='generation-safe'; save(p,d)"),
    ('availability_registry_and_pin_map_loosened', 'FAIL generation', False, "p='assets/asset-roles.json'; d=load(p); d['roles']['brand.lightdash-wordmark']['availability']='generation-safe'; d['pinnedAvailability']['brand.lightdash-wordmark']='generation-safe'; save(p,d)"),
    ('availability_validator_pin_loosened', 'FAIL generation', False, 'p=\'schema/semantic_validate.py\'; t=open(p).read(); t=t.replace("\'animation.rive\': \'clone-only\'", "\'animation.rive\': \'generation-safe\'", 1); open(p,\'w\').write(t)'),
    ('substitute_not_generation_safe', 'FAIL generation', False, "p='assets/asset-roles.json'; d=load(p); d['roles']['logo.customer-partner']['generationSafeSubstitutes']=['logo.integration']; save(p,d)"),
    ('generation_example_leaks_brand', 'FAIL generation', False, "p='schema/examples/generation/product.generated.pagespec.json'; d=load(p); d['nodes'][3]['content']['heading']='Lightdash for orchards'; save(p,d)"),
    ('generation_example_reuses_clone_asset', 'FAIL generation', False, "p='schema/examples/generation/product.generated.pagespec.json'; d=load(p); d['nodes'][4]['content']['visual']['assetRole']='screenshot.product-ui'; save(p,d)"),
    ('generation_example_missing_for_family', 'FAIL generation', False, "os.remove('schema/examples/generation/legal.generated.pagespec.json')"),
    ('mode_enum_opened', 'FAIL generation', False, "p='schema/pagespec.schema.json'; d=load(p); d['properties']['mode']['enum'].append('reference'); save(p,d)"),
    ('clone_example_mode_flipped', 'FAIL schema', False, "p='schema/example.pagespec.json'; d=load(p); d['mode']='generation'; save(p,d)"),
    ('source_identity_hand_edited', 'FAIL generation', True, "p='schema/source-identity.json'; d=load(p); d['people']=d['people'][1:]; open(p,'w').write(json.dumps(d, indent=1, ensure_ascii=False)+chr(10))"),
    ('retrieval_flipped_on_modal', 'FAIL contracts', False, "p='sections/chrome.talk-modal.json'; d=load(p); d['retrievalEligible']=True; d.pop('retrievalReason',None); save(p,d)"),
    ('retrieval_content_marked_ineligible', 'FAIL contracts', False, "p='sections/content.faq.json'; d=load(p); d['retrievalEligible']=False; d['retrievalReason']='marked ineligible by an injected drift case'; save(p,d)"),
    ('retrieval_allowlist_drift', 'FAIL contracts', False, "p='tokens/llm/component-allowlist.json'; d=load(p); d['retrievalIneligibleSections']=d['retrievalIneligibleSections'][1:]; save(p,d)"),
    ('retrieval_pin_removed_from_verifier', 'FAIL generation', False, 'p=\'schema/semantic_validate.py\'; t=open(p).read(); t=t.replace("\'chrome.talk-modal\': False, ", \'\', 1); open(p,\'w\').write(t)'),
    ('semantic_id_mismatch', 'FAIL contracts', False, "p='sections/hero.pricing.json'; d=load(p); d['semantic']['id']='hero.other'; save(p,d)"),
    ('source_id_equals_contract_id', 'FAIL contracts', False, "p='sections/hero.pricing.json'; d=load(p); d['source']['id']='hero.pricing'; save(p,d)"),
    ('contract_schema_unknown_key', 'FAIL contracts', False, "p='sections/hero.pricing.json'; d=load(p); d['inventedKey']=1; save(p,d)"),
    ('contract_source_tag_wrong', 'FAIL contracts', True, "p='sections/hero.pricing.json'; d=load(p); d['source']['tag']='aside'; save(p,d)"),
    ('contract_source_out_of_range', 'FAIL contracts', True, "p='sections/hero.pricing.json'; d=load(p); d['source']['lines']='99990-99999'; save(p,d)"),
    ('hero_height_over_error_cap', 'FAIL wrapper gate', False, "p='extraction/measured-values.json'; d=load(p); n=next(n for n in d['sectionHeights']['templates']['pricing']['nodes'] if n['section']=='hero.pricing'); n['heightPx']=3100; save(p,d)"),
    ('page_share_majority', 'FAIL wrapper gate', False, "p='extraction/measured-values.json'; d=load(p); t=d['sectionHeights']['templates']['legal']; n=next(n for n in t['nodes'] if n['section']=='content.legal-body'); n['heightPx']=t['documentHeightPx']*0.7; save(p,d)"),
    ('measurement_missing', 'FAIL wrapper gate', False, "p='extraction/measured-values.json'; d=load(p); n=next(n for n in d['sectionHeights']['templates']['pricing']['nodes'] if n['section']=='conversion.plan-cards'); n.pop('heightPx'); save(p,d)"),
    ('measured_at_wrong_viewport', 'FAIL wrapper gate', False, "p='extraction/measured-values.json'; d=load(p); d['sectionHeights']['viewport']['width']=1280; save(p,d)"),
    ('whitelist_without_justification', 'FAIL wrapper gate', False, "p='extraction/wrapper-gate-whitelist.json'; d=load(p); d['entries'].append({'template':'integrations','section':'listing.integrations-directory','rule':'PAGE_SHARE','maxHeightPx':2000,'justification':'short','reviewedBy':'an agent'}); save(p,d)"),
    ('whitelist_stale_entry', 'FAIL wrapper gate', False, "p='extraction/wrapper-gate-whitelist.json'; d=load(p); d['entries'].append({'template':'pricing','section':'hero.pricing','rule':'HERO_HEIGHT','maxHeightPx':4000,'justification':'this hero is not tall at all, the entry is stale on purpose','reviewedBy':'agent attestation, not a human sign-off'}); save(p,d)"),
    ('gate_threshold_loosened', 'FAIL wrapper gate', False, "p='extraction/wrapper_gate.py'; t=open(p).read(); t=t.replace('HERO_ERROR_PX = 3000', 'HERO_ERROR_PX = 9000', 1); open(p,'w').write(t)"),
    ('policy_hash_drift', 'FAIL policy', False, "p='registry.manifest.json'; d=load(p); d['designPolicy']['contentHash']='sha256:' + '0'*64; save(p,d)"),
    ('policy_rebound_to_other_policy', 'FAIL policy', False, "p='registry.manifest.json'; d=load(p); d['designPolicy']['policyId']='consumer-service-marketplace-web'; save(p,d)"),
    ('policy_file_missing', 'FAIL policy', False, "os.remove('policy/design-policy.json')"),
    ('policy_enforcer_edited_without_rehash', 'FAIL policy', False, "p='compatibility/graph.json'; d=load(p); d['graphVersion']=d.get('graphVersion','')+'-edited'; save(p,d)"),
    ('token_policy_rule_dropped', 'FAIL tokens', False, "p='tokens/llm/token-policy.json'; d=load(p); d['semanticRules']=d['semanticRules'][1:]; save(p,d)"),
]


def have_src():
    pj = os.path.join(PROJECT, 'package.json')
    try:
        return os.path.isdir(os.path.join(PROJECT, 'src')) and json.load(open(pj)).get('name') == 'lightdash-clone'
    except Exception:
        return False


def copy_repo(dst_project, link):
    os.makedirs(dst_project, exist_ok=True)
    shutil.copytree(REPO, os.path.join(dst_project, 'design-repo'), ignore=shutil.ignore_patterns('__pycache__'))
    if link:
        for n in os.listdir(PROJECT):
            if n in ('design-repo', 'node_modules', '.git'):
                continue
            os.symlink(os.path.join(PROJECT, n), os.path.join(dst_project, n))
    return os.path.join(dst_project, 'design-repo')


PRELUDE = "import json, os, re\ndef load(p): return json.load(open(p))\ndef save(p, d): json.dump(d, open(p, 'w'), indent=2, ensure_ascii=False)\n"


def verify(copy):
    r = subprocess.run([sys.executable, os.path.join(copy, 'extraction', 'verify_all.py')], capture_output=True, text=True)
    return r.returncode, r.stdout + r.stderr


def main(argv):
    scratch, keep, only = None, False, None
    if '--scratch' in argv:
        scratch = os.path.abspath(argv[argv.index('--scratch') + 1]); keep = True
        os.makedirs(scratch, exist_ok=True)
    if '--only' in argv:
        only = set(argv[argv.index('--only') + 1].split(','))
    work = scratch or tempfile.mkdtemp(prefix='design-repo-drift-')
    src = have_src()
    failed, skipped, caught = 0, 0, 0
    try:
        print('== injected drift must be rejected ==')
        for name, want, link, mutation in CASES:
            if only and name not in only:
                continue
            if link and not src:
                skipped += 1
                continue
            proj = os.path.join(work, name)
            if os.path.exists(proj):
                shutil.rmtree(proj)
            copy = copy_repo(proj, link)
            r = subprocess.run([sys.executable, '-c', PRELUDE + mutation], cwd=copy, capture_output=True, text=True)
            if r.returncode:
                print(f'  case {name}: mutation script failed: {r.stderr.strip()[:200]}'); failed += 1
                continue
            code, out = verify(copy)
            lines = out.splitlines()
            if code == 0:
                print(f'  MISSED  {name} (verify_all.py still passed)'); failed += 1
            elif not any(l.startswith(want) for l in lines):
                first = next((l for l in lines if l.startswith('FAIL')), '')
                print(f'  WRONG-CHECK {name} (failed, but the intended check "{want}" did not fail): {first[:110]}'); failed += 1
            else:
                caught += 1
                print(f'  caught  {name} -> {next(l for l in lines if l.startswith(want))[:120]}')
        if skipped:
            print(f'  (skipped {skipped} case(s) that need the sibling source tree)')
        print('== the untouched repo must pass ==')
        clean = copy_repo(os.path.join(work, '_clean'), False) if not os.path.exists(os.path.join(work, '_clean')) else os.path.join(work, '_clean', 'design-repo')
        code, out = verify(clean)
        summ = next((l for l in out.splitlines() if l.startswith('SUMMARY')), '')
        if code == 0:
            print(f'  real repo (standalone copy, no source tree) passes: {summ}')
        else:
            print('  REAL REPO FAILED verify_all.py (standalone)'); print(out[:3000]); failed += 1
        code, out = verify(REPO)
        summ = next((l for l in out.splitlines() if l.startswith('SUMMARY')), '')
        if code == 0:
            print(f'  real repo in place passes: {summ}')
        else:
            print('  REAL REPO FAILED verify_all.py (in place)'); print(out[:3000]); failed += 1
    finally:
        if not keep:
            shutil.rmtree(work, ignore_errors=True)
    print(f'{caught} drift case(s) caught, {failed} problem(s)')
    print('DRIFT PROOF OK' if failed == 0 else 'DRIFT PROOF FAILED')
    return 1 if failed else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
