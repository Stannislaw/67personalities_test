# 67 Personalities

A joking, distorting mirror of the well-known "16 Personalities" test. Instead of serious psychological types like INTJ or ENFP, you get internet-brainrot archetypes like **Gigachad**, **Sigma**, **Rizzler**, **NPC**, or **Brainrot Boss**. The questions are deliberately bizarre and written in youth slang, so the test is meant to be laughed at, not taken seriously.

## What it is

A small static web app written in plain HTML, CSS and JavaScript. There is no server, no build step, no dependencies, and no data is sent anywhere.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure: intro screen, question screen, result screen. |
| `style.css` | Look and feel: gradient background, cards, progress bar, buttons. |
| `db.js` | The database: `axes`, `personalities`, `questions` and `answers` tables. |
| `script.js` | Quiz logic. Reads everything from `db.js`. |
| `README.md` | This file. |

## How to run it

Just open `index.html` in any modern browser. Double-clicking the file is enough.

## How it works

1. The user reads the intro and presses **Start the test**.
2. Each question belongs to one axis and has four answers. Every answer points to one pole of that axis.
3. Each run picks 5 random questions from each of the 6 axes (30 in total), shuffled together, so no two runs are exactly the same.
4. Each answer adds one vote to its pole. Every axis therefore gets 5 votes, so there are no ties.
5. For each axis, the pole with more votes wins. The six letters together give the personality code (for example `LFPCSB`, which is Rizzler).
6. The result shows the personality with that code, its description, the percentage on each axis (like the original test), and three runner-ups ranked by how closely they match the percentages.

## The axes

| Axis | Pole A | Pole B |
| --- | --- | --- |
| LW | Hot Dog Person (L) | Sandwich Person (W) |
| FK | Floor Person (F) | Ceiling Person (K) |
| PN | Plant Whisperer (P) | Plant Hater (N) |
| CD | Cat Person (C) | Dog Person (D) |
| SM | Sun Worshipper (S) | Moon Cultist (M) |
| BH | Pineapple Believer (B) | Pineapple Heretic (H) |

The axes are in `DB.axes`. The order matters: a personality code is built by taking one letter from each axis in that order. With 6 axes and 2 poles each, there are 2^6 = 64 possible codes, and the current version has one personality for every code.

## Content

- **Axes:** the `axes` table in `db.js`. Each row has an `id` and two poles, `a` and `b`, each with a `code` and a `name`.
- **Personalities:** the `personalities` table in `db.js`. Each row has an `id` (its 6-letter code, one letter per axis in axis order), a `name`, an `emoji` and a `description`. The current version has 64 personalities.
- **Questions:** the `questions` table in `db.js`. The current pool has 50 questions, each with an `id`, an `emoji`, `text`, and the `axis` it measures.
- **Answers:** the `answers` table in `db.js`. Each row links one answer's text to one question (`questionId`) and to one pole (`pole`, a letter from that question's axis). Each question has four answers, two per pole.
- The number of questions per axis is set by `QUESTIONS_PER_AXIS` in `script.js` (currently 5).

## Adding content

To add a personality:
1. Add a row to `DB.personalities` in `db.js`: `{ id: "XXXXXX", name: "...", emoji: "...", description: "..." }`. The `id` must be the 6-letter code, and it must be unique.

To add a question:
1. Add a row to `DB.questions`: `{ id: 51, axis: "LW", emoji: "...", text: "..." }`. The `id` must be unique.
2. Add four rows to `DB.answers`: `{ questionId: 51, pole: "L", text: "..." }`. Use poles from the question's axis.

`script.js` joins these tables automatically, so you never need to edit it when adding content.

Ideas for future work: more questions per axis, a share-result button, and a visual personality chart.

## Disclaimer

This is a joke project. It has no scientific basis, it is not affiliated with the original 16 Personalities test, and the results should not be used for hiring, diagnosis, or anything else serious. Touch grass responsibly.
