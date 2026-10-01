/* Attio Mid-Market Solution Blueprint Console (synthetic demo).
   Loads a synthetic mid-market account, shows a blueprint with cited fit
   chips, pauses at a human gate (demo / onboard / migration / escalate),
   and reports deal and adoption impact. Accounts come from data.json;
   nothing is sent anywhere and no Attio API is called. */

"use strict";

const state = {
  accounts: [],
  currentId: null,
  gates: { demo: false, onboard: false, migrate: false, escalated: false },
  migrationChecked: {} /* accountId -> { itemIndex: true } */
};

let toastTimer = null;

/* ---------- helpers ---------- */

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = String(value);
  return div.innerHTML;
}

function currentAccount() {
  return state.accounts.find((a) => a.id === state.currentId) || null;
}

function migrationDone(acct) {
  const items = acct.migration ? acct.migration.items : [];
  if (!items.length) return false;
  const checked = state.migrationChecked[acct.id] || {};
  return items.every((item, i) => item.covered || checked[i]);
}

function resolveStage(acct) {
  const g = state.gates;
  if (g.escalated) return "escalated";
  if (acct.id === "fixtric") return g.demo ? "demo" : "ready";
  if (acct.id === "corvid") {
    const done = migrationDone(acct);
    if (g.onboard) return "live";
    if (g.migrate) {
      if (!done) return g.demo ? "demo" : "migration";
      return g.demo ? "demo-ready" : "migration-done";
    }
    return g.demo ? "demo" : "ready";
  }
  /* lumenboard: standard Series B path */
  if (g.onboard) return g.demo ? "live" : "onboard";
  return g.demo ? "demo" : "ready";
}

function onboardState(acct) {
  const g = state.gates;
  if (acct.id === "fixtric") {
    return { enabled: false, reason: "Commercial packing sits with the AE. The blueprint stays ready." };
  }
  if (acct.id === "corvid") {
    if (!g.migrate) {
      return { enabled: false, reason: "Open the migration path first: 40,000 rows must be cleaned before onboarding." };
    }
    if (!migrationDone(acct)) {
      return { enabled: false, reason: "Go-live blocked until the migration checklist completes." };
    }
    return { enabled: true, reason: "" };
  }
  if (!g.demo) {
    return { enabled: false, reason: "Run the mock demo first: approval is strongest after a demo." };
  }
  return { enabled: true, reason: "" };
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function announce(message) {
  document.getElementById("live-region").textContent = message;
}

/* ---------- load ---------- */

async function loadAccounts() {
  const response = await fetch("data.json");
  if (!response.ok) {
    throw new Error("Failed to load account data (HTTP " + response.status + ")");
  }
  const payload = await response.json();
  state.accounts = payload.accounts;
}

/* ---------- account grid ---------- */

function renderAccountGrid() {
  const grid = document.getElementById("account-grid");
  grid.textContent = "";

  for (const acct of state.accounts) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "account-tile";
    button.dataset.accountId = acct.id;

    const top = document.createElement("div");
    top.className = "tile-top";

    const avatar = document.createElement("span");
    avatar.className = "avatar";
    avatar.textContent = acct.initials;

    const name = document.createElement("span");
    name.className = "tile-name";
    name.textContent = acct.name;

    const stage = document.createElement("span");
    stage.className = "tile-stage";
    stage.textContent = acct.stage.replace(" · Mid-market", "");

    top.append(avatar, name, stage);

    const motiv = document.createElement("p");
    motiv.className = "tile-motiv";
    motiv.textContent = acct.pain;

    button.append(top, motiv);
    button.addEventListener("click", () => selectAccount(acct.id));
    grid.append(button);
  }
}

function selectAccount(id) {
  state.currentId = id;
  state.gates = { demo: false, onboard: false, migrate: false, escalated: false };

  for (const tile of document.querySelectorAll(".account-tile")) {
    tile.classList.toggle("selected", tile.dataset.accountId === id);
    tile.setAttribute("aria-pressed", String(tile.dataset.accountId === id));
  }

  const consoleEl = document.getElementById("console");
  consoleEl.classList.remove("hidden");
  document.getElementById("migration-block").classList.add("hidden");

  renderStub();
  renderBlueprint();
  renderGates();
  renderMigration();
  renderImpact();
  announce("Account " + state.accounts.find((a) => a.id === id).name + " loaded. Blueprint ready.");
}

/* ---------- stub ---------- */

function renderStub() {
  const acct = currentAccount();
  if (!acct) return;
  const stub = document.getElementById("stub");
  stub.textContent = "";

  const head = document.createElement("div");
  head.className = "stub-head";

  const avatar = document.createElement("span");
  avatar.className = "avatar";
  avatar.textContent = acct.initials;

  const titleWrap = document.createElement("div");
  const title = document.createElement("p");
  title.className = "stub-title";
  title.textContent = acct.name;
  const meta = document.createElement("p");
  meta.className = "stub-meta";
  meta.textContent = acct.stage + " · GTM motion: " + acct.motion;
  titleWrap.append(title, meta);

  head.append(avatar, titleWrap);
  stub.append(head);

  const rows = document.createElement("div");
  rows.className = "stub-rows";

  const painRow = document.createElement("div");
  painRow.className = "stub-row";
  const painH = document.createElement("h3");
  painH.textContent = "Current CRM pain";
  const painP = document.createElement("p");
  painP.textContent = acct.pain;
  painRow.append(painH, painP);

  const infraRow = document.createElement("div");
  infraRow.className = "stub-row";
  const infraH = document.createElement("h3");
  infraH.textContent = "GTM stack";
  const infraP = document.createElement("p");
  infraP.textContent = acct.stack.join(" · ");
  infraRow.append(infraH, infraP);

  const noteRow = document.createElement("div");
  noteRow.className = "stub-row";
  const noteH = document.createElement("h3");
  noteH.textContent = "Source";
  const noteP = document.createElement("p");
  noteP.textContent = "Synthetic discovery notes. No real customer data.";
  noteRow.append(noteH, noteP);

  rows.append(painRow, infraRow, noteRow);
  stub.append(rows);

  const note = document.createElement("p");
  note.className = "stub-note";
  note.textContent = acct.stubNote;
  stub.append(note);
}

/* ---------- blueprint ---------- */

function renderBlueprint() {
  const acct = currentAccount();
  if (!acct) return;
  const container = document.getElementById("blueprint");
  container.textContent = "";
  container.className = "bp-grid";

  for (const section of acct.blueprint) {
    const card = document.createElement("article");
    card.className = "bp-card";

    const h3 = document.createElement("h3");
    h3.textContent = section.title;
    card.append(h3);

    const intro = document.createElement("p");
    intro.className = "bp-intro";
    intro.textContent = section.intro;
    card.append(intro);

    for (const item of section.items) {
      const wrap = document.createElement("div");
      wrap.className = "bp-item";

      const label = document.createElement("p");
      label.className = "bp-item-label";
      label.textContent = item.label;
      wrap.append(label);

      const detail = document.createElement("p");
      detail.className = "bp-item-detail";
      detail.textContent = item.detail;
      wrap.append(detail);

      const cites = document.createElement("div");
      cites.className = "chip-row";
      for (const cite of item.cites) {
        const chip = document.createElement("span");
        chip.className = "cite-chip";
        chip.textContent = cite;
        cites.append(chip);
      }
      wrap.append(cites);
      card.append(wrap);
    }
    container.append(card);
  }
}

/* ---------- gates ---------- */

function renderGates() {
  const acct = currentAccount();
  if (!acct) return;
  const host = document.getElementById("gates");
  host.textContent = "";

  const g = state.gates;
  const onboard = onboardState(acct);
  const demoDone = g.demo;

  const defs = [
    {
      id: "demo",
      label: "Run mock demo path",
      detail: "Deliver the demo on the prospect stack before anything moves.",
      className: demoDone ? "gate-strong" : "gate-primary",
      disabled: g.demo,
      mark: g.demo ? "Done" : ""
    },
    {
      id: "onboard",
      label: "Approve onboarding plan",
      detail: "Authorize the SE-owned plan: objects, workflows, cutover.",
      className: demoDone && !g.onboard && !g.escalated ? "gate-primary" : "gate-strong",
      disabled: g.onboard || g.escalated || !onboard.enabled,
      mark: g.onboard ? "Approved" : ""
    },
    {
      id: "migrate",
      label: "Need migration help",
      detail: "Open the migration checklist when historical data is risky.",
      className: "gate-ghost",
      disabled: g.migrate || g.escalated,
      mark: g.migrate ? "Checklist open" : ""
    },
    {
      id: "escalate",
      label: "Escalate to AE for commercial",
      detail: "Hand commercial packing to the AE. Blueprint stays ready.",
      className: "escalate",
      disabled: g.escalated,
      mark: g.escalated ? "Sent to AE" : ""
    }
  ];

  for (const def of defs) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "gate " + def.className;
    button.disabled = def.disabled;
    button.dataset.gate = def.id;
    if (def.mark || !def.disabled) button.setAttribute("aria-pressed", String(def.mark !== ""));

    const text = document.createElement("span");
    text.className = "gate-text";
    const label = document.createElement("span");
    label.className = "gate-label";
    label.textContent = def.label;
    const detail = document.createElement("span");
    detail.className = "gate-detail";
    detail.textContent = def.detail;
    text.append(label, detail);

    button.append(text);

    if (def.mark) {
      const mark = document.createElement("span");
      mark.className = "gate-mark";
      mark.textContent = "✓ " + def.mark;
      button.append(mark);
    } else {
      const arrow = document.createElement("span");
      arrow.className = "gate-arrow";
      arrow.textContent = "→";
      button.append(arrow);
    }

    button.addEventListener("click", () => handleGate(def.id));
    host.append(button);

    if (def.disabled && !g[def.id] && def.id === "onboard" && onboard.reason) {
      const reason = document.createElement("div");
      reason.className = "gate-reason";
      const note = document.createElement("span");
      note.textContent = "Why: " + onboard.reason;
      reason.append(note);
      host.append(reason);
    }
  }
}

/* ---------- migration ---------- */

function renderMigration() {
  const acct = currentAccount();
  const host = document.getElementById("migration");
  host.textContent = "";
  if (!acct || !acct.migration) return;

  const summary = document.createElement("p");
  summary.className = "migration-summary";
  summary.textContent = acct.migration.summary;
  host.append(summary);

  const checked = state.migrationChecked[acct.id] || {};

  acct.migration.items.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "mig-item";

    const box = document.createElement("input");
    box.type = "checkbox";
    box.className = "mig-check";
    box.checked = item.covered || Boolean(checked[index]);
    box.disabled = item.covered || acct.id !== "corvid" || state.gates.escalated;
    box.setAttribute("aria-label", item.label);

    const body = document.createElement("div");
    body.className = "mig-body";
    const label = document.createElement("p");
    label.className = "mig-label" + (box.checked ? " done" : "");
    label.textContent = item.label;
    const detail = document.createElement("p");
    detail.className = "mig-detail";
    detail.textContent = item.detail;
    body.append(label, detail);

    const remapLabel = () => {
      label.classList.toggle("done", box.checked);
    };

    box.addEventListener("change", () => {
      if (!state.migrationChecked[acct.id]) state.migrationChecked[acct.id] = {};
      state.migrationChecked[acct.id][index] = box.checked;
      remapLabel();
      const done = migrationDone(acct);
      const pct = Math.round(
        (acct.migration.items.filter((it, i) => it.covered || state.migrationChecked[acct.id][i]).length /
          acct.migration.items.length) *
          100
      );
      bar.style.width = pct + "%";
      pctLabel.textContent = pct + "% complete";
      renderGates();
      renderImpact();
      if (done) {
        announce("Migration checklist complete. Go-live unblocked.");
        showToast("Checklist complete. Go-live is unblocked.");
      }
        });

    row.append(box, body);
    host.append(row);
  });

  const bar = document.createElement("div");
  bar.className = "mig-progress";
  const fill = document.createElement("span");
  const doneCount = acct.migration.items.filter(
    (item, i) => item.covered || checked[i] || (state.migrationChecked[acct.id] || {})[i]
  ).length;
  const pct = Math.round((doneCount / acct.migration.items.length) * 100);
  fill.style.width = pct + "%";
  bar.append(fill);
  host.append(bar);

  const pctLabel = document.createElement("span");
  pctLabel.className = "mig-pct";
  pctLabel.textContent = pct + "% complete";
  host.append(pctLabel);
}

/* ---------- impact ---------- */

function renderImpact() {
  const acct = currentAccount();
  if (!acct) return;
  const stage = resolveStage(acct);
  const data = acct.impact.stages[stage];
  const host = document.getElementById("impact");
  host.textContent = "";

  const head = document.createElement("div");
  head.className = "impact-head";
  const statusLabel = document.createElement("span");
  statusLabel.className = "impact-status-label";
  statusLabel.textContent = "Account status";
  const chip = document.createElement("span");
  chip.className = "chip " + data.chip;
  chip.textContent = data.label;
  head.append(statusLabel, chip);
  host.append(head);

  const stats = document.createElement("div");
  stats.className = "impact-stats";

  const makeStat = (label, value, extraClass) => {
    const stat = document.createElement("div");
    stat.className = "impact-stat";
    const l = document.createElement("span");
    l.className = "impact-stat-label";
    l.textContent = label;
    const v = document.createElement("span");
    v.className = "impact-stat-value" + (extraClass ? " " + extraClass : "");
    v.textContent = value;
    stat.append(l, v);
    return stat;
  };

  stats.append(
    makeStat("Time to live", data.ttl, data.ttl === "Blocked" ? "blocked" : ""),
    makeStat("Workflows on", data.flows, data.flows === "3 of 3" ? "good" : ""),
    makeStat("SE confidence", data.conf, "")
  );
  host.append(stats);

  const line = document.createElement("p");
  line.className = "impact-line" +
    (stage === "live" ? " ok" : (stage === "migration" || stage === "ready" && data.ttl === "Blocked" ? " warn" : ""));
  line.textContent = data.line;
  host.append(line);
}

/* ---------- gate actions ---------- */

function handleGate(gateId) {
  const acct = currentAccount();
  if (!acct) return;
  const g = state.gates;

  if (gateId === "demo") {
    g.demo = true;
    showToast("Mock demo path is on. Impact updated below.");
    announce("Mock demo path on. Impact updated.");
  } else if (gateId === "onboard") {
    const onboard = onboardState(acct);
    if (!onboard.enabled) return;
    g.onboard = true;
    const liveNow = resolveStage(acct) === "live";
    showToast(liveNow ? acct.name + " is Live. Time to live improved." : "Onboarding plan approved.");
    announce(liveNow ? acct.name + " is Live." : "Onboarding approved.");
  } else if (gateId === "migrate") {
    g.migrate = true;
    document.getElementById("migration-block").classList.remove("hidden");
    showToast("Migration checklist opened. Go-live stays blocked until it completes.");
    announce("Migration checklist opened.");
  } else if (gateId === "escalate") {
    g.escalated = true;
    showToast("Escalated to AE. Commercial packet locked; blueprint stays ready.");
    announce("Escalated to AE.");
  }

  renderGates();
  renderMigration();
  renderImpact();

  const target = gateId === "migrate" && g.migrate
    ? document.getElementById("migration-block")
    : document.getElementById("impact");
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------- reset ---------- */

function resetDemo() {
  state.currentId = null;
  state.gates = { demo: false, onboard: false, migrate: false, escalated: false };
  state.migrationChecked = {};

  for (const tile of document.querySelectorAll(".account-tile")) {
    tile.classList.remove("selected");
    tile.setAttribute("aria-pressed", "false");
  }

  document.getElementById("console").classList.add("hidden");
  document.getElementById("migration-block").classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
  showToast("Demo reset. Pick an account to start.");
  announce("Demo reset.");
}

/* ---------- boot ---------- */

async function boot() {
  try {
    await loadAccounts();
    renderAccountGrid();
  } catch (error) {
    const grid = document.getElementById("account-grid");
    grid.textContent = "Could not load demo data: " + error.message;
  }
}

document.getElementById("reset").addEventListener("click", resetDemo);
boot();