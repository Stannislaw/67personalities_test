# 67 Personalities

A joking, distorting mirror of the well-known "16 Personalities" test. Instead of serious psychological types like INTJ or ENFP, you get internet-brainrot archetypes like **Gigachad**, **Sigma**, **Rizzler**, **NPC**, or **Brainrot Boss**. The questions are deliberately bizarre and written in youth slang, so the test is meant to be laughed at, not taken seriously.

## What it is

A small static web app written in plain HTML, CSS and JavaScript. There is no server, no build step, no dependencies, and no data is sent anywhere.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure: intro screen, question screen, result screen. |
| `style.css` | Look and feel: gradient background, cards, progress bar, buttons. |
| `db/` | The database, split into one file per table (see below). |
| `script.js` | Quiz logic. Reads everything from `db/`. |
| `README.md` | This file. |

## How to run it

Just open `index.html` in any modern browser. Double-clicking the file is enough.

## How it works

1. The user reads the intro, chooses how many questions they want with the slider (6 to 51, default 30), and presses **Begin assessment**. The slider shows a comment that changes with its value, for example "Only basic test" or "Deep brainrot dive".
2. The first question is always **"why are you gay"**. The remaining questions are picked at random from the pool, so no two runs are exactly the same.
3. Each question belongs to one axis and has four answers. Every answer points to one pole of that axis.
4. Each answer adds one vote to its pole. If an axis gets a tie (or no votes at all), the winner is picked at random.
5. For each axis, the pole with more votes wins. The six letters together give the personality code (for example `LFPCSB`, which is Rizzler).
6. The result shows the personality with that code, its description, the percentage on each axis (like the original test), and three runner-ups ranked by how closely they match the percentages.
7. **Browse personality types** on the intro screen lists all 64 types. Clicking one opens its full profile.

## The axes

| Axis | Pole A | Pole B |
| --- | --- | --- |
| LW | Hot Dog Person (L) | Sandwich Person (W) |
| FK | Floor Person (F) | Ceiling Person (K) |
| PN | Plant Whisperer (P) | Plant Hater (N) |
| CD | Cat Person (C) | Dog Person (D) |
| SM | Sun Worshipper (S) | Moon Cultist (M) |
| BH | Pineapple Believer (B) | Pineapple Heretic (H) |

The axes are in `db/axes.js`. The order matters: a personality code is built by taking one letter from each axis in that order. With 6 axes and 2 poles each, there are 2^6 = 64 possible codes, and the current version has one personality for every code.

## Content

- **Axes:** `db/axes.js`. Each row has an `id` and two poles, `a` and `b`, each with a `code` and a `name`.
- **Personalities:** one file per personality in `db/personalities/`, named after its code (e.g. `db/personalities/LFPCSB.js`). Each has an `id` (its 6-letter code, one letter per axis in axis order), a `name`, an `emoji`, a `description` and a `profile`. The current version has 67 personalities.
- **Questions:** `db/questions.js`. The current pool has 50 random questions plus one fixed opener, each with an `id`, an `emoji`, `text`, and the `axis` it measures.
- **Answers:** `db/answers.js`. Each row links one answer's text to one question (`questionId`) and to one pole (`pole`, a letter from that question's axis). Each question has four answers, two per pole.
- `db/index.js` assembles all of these into a single global `DB` object that `script.js` uses.
- The number of questions per axis is set by `QUESTIONS_PER_AXIS` in `script.js` (currently 5).

## Adding content

Every personality, question and answer is a separate entry in its file. The files are plain JavaScript, so they open fine with a double click.

To add a personality:
1. Create `db/personalities/XXXXXX.js` (the 6-letter code, unique). Copy an existing file as a template, and make sure the file's `window.DB_PERSONALITIES[...]` key matches the code.
2. Add the code to the list in `db/personalities/index.js`, which sets the display order.
3. Add a `<script>` tag for the new file in `index.html`, before `db/personalities/index.js`.

To add a question:
1. Add a row to `db/questions.js`: `{ id: 52, axis: "LW", emoji: "...", text: "..." }`. The `id` must be unique.
2. Add four rows to `db/answers.js`: `{ questionId: 52, pole: "L", text: "..." }`. Use poles from the question's axis.

`script.js` joins these tables automatically, so you never need to edit it when adding content.

## Pages

The site is a single page with six views, switched by the hash in the URL (`#home`, `#test`, `#types`, `#compare`, `#history`, `#contact`).

- **Home:** hero section, a "Type of the day" card (changes every day), stats, feature cards and testimonials.
- **Take the test:** the assessment, with the result shown at the end.
- **Types:** searchable and sortable catalogue of all personality types. Clicking one opens its profile in a dialog.
- **Compare:** compatibility checker. Pick two types to see the percentage of shared axes and a verdict.
- **My results:** the last 20 results, saved in the browser's local storage. Each one can be reopened or deleted.
- **Contact:** company details, team, a contact form and FAQ.

Extra features on the result screen: **Share result** (uses the Web Share API, or copies the text), and **Print certificate** (a printable certificate with a unique ID). The header has a dark mode toggle, which is remembered between visits.

The contact form and history only use local storage. Nothing is sent to a server.

Ideas for future work: more questions per axis and a visual personality chart.

## Disclaimer

This is a joke project. It has no scientific basis, it is not affiliated with the original 16 Personalities test, and the results should not be used for hiring, diagnosis, or anything else serious. Touch grass responsibly.
