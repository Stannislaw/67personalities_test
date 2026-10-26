// Assembles the database into a single global object, DB.
window.DB = {
  axes: window.DB_AXES,
  questions: window.DB_QUESTIONS,
  answers: window.DB_ANSWERS,
  personalities: window.DB_PERSONALITY_ORDER.map(id => window.DB_PERSONALITIES[id])
};
