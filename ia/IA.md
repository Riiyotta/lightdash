# https://www.lightdash.com/ — specs/sitemap.txt (121 URLs) + CLONE_SPEC.md + specs/*.md + specs/cms/*.json

Source: https://www.lightdash.com/ — specs/sitemap.txt (121 URLs) + CLONE_SPEC.md + specs/*.md + specs/cms/*.json
Status: **measured-from-specs + reconciled against the built clone and src/ JSX (2026-10-13, update pass)** · production approved: **false**
118 routes · 30 templates · 100 unique sections

> Generated from `ia.json` by `build.mjs`. Edit the JSON, not this file.

## Shape of the site

The largest 3 templates (Blog post, Customer story, Blog category) account for 85 of 118 routes (72%). The remaining 33 routes span 27 templates.

| template | routes | share |
|---|---:|---:|
| Blog post | 62 | 53% |
| Customer story | 12 | 10% |
| Blog category | 11 | 9% |
| Event | 4 | 3% |
| Legal page | 4 | 3% |
| Homepage (Game Boy app) | 1 | 1% |
| Product: Conversational analytics | 1 | 1% |
| Product: Data apps | 1 | 1% |
| Product: Metrics catalog | 1 | 1% |
| Product: Embedded analytics | 1 | 1% |
| Product: Interactive dashboards | 1 | 1% |
| Product: Context layer | 1 | 1% |
| Product: Self-improving analytics | 1 | 1% |
| Product: BI as code (T1b "Main") | 1 | 1% |
| Integrations directory (T2) | 1 | 1% |
| On-demand event (T3) | 1 | 1% |
| Playground (T4, WIP) | 1 | 1% |
| Pricing | 1 | 1% |
| Start / book a call | 1 | 1% |
| Lightdash for Startups | 1 | 1% |
| Fintech landing | 1 | 1% |
| Partnerships | 1 | 1% |
| About | 1 | 1% |
| Public roadmap | 1 | 1% |
| Security | 1 | 1% |
| Japan landing | 1 | 1% |
| Blog index | 1 | 1% |
| Customer stories index | 1 | 1% |
| Not found (404) | 1 | 1% |
| Padel application | 1 | 1% |

## Page chrome

**1 routes carry chrome = `dark-home`** — Homepage (Game Boy app).

**8 routes carry chrome = `light-banner-cta`** — Product: Conversational analytics, Product: Data apps, Product: Metrics catalog, Product: Embedded analytics, Product: Interactive dashboards, Product: Context layer, Product: Self-improving analytics, Product: BI as code (T1b "Main").

**30 routes carry chrome = `light-cta`** — Integrations directory (T2), On-demand event (T3), Playground (T4, WIP), Pricing, Lightdash for Startups, Fintech landing, About, Public roadmap, Security, Blog index, Blog category, Customer stories index, Event, Legal page.

**79 routes carry chrome = `light-no-cta`** — Start / book a call, Partnerships, Japan landing, Blog post, Customer story, Not found (404), Padel application.

## Sections by reuse

How widely a section is shared determines whether it belongs in a shared
component library or stays local to its page.

| section | category | templates | routes | implementation | scope |
|---|---|---:|---:|---|---|
| `chrome.talk-modal` | CHROME | 30 | 118 | `src/components/TalkModal.jsx` | Every route — the trigger lives in both navbars (118 routes). |
| `chrome.footer` | CHROME | 29 | 117 | `src/components/shared/Footer.jsx (mounted by src/layouts/InnerLayout.jsx)` | Every inner route (117 routes); the homepage has no footer. |
| `chrome.mobile-nav-light` | CHROME | 29 | 117 | `src/components/MobileNav.jsx (variant="light")` | Every inner route (117 routes). |
| `chrome.navbar-light` | CHROME | 29 | 117 | `src/components/Navbar.jsx (variant="light")` | Every inner route (117 routes). |
| `content.rich-text` | CONTENT | 3 | 78 | `src/components/cms/PlaceholderBody.jsx + src/components/cms/richtext.css` | Blog posts, customer stories and events (78 routes). |
| `cta.inline-post` | CTA | 2 | 74 | `src/components/cms/InlineCta.jsx` | Blog posts and customer stories (74 routes). |
| `content.post-header` | CONTENT | 1 | 62 | `src/pages/BlogPost.jsx (inline) + src/components/cms/Breadcrumb.jsx` | All 62 blog posts. |
| `content.post-toc` | CONTENT | 1 | 62 | `src/components/cms/Toc.jsx` | All 62 blog posts. |
| `listing.related-articles` | LISTING | 1 | 62 | `src/components/cms/RelatedHeader.jsx + src/components/cms/PostCard.jsx` | All 62 blog posts. |
| `cta.snake-band` | CTA | 21 | 37 | `src/components/shared/CtaBand.jsx + src/components/shared/SnakeGame.jsx` | All inner routes that end in the snake CTA except /blog (37 routes). |
| `listing.blog-card-grid` | LISTING | 2 | 12 | `src/components/cms/BlogListing.jsx + src/components/cms/PostCard.jsx` | /blog and every category page (12 routes). |
| `listing.blog-filter-bar` | LISTING | 2 | 12 | `src/components/cms/BlogListing.jsx + src/components/cms/SearchModal.jsx` | /blog and every category page (12 routes). |
| `listing.blog-header` | LISTING | 2 | 12 | `src/components/cms/BlogListing.jsx` | /blog and every category page (12 routes). |
| `content.story-header` | CONTENT | 1 | 12 | `src/pages/CustomerStory.jsx (inline) + src/components/cms/Breadcrumb.jsx` | All 12 customer stories. |
| `content.story-sidebar` | CONTENT | 1 | 12 | `src/pages/CustomerStory.jsx > CompanyCard` | All 12 customer stories. |
| `content.story-stats-row` | CONTENT | 1 | 12 | `src/pages/CustomerStory.jsx (inline)` | All 12 customer stories. |
| `listing.related-stories` | LISTING | 1 | 12 | `src/components/cms/RelatedHeader.jsx + src/components/cms/StoryCard.jsx` | All 12 customer stories. |
| `content.faq` | CONTENT | 10 | 10 | `src/components/shared/Faq.jsx` | The T-one product group, bi-as-code, pricing and fintech (10 routes). |
| `chrome.announcement-bar` | CHROME | 8 | 8 | `src/components/shared/AnnouncementBar.jsx (mounted by src/layouts/InnerLayout.jsx banner)` | Only the 8 banner product pages (the T-one product group + /bi-as-code). |
| `proof.logos-row` | PROOF | 8 | 8 | `src/components/shared/LogosRow.jsx` | The T-one product group plus /bi-as-code (8 routes). |
| `hero.centered-product` | HERO | 7 | 7 | `src/components/shared/SectionHero.jsx` | The 7 pages of the T-one product group. |
| `hero.product-visual` | HERO | 7 | 7 | `src/components/shared/SectionHero.jsx (image slot; page visuals incl. src/components/pages/embedding/RiveHero.jsx, src/components/pages/context-layer/ContextDiagram.jsx)` | The 7 pages of the T-one product group. |
| `features.accordion-tabs` | FEATURES | 4 | 4 | `src/components/shared/AccordionTabs.jsx` | Conversational-analytics, embedding, interactive-dashboards and self-improving-analytics (4 routes). |
| `features.cards-1x3` | FEATURES | 4 | 4 | `src/components/shared/FeatureCards.jsx (layout 1x3)` | Data-apps, metrics-catalog, interactive-dashboards and context-layer (4 routes). |
| `hero.company-centered` | HERO | 4 | 4 | `inline in src/pages/Startups.jsx, Roadmap.jsx, LightdashSecurity.jsx, Jp.jsx (pixel tiles: src/components/pages/startups/PixelTiles.jsx on startups/jp)` | Startups, roadmap, security and jp (4 routes). |
| `content.event-details-card` | CONTENT | 1 | 4 | `src/pages/Event.jsx > DetailsCard` | All 4 events. |
| `content.event-header` | CONTENT | 1 | 4 | `src/pages/Event.jsx (inline)` | All 4 events. |
| `content.legal-body` | CONTENT | 1 | 4 | `src/components/legal/LegalPage.jsx (children from src/pages/TermsOfService.jsx, PrivacyPolicy.jsx, SubProcessors.jsx, GoogleApisDisclosure.jsx)` | The 4 legal pages. |
| `content.legal-header` | CONTENT | 1 | 4 | `src/components/legal/LegalPage.jsx` | The 4 legal pages. |
| `content.blog-posts` | CONTENT | 3 | 3 | `src/components/shared/BlogCards.jsx` | Data-apps, self-improving-analytics and bi-as-code (3 routes). |
| `decor.hatched-band` | DECOR | 3 | 3 | `src/components/shared/HatchedSpacer.jsx` | Embedding, beyond-copilots and startups (3 routes). |
| `features.icon-benefits-grid` | FEATURES | 3 | 3 | `src/components/shared/IconBenefits.jsx` | Conversational-analytics, context-layer and bi-as-code (3 routes). |
| `proof.customer-quote-stats` | PROOF | 3 | 3 | `src/components/shared/CustomerQuote.jsx (stats + cta)` | Conversational-analytics, interactive-dashboards and context-layer (3 routes). |
| `proof.testimonial-avatar` | PROOF | 3 | 3 | `src/components/pages/embedding/Testimonial.jsx; /startups and /jp render inline copies in src/pages/Startups.jsx and src/pages/Jp.jsx` | Embedding, startups and jp (3 routes). |
| `features.comparison-table` | FEATURES | 2 | 2 | `src/components/shared/ComparisonTable.jsx` | /context-layer and /self-improving-analytics (2 routes). |
| `features.pill-tabs-visual` | FEATURES | 2 | 2 | `src/components/shared/PillTabs.jsx` | /data-apps and /metrics-catalog (2 routes). |
| `features.split-content` | FEATURES | 2 | 2 | `src/components/shared/SplitRow.jsx` | /context-layer and /beyond-copilots (2 routes). |
| `proof.dark-testimonial-stats` | PROOF | 2 | 2 | `src/components/pages/bi-as-code/DarkTestimonial.jsx; /fintech renders its own inline copy in src/pages/Fintech.jsx` | /bi-as-code and /fintech (2 routes). |
| `proof.logo-tiles-named` | PROOF | 2 | 2 | `src/components/pages/lightdash-security/LogoTile.jsx` | /lightdash-security and /jp (2 routes). |
| `proof.logos-grid-12` | PROOF | 2 | 2 | `src/components/pages/playground/PlaygroundBlocks.jsx > LogoGrid; /pricing renders its own inline copy in src/pages/Pricing.jsx` | /pricing and /playground (2 routes). |
| `app.view-customers` | APP | 1 | 1 | `src/components/Hero.jsx > iframe public/gameboy/index.html` | Homepage iframe only (1 route). |
| `app.view-governance` | APP | 1 | 1 | `src/components/Hero.jsx > iframe public/gameboy/index.html` | Homepage iframe only (1 route). |
| `app.view-migration` | APP | 1 | 1 | `src/components/Hero.jsx > iframe public/gameboy/index.html` | Homepage iframe only (1 route). |
| `app.view-pricing` | APP | 1 | 1 | `src/components/Hero.jsx > iframe public/gameboy/index.html` | Homepage iframe only (1 route). |
| `app.view-product` | APP | 1 | 1 | `src/components/Hero.jsx > iframe public/gameboy/index.html` | Homepage iframe only (1 route). |
| `chrome.mobile-nav-dark` | CHROME | 1 | 1 | `src/components/MobileNav.jsx` | Homepage only (1 route). |
| `chrome.navbar-dark` | CHROME | 1 | 1 | `src/components/Navbar.jsx` | Homepage only (1 route). |
| `content.hiring-callout` | CONTENT | 1 | 1 | `src/pages/About.jsx (inline)` | /about only. |
| `content.jp-intro` | CONTENT | 1 | 1 | `src/pages/Jp.jsx (inline)` | /jp only. |
| `content.not-found` | CONTENT | 1 | 1 | `src/pages/NotFound.jsx` | The not-found route, also served for every unknown URL (1 route). |
| `content.padel-apply` | CONTENT | 1 | 1 | `src/pages/PadelApply.jsx (inline)` | /padel-apply only. |
| `content.playground-empty-blocks` | CONTENT | 1 | 1 | `src/components/pages/playground/PlaygroundBlocks.jsx > EmptyCardBand, EmptyBlocks` | /playground only. |
| `content.roadmap-board` | CONTENT | 1 | 1 | `src/pages/Roadmap.jsx > Column, Item` | /roadmap only. |
| `content.roadmap-community` | CONTENT | 1 | 1 | `src/pages/Roadmap.jsx > FooterCard` | /roadmap only. |
| `content.statement-heading` | CONTENT | 1 | 1 | `src/pages/SelfImprovingAnalytics.jsx (inline)` | /self-improving-analytics only. |
| `content.story-timeline` | CONTENT | 1 | 1 | `src/components/pages/about/Timeline.jsx` | /about only. |
| `content.team-grid` | CONTENT | 1 | 1 | `src/pages/About.jsx > TeamMember` | /about only. |
| `content.two-tone-heading` | CONTENT | 1 | 1 | `src/pages/Startups.jsx (inline)` | /startups only. |
| `content.video-section` | CONTENT | 1 | 1 | `src/components/pages/bi-as-code/VideoSection.jsx` | /bi-as-code only. |
| `content.youtube-replay` | CONTENT | 1 | 1 | `src/components/pages/beyond-copilots/Replay.jsx` | /beyond-copilots only. |
| `conversion.booking-split` | CONVERSION | 1 | 1 | `src/pages/Start.jsx > CalInline + src/components/shared/useCalInline.js` | /start only. |
| `conversion.padel-form` | CONVERSION | 1 | 1 | `src/pages/PadelApply.jsx (inline <form>)` | /padel-apply only. |
| `conversion.partner-form` | CONVERSION | 1 | 1 | `src/components/pages/partnerships/PartnerForm.jsx` | /partnerships only. |
| `conversion.plan-cards` | CONVERSION | 1 | 1 | `src/components/pages/pricing/PlanCard.jsx` | /pricing only. |
| `conversion.plan-comparison` | CONVERSION | 1 | 1 | `src/components/pages/pricing/CompareTable.jsx` | /pricing only. |
| `cta.snake-band-narrow` | CTA | 1 | 1 | `src/components/shared/CtaBand.jsx (narrow) + src/components/shared/SnakeGame.jsx` | /blog index only. |
| `features.alternating-rows` | FEATURES | 1 | 1 | `src/components/pages/bi-as-code/AlternatingRows.jsx` | /bi-as-code only. |
| `features.cards-2x2-text` | FEATURES | 1 | 1 | `src/components/shared/FeatureCards.jsx (layout 2x2, mobileCarousel → src/components/shared/MobileCarousel.jsx)` | /conversational-analytics only. |
| `features.cards-3x2` | FEATURES | 1 | 1 | `src/components/shared/FeatureCards.jsx (layout 3x2, mobileCarousel → src/components/shared/MobileCarousel.jsx)` | /embedding only. |
| `features.cards-3x2-image` | FEATURES | 1 | 1 | `src/components/shared/FeatureCards.jsx (layout 3x2-images, mobileCarousel → src/components/shared/MobileCarousel.jsx)` | /interactive-dashboards only. |
| `features.fintech-benefit-cards` | FEATURES | 1 | 1 | `src/pages/Fintech.jsx (inline)` | /fintech only. |
| `features.fintech-dark-band` | FEATURES | 1 | 1 | `src/pages/Fintech.jsx (inline) + src/components/pages/fintech/RoleAccordion.jsx` | /fintech only. |
| `features.fintech-reasons` | FEATURES | 1 | 1 | `src/pages/Fintech.jsx (inline)` | /fintech only. |
| `features.integration-paths` | FEATURES | 1 | 1 | `src/components/pages/embedding/IntegrationPaths.jsx` | /embedding only. |
| `features.jp-link-cards` | FEATURES | 1 | 1 | `src/pages/Jp.jsx (inline)` | /jp only. |
| `features.numbered-guide-cards` | FEATURES | 1 | 1 | `src/components/pages/beyond-copilots/BuildSteps.jsx` | /beyond-copilots only. |
| `features.partner-benefits-grid` | FEATURES | 1 | 1 | `src/pages/Partnerships.jsx (inline)` | /partnerships only. |
| `features.startups-benefits-grid` | FEATURES | 1 | 1 | `src/pages/Startups.jsx (inline)` | /startups only. |
| `features.startups-cards-2x2` | FEATURES | 1 | 1 | `src/pages/Startups.jsx (inline)` | /startups only. |
| `features.why-lightdash-split` | FEATURES | 1 | 1 | `src/pages/Partnerships.jsx (inline)` | /partnerships only. |
| `hero.about-stickers` | HERO | 1 | 1 | `src/pages/About.jsx (inline) + src/components/pages/about/Stickers.jsx` | /about only. |
| `hero.bi-as-code` | HERO | 1 | 1 | `src/components/pages/bi-as-code/BiHero.jsx` | /bi-as-code only. |
| `hero.event-ondemand` | HERO | 1 | 1 | `src/components/pages/beyond-copilots/EventHero.jsx` | /beyond-copilots only. |
| `hero.fintech-split` | HERO | 1 | 1 | `src/pages/Fintech.jsx (inline)` | /fintech only. |
| `hero.gameboy-app` | HERO | 1 | 1 | `src/components/Hero.jsx` | Homepage only (1 route). |
| `hero.integrations` | HERO | 1 | 1 | `src/components/pages/integrations/IntegrationsHero.jsx` | /integrations only. |
| `hero.partnerships` | HERO | 1 | 1 | `src/pages/Partnerships.jsx (inline)` | /partnerships only. |
| `hero.playground` | HERO | 1 | 1 | `src/components/pages/playground/PlaygroundHero.jsx` | /playground only. |
| `hero.pricing` | HERO | 1 | 1 | `src/pages/Pricing.jsx (inline)` | /pricing only. |
| `hero.startups-visual` | HERO | 1 | 1 | `src/pages/Startups.jsx (inline) + src/components/pages/startups/RiveDashboard.jsx` | /startups only. |
| `listing.integrations-directory` | LISTING | 1 | 1 | `src/components/pages/integrations/IntegrationsDirectory.jsx` | /integrations only. |
| `listing.stories-header` | LISTING | 1 | 1 | `src/pages/CustomerStories.jsx (inline)` | /customer-stories only. |
| `listing.story-card-grid` | LISTING | 1 | 1 | `src/components/cms/StoryCard.jsx` | /customer-stories only. |
| `proof.compliance-badges` | PROOF | 1 | 1 | `src/pages/LightdashSecurity.jsx (inline)` | /lightdash-security only. |
| `proof.customer-quote` | PROOF | 1 | 1 | `src/components/shared/CustomerQuote.jsx (no stats, no cta)` | /data-apps only. |
| `proof.logos-strip-5` | PROOF | 1 | 1 | `src/pages/Fintech.jsx (inline)` | /fintech only. |
| `proof.partner-logos` | PROOF | 1 | 1 | `src/pages/Partnerships.jsx (inline)` | /partnerships only. |
| `proof.partner-testimonial-carousel` | PROOF | 1 | 1 | `src/components/pages/partnerships/TestimonialCarousel.jsx` | /partnerships only. |
| `proof.speakers-grid` | PROOF | 1 | 1 | `src/components/pages/beyond-copilots/Speakers.jsx` | /beyond-copilots only. |
| `decor.pixel-border-band` | DECOR | 1 | 1 | `src/pages/Fintech.jsx (inline, block 7 "Graphic Border")` | Fintech only (1 route). |

**29 shared sections** appear in more than one template and belong in a component library.

**71 single-use sections** appear in exactly one template. Building these
as "reusable" components up front would be speculative — keep them page-local
until a second caller actually appears.

## Templates

### Homepage (Game Boy app) — `template.home`

1 route · `/` · chrome: **dark-home**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar-dark` | page-local |
| 2 | CHROME | `chrome.mobile-nav-dark` | page-local |
| 3 | HERO | `hero.gameboy-app` | page-local |
| 4 | APP | `app.view-customers` | page-local |
| 5 | APP | `app.view-product` | page-local |
| 6 | APP | `app.view-pricing` | page-local |
| 7 | APP | `app.view-governance` | page-local |
| 8 | APP | `app.view-migration` | page-local |
| 9 | CHROME | `chrome.talk-modal` | shared ×30 |

### Product: Conversational analytics — `template.product-conversational-analytics`

1 route · `/conversational-analytics` · chrome: **light-banner-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.announcement-bar` | shared ×8 |
| 2 | CHROME | `chrome.navbar-light` | shared ×29 |
| 3 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 4 | HERO | `hero.centered-product` | shared ×7 |
| 5 | HERO | `hero.product-visual` | shared ×7 |
| 6 | PROOF | `proof.logos-row` | shared ×8 |
| 7 | FEATURES | `features.accordion-tabs` | shared ×4 |
| 8 | FEATURES | `features.cards-2x2-text` | page-local |
| 9 | FEATURES | `features.icon-benefits-grid` | shared ×3 |
| 10 | PROOF | `proof.customer-quote-stats` | shared ×3 |
| 11 | CONTENT | `content.faq` | shared ×10 |
| 12 | CTA | `cta.snake-band` | shared ×21 |
| 13 | CHROME | `chrome.footer` | shared ×29 |
| 14 | CHROME | `chrome.talk-modal` | shared ×30 |

### Product: Data apps — `template.product-data-apps`

1 route · `/data-apps` · chrome: **light-banner-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.announcement-bar` | shared ×8 |
| 2 | CHROME | `chrome.navbar-light` | shared ×29 |
| 3 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 4 | HERO | `hero.centered-product` | shared ×7 |
| 5 | HERO | `hero.product-visual` | shared ×7 |
| 6 | PROOF | `proof.logos-row` | shared ×8 |
| 7 | FEATURES | `features.cards-1x3` | shared ×4 |
| 8 | FEATURES | `features.pill-tabs-visual` | shared ×2 |
| 9 | PROOF | `proof.customer-quote` | page-local |
| 10 | CONTENT | `content.faq` | shared ×10 |
| 11 | CONTENT | `content.blog-posts` | shared ×3 |
| 12 | CTA | `cta.snake-band` | shared ×21 |
| 13 | CHROME | `chrome.footer` | shared ×29 |
| 14 | CHROME | `chrome.talk-modal` | shared ×30 |

### Product: Metrics catalog — `template.product-metrics-catalog`

1 route · `/metrics-catalog` · chrome: **light-banner-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.announcement-bar` | shared ×8 |
| 2 | CHROME | `chrome.navbar-light` | shared ×29 |
| 3 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 4 | HERO | `hero.centered-product` | shared ×7 |
| 5 | HERO | `hero.product-visual` | shared ×7 |
| 6 | PROOF | `proof.logos-row` | shared ×8 |
| 7 | FEATURES | `features.pill-tabs-visual` | shared ×2 |
| 8 | FEATURES | `features.cards-1x3` | shared ×4 |
| 9 | CONTENT | `content.faq` | shared ×10 |
| 10 | CTA | `cta.snake-band` | shared ×21 |
| 11 | CHROME | `chrome.footer` | shared ×29 |
| 12 | CHROME | `chrome.talk-modal` | shared ×30 |

### Product: Embedded analytics — `template.product-embedding`

1 route · `/embedding` · chrome: **light-banner-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.announcement-bar` | shared ×8 |
| 2 | CHROME | `chrome.navbar-light` | shared ×29 |
| 3 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 4 | HERO | `hero.centered-product` | shared ×7 |
| 5 | HERO | `hero.product-visual` | shared ×7 |
| 6 | PROOF | `proof.logos-row` | shared ×8 |
| 7 | FEATURES | `features.accordion-tabs` | shared ×4 |
| 8 | FEATURES | `features.cards-3x2` | page-local |
| 9 | FEATURES | `features.integration-paths` | page-local |
| 10 | DECOR | `decor.hatched-band` | shared ×3 |
| 11 | PROOF | `proof.testimonial-avatar` | shared ×3 |
| 12 | CONTENT | `content.faq` | shared ×10 |
| 13 | CTA | `cta.snake-band` | shared ×21 |
| 14 | CHROME | `chrome.footer` | shared ×29 |
| 15 | CHROME | `chrome.talk-modal` | shared ×30 |

### Product: Interactive dashboards — `template.product-interactive-dashboards`

1 route · `/interactive-dashboards` · chrome: **light-banner-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.announcement-bar` | shared ×8 |
| 2 | CHROME | `chrome.navbar-light` | shared ×29 |
| 3 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 4 | HERO | `hero.centered-product` | shared ×7 |
| 5 | HERO | `hero.product-visual` | shared ×7 |
| 6 | PROOF | `proof.logos-row` | shared ×8 |
| 7 | FEATURES | `features.accordion-tabs` | shared ×4 |
| 8 | FEATURES | `features.cards-3x2-image` | page-local |
| 9 | FEATURES | `features.cards-1x3` | shared ×4 |
| 10 | PROOF | `proof.customer-quote-stats` | shared ×3 |
| 11 | CONTENT | `content.faq` | shared ×10 |
| 12 | CTA | `cta.snake-band` | shared ×21 |
| 13 | CHROME | `chrome.footer` | shared ×29 |
| 14 | CHROME | `chrome.talk-modal` | shared ×30 |

### Product: Context layer — `template.product-context-layer`

1 route · `/context-layer` · chrome: **light-banner-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.announcement-bar` | shared ×8 |
| 2 | CHROME | `chrome.navbar-light` | shared ×29 |
| 3 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 4 | HERO | `hero.centered-product` | shared ×7 |
| 5 | HERO | `hero.product-visual` | shared ×7 |
| 6 | PROOF | `proof.logos-row` | shared ×8 |
| 7 | FEATURES | `features.split-content` | shared ×2 |
| 8 | FEATURES | `features.cards-1x3` | shared ×4 |
| 9 | FEATURES | `features.icon-benefits-grid` | shared ×3 |
| 10 | FEATURES | `features.comparison-table` | shared ×2 |
| 11 | PROOF | `proof.customer-quote-stats` | shared ×3 |
| 12 | CONTENT | `content.faq` | shared ×10 |
| 13 | CTA | `cta.snake-band` | shared ×21 |
| 14 | CHROME | `chrome.footer` | shared ×29 |
| 15 | CHROME | `chrome.talk-modal` | shared ×30 |

### Product: Self-improving analytics — `template.product-self-improving-analytics`

1 route · `/self-improving-analytics` · chrome: **light-banner-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.announcement-bar` | shared ×8 |
| 2 | CHROME | `chrome.navbar-light` | shared ×29 |
| 3 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 4 | HERO | `hero.centered-product` | shared ×7 |
| 5 | HERO | `hero.product-visual` | shared ×7 |
| 6 | PROOF | `proof.logos-row` | shared ×8 |
| 7 | CONTENT | `content.statement-heading` | page-local |
| 8 | FEATURES | `features.accordion-tabs` | shared ×4 |
| 9 | FEATURES | `features.comparison-table` | shared ×2 |
| 10 | CONTENT | `content.faq` | shared ×10 |
| 11 | CONTENT | `content.blog-posts` | shared ×3 |
| 12 | CTA | `cta.snake-band` | shared ×21 |
| 13 | CHROME | `chrome.footer` | shared ×29 |
| 14 | CHROME | `chrome.talk-modal` | shared ×30 |

### Product: BI as code (T1b "Main") — `template.product-bi-as-code`

1 route · `/bi-as-code` · chrome: **light-banner-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.announcement-bar` | shared ×8 |
| 2 | CHROME | `chrome.navbar-light` | shared ×29 |
| 3 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 4 | HERO | `hero.bi-as-code` | page-local |
| 5 | CONTENT | `content.video-section` | page-local |
| 6 | PROOF | `proof.logos-row` | shared ×8 |
| 7 | FEATURES | `features.alternating-rows` | page-local |
| 8 | FEATURES | `features.icon-benefits-grid` | shared ×3 |
| 9 | PROOF | `proof.dark-testimonial-stats` | shared ×2 |
| 10 | CONTENT | `content.faq` | shared ×10 |
| 11 | CONTENT | `content.blog-posts` | shared ×3 |
| 12 | CTA | `cta.snake-band` | shared ×21 |
| 13 | CHROME | `chrome.footer` | shared ×29 |
| 14 | CHROME | `chrome.talk-modal` | shared ×30 |

### Integrations directory (T2) — `template.integrations`

1 route · `/integrations` · chrome: **light-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar-light` | shared ×29 |
| 2 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 3 | HERO | `hero.integrations` | page-local |
| 4 | LISTING | `listing.integrations-directory` | page-local |
| 5 | CTA | `cta.snake-band` | shared ×21 |
| 6 | CHROME | `chrome.footer` | shared ×29 |
| 7 | CHROME | `chrome.talk-modal` | shared ×30 |

### On-demand event (T3) — `template.beyond-copilots`

1 route · `/beyond-copilots` · chrome: **light-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar-light` | shared ×29 |
| 2 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 3 | HERO | `hero.event-ondemand` | page-local |
| 4 | CONTENT | `content.youtube-replay` | page-local |
| 5 | FEATURES | `features.split-content` | shared ×2 |
| 6 | FEATURES | `features.numbered-guide-cards` | page-local |
| 7 | DECOR | `decor.hatched-band` | shared ×3 |
| 8 | PROOF | `proof.speakers-grid` | page-local |
| 9 | CTA | `cta.snake-band` | shared ×21 |
| 10 | CHROME | `chrome.footer` | shared ×29 |
| 11 | CHROME | `chrome.talk-modal` | shared ×30 |

### Playground (T4, WIP) — `template.playground`

1 route · `/playground` · chrome: **light-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar-light` | shared ×29 |
| 2 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 3 | HERO | `hero.playground` | page-local |
| 4 | PROOF | `proof.logos-grid-12` | shared ×2 |
| 5 | CONTENT | `content.playground-empty-blocks` | page-local |
| 6 | CTA | `cta.snake-band` | shared ×21 |
| 7 | CHROME | `chrome.footer` | shared ×29 |
| 8 | CHROME | `chrome.talk-modal` | shared ×30 |

### Pricing — `template.pricing`

1 route · `/pricing` · chrome: **light-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar-light` | shared ×29 |
| 2 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 3 | HERO | `hero.pricing` | page-local |
| 4 | CONVERSION | `conversion.plan-cards` | page-local |
| 5 | PROOF | `proof.logos-grid-12` | shared ×2 |
| 6 | CONVERSION | `conversion.plan-comparison` | page-local |
| 7 | CONTENT | `content.faq` | shared ×10 |
| 8 | CTA | `cta.snake-band` | shared ×21 |
| 9 | CHROME | `chrome.footer` | shared ×29 |
| 10 | CHROME | `chrome.talk-modal` | shared ×30 |

### Start / book a call — `template.start`

1 route · `/start` · chrome: **light-no-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar-light` | shared ×29 |
| 2 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 3 | CONVERSION | `conversion.booking-split` | page-local |
| 4 | CHROME | `chrome.footer` | shared ×29 |
| 5 | CHROME | `chrome.talk-modal` | shared ×30 |

### Lightdash for Startups — `template.startups`

1 route · `/startups` · chrome: **light-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar-light` | shared ×29 |
| 2 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 3 | HERO | `hero.company-centered` | shared ×4 |
| 4 | HERO | `hero.startups-visual` | page-local |
| 5 | CONTENT | `content.two-tone-heading` | page-local |
| 6 | FEATURES | `features.startups-benefits-grid` | page-local |
| 7 | DECOR | `decor.hatched-band` | shared ×3 |
| 8 | FEATURES | `features.startups-cards-2x2` | page-local |
| 9 | PROOF | `proof.testimonial-avatar` | shared ×3 |
| 10 | CTA | `cta.snake-band` | shared ×21 |
| 11 | CHROME | `chrome.footer` | shared ×29 |
| 12 | CHROME | `chrome.talk-modal` | shared ×30 |

### Fintech landing — `template.fintech`

1 route · `/fintech` · chrome: **light-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar-light` | shared ×29 |
| 2 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 3 | HERO | `hero.fintech-split` | page-local |
| 4 | PROOF | `proof.logos-strip-5` | page-local |
| 5 | FEATURES | `features.fintech-reasons` | page-local |
| 6 | FEATURES | `features.fintech-benefit-cards` | page-local |
| 7 | PROOF | `proof.dark-testimonial-stats` | shared ×2 |
| 8 | FEATURES | `features.fintech-dark-band` | page-local |
| 9 | DECOR | `decor.pixel-border-band` | page-local |
| 10 | CONTENT | `content.faq` | shared ×10 |
| 11 | CTA | `cta.snake-band` | shared ×21 |
| 12 | CHROME | `chrome.footer` | shared ×29 |
| 13 | CHROME | `chrome.talk-modal` | shared ×30 |

### Partnerships — `template.partnerships`

1 route · `/partnerships` · chrome: **light-no-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar-light` | shared ×29 |
| 2 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 3 | HERO | `hero.partnerships` | page-local |
| 4 | PROOF | `proof.partner-logos` | page-local |
| 5 | FEATURES | `features.why-lightdash-split` | page-local |
| 6 | PROOF | `proof.partner-testimonial-carousel` | page-local |
| 7 | FEATURES | `features.partner-benefits-grid` | page-local |
| 8 | CONVERSION | `conversion.partner-form` | page-local |
| 9 | CHROME | `chrome.footer` | shared ×29 |
| 10 | CHROME | `chrome.talk-modal` | shared ×30 |

### About — `template.about`

1 route · `/about` · chrome: **light-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar-light` | shared ×29 |
| 2 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 3 | HERO | `hero.about-stickers` | page-local |
| 4 | CONTENT | `content.team-grid` | page-local |
| 5 | CONTENT | `content.story-timeline` | page-local |
| 6 | CONTENT | `content.hiring-callout` | page-local |
| 7 | CTA | `cta.snake-band` | shared ×21 |
| 8 | CHROME | `chrome.footer` | shared ×29 |
| 9 | CHROME | `chrome.talk-modal` | shared ×30 |

### Public roadmap — `template.roadmap`

1 route · `/roadmap` · chrome: **light-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar-light` | shared ×29 |
| 2 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 3 | HERO | `hero.company-centered` | shared ×4 |
| 4 | CONTENT | `content.roadmap-board` | page-local |
| 5 | CONTENT | `content.roadmap-community` | page-local |
| 6 | CTA | `cta.snake-band` | shared ×21 |
| 7 | CHROME | `chrome.footer` | shared ×29 |
| 8 | CHROME | `chrome.talk-modal` | shared ×30 |

### Security — `template.lightdash-security`

1 route · `/lightdash-security` · chrome: **light-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar-light` | shared ×29 |
| 2 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 3 | HERO | `hero.company-centered` | shared ×4 |
| 4 | PROOF | `proof.compliance-badges` | page-local |
| 5 | PROOF | `proof.logo-tiles-named` | shared ×2 |
| 6 | CTA | `cta.snake-band` | shared ×21 |
| 7 | CHROME | `chrome.footer` | shared ×29 |
| 8 | CHROME | `chrome.talk-modal` | shared ×30 |

### Japan landing — `template.jp`

1 route · `/jp` · chrome: **light-no-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar-light` | shared ×29 |
| 2 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 3 | HERO | `hero.company-centered` | shared ×4 |
| 4 | PROOF | `proof.logo-tiles-named` | shared ×2 |
| 5 | CONTENT | `content.jp-intro` | page-local |
| 6 | FEATURES | `features.jp-link-cards` | page-local |
| 7 | PROOF | `proof.testimonial-avatar` | shared ×3 |
| 8 | CHROME | `chrome.footer` | shared ×29 |
| 9 | CHROME | `chrome.talk-modal` | shared ×30 |

### Blog index — `template.blog-index`

1 route · `/blog` · chrome: **light-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar-light` | shared ×29 |
| 2 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 3 | LISTING | `listing.blog-header` | shared ×2 |
| 4 | LISTING | `listing.blog-filter-bar` | shared ×2 |
| 5 | LISTING | `listing.blog-card-grid` | shared ×2 |
| 6 | CTA | `cta.snake-band-narrow` | page-local |
| 7 | CHROME | `chrome.footer` | shared ×29 |
| 8 | CHROME | `chrome.talk-modal` | shared ×30 |

### Blog category — `template.blog-category`

11 routes · `/blog-categories/:slug` · chrome: **light-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar-light` | shared ×29 |
| 2 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 3 | LISTING | `listing.blog-header` | shared ×2 |
| 4 | LISTING | `listing.blog-filter-bar` | shared ×2 |
| 5 | LISTING | `listing.blog-card-grid` | shared ×2 |
| 6 | CTA | `cta.snake-band` | shared ×21 |
| 7 | CHROME | `chrome.footer` | shared ×29 |
| 8 | CHROME | `chrome.talk-modal` | shared ×30 |

### Blog post — `template.blog-post`

62 routes · `/blogpost/:slug` · chrome: **light-no-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar-light` | shared ×29 |
| 2 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 3 | CONTENT | `content.post-header` | page-local |
| 4 | CONTENT | `content.rich-text` | shared ×3 |
| 5 | CTA | `cta.inline-post` | shared ×2 |
| 6 | CONTENT | `content.post-toc` | page-local |
| 7 | LISTING | `listing.related-articles` | page-local |
| 8 | CHROME | `chrome.footer` | shared ×29 |
| 9 | CHROME | `chrome.talk-modal` | shared ×30 |

### Customer stories index — `template.customer-stories`

1 route · `/customer-stories` · chrome: **light-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar-light` | shared ×29 |
| 2 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 3 | LISTING | `listing.stories-header` | page-local |
| 4 | LISTING | `listing.story-card-grid` | page-local |
| 5 | CTA | `cta.snake-band` | shared ×21 |
| 6 | CHROME | `chrome.footer` | shared ×29 |
| 7 | CHROME | `chrome.talk-modal` | shared ×30 |

### Customer story — `template.customer-story`

12 routes · `/customer-story/:slug` · chrome: **light-no-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar-light` | shared ×29 |
| 2 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 3 | CONTENT | `content.story-header` | page-local |
| 4 | CONTENT | `content.story-stats-row` | page-local |
| 5 | CONTENT | `content.rich-text` | shared ×3 |
| 6 | CTA | `cta.inline-post` | shared ×2 |
| 7 | CONTENT | `content.story-sidebar` | page-local |
| 8 | LISTING | `listing.related-stories` | page-local |
| 9 | CHROME | `chrome.footer` | shared ×29 |
| 10 | CHROME | `chrome.talk-modal` | shared ×30 |

### Event — `template.event`

4 routes · `/events/:slug` · chrome: **light-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar-light` | shared ×29 |
| 2 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 3 | CONTENT | `content.event-header` | page-local |
| 4 | CONTENT | `content.rich-text` | shared ×3 |
| 5 | CONTENT | `content.event-details-card` | page-local |
| 6 | CTA | `cta.snake-band` | shared ×21 |
| 7 | CHROME | `chrome.footer` | shared ×29 |
| 8 | CHROME | `chrome.talk-modal` | shared ×30 |

### Legal page — `template.legal`

4 routes · `/terms-of-service`, `/privacy-policy`, `/sub-processors`, `/google-apis-disclosure` · chrome: **light-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar-light` | shared ×29 |
| 2 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 3 | CONTENT | `content.legal-header` | page-local |
| 4 | CONTENT | `content.legal-body` | page-local |
| 5 | CTA | `cta.snake-band` | shared ×21 |
| 6 | CHROME | `chrome.footer` | shared ×29 |
| 7 | CHROME | `chrome.talk-modal` | shared ×30 |

### Not found (404) — `template.not-found`

1 route · `/404` · chrome: **light-no-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar-light` | shared ×29 |
| 2 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 3 | CONTENT | `content.not-found` | page-local |
| 4 | CHROME | `chrome.footer` | shared ×29 |
| 5 | CHROME | `chrome.talk-modal` | shared ×30 |

### Padel application — `template.padel-apply`

1 route · `/padel-apply` · chrome: **light-no-cta**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar-light` | shared ×29 |
| 2 | CHROME | `chrome.mobile-nav-light` | shared ×29 |
| 3 | CONTENT | `content.padel-apply` | page-local |
| 4 | CONVERSION | `conversion.padel-form` | page-local |
| 5 | CHROME | `chrome.footer` | shared ×29 |
| 6 | CHROME | `chrome.talk-modal` | shared ×30 |

## Section reference

### CHROME

_Site chrome repeated across routes: navbars, mobile nav, announcement bar, footer, Talk-to-team modal._

**`chrome.announcement-bar`** — 40px #1A1B25 link bar above the light navbar ("⚡️ Build unlimited chart types with Chart Studio · Learn how"), scroll-linked translateY(-min(scrollY,40)) so it scrolls away while the nav sticks. SHARED §1.

· Only the 8 banner product pages (the T-one product group + /bi-as-code). · appears on 8 routes · implemented by `src/components/shared/AnnouncementBar.jsx (mounted by src/layouts/InnerLayout.jsx banner)`

**`chrome.footer`** — Full-bleed #1A1B25 footer, 600 tall: logo, newsletter form, 8 G2 badges, Product/Company/Resources link columns, socials and copyright. SHARED §10.

· Every inner route (117 routes); the homepage has no footer. · appears on 117 routes · implemented by `src/components/shared/Footer.jsx (mounted by src/layouts/InnerLayout.jsx)`

**`chrome.mobile-nav-dark`** — Dark "Phone Dark" bar (64 tall below 1100) with hamburger opening a full-height #080808 accordion menu. CLONE_SPEC §5.

· Homepage only (1 route). · appears on 1 routes · implemented by `src/components/MobileNav.jsx`

**`chrome.mobile-nav-light`** — White 64px "Phone" bar below 1100 (Login + Book a demo + Start for free at 810, logo + hamburger at 390) with the accordion menu on white. SHARED §2.

· Every inner route (117 routes). · appears on 117 routes · implemented by `src/components/MobileNav.jsx (variant="light")`

**`chrome.navbar-dark`** — Fixed #080808 navbar, 106 tall at ≥1100: Rive logo, Product/Customers/Resources hover mega-menus (dark panels), Pricing link, Login, "Talk to our team" (opens the Cal.com modal) and "Start for free". CLONE_SPEC §2–3.

· Homepage only (1 route). · appears on 1 routes · implemented by `src/components/Navbar.jsx`

**`chrome.navbar-light`** — White navbar, same geometry/menus as the dark one but #FFFFFF bar, 1px #E5E7EB bottom hairline, #36394A links, dark logo artwork and white mega-menu panels. SHARED §2.

· Every inner route (117 routes). · appears on 117 routes · implemented by `src/components/Navbar.jsx (variant="light")`

**`chrome.talk-modal`** — "Talk to our team" overlay: dimmed backdrop under the nav, 1000×620 frame holding a Cal.com inline embed (lightdash/talk, month_view). Opened from the navbar button. CLONE_SPEC §4.

· Every route — the trigger lives in both navbars (118 routes). · appears on 118 routes · implemented by `src/components/TalkModal.jsx`

### HERO

_Page-opening block: title, subtitle, primary buttons and the hero visual._

**`hero.about-stickers`** — About hero: 100px spacer, centred 56px "Building the BI tool we always wanted" + subtitle, overlaid by six 80px draggable pixel stickers (drag within the layer, hover scale 1.05). No buttons. company-pages §7.1.

· /about only. · appears on 1 routes · implemented by `src/pages/About.jsx (inline) + src/components/pages/about/Stickers.jsx`

**`hero.bi-as-code`** — Bordered 1280×604 hero inside the "Main" wrapper with BG Element pixel tiles in two corners, H1 "Your entire BI as code", subtitle and standard buttons. product-pages §2.7.

· /bi-as-code only. · appears on 1 routes · implemented by `src/components/pages/bi-as-code/BiHero.jsx`

**`hero.centered-product`** — Product hero: 100px spacer with 8–10 corner pixel squares, centred display-72 (or two-line 56px) H1 with accent span, lead subtitle, "Talk to our team" + "Start for free" buttons, 56px dashed spacer. SHARED §7.1.

· The 7 pages of the T-one product group. · appears on 7 routes · implemented by `src/components/shared/SectionHero.jsx`

**`hero.company-centered`** — Company-page centred hero: 100px spacer (pixel-corner tiles on startups/jp/roadmap that drop or slide in after 1s), centred 56/50.4 title, Inter 18 subtitle, 0–2 buttons, dashed spacer. company-pages §1.7–1.8.

· Startups, roadmap, security and jp (4 routes). · appears on 4 routes · implemented by `inline in src/pages/Startups.jsx, Roadmap.jsx, LightdashSecurity.jsx, Jp.jsx (pixel tiles: src/components/pages/startups/PixelTiles.jsx on startups/jp)`

**`hero.event-ondemand`** — Left-aligned on-demand event hero: uppercase purple eyebrow, co-host logo row, display-72 H1, lead, "Watch the build" + "Talk to our team" buttons and "Recorded live on…" meta. product-pages §2.10.

· /beyond-copilots only. · appears on 1 routes · implemented by `src/components/pages/beyond-copilots/EventHero.jsx`

**`hero.fintech-split`** — Two-column boxed hero: 72px H1 + lead + buttons left, 564×604 chat-and-chart illustration right with pixel column and cluster decorations. On live the illustration is a scripted chat animation; the clone shows a static render of its final state (renders/hero-illustration@2x.png) — known gap. company-pages §5.1.

· /fintech only. · appears on 1 routes · implemented by `src/pages/Fintech.jsx (inline)`

**`hero.gameboy-app`** — Full-viewport iframe (/gameboy/index.html?navh=104|64) running the mirrored Three.js Game Boy app: idle attract scene with logo rockets, cartridge insert, boot/title screen and the 2×3 planet menu. No page scroll. CLONE_SPEC §0, §6.1–6.2.

· Homepage only (1 route). · appears on 1 routes · implemented by `src/components/Hero.jsx`

**`hero.integrations`** — Left-aligned 295px hero (H1 "Explore Lightdash / Integrations" + sub) with an 18-square pixel cluster top-right that springs in after 1s. product-pages §2.9.

· /integrations only. · appears on 1 routes · implemented by `src/components/pages/integrations/IntegrationsHero.jsx`

**`hero.partnerships`** — Boxed 1280×604 hero: centred 72px "Become a Lightdash partner", lead, purple "Apply now" pill (→ #partner-form), pixel hand-cursor and rocket SVGs, corner BG Element clusters. company-pages §6.1.

· /partnerships only. · appears on 1 routes · implemented by `src/pages/Partnerships.jsx (inline)`

**`hero.playground`** — Left-aligned old-homepage hero: 76px heading built from separate word elements with inline pixel-icon SVGs (no load word-reveal on live — the words render statically), lead, "Book a demo" + "Start for free" (no href), 287px decorative image top-right. product-pages §2.11.

· /playground only. · appears on 1 routes · implemented by `src/components/pages/playground/PlaygroundHero.jsx`

**`hero.pricing`** — Left-aligned two-line 56px title "Stop paying per seat / to look at your own data." at padding-left 64, bottom dashed rule, then an 88px spacer (hidden opacity-0 image omitted). company-pages §2.1.

· /pricing only. · appears on 1 routes · implemented by `src/pages/Pricing.jsx (inline)`

**`hero.product-visual`** — Full-width HeroImage block under the product hero: lavender glow background plus a page-specific visual (image, inline SVG, iframe mini-app, Rive canvas or animated HTML diagram). SHARED §7.1 HeroImage.

· The 7 pages of the T-one product group. · appears on 7 routes · implemented by `src/components/shared/SectionHero.jsx (image slot; page visuals incl. src/components/pages/embedding/RiveHero.jsx, src/components/pages/context-layer/ContextDiagram.jsx)`

**`hero.startups-visual`** — Startups HeroImage: glow background, 956×547 device frame holding the "dashboard" Rive state machine, and the overlapping "To qualify, your company must:" card. company-pages §4.2.

· /startups only. · appears on 1 routes · implemented by `src/pages/Startups.jsx (inline) + src/components/pages/startups/RiveDashboard.jsx`

### APP

_States inside the homepage Game Boy iframe app. These are views, not routes._

**`app.view-customers`** — Game Boy app view "Customers": bento of customer stat/quote tiles (fal, OakNorth, JustWatch, Workday + logo tiles) with VIEW CUSTOMERS CTA. App state, not a route. CLONE_SPEC §6.3.

· Homepage iframe only (1 route). · appears on 1 routes · implemented by `src/components/Hero.jsx > iframe public/gameboy/index.html`

**`app.view-governance`** — Game Boy app view "Governance": central Revenue metric card wired to 4 outputs with Verify→Verified stamp animations. App state, not a route. CLONE_SPEC §6.4.

· Homepage iframe only (1 route). · appears on 1 routes · implemented by `src/components/Hero.jsx > iframe public/gameboy/index.html`

**`app.view-migration`** — Game Boy app view "Migration": Looker / Power BI / Tableau cards with migrated-customer pills and the tractor-beam interaction. App state, not a route. CLONE_SPEC §6.4.

· Homepage iframe only (1 route). · appears on 1 routes · implemented by `src/components/Hero.jsx > iframe public/gameboy/index.html`

**`app.view-pricing`** — Game Boy app view "Pricing": three framed plan cards (Open Source / Cloud Pro $3000 / Enterprise) with mascots. App state, not a route. CLONE_SPEC §6.4.

· Homepage iframe only (1 route). · appears on 1 routes · implemented by `src/components/Hero.jsx > iframe public/gameboy/index.html`

**`app.view-product`** — Game Boy app view "Product": 5-slide carousel (BI as code, Data Apps, Conversational Analytics, Metrics Catalog, Embedded) with LEARN MORE links. App state, not a route. CLONE_SPEC §6.4.

· Homepage iframe only (1 route). · appears on 1 routes · implemented by `src/components/Hero.jsx > iframe public/gameboy/index.html`

### PROOF

_Social proof: logo rows/grids, quotes, testimonials, stats, compliance seals, speakers._

**`proof.compliance-badges`** — Two centred 104px compliance badges (AICPA SOC2, GDPR) with a dashed bottom. company-pages §9.

· /lightdash-security only. · appears on 1 routes · implemented by `src/pages/LightdashSecurity.jsx (inline)`

**`proof.customer-quote`** — Customer Quote block without statistics: gradient quote block with corner pixels, company logo, quote-40, attribution row (grayscale photo, name, role). No stats row, no case-study button. SHARED §7.6.

· /data-apps only. · appears on 1 routes · implemented by `src/components/shared/CustomerQuote.jsx (no stats, no cta)`

**`proof.customer-quote-stats`** — Customer Quote block with "Read case study" button and a 3-cell statistics row (optional converging-lines divider on context-layer). SHARED §7.6.

· Conversational-analytics, interactive-dashboards and context-layer (3 routes). · appears on 3 routes · implemented by `src/components/shared/CustomerQuote.jsx (stats + cta)`

**`proof.dark-testimonial-stats`** — #F6F8FA band holding a 1120-wide #1A1B25 radius-16 testimonial card (pixel avatar, quote 21/36, "Read the full case study") plus a row of three white stat cards (40px number + label).

· /bi-as-code and /fintech (2 routes). · appears on 2 routes · implemented by `src/components/pages/bi-as-code/DarkTestimonial.jsx; /fintech renders its own inline copy in src/pages/Fintech.jsx`

**`proof.logo-tiles-named`** — Caption + grid of 48px framed logo tiles (1px #DFE1E7, 5px soft ring) with the company name under each: 6×3 on security, 5×1 on jp. company-pages §9–10.

· /lightdash-security and /jp (2 routes). · appears on 2 routes · implemented by `src/components/pages/lightdash-security/LogoTile.jsx`

**`proof.logos-grid-12`** — 2×6 monochrome logo grid, 212 tall (padding 24/0/60): Kraken, Octopus, Workday, Phantom, Adobe, fal / Tempo, Collectors, Model ML, Tatango, ServiceNow, OakNorth.

· /pricing and /playground (2 routes). · appears on 2 routes · implemented by `src/components/pages/playground/PlaygroundBlocks.jsx > LogoGrid; /pricing renders its own inline copy in src/pages/Pricing.jsx`

**`proof.logos-row`** — Caption heading row + 1280×112 six-cell customer logo row (Kraken, Octopus Energy, Workday, JustWatch, Adobe, fal), no motion. SHARED §7.2.

· The T-one product group plus /bi-as-code (8 routes). · appears on 8 routes · implemented by `src/components/shared/LogosRow.jsx`

**`proof.logos-strip-5`** — "Loved by fintech data teams" caption + five bordered 256×122 logo cells (Wise, Kroo, Neo, Titanbay, Peach). company-pages §5.2.

· /fintech only. · appears on 1 routes · implemented by `src/pages/Fintech.jsx (inline)`

**`proof.partner-logos`** — "Official Lightdash partners" caption + 5 linked 256×80 partner logo cells (_blank). company-pages §6.2.

· /partnerships only. · appears on 1 routes · implemented by `src/pages/Partnerships.jsx (inline)`

**`proof.partner-testimonial-carousel`** — Auto-rotating (4000ms) partner testimonial: centred Inter 28/48 quote over three 150px portraits with On/Off states and a purple progress line under the active person; click to jump. company-pages §6.4.

· /partnerships only. · appears on 1 routes · implemented by `src/components/pages/partnerships/TestimonialCarousel.jsx`

**`proof.speakers-grid`** — "Built live by" 3-card speaker grid: tinted grayscale photo band, company logo, name and role. product-pages §2.10.

· /beyond-copilots only. · appears on 1 routes · implemented by `src/components/pages/beyond-copilots/Speakers.jsx`

**`proof.testimonial-avatar`** — Single-quote testimonial row: 124px pixel-art avatar left, Britti quote (32/40.96; 21px on jp) with coloured emphasis span, Inter 15 "Name · Role @ Company", 61×48 pixel quote decorations in two corners.

· Embedding, startups and jp (3 routes). · appears on 3 routes · implemented by `src/components/pages/embedding/Testimonial.jsx; /startups and /jp render inline copies in src/pages/Startups.jsx and src/pages/Jp.jsx`

### FEATURES

_Product/benefit explanation modules: tabs, card grids, comparisons, split rows._

**`features.accordion-tabs`** — Split row: header (optional purple subtitle pill, h3, lead) + 3–4 accordion tabs with an 8.8s purple progress line on the open tab, and a 608px image well that swaps instantly. Rows alternate sides. SHARED §7.3.

· Conversational-analytics, embedding, interactive-dashboards and self-improving-analytics (4 routes). · appears on 4 routes · implemented by `src/components/shared/AccordionTabs.jsx`

**`features.alternating-rows`** — "Coding agents don't have to click through a dashboard builder." heading over 3 alternating 640/640 image/text rows with corner pixel decorations. product-pages §2.7.

· /bi-as-code only. · appears on 1 routes · implemented by `src/components/pages/bi-as-code/AlternatingRows.jsx`

**`features.cards-1x3`** — Left-aligned h2 (+ optional sub) over 3 text cards (365 wide, top hairline only, title 24 + body 16). SHARED §7.4 "Desktop 1x3".

· Data-apps, metrics-catalog, interactive-dashboards and context-layer (4 routes). · appears on 4 routes · implemented by `src/components/shared/FeatureCards.jsx (layout 1x3)`

**`features.cards-2x2-text`** — Centred h2 over a 2×2 grid of dashed-border text cards (556 wide). SHARED §7.4 "2x2 text".

· /conversational-analytics only. · appears on 1 routes · implemented by `src/components/shared/FeatureCards.jsx (layout 2x2, mobileCarousel → src/components/shared/MobileCarousel.jsx)`

**`features.cards-3x2`** — 3×2 grid of fully bordered text cards (169 tall). SHARED §7.4 "3x2".

· /embedding only. · appears on 1 routes · implemented by `src/components/shared/FeatureCards.jsx (layout 3x2, mobileCarousel → src/components/shared/MobileCarousel.jsx)`

**`features.cards-3x2-image`** — 3×2 grid of bordered cards each with a 365×228 image over the text block. SHARED §7.4 "3x2 with images".

· /interactive-dashboards only. · appears on 1 routes · implemented by `src/components/shared/FeatureCards.jsx (layout 3x2-images, mobileCarousel → src/components/shared/MobileCarousel.jsx)`

**`features.comparison-table`** — Centred h2 over a 4-column dashed comparison table with the Lightdash column tinted rgba(94,76,255,.1) and fading out in the last row. SHARED §7.7.

· /context-layer and /self-improving-analytics (2 routes). · appears on 2 routes · implemented by `src/components/shared/ComparisonTable.jsx`

**`features.fintech-benefit-cards`** — "How Lightdash is helping fintechs" heading + 2×2 bordered cards with animated illustration renders. company-pages §5.4.

· /fintech only. · appears on 1 routes · implemented by `src/pages/Fintech.jsx (inline)`

**`features.fintech-dark-band`** — Full-bleed #1A1B25 band: governance heading + SOC2/HIPAA stamps, then "Built for every fintech role" with a 4-item auto-advancing role accordion (4.4s, purple progress line); followed by the 60px pixel graphic border. company-pages §5.6–5.7.

· /fintech only. · appears on 1 routes · implemented by `src/pages/Fintech.jsx (inline) + src/components/pages/fintech/RoleAccordion.jsx`

**`features.fintech-reasons`** — "Why does traditional BI fail fintechs?" h2 + three reason cards with 48px pixel icons. company-pages §5.3.

· /fintech only. · appears on 1 routes · implemented by `src/pages/Fintech.jsx (inline)`

**`features.icon-benefits-grid`** — Centred h2 over a 2×2 dashed grid of benefits, each with an 84px pixel-art icon cell, title row and description. SHARED §7.5.

· Conversational-analytics, context-layer and bi-as-code (3 routes). · appears on 3 routes · implemented by `src/components/shared/IconBenefits.jsx`

**`features.integration-paths`** — "Choose your integration path": two centred columns (React SDK / iFrame) each with description and bullet list. product-pages §2.4.

· /embedding only. · appears on 1 routes · implemented by `src/components/pages/embedding/IntegrationPaths.jsx`

**`features.jp-link-cards`** — Two 567×505 bordered link cards (Ubie customer story, Tokyo meetup) with image, title, body and #7364FE link line; both link to /customer-story/ubie-jp on live. company-pages §10.

· /jp only. · appears on 1 routes · implemented by `src/pages/Jp.jsx (inline)`

**`features.numbered-guide-cards`** — "Build it yourself": 2×2 numbered link cards (01–04 cell, title bar, body, "Read the … guide →"). product-pages §2.10.

· /beyond-copilots only. · appears on 1 routes · implemented by `src/components/pages/beyond-copilots/BuildSteps.jsx`

**`features.partner-benefits-grid`** — "Why become a Lightdash partner?" two-tone heading + 3×2 dashed benefits grid (48px pixel icon, title bar, description). company-pages §6.5.

· /partnerships only. · appears on 1 routes · implemented by `src/pages/Partnerships.jsx (inline)`

**`features.pill-tabs-visual`** — Tabbed visual: row of pill tabs (active #5E4CFF), heading/lead and a large #F6F8FA product image that swaps on click; no autoplay. product-pages §3.2.

· /data-apps and /metrics-catalog (2 routes). · appears on 2 routes · implemented by `src/components/shared/PillTabs.jsx`

**`features.split-content`** — 1280×464 split row: h2 + lead left, 551×320 image right. SHARED §8.

· /context-layer and /beyond-copilots (2 routes). · appears on 2 routes · implemented by `src/components/shared/SplitRow.jsx`

**`features.startups-benefits-grid`** — 2×3 grid of numbered benefits (48px pixel icon, title bar, description); cell 06 holds SOC2/HIPAA badges. company-pages §4.4.

· /startups only. · appears on 1 routes · implemented by `src/pages/Startups.jsx (inline)`

**`features.startups-cards-2x2`** — 2×2 bordered cards with a 360px illustrated placeholder on top and title/description below. company-pages §4.5.

· /startups only. · appears on 1 routes · implemented by `src/pages/Startups.jsx (inline)`

**`features.why-lightdash-split`** — Two 640 columns: "Why Lightdash?" 56px title, three paragraphs and a 256px pixel cluster left; five icon "Reason" blocks with dividers right. company-pages §6.3.

· /partnerships only. · appears on 1 routes · implemented by `src/pages/Partnerships.jsx (inline)`

### CONTENT

_Substantive body content: FAQ, rich text, CMS headers/sidebars, legal text, page-specific editorial blocks._

**`content.blog-posts`** — "From the blog" eyebrow + "Keep building with …" heading + 3 dashed article cards linking to /blogpost/:slug. SHARED §7.9.

· Data-apps, self-improving-analytics and bi-as-code (3 routes). · appears on 3 routes · implemented by `src/components/shared/BlogCards.jsx`

**`content.event-details-card`** — "Event details" card (format / location / date / extra rows with purple icons), not sticky, right of the body. cms-templates §7.2.

· All 4 events. · appears on 4 routes · implemented by `src/pages/Event.jsx > DetailsCard`

**`content.event-header`** — Event header spanning the left 832px: tag pill "Lightdash Leagues", 56px H1, subtitle, dark CTA button (label/href per event). cms-templates §7.1.

· All 4 events. · appears on 4 routes · implemented by `src/pages/Event.jsx (inline)`

**`content.faq`** — Two-column FAQ: "Your questions, answered" + lead + "Talk to our team" left, independent plus/× accordion items right. SHARED §7.8 / company-pages §1.5.

· The T-one product group, bi-as-code, pricing and fintech (10 routes). · appears on 10 routes · implemented by `src/components/shared/Faq.jsx`

**`content.hiring-callout`** — "Join us - we are hiring!" centred title, sub and "See open roles" purple pill → Ashby jobs. company-pages §7.4.

· /about only. · appears on 1 routes · implemented by `src/pages/About.jsx (inline)`

**`content.jp-intro`** — Centred Japanese "Lightdashとは何ですか？" h4 (32px) and a pre-wrapped Inter 18 paragraph/list block. company-pages §10.

· /jp only. · appears on 1 routes · implemented by `src/pages/Jp.jsx (inline)`

**`content.legal-body`** — Legal rich-text column (own style table: black H5/H4 section heads, #36394A body) behind a dashed left rule, optional 40px Separators, and an empty 320px sticky TOC spacer. legal-pages §2.2–3.

· The 4 legal pages. · appears on 4 routes · implemented by `src/components/legal/LegalPage.jsx (children from src/pages/TermsOfService.jsx, PrivacyPolicy.jsx, SubProcessors.jsx, GoogleApisDisclosure.jsx)`

**`content.legal-header`** — Legal header rows: 66px pixel strip, calendar icon + "Last Updated: …" meta row, 24px spacer, H1 title row, 40px spacer, with 8 fixed pixel decorations. legal-pages §2.2, §2.4.

· The 4 legal pages. · appears on 4 routes · implemented by `src/components/legal/LegalPage.jsx`

**`content.not-found`** — 404 body: stripe blocks around the glitching 408×192 "404" pixel art (1.5s steps(23) loop), "Oh zap!", copy and "Go back home". legal-pages §5.

· The not-found route, also served for every unknown URL (1 route). · appears on 1 routes · implemented by `src/pages/NotFound.jsx`

**`content.padel-apply`** — Padel application intro (wrapper max 760, padding 96/24/112, gap 32, no frame hairlines): "LIGHTDASH LEAGUES: Padel" purple 14px uppercase eyebrow, "Apply to play" 56px H1 and a limited-places note. Measured by own recon 2026-10-13 (reference/pages/padel-apply-1440.png, -390.png).

· /padel-apply only. · appears on 1 routes · implemented by `src/pages/PadelApply.jsx (inline)`

**`content.playground-empty-blocks`** — Placeholder blocks that render empty on the live site: a grid-pattern band with an empty white 1152×549 card, three empty "Feature" blocks with lines headers, and an empty gradient block. product-pages §2.11.

· /playground only. · appears on 1 routes · implemented by `src/components/pages/playground/PlaygroundBlocks.jsx > EmptyCardBand, EmptyBlocks`

**`content.post-header`** — Blog post header rows: fixed pixel squares top-right, breadcrumb Blog · Category · Title, 48px H1, author avatar · name · date. cms-templates §3.1.

· All 62 blog posts. · appears on 62 routes · implemented by `src/pages/BlogPost.jsx (inline) + src/components/cms/Breadcrumb.jsx`

**`content.post-toc`** — Sticky 368px "Table of contents" column with scroll-spy buttons (generic sans-serif 14px, 1×16 black active bar) plus a "Related articles" item. Hidden below 1100. cms-templates §3.2.

· All 62 blog posts. · appears on 62 routes · implemented by `src/components/cms/Toc.jsx`

**`content.rich-text`** — Shared Framer RichText body (p 16/30, h2/h3 Britti, blockquote #F8F7FF with purple bar, Fragment Mono code, tables, lite YouTube embeds). Bodies are placeholders. cms-templates §4.

· Blog posts, customer stories and events (78 routes). · appears on 78 routes · implemented by `src/components/cms/PlaceholderBody.jsx + src/components/cms/richtext.css`

**`content.roadmap-board`** — Board grid 4 × 320 (Backlog / Building / Beta / Completed) of icon items; linked items show an arrow and hover #F8F5FF. company-pages §8.1.

· /roadmap only. · appears on 1 routes · implemented by `src/pages/Roadmap.jsx > Column, Item`

**`content.roadmap-community`** — FooterGrid: two 640×295 cards, "Request a feature" (Request → GitHub issue template) and "Join our community" (Join now → Slack). company-pages §8.2.

· /roadmap only. · appears on 1 routes · implemented by `src/pages/Roadmap.jsx > FooterCard`

**`content.statement-heading`** — 326px statement block: centred h2-48 with accent span, dashed bottom. product-pages §2.8.

· /self-improving-analytics only. · appears on 1 routes · implemented by `src/pages/SelfImprovingAnalytics.jsx (inline)`

**`content.story-header`** — Customer story header: breadcrumb Customer stories / Company, 48px H1, "A conversation with" person row, 1152×160 pixel-pattern banner. cms-templates §6.1.

· All 12 customer stories. · appears on 12 routes · implemented by `src/pages/CustomerStory.jsx (inline) + src/components/cms/Breadcrumb.jsx`

**`content.story-sidebar`** — Sticky 320px company card: logo, blurb, Industry / Location / Employees facts. Moves below the inline CTA under 1100. cms-templates §6.2.

· All 12 customer stories. · appears on 12 routes · implemented by `src/pages/CustomerStory.jsx > CompanyCard`

**`content.story-stats-row`** — Row of 2–4 equal stat cells (Britti 32 value + label) directly under the banner. cms-templates §6.2.

· All 12 customer stories. · appears on 12 routes · implemented by `src/pages/CustomerStory.jsx (inline)`

**`content.story-timeline`** — "Our story so far" hourglass icon + year rows (2021–2025) of a two-sided timeline: purple square markers on a dashed centre line, month/milestone text, framed photos/GIFs; rows fade in on scroll (1.2s spring). company-pages §7.3.

· /about only. · appears on 1 routes · implemented by `src/components/pages/about/Timeline.jsx`

**`content.team-grid`** — "Meet the Lightdashians" three-tone title row + 5-column grid of 28 pixel avatars that swap to a hover avatar, with name and role. company-pages §7.2.

· /about only. · appears on 1 routes · implemented by `src/pages/About.jsx > TeamMember`

**`content.two-tone-heading`** — Centred 48px two-tone heading (grey #A4ACB9 lead-in + ink emphasis) with Inter 18 subtitle; the first instance adds a pixel sparkle icon and "Apply to the program" button. company-pages §4.3, §4.5.

· /startups only. · appears on 1 routes · implemented by `src/pages/Startups.jsx (inline)`

**`content.video-section`** — 1280×821 dotted-background block holding a 1080×741 <video> (controls, loop, no autoplay). product-pages §2.7.

· /bi-as-code only. · appears on 1 routes · implemented by `src/components/pages/bi-as-code/VideoSection.jsx`

**`content.youtube-replay`** — "Watch the full build" heading, 970×546 thumbnail with play button swapped for a YouTube iframe on click, and an after-video "Start for free" booking row. product-pages §2.10.

· /beyond-copilots only. · appears on 1 routes · implemented by `src/components/pages/beyond-copilots/Replay.jsx`

### CONVERSION

_Pricing, plan comparison, booking and application forms._

**`conversion.booking-split`** — Two-column booking row: "Ready to start your free trial?" copy, bullet list and "Want to skip the intro?" Sign Up card left; inline Cal.com month-view embed (lightdash/talk) right. company-pages §3.

· /start only. · appears on 1 routes · implemented by `src/pages/Start.jsx > CalInline + src/components/shared/useCalInline.js`

**`conversion.padel-form`** — "Padel Interest Form" card (#F8FAFB, 1px #E5E7EB, radius 16, padding 32, gap 20): Name, Work email and Company inputs, a "Padel skill level" select (4 levels) and a full-width purple "Apply to play" button at opacity .55 until the form is complete. Native Framer form on live (not an embed); the clone is UI-only and sends nothing.

· /padel-apply only. · appears on 1 routes · implemented by `src/pages/PadelApply.jsx (inline <form>)`

**`conversion.partner-form`** — Form Section (#partner-form): dotted background, 1200×988 radius-16 card with bolt icon, two-tone "Ready to become / a Lightdash partner?", 6-field form (4 required), dark Submit and consent footnote. Replaces the snake CTA. company-pages §6.6.

· /partnerships only. · appears on 1 routes · implemented by `src/components/pages/partnerships/PartnerForm.jsx`

**`conversion.plan-cards`** — #F6F8FA well with three 376px plan cards (Open Source / Cloud Pro dark / Enterprise): title row, price, CTA and feature list. company-pages §2.2.

· /pricing only. · appears on 1 routes · implemented by `src/components/pages/pricing/PlanCard.jsx`

**`conversion.plan-comparison`** — "Compare our plans" title + four category tables (Product features, Sources, Support, Security) with 3 plan columns and tooltips. company-pages §2.4.

· /pricing only. · appears on 1 routes · implemented by `src/components/pages/pricing/CompareTable.jsx`

### LISTING

_Collection listings and filters: blog/story grids, directories, related-content rails._

**`listing.blog-card-grid`** — 3/2/1-column grid of variant-A post cards (217px thumb, category · date, 3-line title, author), 9 at a time with a "Load More" button; empty categories render no grid. cms-templates §1.4, §2.3.

· /blog and every category page (12 routes). · appears on 12 routes · implemented by `src/components/cms/BlogListing.jsx + src/components/cms/PostCard.jsx`

**`listing.blog-filter-bar`** — Filter pills (All posts, Building Lightdash, Events, Feature Friday, News, Product) with active #F6F8FA state, plus the right-pinned Search button that opens the site-search modal. cms-templates §2.2.

· /blog and every category page (12 routes). · appears on 12 routes · implemented by `src/components/cms/BlogListing.jsx + src/components/cms/SearchModal.jsx`

**`listing.blog-header`** — Blog header rows: 762×168 pixel art, "Lightning posts" H1 (grey "posts") with title pixels, spacers. Same H1 on every category page. cms-templates §2.1.

· /blog and every category page (12 routes). · appears on 12 routes · implemented by `src/components/cms/BlogListing.jsx`

**`listing.integrations-directory`** — Sticky "Table of contents" category filter (All 21 / Warehouse 10 / …) beside a 3-column grid of 21 integration cards with coloured category tags; filtering is client-side. product-pages §2.9.

· /integrations only. · appears on 1 routes · implemented by `src/components/pages/integrations/IntegrationsDirectory.jsx`

**`listing.related-articles`** — "Related articles" header + "See all posts" button, then the 3 most recent variant-A post cards site-wide. cms-templates §3.3.

· All 62 blog posts. · appears on 62 routes · implemented by `src/components/cms/RelatedHeader.jsx + src/components/cms/PostCard.jsx`

**`listing.related-stories`** — "Related stories" header + "See all posts" button (→ /customer-stories), then 2 variant-B story cards. cms-templates §6.2.

· All 12 customer stories. · appears on 12 routes · implemented by `src/components/cms/RelatedHeader.jsx + src/components/cms/StoryCard.jsx`

**`listing.stories-header`** — "Customer stories" 56px H1 and subtitle rows with spacers. cms-templates §5.

· /customer-stories only. · appears on 1 routes · implemented by `src/pages/CustomerStories.jsx (inline)`

**`listing.story-card-grid`** — 2-column grid of variant-B story cards (#F8FAFB, logo header, corner pixel decor, title, "Read full story" with purple hover). cms-templates §1.5, §5.

· /customer-stories only. · appears on 1 routes · implemented by `src/components/cms/StoryCard.jsx`

### CTA

_Call-to-action bands placed at the end of a page or main column._

**`cta.inline-post`** — In-column dark CTA at the end of the main column (784/832 wide): Britti 24 title, subtitle, white "Talk to our team" + outlined "Start for free", 109×152 pixel art right. cms-templates §1.7.

· Blog posts and customer stories (74 routes). · appears on 74 routes · implemented by `src/components/cms/InlineCta.jsx`

**`cta.snake-band`** — Pre-footer "Ready to free up your data team?" band: 8px dotted #CDD2D9/#F6F8FA background, 1152×326 #1A1B25 card with "Talk to our team" / "Start for free" and the interactive Snake game; breakpoint label swaps at 810 and 390. Below 810 it is the stacked variant on every page that carries it (40px pattern band, text + buttons, 203-tall game stage under a dashed line, 40px pattern band) — decided over the cms-templates §1.6 "clipped" reading. SHARED §9.

· All inner routes that end in the snake CTA except /blog (37 routes). · appears on 37 routes · implemented by `src/components/shared/CtaBand.jsx + src/components/shared/SnakeGame.jsx`

**`cta.snake-band-narrow`** — Narrow variant of the snake CTA: band 968 wide centred (x=236), panel 840, game area ≈310. cms-templates §1.6 exception.

· /blog index only. · appears on 1 routes · implemented by `src/components/shared/CtaBand.jsx (narrow) + src/components/shared/SnakeGame.jsx`

### DECOR

_Purely decorative spacer bands._

**`decor.hatched-band`** — 1280×80 diagonal-hatch spacer band (6SAvm5…png, opacity .6–.8) between sections. SHARED §7.10.

· Embedding, beyond-copilots and startups (3 routes). · appears on 3 routes · implemented by `src/components/shared/HatchedSpacer.jsx`

**`decor.pixel-border-band`** — Full-bleed 1440×60 pixel-art "Graphic Border" band (background image, cover) between the dark band and the FAQ on /fintech. Decorative, aria-hidden. Src/pages/Fintech.jsx block 7.

· Fintech only (1 route). · appears on 1 routes · implemented by `src/pages/Fintech.jsx (inline, block 7 "Graphic Border")`
