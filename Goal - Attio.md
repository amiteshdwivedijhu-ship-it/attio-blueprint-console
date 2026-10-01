# GOAL.md - Attio (2-hour build)


## Standing rules (keep in every GOAL.md)

### Prototype, not demo-as-deliverable
Build a working prototype Ami can walk through in 90 seconds. The deliverable is the prototype. The 90-second demo is only how Ami presents that prototype. Do not treat a demo as the thing you ship.

### UI observation (mandatory)
Public sources only: website screenshots, demo videos (with timestamps), product tours, docs, help center, app-store screenshots, changelog images. Never sign up, create accounts, or log in.

Every GOAL.md must include `## Their UI` before Acceptance criteria, with subsections in this order:
1. Sources
2. Layout
3. Visual style
4. Tone of UI copy
5. The exact screen where my proposed improvement would live
6. Build instruction (match their visual style and terminology so the prototype looks like a feature inside their product)

Be honest: if only marketing illustrations are visible, say "marketing UI only" and infer carefully. If no UI is publicly visible, say so, describe what can be inferred from docs, and default to a clean neutral style.

Writing: simple English. No em dashes or en dashes.

### Phone / mobile UX (mandatory for the prototype)
- Include a proper viewport meta tag so the layout respects phone width.
- Design mobile-first for about 375px width (stack everything vertically).
- No horizontal scroll at phone width.
- Touch-friendly primary actions (about 44px min height / tap target).
- Readable type on a phone (comfortable body size, clear hierarchy).
- No overlays, sticky bars, or modal chrome that clips content or blocks CTAs.
- Good mobile UX overall: one-column flow, large CTAs, thumb-reachable primary actions.

## Role this GOAL targets
- **Open role (LOCKED):** Solutions Engineer [Pre and Post-Sales] - Mid-Market
- JD: https://jobs.ashbyhq.com/attio/eef50b66-c092-4018-bff5-08b81889a4f4
- Alternate location listing (NY): https://jobs.ashbyhq.com/attio/d48617ff-be9b-41cd-aff7-3ad2f826ca74
- Careers pages: https://attio.com/careers/solutions-engineer-pre-and-post-sales-mid-market-san-francisco-hybrid and NYC hybrid twin
- Location: San Francisco hybrid (this Goal locks SF Ashby ID above). NY hybrid also open.
- Comp (public): OTE $160K to $200K + equity (+ commission; SF careers notes 70/30 split)
- Core job (from JD): Main technical point of contact for highest-value mid-market customers across pre-sales and post-sales. Architect solutions across Attio data model, no-code workflow builder, API, reporting, GTM integrations. Lead demos/trainings. RevOps/GTM-tech consulting. Partner with AEs to close. Own post-sale onboarding. Relationship owner for top accounts. Internal voice of customer to Product/Eng/Marketing.
- Bar notes: 2+ years B2B SaaS technical customer relationships pre or post sale. Architect SaaS deployments; APIs, no-code, data models. GTM tech ecosystem fluency. Startup pace; hybrid sales+onboarding+success.
- Hiring process (JD): Talent screen → Head of CS → technical case → stakeholder interviews + mock demo → exec close → offer.
- Sponsorship: JD silent on visa. Confirm early. Do not treat silence as a yes or a no.

## Company brief (8th-grade English)
Attio is the CRM for agentic revenue. Ambitious GTM teams model customers, automate workflows, and run agents on live context (email, calls, product, billing). Public claims include large MCP/API scale numbers on marketing, 30,000+ customers, and $116M raised from GV, Redpoint, Balderton, Point Nine, 01A (JD). Product surfaces: data model, workflows, API, reporting, agents/automations, ecosystem. Public product: attio.com.

## /goal
Build a working **Mid-Market Solution Blueprint Console** for Attio Solutions Engineer: load a synthetic mid-market prospect or onboard (GTM motion, current CRM pain, stack: Slack/email/billing), show an Attio solution blueprint (objects/data model, workflows, API/MCP hooks, reporting, migration checklist) with cited fit chips, let Ami choose a human gate (Run mock demo path / Approve onboarding plan / Need migration help / Escalate to AE for commercial), then show deal / adoption impact (time-to-live, workflows on, SE confidence). Prove Ami can productize pre+post technical solutioning for mid-market, not a generic CRM kanban. Ami must walk through this prototype in 90 seconds.

**Hard product rule:** Do NOT center the hero on a Rubric Lens strip, pass/fail spreadsheet, or graded eval table. Thin fit chips are OK as secondary UI only. The hero is customer stub → solution blueprint → human gate → deal/adoption impact.

## Live demo
- Status: Live
- Link: https://amiteshdwivedijhu-ship-it.github.io/attio-blueprint-console/
- What it is: Attio-styled Mid-Market Solution Blueprint Console (customer GTM stub → data model + workflows + migration packet → Demo / Onboard / Need migration / Escalate to AE → impact)

## Scope (fits 2 hours)
- Synthetic inputs only (no real Attio workspace, never sign in, never create account, never call Attio API).
- 1 primary path: synthetic Series B SaaS leaving spreadsheets → blueprint maps Companies/People/Deals + workflow + email sync → Ami taps Run mock demo path then Approve onboarding plan → status Live, time-to-live improves.
- Optional second path: messy historical deals → Need migration help with checklist.
- Optional third path: commercial packing → Escalate to AE; keep technical blueprint ready.
- Console must show: customer stub, blueprint chips, gates (~44px), one-line impact.
- Out of scope: live Attio API, real migrations, signed-in CRM, Rubric Lens hero, full forecasting BI, outreach.

## Reuse first
- Reuse citation + human gate craft from https://amiteshdwivedijhu-ship-it.github.io/ mapped to Run mock demo path / Approve onboarding plan / Need migration help / Escalate to AE for commercial.
- Do NOT force Rubric Lens. Do not pitch Ellipsis as an Attio customer.
- Vocabulary to prefer: Attio, CRM for agentic revenue, data model, workflow builder, API, MCP, reporting, RevOps, GTM, onboarding, migration checklist, mock demo, mid-market. Avoid: scorecard-as-hero, Rubric Lens, Salesforce-clone chrome that fights Attio craft.

## Their UI

**Honesty note:** Public sources = attio.com marketing (pipeline, agents, Universal Context, SDK/API/MCP). Sign in exists; never use. No public SE blueprint console observed. Prototype is **inferred SE pre/post solutioning surface**. Say when inferred.

### Sources
- Homepage: https://attio.com/
- SF SE JD: https://jobs.ashbyhq.com/attio/eef50b66-c092-4018-bff5-08b81889a4f4
- Careers SE SF: https://attio.com/careers/solutions-engineer-pre-and-post-sales-mid-market-san-francisco-hybrid

### Layout
- Marketing: dark/light product cinema, deal lists, agent chat in Slack, workflow blocks.
- Inferred prototype: top = account stub; center = solution blueprint; bottom = gates + impact.

### Visual style
- Colors: Attio marketing uses refined dark charcoal with violet / blue accents and crisp white typography. Prefer dark polished console with violet primary CTA.
- Typography: high-craft sans.
- Density: medium. Blueprint sections, not a dense Salesforce setup wizard.
- Mode: dark.

### Tone of UI copy
- SE + RevOps: data model, workflow, API, MCP, migration checklist, onboarding plan, mock demo.
- Sharp, ambitious, helpful. Match "CRM for agentic revenue" without hype spam.

### The exact screen where my proposed improvement would live
- An inferred **SE solution blueprint** screen used in pre-sales technical wins and post-sales onboarding for mid-market accounts: after discovery, before go-live. Matches JD architect + demo + onboard ownership.

### Build instruction
- Match Attio: dark craft UI, violet accents, object/workflow chips, large Demo / Onboard / Need migration / Escalate CTAs.
- Phone UX mandatory.
- Rejected: Rubric Lens hero; generic HubSpot clone.

## Acceptance criteria (must work when Ami demos the prototype in 90 seconds)
1. Load synthetic mid-market account → show GTM stub and at least 3 blueprint chips (data model object, workflow, API/MCP or migration item).
2. Human gate: Run mock demo path, Approve onboarding plan, Need migration help, or Escalate to AE. CTAs ~44px.
3. Demo/onboard path updates status toward Live and shows impact improving.
4. Optional migration path lists checklist items and keeps go-live blocked with a clear reason.
5. Hero is Solution Blueprint Console, not Rubric Lens.
6. Phone-width UX mandatory.
7. ~90 second walkthrough.

## What the 90-second walkthrough proves about THEIR problem
Attio sells a flexible CRM for agentic GTM teams and needs mid-market SEs who can win technically and land customers into durable configurations (https://attio.com/ ; JD). This prototype shows Ami can ship the blueprint surface that turns discovery into a demoable architecture, an onboarding gate, and time-to-live impact.

## TIMEBOX
If not ready at 2 hours: LIGHT pitch = citation + gate craft + 2 mapping lines to Mid-Market SE and Solution Blueprint Console. No Rubric Lens.
