const QUESTIONS_PER_RUN = 25;

const PERSONALITIES = Object.fromEntries(
  DB.personalities.map(p => [p.id, p])
);

const QUESTIONS = DB.questions.map(q => ({
  ...q,
  options: DB.answers
    .filter(a => a.questionId === q.id)
    .map(a => ({ text: a.text, type: a.personalityId }))
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
  selected = shuffle(QUESTIONS).slice(0, QUESTIONS_PER_RUN);
  current = 0;
  votes = {};
  DB.personalities.forEach(p => votes[p.id] = 0);
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
    btn.addEventListener("click", () => answer(opt.type));
    optionsEl.appendChild(btn);
  });
}

function answer(personalityId) {
  votes[personalityId]++;
  current++;
  if (current < selected.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  progressBar.style.width = "100%";
  const ranked = DB.personalities
    .map((p, index) => ({ id: p.id, index, votes: votes[p.id] }))
    .sort((a, b) => b.votes - a.votes || a.index - b.index);

  const winner = PERSONALITIES[ranked[0].id];
  document.getElementById("result-name").textContent = winner.name;
  document.getElementById("result-emoji").textContent = winner.emoji;
  document.getElementById("result-desc").textContent = winner.description;

  const runners = document.getElementById("result-runners");
  runners.innerHTML = "";
  ranked.slice(1, 4).forEach(r => {
    const p = PERSONALITIES[r.id];
    const li = document.createElement("li");
    li.textContent = `${p.emoji} ${p.name} (${r.votes} votes)`;
    runners.appendChild(li);
  });

  show(resultEl);
}

document.getElementById("start-btn").addEventListener("click", startTest);
document.getElementById("restart-btn").addEventListener("click", startTest);
