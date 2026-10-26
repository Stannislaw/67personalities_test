# 67 Personalities

A joking, distorting mirror of the well-known "16 Personalities" test. Instead of serious psychological types like INTJ or ENFP, you get internet-brainrot archetypes like **Gigachad**, **Sigma**, **Rizzler**, **NPC**, or **Brainrot Boss**. The questions are deliberately bizarre and written in youth slang, so the test is meant to be laughed at, not taken seriously.

## What it is

A small static web app written in plain HTML, CSS and JavaScript. There is no server, no build step, no dependencies, and no data is sent anywhere.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure: intro screen, question screen, result screen. |
| `style.css` | Look and feel: gradient background, cards, progress bar, buttons. |
| `db.js` | The database: `personalities`, `questions` and `answers` tables. |
| `script.js` | Quiz logic. Reads everything from `db.js`. |
| `README.md` | This file. |

## How to run it

Just open `index.html` in any modern browser. Double-clicking the file is enough.

## How it works

1. The user reads the intro and presses **Start the test**.
2. Each question has four answers. Every answer is linked to exactly one personality.
3. The pool holds 50 questions. Each run randomly picks 25 of them, so no two runs are exactly the same.
4. Choosing an answer adds one vote to that personality.
5. After the last question, the personality with the most votes is shown as the result, together with a short description and a list of runner-ups.
6. If two personalities tie, the one that appears first in the `PERSONALITIES` list wins.

## Content

- **Personalities:** the `personalities` table in `db.js`. Each row has an `id`, a `name`, an `emoji` and a `description`. The current version has 40 personalities.
- **Questions:** the `questions` table in `db.js`. The current pool has 50 questions, each with an `id`, an `emoji` and `text`.
- **Answers:** the `answers` table in `db.js`. Each row links one answer's text to one question (`questionId`) and to one personality (`personalityId`). Each question has four answers.
- The number of questions per run is set by `QUESTIONS_PER_RUN` in `script.js` (currently 25).

## Adding content

To add a personality:
1. Add a row to `DB.personalities` in `db.js`: `{ id: "new_one", name: "...", emoji: "...", description: "..." }`. The `id` must be unique.
2. Add at least one answer that points to it (see below), otherwise nobody can ever get it.

To add a question:
1. Add a row to `DB.questions`: `{ id: 51, emoji: "...", text: "..." }`. The `id` must be unique.
2. Add four rows to `DB.answers`: `{ questionId: 51, text: "...", personalityId: "some_id" }`.
3. Make sure every `personalityId` matches an `id` in `DB.personalities`.

`script.js` joins these tables automatically, so you never need to edit it when adding content.

Ideas for future work: more personalities, more questions, a share-result button, and a visual personality chart.

## Disclaimer

This is a joke project. It has no scientific basis, it is not affiliated with the original 16 Personalities test, and the results should not be used for hiring, diagnosis, or anything else serious. Touch grass responsibly.
