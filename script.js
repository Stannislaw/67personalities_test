const AXES = DB.axes;

const PERSONALITIES = Object.fromEntries(
  DB.personalities.map(p => [p.id, p])
);

const QUESTIONS = DB.questions.map(q => ({
  ...q,
  options: DB.answers
    .filter(a => a.questionId === q.id)
    .map(a => ({ text: a.text, pole: a.pole }))
}));

const FIXED_QUESTIONS = QUESTIONS.filter(q => q.fixed);
const RANDOM_QUESTIONS = QUESTIONS.filter(q => !q.fixed);

const MIN_QUESTIONS = 6;
const MAX_QUESTIONS = QUESTIONS.length;
const DEFAULT_QUESTIONS = 30;

const SLIDER_COMMENTS = [
  [0, "Only basic test"],
  [10, "Fair enough"],
  [20, "Getting serious"],
  [30, "Now we're cooking"],
  [40, "Touching grass is optional now"],
  [50, "Deep brainrot dive"],
  [Infinity, "Brainrot singularity. Nobody is coming back."]
];

const TYPES = DB.personalities.filter(p =>
  p.id.length === AXES.length &&
  [...p.id].every((c, i) => c === AXES[i].a.code || c === AXES[i].b.code)
);

const VIEWS = ["home", "test", "types", "compare", "history", "contact"];
const VIEW_TITLES = {
  home: "Home",
  test: "Take the test",
  types: "Types",
  compare: "Compare",
  history: "My results",
  contact: "Contact"
};

const STORAGE_KEYS = {
  theme: "67p.theme",
  history: "67p.history",
  messages: "67p.messages"
};

const HISTORY_LIMIT = 20;

const MATCH_VERDICTS = [
  [6, "Soulmates. Or the same person in two hoodies."],
  [5, "Almost twins. Only one of you will pick the playlist."],
  [4, "Strong bond. Occasional fights about pineapple."],
  [3, "Mixed signals. Workable with enough snacks."],
  [2, "Turbulent. Group chats will suffer."],
  [1, "Opposites attract, sometimes."],
  [0, "Mortal enemies, respectfully."]
];

const $ = id => document.getElementById(id);

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function store(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

let selected = [];
let current = 0;
let votes = {};
let lastResult = load(STORAGE_KEYS.history, [])[0] || null;

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function toast(message) {
  const t = $("toast");
  t.textContent = message;
  t.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove("show"), 2400);
}

function route() {
  const hash = location.hash.slice(1);
  const view = VIEWS.includes(hash) ? hash : "home";
  document.querySelectorAll(".view").forEach(v => {
    v.classList.toggle("hidden", v.dataset.view !== view);
  });
  document.querySelectorAll(".nav-link").forEach(a => {
    a.classList.toggle("active", a.dataset.route === view);
  });
  $("nav").classList.remove("open");
  $("menu-btn").setAttribute("aria-expanded", "false");
  document.title = `${VIEW_TITLES[view]} · 67 Personalities`;
  if (view === "types") renderTypes();
  if (view === "compare") renderCompare();
  if (view === "history") renderHistory();
  window.scrollTo(0, 0);
}

function applyTheme(dark) {
  document.documentElement.classList.toggle("dark", dark);
}

function commentFor(count) {
  return SLIDER_COMMENTS.find(([limit]) => count <= limit)[1];
}

function updateSlider() {
  const count = Number($("question-slider").value);
  $("slider-value").textContent = count;
  $("slider-comment").textContent = commentFor(count);
}

function showTestPanel(panel) {
  ["test-start", "quiz", "result"].forEach(id => {
    $(id).classList.toggle("hidden", $(id) !== panel);
  });
}

function startTest() {
  const count = Number($("question-slider").value);
  const randomCount = Math.max(0, count - FIXED_QUESTIONS.length);
  const randomPick = shuffle(RANDOM_QUESTIONS).slice(0, randomCount);
  selected = [...FIXED_QUESTIONS, ...randomPick].map(q => ({ ...q, options: shuffle(q.options) }));
  current = 0;
  votes = {};
  AXES.forEach(axis => {
    votes[axis.a.code] = 0;
    votes[axis.b.code] = 0;
  });
  showTestPanel($("quiz"));
  renderQuestion();
}

function renderQuestion() {
  const q = selected[current];
  $("progress-bar").style.width = `${(current / selected.length) * 100}%`;
  $("progress-text").textContent = `Question ${current + 1} of ${selected.length}`;
  $("question-text").textContent = `${q.emoji} ${current + 1}. ${q.text}`;
  const optionsEl = $("options");
  optionsEl.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = el("button", "option-btn", `${String.fromCharCode(65 + i)}) ${opt.text}`);
    btn.type = "button";
    btn.addEventListener("click", () => answer(opt.pole));
    optionsEl.appendChild(btn);
  });
}

function answer(pole) {
  votes[pole]++;
  current++;
  if (current < selected.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function renderProfile(container, profile) {
  container.innerHTML = "";
  if (!profile) return;

  const section = (title, node) => container.append(el("h4", null, title), node);
  const list = items => {
    const ul = el("ul");
    items.forEach(text => ul.appendChild(el("li", null, text)));
    return ul;
  };

  profile.overview.forEach(text => container.appendChild(el("p", "profile-text", text)));
  section("Strengths", list(profile.strengths));
  section("Weaknesses", list(profile.weaknesses));
  section("Similar to", el("p", null, profile.similarTo));
  section("In relationships", el("p", null, profile.inRelationships));
  section("At work", el("p", null, profile.atWork));
  section("Growth", el("p", null, profile.growth));
}

function openType(p) {
  const body = $("dialog-body");
  body.innerHTML = "";
  body.append(
    el("p", "result-label", "Personality type"),
    el("p", "result-emoji", p.emoji),
    el("h2", "card-title", p.name),
    el("p", "type-code", p.id),
    el("p", "lead-text", p.description)
  );

  const profile = el("div", "profile");
  body.appendChild(profile);
  renderProfile(profile, p.profile);

  if (TYPES.includes(p)) {
    const compareBtn = el("button", "btn btn-secondary", "Compare with another type");
    compareBtn.type = "button";
    compareBtn.addEventListener("click", () => {
      $("type-dialog").close();
      $("cmp-a").value = p.id;
      location.hash = "#compare";
      renderCompare();
    });
    body.appendChild(compareBtn);
  }

  $("type-dialog").showModal();
}

function typeCard(p) {
  const card = el("button", "type-card");
  card.type = "button";
  card.append(
    el("span", "type-emoji", p.emoji),
    el("span", "type-name", p.name),
    el("span", "type-code", p.id),
    el("span", "type-desc", p.description)
  );
  card.addEventListener("click", () => openType(p));
  return card;
}

function renderTypes() {
  const query = $("type-search").value.trim().toLowerCase();
  const sort = $("type-sort").value;
  const list = DB.personalities
    .filter(p => !query || [p.name, p.id, p.description].join(" ").toLowerCase().includes(query))
    .sort((a, b) => sort === "code" ? a.id.localeCompare(b.id) : a.name.localeCompare(b.name));

  $("types-count").textContent = `${list.length} of ${DB.personalities.length} types`;
  const grid = $("browse-list");
  grid.innerHTML = "";
  if (!list.length) {
    grid.appendChild(el("p", "empty", "No type matches that search. Try \"sigma\" or \"rizz\"."));
    return;
  }
  list.forEach(p => grid.appendChild(typeCard(p)));
}

function typeOption(p) {
  const option = el("option", null, `${p.emoji} ${p.name} (${p.id})`);
  option.value = p.id;
  return option;
}

function setupCompare() {
  const a = $("cmp-a");
  const b = $("cmp-b");
  TYPES.forEach(p => {
    a.appendChild(typeOption(p));
    b.appendChild(typeOption(p));
  });
  a.value = lastResult ? lastResult.code : TYPES[0].id;
  b.value = TYPES[1].id;
  a.addEventListener("change", renderCompare);
  b.addEventListener("change", renderCompare);
}

function personBlock(p) {
  const block = el("div", "cmp-person");
  block.append(el("span", "emoji", p.emoji), el("span", "name", p.name), el("span", "code", p.id));
  return block;
}

function renderCompare() {
  const a = PERSONALITIES[$("cmp-a").value];
  const b = PERSONALITIES[$("cmp-b").value];
  const same = [...a.id].map((code, i) => code === b.id[i]);
  const shared = same.filter(Boolean).length;
  const pct = Math.round((shared / AXES.length) * 100);
  const verdict = MATCH_VERDICTS.find(([n]) => shared >= n)[1];

  const score = el("div", "cmp-score");
  score.append(el("b", null, `${pct}%`), el("span", null, "compatibility"));

  const head = el("div", "cmp-head");
  head.append(personBlock(a), score, personBlock(b));

  const rows = el("div", "cmp-rows");
  AXES.forEach((axis, i) => {
    const name = pole => (axis.a.code === pole ? axis.a.name : axis.b.name);
    const row = el("div", `cmp-row ${same[i] ? "match" : "clash"}`);
    row.append(
      el("span", "cmp-tag", same[i] ? "Shared" : "Clash"),
      el("span", null, same[i]
        ? name(a.id[i])
        : `${name(a.id[i])} vs ${name(b.id[i])}`)
    );
    rows.appendChild(row);
  });

  const output = $("cmp-output");
  output.innerHTML = "";
  output.append(head, el("p", "cmp-verdict", verdict), rows);
}

function saveResult(entry) {
  const list = [entry, ...load(STORAGE_KEYS.history, [])].slice(0, HISTORY_LIMIT);
  store(STORAGE_KEYS.history, list);
  lastResult = entry;
}

function renderHistory() {
  const items = load(STORAGE_KEYS.history, []);
  const list = $("history-list");
  list.innerHTML = "";
  if (!items.length) {
    list.appendChild(el("p", "empty", "No results yet. Take the test and your profiles will appear here."));
    return;
  }

  items.forEach((r, index) => {
    const row = el("div", "history-item");
    const info = el("div", "history-info");
    info.append(
      el("b", null, `${r.emoji} ${r.name}`),
      el("span", null, `${r.code} · ${new Date(r.date).toLocaleString()} · ${r.questions} questions`)
    );

    const actions = el("div", "history-actions");
    const view = el("button", "btn btn-secondary btn-small", "Open");
    view.type = "button";
    view.addEventListener("click", () => {
      if (PERSONALITIES[r.code]) openType(PERSONALITIES[r.code]);
    });
    const remove = el("button", "btn btn-secondary btn-small", "Delete");
    remove.type = "button";
    remove.addEventListener("click", () => {
      const updated = load(STORAGE_KEYS.history, []);
      updated.splice(index, 1);
      store(STORAGE_KEYS.history, updated);
      renderHistory();
    });
    actions.append(view, remove);

    row.append(el("span", "history-emoji", r.emoji), info, actions);
    list.appendChild(row);
  });
}

function certificateId() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 8 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
}

function showResult() {
  $("progress-bar").style.width = "100%";

  const axisResults = AXES.map(axis => {
    const total = votes[axis.a.code] + votes[axis.b.code];
    const aPct = total === 0 ? 50 : Math.round((votes[axis.a.code] / total) * 100);
    const bPct = 100 - aPct;
    const winner = aPct !== bPct
      ? (aPct > bPct ? axis.a.code : axis.b.code)
      : (Math.random() < 0.5 ? axis.a.code : axis.b.code);
    return { axis, aPct, bPct, winner };
  });

  const code = axisResults.map(r => r.winner).join("");
  const winner = PERSONALITIES[code];

  const share = {};
  axisResults.forEach(r => {
    share[r.axis.a.code] = r.aPct;
    share[r.axis.b.code] = r.bPct;
  });

  const ranked = DB.personalities
    .map((p, index) => ({
      p,
      index,
      match: [...p.id].reduce((sum, pole) => sum + share[pole], 0) / AXES.length
    }))
    .sort((a, b) => b.match - a.match || a.index - b.index);

  saveResult({
    code,
    name: winner.name,
    emoji: winner.emoji,
    date: new Date().toISOString(),
    questions: selected.length,
    certId: certificateId()
  });

  $("result-name").textContent = winner.name;
  $("result-emoji").textContent = winner.emoji;
  $("result-code").textContent = code;
  $("result-desc").textContent = winner.description;
  renderProfile($("result-profile"), winner.profile);

  const axesEl = $("result-axes");
  axesEl.innerHTML = "";
  axisResults.forEach(({ axis, aPct, bPct }) => {
    const row = el("div", "axis");
    row.innerHTML = `
      <div class="axis-labels">
        <span><b>${axis.a.code}</b> ${axis.a.name} ${aPct}%</span>
        <span>${bPct}% ${axis.b.name} <b>${axis.b.code}</b></span>
      </div>
      <div class="axis-bar"><div class="axis-fill" style="width: ${aPct}%"></div></div>`;
    axesEl.appendChild(row);
  });

  const runners = $("result-runners");
  runners.innerHTML = "";
  ranked.slice(1, 4).forEach(r => {
    runners.appendChild(el("li", null, `${r.p.emoji} ${r.p.name} (${Math.round(r.match)}% match)`));
  });

  showTestPanel($("result"));
}

function renderDaily() {
  const day = Math.floor(Date.now() / 86400000);
  const p = TYPES[day % TYPES.length];
  $("daily-emoji").textContent = p.emoji;
  $("daily-name").textContent = p.name;
  $("daily-code").textContent = p.id;
  $("daily-desc").textContent = p.description;
  $("daily-btn").addEventListener("click", () => openType(p));
}

function setupStats() {
  $("stat-types").textContent = DB.personalities.length;
  $("stat-questions").textContent = QUESTIONS.length;
}

$("menu-btn").addEventListener("click", () => {
  const open = $("nav").classList.toggle("open");
  $("menu-btn").setAttribute("aria-expanded", String(open));
});

$("theme-btn").addEventListener("click", () => {
  const dark = !document.documentElement.classList.contains("dark");
  applyTheme(dark);
  store(STORAGE_KEYS.theme, dark);
});

$("start-btn").addEventListener("click", startTest);
$("quit-btn").addEventListener("click", () => showTestPanel($("test-start")));
$("restart-btn").addEventListener("click", () => showTestPanel($("test-start")));
$("question-slider").addEventListener("input", updateSlider);

$("share-btn").addEventListener("click", async () => {
  if (!lastResult) return;
  const url = location.href.split("#")[0];
  const text = `My 67 Personalities result: ${lastResult.emoji} ${lastResult.name} (${lastResult.code}). Find yours at ${url}`;
  if (navigator.share) {
    try {
      await navigator.share({ title: "67 Personalities", text });
      return;
    } catch (e) {
      if (e.name === "AbortError") return;
    }
  }
  try {
    await navigator.clipboard.writeText(text);
    toast("Result copied to clipboard");
  } catch (e) {
    toast("Could not copy. Your browser blocked clipboard access.");
  }
});

$("certificate-btn").addEventListener("click", () => {
  if (!lastResult) return;
  $("cert-emoji").textContent = lastResult.emoji;
  $("cert-name").textContent = lastResult.name;
  $("cert-code").textContent = lastResult.code;
  $("cert-meta").textContent = `Assessed ${new Date(lastResult.date).toLocaleDateString()} · ${lastResult.questions} questions · Certificate ID ${lastResult.certId}`;
  window.print();
});

$("type-search").addEventListener("input", renderTypes);
$("type-sort").addEventListener("change", renderTypes);
$("dialog-close").addEventListener("click", () => $("type-dialog").close());

$("clear-history-btn").addEventListener("click", () => {
  if (!confirm("Delete all saved results from this browser?")) return;
  store(STORAGE_KEYS.history, []);
  lastResult = null;
  renderHistory();
  toast("History cleared");
});

$("contact-form").addEventListener("submit", e => {
  e.preventDefault();
  const form = e.currentTarget;
  if (!form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form));
  const ticket = `67-${Math.floor(10000 + Math.random() * 90000)}`;
  const messages = load(STORAGE_KEYS.messages, []);
  messages.push({ ticket, ...data, sent: new Date().toISOString() });
  store(STORAGE_KEYS.messages, messages);
  form.reset();
  const notice = $("contact-success");
  notice.textContent = `Thanks, ${data.name}! Your ticket is ${ticket}. We will reply within 67 hours (usually faster).`;
  notice.classList.remove("hidden");
});

window.addEventListener("hashchange", route);

applyTheme(load(STORAGE_KEYS.theme, false));
setupStats();
setupSlider();
renderDaily();
setupCompare();
updateSlider();
route();

function setupSlider() {
  $("question-slider").min = MIN_QUESTIONS;
  $("question-slider").max = MAX_QUESTIONS;
  $("question-slider").value = DEFAULT_QUESTIONS;
}
