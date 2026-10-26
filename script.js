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

const introEl = document.getElementById("intro");
const browseEl = document.getElementById("browse");
const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const questionText = document.getElementById("question-text");
const optionsEl = document.getElementById("options");
const sliderEl = document.getElementById("question-slider");
const sliderValueEl = document.getElementById("slider-value");
const sliderCommentEl = document.getElementById("slider-comment");

let selected = [];
let current = 0;
let votes = {};

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function show(section) {
  [introEl, browseEl, quizEl, resultEl].forEach(el => el.classList.add("hidden"));
  section.classList.remove("hidden");
}

function commentFor(count) {
  return SLIDER_COMMENTS.find(([limit]) => count <= limit)[1];
}

function updateSlider() {
  const count = Number(sliderEl.value);
  sliderValueEl.textContent = count;
  sliderCommentEl.textContent = commentFor(count);
}

function setupSlider() {
  sliderEl.min = MIN_QUESTIONS;
  sliderEl.max = MAX_QUESTIONS;
  sliderEl.value = DEFAULT_QUESTIONS;
  updateSlider();
}

function startTest() {
  const count = Number(sliderEl.value);
  const randomCount = Math.max(0, count - FIXED_QUESTIONS.length);
  const randomPick = shuffle(RANDOM_QUESTIONS).slice(0, randomCount);
  selected = [...FIXED_QUESTIONS, ...randomPick].map(q => ({ ...q, options: shuffle(q.options) }));
  current = 0;
  votes = {};
  AXES.forEach(axis => {
    votes[axis.a.code] = 0;
    votes[axis.b.code] = 0;
  });
  show(quizEl);
  renderQuestion();
}

function renderBrowse() {
  const list = document.getElementById("browse-list");
  list.innerHTML = "";
  DB.personalities.forEach(p => {
    const card = document.createElement("button");
    card.className = "type-card";
    card.innerHTML = `
      <span class="type-emoji">${p.emoji}</span>
      <span class="type-name">${p.name}</span>
      <span class="type-code">${p.id}</span>
      <span class="type-desc">${p.description}</span>`;
    card.addEventListener("click", () => showPersonality(p));
    list.appendChild(card);
  });
  show(browseEl);
}

let resultFromBrowse = false;

function showPersonality(p) {
  document.getElementById("result-name").textContent = p.name;
  document.getElementById("result-emoji").textContent = p.emoji;
  document.getElementById("result-code").textContent = p.id;
  document.getElementById("result-desc").textContent = p.description;
  renderProfile(p.profile);
  document.getElementById("result-axes").innerHTML = "";
  document.getElementById("result-runners").innerHTML = "";
  resultFromBrowse = true;
  setResultMode();
  show(resultEl);
}

function setResultMode() {
  document.querySelector("#result .result-label").textContent = resultFromBrowse
    ? "Personality type"
    : "Your assessed profile";
  document.getElementById("restart-btn").textContent = resultFromBrowse
    ? "Back to browse"
    : "Retake assessment";
}

function resetResultLabels() {
  resultFromBrowse = false;
  setResultMode();
}

function renderQuestion() {
  const q = selected[current];
  progressBar.style.width = `${(current / selected.length) * 100}%`;
  progressText.textContent = `Question ${current + 1} of ${selected.length}`;
  questionText.textContent = `${q.emoji} ${current + 1}. ${q.text}`;
  optionsEl.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = `${String.fromCharCode(65 + i)}) ${opt.text}`;
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

function renderProfile(profile) {
  const container = document.getElementById("result-profile");
  container.innerHTML = "";
  if (!profile) return;

  const addList = (title, items) => {
    const h = document.createElement("h4");
    h.textContent = title;
    const ul = document.createElement("ul");
    items.forEach(text => {
      const li = document.createElement("li");
      li.textContent = text;
      ul.appendChild(li);
    });
    container.append(h, ul);
  };

  const addText = (title, text) => {
    const h = document.createElement("h4");
    h.textContent = title;
    const p = document.createElement("p");
    p.textContent = text;
    container.append(h, p);
  };

  profile.overview.forEach(text => {
    const p = document.createElement("p");
    p.className = "profile-text";
    p.textContent = text;
    container.appendChild(p);
  });

  addList("Strengths", profile.strengths);
  addList("Weaknesses", profile.weaknesses);
  addText("Similar to", profile.similarTo);
  addText("In relationships", profile.inRelationships);
  addText("At work", profile.atWork);
  addText("Growth", profile.growth);
}

function showResult() {
  progressBar.style.width = "100%";

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
  resetResultLabels();

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

  document.getElementById("result-name").textContent = winner.name;
  document.getElementById("result-emoji").textContent = winner.emoji;
  document.getElementById("result-code").textContent = code;
  document.getElementById("result-desc").textContent = winner.description;
  renderProfile(winner.profile);

  const axesEl = document.getElementById("result-axes");
  axesEl.innerHTML = "";
  axisResults.forEach(({ axis, aPct, bPct }) => {
    const row = document.createElement("div");
    row.className = "axis";
    row.innerHTML = `
      <div class="axis-labels">
        <span><b>${axis.a.code}</b> ${axis.a.name} ${aPct}%</span>
        <span>${bPct}% ${axis.b.name} <b>${axis.b.code}</b></span>
      </div>
      <div class="axis-bar"><div class="axis-fill" style="width: ${aPct}%"></div></div>`;
    axesEl.appendChild(row);
  });

  const runners = document.getElementById("result-runners");
  runners.innerHTML = "";
  ranked.slice(1, 4).forEach(r => {
    const li = document.createElement("li");
    li.textContent = `${r.p.emoji} ${r.p.name} (${Math.round(r.match)}% match)`;
    runners.appendChild(li);
  });

  show(resultEl);
}

document.getElementById("start-btn").addEventListener("click", startTest);
document.getElementById("browse-btn").addEventListener("click", renderBrowse);
document.getElementById("browse-back-btn").addEventListener("click", () => show(introEl));
document.getElementById("restart-btn").addEventListener("click", () => {
  if (resultFromBrowse) {
    resetResultLabels();
    renderBrowse();
  } else {
    show(introEl);
  }
});
sliderEl.addEventListener("input", updateSlider);
setupSlider();
