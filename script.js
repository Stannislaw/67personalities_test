const QUESTIONS_PER_AXIS = 5;

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

const introEl = document.getElementById("intro");
const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const questionText = document.getElementById("question-text");
const optionsEl = document.getElementById("options");

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
  [introEl, quizEl, resultEl].forEach(el => el.classList.add("hidden"));
  section.classList.remove("hidden");
}

function startTest() {
  selected = shuffle(
    AXES.flatMap(axis =>
      shuffle(QUESTIONS.filter(q => q.axis === axis.id)).slice(0, QUESTIONS_PER_AXIS)
    )
  ).map(q => ({ ...q, options: shuffle(q.options) }));
  current = 0;
  votes = {};
  AXES.forEach(axis => {
    votes[axis.a.code] = 0;
    votes[axis.b.code] = 0;
  });
  show(quizEl);
  renderQuestion();
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

function showResult() {
  progressBar.style.width = "100%";

  const axisResults = AXES.map(axis => {
    const total = votes[axis.a.code] + votes[axis.b.code];
    const aPct = Math.round((votes[axis.a.code] / total) * 100);
    const bPct = 100 - aPct;
    const winner = aPct > bPct ? axis.a.code : axis.b.code;
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

  document.getElementById("result-name").textContent = winner.name;
  document.getElementById("result-emoji").textContent = winner.emoji;
  document.getElementById("result-code").textContent = code;
  document.getElementById("result-desc").textContent = winner.description;

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
document.getElementById("restart-btn").addEventListener("click", startTest);
