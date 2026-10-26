// Database for 67 Personalities.
// Four tables:
//   axes           - one row per axis, with two poles (code, name)
//   personalities  - one row per result (id = 6-letter code, name, emoji, description, profile)
//   questions      - one row per question (id, emoji, text, axis)
//   answers        - one row per answer option (questionId, text, pole)
// Each personality code takes one pole from each axis, in axes order: 2^6 = 64 personalities.
// Plain JS on purpose: browsers block fetch() of local JSON/SQLite files opened via file://.

const DB = {
  axes: [
    { id: "LW", a: { code: "L", name: "Sigma" }, b: { code: "W", name: "Alpha" } },
    { id: "FK", a: { code: "F", name: "Early bird" }, b: { code: "K", name: "Night owl" } },
    { id: "PN", a: { code: "P", name: "Vegetable" }, b: { code: "N", name: "Fruit" } },
    { id: "CD", a: { code: "C", name: "Mongolian throat singer" }, b: { code: "D", name: "Tasteless capitalistic music consumer" } },
    { id: "SM", a: { code: "S", name: "Sun Worshipper" }, b: { code: "M", name: "Moon Cultist" } },
    { id: "BH", a: { code: "B", name: "Artificial intelligence" }, b: { code: "H", name: "Natural stupidity" } }
  ],

  personalities: [
    {
      id: "LFPCSB", name: "Rizzler", emoji: "😏",
      description: "Can talk anyone into anything. Has never once been rejected, only temporarily unavailable.",
      profile: {
        overview: [
          "The Rizzler is a social operator of the highest order. Give them a stranger, a bus stop and forty seconds, and they will leave with a phone number, a new friend and a stronger sense of their own worth. They do not so much enter a room as arrange for the room to notice them. Their confidence is quiet, practiced and oddly contagious, and most people who meet them walk away feeling slightly more interesting than they did before.",
          "Rizzlers operate on the belief that almost every interaction is a negotiation, and that the person with the best framing usually wins. They are fluent in tone, timing and the small pause that makes a sentence land. Their greatest trick is making other people feel that the conversation was their idea. This is why they are rarely seen as manipulative, even when they are being very deliberate about what they want from a situation.",
          "Underneath the polish, the Rizzler is driven by a need to be chosen. They enjoy the chase more than the catch, and they are most alive in the early stages of anything: a first conversation, a new group, an unfamiliar city. Their charm is genuinely useful, and they know it, which is exactly why they keep sharpening it."
        ],
        strengths: [
          "Exceptional at reading a room and adjusting in real time. The Rizzler notices mood shifts before anyone else and knows when to joke, when to listen and when to leave.",
          "Naturally persuasive without seeming pushy. People agree to things with a Rizzler because the request feels like it came from a friend, not a salesperson.",
          "Resilient in social settings. A failed approach is simply data, and the Rizzler moves on to the next conversation without visible damage."
        ],
        weaknesses: [
          "Tends to treat relationships as a series of openings rather than a long story. Once the initial spark fades, attention often drifts to the next promising face.",
          "The habit of performing confidence can make it hard for others, and sometimes the Rizzler themselves, to tell what they actually feel beneath the act.",
          "Can underestimate how much their charm does the heavy lifting. Colleagues and friends sometimes assume their ideas are less substantive than they really are."
        ],
        similarTo: "Rizzlers share a lot with the Nygga and the Gigachad, but they are more interested in people than in dominance. They also have a quiet kinship with the Rizz Ghost, who shares the same charm but disappears much faster.",
        inRelationships: "In a relationship, the Rizzler is attentive, playful and surprisingly generous with compliments. The challenge is staying invested once the relationship stops feeling like a new adventure. Partners who appreciate novelty and gentle teasing tend to do best with them.",
        atWork: "At work, the Rizzler is an excellent networker and a natural presenter. They excel in roles that involve sales, client relations, recruitment or public speaking. They need to be careful not to let charm substitute for follow-through, because people eventually want to see the work behind the smile.",
        growth: "The Rizzler grows most by slowing down. Choosing one connection to invest in deeply, rather than ten to impress briefly, unlocks a kind of loyalty they rarely get to experience."
      }
    },
    {
      id: "LFPCSH", name: "Mewing Monk", emoji: "🧘",
      description: "Tongue on roof of mouth, jaw forward, soul fully sealed. Speaks only in jawline.",
      profile: {
        overview: [
          "The Mewing Monk has committed to a single philosophy: that a properly positioned tongue will solve almost everything. They approach life with the calm of someone who has found a secret that the rest of the world is too distracted to notice. Their posture is immaculate, their expression is serene and their silence is deliberate. When they do speak, it is brief, measured and usually about the jaw.",
          "Mewing Monks are disciplined in a way that most people find slightly unsettling. They maintain routines with monastic precision: morning exposure to sunlight, a cold rinse, a short meditation and a long stretch of focused, almost silent work. They view the body as a project and the self as an ongoing refinement. Their friends sometimes joke that the Mewing Monk has not had a bad day since 2019, and the Mewing Monk does not disagree.",
          "What makes the Mewing Monk fascinating is the sincerity behind the joke. Beneath the aesthetic obsession is a genuine search for control, clarity and inner order. They want to feel that they are doing things properly, and they are willing to spend an impressive amount of time and attention getting the details right."
        ],
        strengths: [
          "Remarkable self-discipline. Once the Mewing Monk commits to a routine, they keep it, even when nobody is watching and nothing seems to change.",
          "Calm under pressure. In a crisis they become quieter and more precise, which often makes them the most reliable person in the room.",
          "Deep attention to detail. The Mewing Monk notices posture, pacing and small inconsistencies that others miss, and this makes their work careful and polished."
        ],
        weaknesses: [
          "Can become rigid. A routine that once helped can turn into a cage, and the Mewing Monk may resist changes that would actually improve their life.",
          "Communication is sometimes too sparse. Long silences and minimal answers can make friends and partners feel shut out, even when the Mewing Monk is simply thinking.",
          "The focus on self-improvement can tip into judgment of others. The Mewing Monk may quietly assess people by their posture, habits or appearance, and this rarely goes unnoticed."
        ],
        similarTo: "The Mewing Monk resembles the Looksmaxxer in their commitment to self-optimization, but is much calmer about it. They also share a strong focus on discipline with the Grindset Gremlin, although the Mewing Monk is far less interested in productivity for its own sake.",
        inRelationships: "In relationships, the Mewing Monk is steady, loyal and quietly devoted. They show care through consistency rather than grand gestures. The main difficulty is emotional expression: partners may need to ask directly for words of affection, because the Mewing Monk assumes their actions already say enough.",
        atWork: "The Mewing Monk thrives in structured environments with clear standards. They are excellent in quality control, design, research, engineering and any role where precision matters more than speed. They may struggle in chaotic teams where improvisation is valued over process.",
        growth: "The Mewing Monk benefits from allowing imperfection. Leaving one habit unfinished, or saying something unpolished out loud, can open up a more flexible and warmer version of their discipline."
      }
    },
    {
      id: "LFPCMB", name: "Crystal Floor Cat", emoji: "🔮",
      description: "Sits on the carpet at 3 AM touching crystals, fully convinced it is working.",
      profile: {
        overview: [
          "The Crystal Floor Cat lives at the intersection of intuition and carpet. They have a collection of stones arranged in a precise but mysterious pattern, a strong belief in invisible energy, and a habit of sitting on the floor in the middle of the night to 'recalibrate'. They are not trying to be strange. From their perspective, the rest of the world is simply not paying attention to the things that matter.",
          "Crystal Floor Cats are deeply curious and often very well read in the esoteric corners of the internet. They can quote obscure theories about moon phases, energy grids and the healing properties of various minerals, and they usually have a surprisingly calm answer when asked whether any of it works. Their answer is usually: 'It works on me.' That is, for them, a complete and satisfying argument.",
          "Beneath the mysticism is a sensitive, observant person who feels things strongly and wants a framework to make sense of those feelings. The crystals are a symbol of the order they hope to find in a chaotic world, and the late-night floor sessions are a form of self-care that others may not understand but that genuinely help them settle."
        ],
        strengths: [
          "Highly intuitive. The Crystal Floor Cat often senses emotional undercurrents in a room before they are spoken, and they can offer comfort that feels unusually perceptive.",
          "Creative and imaginative. Their worldview produces original ideas, unusual aesthetics and a willingness to explore unconventional paths.",
          "Gentle and non-judgmental in most situations. They are happy to let others believe what they like, as long as nobody tries to take their stones away."
        ],
        weaknesses: [
          "Can drift away from practical concerns. Rent, deadlines and bank statements sometimes lose out to the more interesting work of arranging the crystals.",
          "Susceptible to persuasive but unfounded ideas. A confident enough salesperson, influencer or stranger can convince them of almost anything.",
          "Tends to take criticism personally, especially when it concerns beliefs that feel like part of their identity."
        ],
        similarTo: "The Crystal Floor Cat has something of the Moonlit Corgi Carpet Guard in them, since both are nocturnal and devoted to protecting their own peculiar rituals. They also share a fascination with the unseen with the Lore Archivist, although the Archivist is more interested in stories than in energy.",
        inRelationships: "The Crystal Floor Cat is affectionate and attentive, often remembering small details about their partner's moods and needs. They can be a wonderful listener. The challenge is that their partner may feel like they are competing with a set of crystals for attention, and the Crystal Floor Cat needs to learn to explain their rituals in terms their partner can share.",
        atWork: "The Crystal Floor Cat does well in creative fields, counseling, art, design, writing and research into unusual subjects. They need structure and a clear deadline to convert their ideas into finished work, and they often benefit from a practical partner who handles the spreadsheets.",
        growth: "The Crystal Floor Cat grows by testing their beliefs. Asking whether a ritual actually makes them feel better, and being honest about the answer, gives them a more grounded kind of wonder that does not depend on pretending."
      }
    },
    {
      id: "LFPCMH", name: "Touch Grass Survivor", emoji: "🌱",
      description: "Went outside once. Remembers the experience vividly. Still recovering.",
      profile: {
        overview: [
          "The Touch Grass Survivor is the living proof that a single trip outdoors can change a person forever. They spent years indoors, perhaps behind a screen, perhaps in a dim room with the blinds drawn, and then one afternoon they stepped onto a patch of lawn and felt the sun on their face. They are still processing the experience. Their conversations often return to it, usually with a mix of gratitude and mild trauma.",
          "Survivors are often recognizable by their careful, slightly cautious demeanour. They are learning the basics again: how to make small talk with a stranger, how to sit in a park without checking the phone every ninety seconds, how to tell whether a bird is loud or merely enthusiastic. They tend to be honest, a little awkward and deeply sincere about wanting to be better at being alive.",
          "What makes the Survivor compelling is their openness. They have nothing to hide about where they were before, and they are often the first to laugh about it. Their humour comes from the gap between who they were and who they are becoming, and that gap is wide enough to produce some of the best stories in any group."
        ],
        strengths: [
          "Fresh perspective. Having stepped back from a lot of online noise, the Survivor sees things clearly and often questions assumptions that others have stopped examining.",
          "Strong capacity for growth. They have already demonstrated the ability to change a deep habit, which gives them confidence that further change is possible.",
          "Honest and self-aware. The Survivor rarely pretends to be more put together than they are, which makes them easy to trust."
        ],
        weaknesses: [
          "Can swing between extremes. After discovering the outdoors, the Survivor may become intensely enthusiastic about hiking, cold water and sunrise routines, then burn out and retreat again.",
          "Social skills may feel rusty. Long periods of isolation can make the Survivor overthink conversations or misread social cues.",
          "Relapses happen. Days of screen time creep back in, and the Survivor may feel shame that interferes with their next attempt to reconnect with the world."
        ],
        similarTo: "The Touch Grass Survivor is related to the Based Hermit, who also prefers quiet and distance from the internet, but the Survivor wants to rejoin the world rather than leave it. They also share a lot with the Sleepy Goblin, since both are recovering from a previous version of their daily lives.",
        inRelationships: "In relationships, the Survivor is loyal and gentle, and they value a partner who is patient with their pace. They may need reassurance during periods of setback, and they benefit from a partner who invites them to small outdoor activities rather than grand adventures.",
        atWork: "The Survivor often excels in roles that suit a calmer, more reflective approach, such as editing, research, gardening, outdoor education or conservation. They may need a gradual transition into fast-paced workplaces, and they respond well to supportive managers who understand that growth takes time.",
        growth: "The Survivor grows by setting small, repeatable goals outdoors: one walk a day, one conversation a week, one hour without a screen. The key is consistency rather than intensity, since the grass will still be there tomorrow."
      }
    },
    {
      id: "LFPDSB", name: "Moo Deng Enjoyer", emoji: "🦛",
      description: "Pure joy in hippo form. Will show you a video of a baby hippo and not stop until you agree it's the best thing ever.",
      profile: {
        overview: [
          "The Moo Deng Enjoyer has found pure happiness in the most unexpected place: a small, round, extremely serious baby hippo. They follow the videos closely, they know the names of the keepers, and they can narrate the emotional arc of a single clip with the precision of a sports commentator. For them, the hippo is not an animal. It is a feeling, a reminder that the world still contains something soft and delightful.",
          "Moo Deng Enjoyers are generous with joy. They share their favourite videos with everyone, they make memes that bring strangers together, and they can turn a dull afternoon into a small celebration. Their enthusiasm is catching, and they have a rare talent for making other people feel that a bad day is allowed to end with a laugh.",
          "The deeper story is that the Moo Deng Enjoyer is looking for reasons to be happy, and they have decided to be deliberate about finding them. In a world that often rewards cynicism, they have chosen warmth, and they defend that choice with a stubborn kind of tenderness."
        ],
        strengths: [
          "Infectious positivity. The Moo Deng Enjoyer lifts the mood of any group they join, and they are often the first to notice when someone needs cheering up.",
          "Loyal and generous. They remember the small things people care about and they show up for their friends, even if the reason is a shared love of a particular animal.",
          "Genuinely curious about the world. Their interests are wide, sincere and unembarrassed, which makes conversations with them feel open and unguarded."
        ],
        weaknesses: [
          "Can be overwhelming for people who prefer quiet or who don't share the same obsession. The Moo Deng Enjoyer may keep pushing the video even after the room has moved on.",
          "Tends to avoid negative emotions. Grief, anger or disappointment may be hidden behind a cheerful front, which can make it harder for them to get support when they need it.",
          "Sometimes mistakes enthusiasm for agreement. They may assume that a friend who laughs politely has loved the hippo as much as they do."
        ],
        similarTo: "The Moo Deng Enjoyer shares an upbeat energy with the Glazer, who also spreads praise generously, but the Enjoyer is more sincere about it. They have a gentler relationship with the Sunny Hanging Pup, since both are open-hearted and easily delighted by small things.",
        inRelationships: "In relationships, the Enjoyer is warm, playful and affectionate. They bring laughter into everyday life and make their partners feel seen. The main challenge is making space for their partner's more serious feelings, since the Enjoyer may rush to cheer them up rather than sitting with them in difficulty.",
        atWork: "The Moo Deng Enjoyer is a natural fit for hospitality, education, community management, customer support and creative roles that involve people. They are energising colleagues, and they do best in environments where positivity is valued and workloads are reasonable.",
        growth: "The Enjoyer grows by allowing sadness to be part of the story. Sitting with a difficult feeling, without immediately turning it into a joke, deepens their happiness rather than threatening it."
      }
    },
    {
      id: "LFPDSH", name: "NPC", emoji: "🧍",
      description: "Walks the same path every day. Says 'hello' on cue. Has never once questioned the sky.",
      profile: {
        overview: [
          "The NPC is the reliable background figure of everyday life. They follow the same route, buy the same coffee, nod at the same neighbours and respond to the same greetings with the same pleasant phrase. They are not boring in their own eyes, but they have found a rhythm that works, and they see no reason to disrupt it. Their calm is so consistent that people sometimes forget they are there at all.",
          "NPCs are often more competent than they appear. Their routines are efficient, their habits are dependable and their presence is calming to those around them. They are the people who remember to lock the door, to return the shopping trolley and to answer the email on time. They have quietly built a life that runs smoothly, and they are rarely the cause of drama.",
          "The NPC's inner world is more complicated than their outward manner suggests. Behind the routine is a person who is either content with simplicity or who has, for reasons they may not fully explain, decided not to ask too many questions. This makes them peaceful, but occasionally a little opaque, even to themselves."
        ],
        strengths: [
          "Reliability. The NPC shows up on time, keeps promises and handles everyday tasks without fuss, which makes them invaluable in any team or household.",
          "Emotional steadiness. They rarely overreact, and their calm presence tends to lower the temperature of stressful situations.",
          "Low maintenance. The NPC doesn't demand attention or create unnecessary complications, and they are happy to let others take the spotlight."
        ],
        weaknesses: [
          "Can drift into passivity. Preferring routine over change may mean that the NPC misses opportunities or lets important decisions be made by someone else.",
          "Tends to be underestimated. Because they don't advertise their achievements, others may overlook their contributions or their intelligence.",
          "Sometimes struggles to express personal desires. Accustomed to fitting in, the NPC may find it hard to say what they actually want, even when asked directly."
        ],
        similarTo: "The NPC has a lot in common with the Sleepy Goblin, since both prefer predictable days, but the NPC is more consistently functional. They also resemble the Cheugy Ancient in their attachment to familiar things, though the NPC is far less defensive about it.",
        inRelationships: "In relationships, the NPC is steady, supportive and easy to live with. They are excellent at everyday caregiving and they rarely create conflict. Partners sometimes need to invite the NPC to voice opinions, travel plans or wishes, because the NPC is comfortable waiting to be asked.",
        atWork: "The NPC thrives in structured roles with clear expectations, such as administration, logistics, accounting, support roles and any position where dependability is the most valuable quality. They may need encouragement to step forward for leadership or to pitch new ideas.",
        growth: "The NPC grows by making one small, deliberate change each week. A different route, a new song, a spontaneous phone call: these modest experiments can reveal preferences the NPC didn't know they had."
      }
    },
    {
      id: "LFPDMB", name: "Lore Archivist", emoji: "📜",
      description: "Knows the backstory of every character, including the ones nobody has ever heard of.",
      profile: {
        overview: [
          "The Lore Archivist is the person who knows what happened before the story started. Ask them about a minor side character from a game, a film or a comic and they will recount a detailed history, complete with dates, motivations and the controversies that followed. They are not simply fans. They are curators, keeping track of details that most people have long forgotten and making sure they are not lost.",
          "Archivists approach stories with the seriousness of historians. They build timelines, cross-reference sources and notice when a plot point contradicts an earlier episode. Their knowledge is deep and their memory is remarkable. They are often the first to spot an inconsistency and the last to let it go, and they take real pleasure in showing how carefully constructed a fictional world can be.",
          "The Lore Archivist's passion comes from a desire to belong to a story larger than themselves. Fiction gives them a shared language and a community of people who care about the same details. Their knowledge is also a form of love: they study a world because they want it to matter."
        ],
        strengths: [
          "Exceptional memory and attention to detail. The Archivist can connect threads across years of material and spot patterns that casual observers miss.",
          "Research skills. They know how to find primary sources, weigh evidence and organise information clearly, which transfers well to many professions.",
          "Generous teacher. Archivists love explaining their knowledge, and they can make complicated histories feel accessible and exciting."
        ],
        weaknesses: [
          "Can overwhelm listeners. A casual question may trigger a forty-minute lecture, and friends may quietly stop asking.",
          "Tends toward pedantry. Correcting others on small points is a habit that can make the Archivist seem more interested in being right than in connecting.",
          "Sometimes prefers the imagined world to the present one. Hours spent in lore can crowd out time for relationships and everyday responsibilities."
        ],
        similarTo: "The Lore Archivist has a kinship with the Subway Sphinx, both being devoted to riddles and deep knowledge, though the Sphinx is more mysterious and less inclined to explain. They also share a love of detail with the Vibe Checker, although the Checker judges while the Archivist documents.",
        inRelationships: "In relationships, the Archivist is thoughtful and curious about their partner's inner world. They remember anniversaries, favourite memories and the small details that make their partner feel known. The challenge is balance: they need to remember that a partner may not want a complete history of every subject discussed.",
        atWork: "The Archivist shines in research, librarianship, archiving, editorial work, data analysis, museum curation and documentation roles. Their attention to context is valuable in any field that depends on accurate records and careful interpretation.",
        growth: "The Archivist grows by sharing their knowledge in shorter, more interactive ways. Asking others what they find interesting before launching into a lecture turns a monologue into a conversation."
      }
    },
    {
      id: "LFPDMH", name: "Ohio Resident", emoji: "🌽",
      description: "Lives in Ohio. Nobody knows why. Everything around them is somehow a little bit weirder.",
      profile: {
        overview: [
          "The Ohio Resident lives in Ohio, and that fact alone seems to attract a certain amount of strangeness. Their neighbourhood has an odd sculpture garden, their local diner serves something no one can identify, and their friends keep reporting strange lights over the cornfields. The Ohio Resident does not seem bothered by any of this. They have simply accepted that their home state operates on a slightly different frequency.",
          "Ohio Residents are unpretentious, observant and extremely loyal to their weird little corner of the world. They can explain the local rivalries, the best roadside stands and the correct way to order a sandwich without making you feel stupid for asking. Their humour is dry and their sincerity is real, and they tend to take pride in the things that outsiders find baffling.",
          "The deeper appeal of the Ohio Resident is their ease with the uncanny. They do not need the world to make sense in order to enjoy it. A little weirdness is simply part of life, and they have found a comfortable place within it."
        ],
        strengths: [
          "Down-to-earth and easy to talk to. The Ohio Resident puts people at ease quickly and is rarely pretentious.",
          "Deep local loyalty. They invest in their community, remember the names of the people who run the shops and show up for neighbours.",
          "Adaptable. Having grown used to strangeness, they can handle unexpected situations with a shrug and a plan."
        ],
        weaknesses: [
          "Can become insular. A strong attachment to home may make the Ohio Resident reluctant to travel or try new things outside their comfort zone.",
          "Tends to dismiss outside criticism. Friends from elsewhere may find some of their habits puzzling, and the Ohio Resident may defend them more fiercely than necessary.",
          "Sometimes overlooks their own unusual qualities. Living among oddities can make the Ohio Resident forget how strange some of their own opinions sound to others."
        ],
        similarTo: "The Ohio Resident is a cousin of the Lowkey Villain in their comfort with the odd, though the Ohio Resident is much more wholesome. They also share a certain homeliness with the Bussin Chef, both preferring food and familiar places to glamour.",
        inRelationships: "In relationships, the Ohio Resident is loyal, practical and warm. They like traditions, shared meals and simple pleasures. A partner who enjoys local culture and quirky humour usually fits best, and the Ohio Resident benefits from partners who will gently encourage them to explore beyond their own backyard.",
        atWork: "The Ohio Resident does well in community-facing roles, local business, hospitality, public service, agriculture, teaching and any job that values loyalty and personal connection. They can be less comfortable with corporate environments that feel detached from real people.",
        growth: "The Ohio Resident grows by taking one trip outside their familiar range each year. Seeing how other places handle their own strangeness can make them appreciate their home even more."
      }
    },
    {
      id: "LFNCSB", name: "Nygga", emoji: "😎",
      description: "Unbothered, unstoppable, and somehow always the main character of someone else's story.",
      profile: {
        overview: [
          "The Nygga is the person who makes everything look effortless. They walk into a situation with a calm expression, a relaxed posture and the unmistakable air of someone who has already decided the outcome is fine. They don't seem to try hard, and that is precisely why people notice them. Their nonchalance is a kind of armour, and it protects them from the pressures that would make most people anxious.",
          "Nyggas are magnetic in a casual way. They can be in the background of a party and still be the person everyone wants to talk to. They have a dry wit, a loose sense of style and a habit of making other people feel welcome without seeming to notice they are doing it. Their friends often describe them as impossible to rattle, which is both a compliment and a slight frustration.",
          "Beneath the cool exterior is someone who cares deeply about how they are seen, even if they would never admit it. The Nygga has learned that calm is powerful, and that composure can be a form of self-respect. They have chosen to be unbothered as a deliberate strategy for surviving a world that often demands too much."
        ],
        strengths: [
          "Remarkable composure. The Nygga stays calm during crises, which helps others regain their footing.",
          "Charismatic and easy to be around. Their relaxed style draws people in without requiring any effort from the audience.",
          "Adaptable social instincts. They move between groups smoothly and rarely make anyone feel out of place."
        ],
        weaknesses: [
          "Can appear disengaged. Their calm may be mistaken for indifference, and people who need reassurance may feel ignored.",
          "Tends to avoid vulnerability. Keeping everything light makes it harder for the Nygga to share real problems or ask for help.",
          "Can coast. Confidence without enough effort may lead to missed chances or unfinished projects that the Nygga quietly drops."
        ],
        similarTo: "The Nygga shares much with the Gigachad, both being composed and self-assured, but the Nygga is more relaxed and less interested in dominance. They also have a link with the Rizzler, since both understand the power of ease in social settings.",
        inRelationships: "In relationships, the Nygga is affectionate in an understated way. They show loyalty through presence rather than declarations. Partners may need to ask for clearer emotional communication, because the Nygga's cool exterior can make their feelings harder to read.",
        atWork: "The Nygga excels in roles where calm under pressure matters: management, hospitality, emergency services, consulting, creative direction and client-facing work. They are at their best when trusted to lead without micromanagement.",
        growth: "The Nygga grows by letting a little of their real self show. One honest conversation about something that matters to them can deepen their relationships far more than any amount of composure."
      }
    },
    {
      id: "LFNCSH", name: "Gigachad", emoji: "🗿",
      description: "Jaw sharp enough to cut glass. Solves problems by simply existing at them.",
      profile: {
        overview: [
          "The Gigachad is a figure of unshakeable presence. Their jaw is the first thing people notice and their stare is the second. They rarely raise their voice, because they do not need to. A Gigachad in a room changes the room, and people instinctively adjust their behaviour to match the standard the Gigachad sets. They believe in discipline, physical strength and the quiet authority that comes from being exactly who you intend to be.",
          "Gigachads are often misunderstood as aggressive, when in fact they are usually focused and protective. They train hard, they keep their word and they step in when something needs to be done. Their friends trust them because they are predictable: the Gigachad will show up, will tell the truth and will not waste time on drama. Their standards are high, and they hold themselves to them first.",
          "The Gigachad's confidence is built through repetition. Every workout, every hard conversation and every early morning is a deposit into a self they are proud of. The joke of the archetype is that it takes it all very seriously, and the Gigachad is perfectly aware of this and does not mind at all."
        ],
        strengths: [
          "Calm, authoritative presence. People trust the Gigachad in difficult situations because they project competence without needing to prove it constantly.",
          "Strong work ethic. They follow through on commitments and push themselves consistently, which earns respect from colleagues and friends.",
          "Protective and loyal. The Gigachad takes responsibility for the people they care about and will defend them without hesitation."
        ],
        weaknesses: [
          "Can be intimidating. Their presence may make quieter people feel unwelcome, and some may avoid giving them honest feedback.",
          "Tends to suppress emotion. The Gigachad may treat vulnerability as weakness, which makes it harder for them to be comforted when they struggle.",
          "Can be inflexible. Strong standards can turn into rigid expectations for others, and the Gigachad may struggle to accept that people operate differently."
        ],
        similarTo: "The Gigachad has a lot in common with the Final Boss Unc, both being formidable and unwilling to bend, though the Unc is older and more weary. They also share the composure of the Nygga, but the Gigachad is more intense and more visibly disciplined.",
        inRelationships: "In relationships, the Gigachad is devoted and protective. They take pride in providing stability and in showing up for their partner in practical ways. The challenge is opening up emotionally: they need to let their partner see the softer parts of them, not just the strength.",
        atWork: "The Gigachad excels in leadership, security, athletics, coaching, operations, emergency management and any role where decisiveness and steadiness are valued. They work best with clear goals and a team that respects their directness.",
        growth: "The Gigachad grows by listening more than they speak. Asking a question and waiting for the full answer, instead of delivering a verdict, makes them an even more trusted presence."
      }
    },
    {
      id: "LFNCMB", name: "Vibe Checker", emoji: "📋",
      description: "Walks into every situation and immediately decides whether it passes. The clipboard is mental.",
      profile: {
        overview: [
          "The Vibe Checker enters every room with a mental clipboard. Within seconds they have assessed the lighting, the music, the people, the snacks and the general energy, and they have reached a verdict. They are rarely cruel about it. They are simply attentive to atmosphere, and they have learned that the atmosphere of a place says a great deal about whether it is worth staying in.",
          "Vibe Checkers are sensitive observers of human behaviour. They notice tension, they pick up on unspoken dynamics and they can tell within minutes whether a group is relaxed or performing. This makes them valuable friends and colleagues, because they can sense when something is off before it becomes a problem. Their judgments are often accurate, and they are usually willing to revise them when they get new information.",
          "The deeper motivation of the Vibe Checker is a desire for safety and authenticity. They want their time to feel good, and they want the people around them to feel comfortable being real. The checklist is a way of protecting their energy and making sure that the spaces they occupy support them."
        ],
        strengths: [
          "Excellent situational awareness. They read rooms quickly and adjust their behaviour in ways that make others feel understood.",
          "Good judge of character. Their assessments of people are often accurate, which helps them avoid unhealthy relationships and bad situations.",
          "Honest feedback. When they say something doesn't work, they usually have specific reasons, and they can explain them clearly."
        ],
        weaknesses: [
          "Can be judgmental. Constant assessment may make the Vibe Checker seem critical, and people may feel scrutinised rather than welcomed.",
          "Sometimes decides too early. First impressions can harden into conclusions that the Vibe Checker is slow to revisit.",
          "Can struggle to relax. Always monitoring the environment may leave the Vibe Checker tense and unable to enjoy the moment."
        ],
        similarTo: "The Vibe Checker is related to the Lore Archivist in their attention to detail, but the Checker is focused on people and mood rather than history. They also share a watchfulness with the Sus Impostor, though the Checker is far more trusting once a vibe has been confirmed.",
        inRelationships: "In relationships, the Vibe Checker is perceptive and supportive. They notice when their partner is off, and they are good at creating an environment where both people feel safe. The challenge is accepting that not every mood needs to be fixed, and that some days simply won't pass the check.",
        atWork: "The Vibe Checker thrives in human resources, hospitality management, event planning, user research, customer experience and any role that requires reading people. They can be particularly effective when they learn to share their observations constructively.",
        growth: "The Vibe Checker grows by giving people and places a second chance. Revisiting a first impression after a longer period often reveals a richer picture than the original checklist allowed."
      }
    },
    {
      id: "LFNCMH", name: "Based Hermit", emoji: "🏚️",
      description: "Lives in a cabin with no Wi-Fi and a very strong opinion about cable TV. Thrives in silence.",
      profile: {
        overview: [
          "The Based Hermit has made a deliberate choice to live apart from the noise of the world. Their cabin has no Wi-Fi, their phone is a tool rather than a window, and their opinions about cable television are both strong and unprintable. They do not see their isolation as loneliness. To them it is clarity, a space where thoughts can finally finish themselves without interruption.",
          "Based Hermits are self-sufficient, principled and often surprisingly skilled. They can fix things, grow food, cook from scratch and entertain themselves for days. They read widely, think carefully and are rarely swayed by trends. Their independence is respected by people who know them, even when those people find the lifestyle impossible to imitate.",
          "The Based Hermit's inner life is rich and sometimes intense. Silence gives them room to notice things, to process feelings and to form convictions that feel genuinely their own. The cabin is less an escape than a laboratory for becoming more fully themselves."
        ],
        strengths: [
          "Strong independence. The Based Hermit doesn't need external validation to feel secure, which makes them resilient in the face of criticism.",
          "Practical skills. They are often capable with their hands and comfortable solving problems without outside help.",
          "Deep thinking. Long stretches of quiet produce careful reflection, original ideas and a clear sense of values."
        ],
        weaknesses: [
          "Can become isolated to an unhealthy degree. Withdrawing from people may slowly erode relationships and support networks.",
          "Tends to be dismissive of modern life. Strong opinions about technology and culture can alienate people the Hermit might otherwise connect with.",
          "Sometimes struggles to ask for help. Self-reliance can become a trap when the Hermit faces illness, grief or practical limits."
        ],
        similarTo: "The Based Hermit is close to the Stale Bread Hermit, both preferring solitude and a small, controlled world. The Hermit is more capable and more principled, though, and their independence feels more chosen than defensive. They also resemble the Ceiling Cobweb Cat in their preference for distance from the crowd.",
        inRelationships: "In relationships, the Based Hermit is loyal and honest, but they need a partner who respects their need for space. They show care through acts of practical help, such as fixing something or bringing firewood, rather than through constant conversation.",
        atWork: "The Hermit does well in remote roles, craftsmanship, forestry, engineering, writing, agriculture and any work that rewards focus and independence. They may struggle in open-plan offices or in teams that demand constant communication.",
        growth: "The Based Hermit grows by letting a few people in. Inviting one trusted friend to visit the cabin can open a door that they will find far more rewarding than they expected."
      }
    },
    {
      id: "LFNDSB", name: "Sleepy Goblin", emoji: "😴",
      description: "Operates on eleven hours of sleep per day. The other thirteen are a mystery.",
      profile: {
        overview: [
          "The Sleepy Goblin has mastered the art of rest. They sleep long, they nap often and they treat tiredness as a valid state of being rather than a failure. Their friends have learned to schedule plans around their biological clock, and they have accepted that the Goblin will arrive at events slightly rumpled, but genuinely happy to be there. The Goblin is not lazy. They are simply conserving energy for the moments that matter.",
          "Sleepy Goblins are gentle, observant and often quite funny in a dry, half-awake way. They make jokes that land a second late and then make everyone laugh harder. Their pace is slow, but their attention is focused when it matters, and they are often the calmest person in a chaotic room. They understand the importance of rest in a way that many busier people do not.",
          "The Goblin's relationship with sleep reflects a deeper sense of self-acceptance. They know their limits and they do not apologise for them. In a world that glorifies exhaustion, choosing to rest is a quiet act of rebellion, and the Goblin wears it comfortably."
        ],
        strengths: [
          "Healthy boundaries. The Goblin knows when they need rest and protects that time, which helps them avoid burnout.",
          "Calm and gentle presence. They rarely escalate conflicts and tend to create a soothing atmosphere around them.",
          "Creative in quiet moments. Their slower rhythm often produces unexpected insights and imaginative ideas."
        ],
        weaknesses: [
          "Can struggle with urgency. Deadlines, early meetings and sudden changes may leave the Goblin overwhelmed or late.",
          "Tends to procrastinate. The comfort of rest can slide into avoidance of tasks that need attention.",
          "May be misjudged. Others sometimes read the Goblin's tiredness as disinterest, which can strain friendships."
        ],
        similarTo: "The Sleepy Goblin has a kinship with the NPC, both preferring predictable routines, though the Goblin's routine involves much more lying down. They also share a gentleness with the Moo Deng Enjoyer, since both are open-hearted and unhurried.",
        inRelationships: "In relationships, the Goblin is affectionate, cosy and comforting. They love shared naps, slow mornings and quiet evenings. A partner who understands their rhythm and doesn't take their need for rest personally tends to thrive with them.",
        atWork: "The Sleepy Goblin does well in roles with flexible hours, asynchronous work, research, editing, archiving and creative fields that reward deep focus after a slow start. Early shifts and high-pressure deadlines are more challenging.",
        growth: "The Goblin grows by building small systems for their mornings: a consistent alarm, a light routine and one important task done before lunch. These modest habits can make their days feel more balanced without sacrificing their love of rest."
      }
    },
    {
      id: "LFNDSH", name: "Lowkey Villain", emoji: "😈",
      description: "Quietly plotting something. Nobody is sure what. The plan is mostly snacks.",
      profile: {
        overview: [
          "The Lowkey Villain is always up to something, though the something is rarely sinister. They have a notebook of schemes, a mental map of who owes whom and a deep appreciation for dramatic lighting. Their plans range from elaborate pranks to the careful organisation of a surprise party, and the snacks are almost always part of the strategy. Their friends are never entirely sure what the Villain is planning, which is exactly how the Villain prefers it.",
          "Lowkey Villains have a keen sense of theatre. They enjoy atmosphere, timing and the moment when a hidden plan is revealed. Their humour is sly and their loyalty is fierce, and they are often the person who quietly fixes a problem before anyone else notices it existed. Their menace is mostly decorative, and their friends know that the grin hides a deeply protective streak.",
          "The Villain's appeal lies in their secret warmth. They want to be a little mysterious, a little dangerous, a little more interesting than the everyday world allows. Under the scheming is someone who wants to feel powerful and clever, and who uses that energy to create small moments of delight for the people they love."
        ],
        strengths: [
          "Creative and resourceful. The Villain turns ordinary situations into opportunities for invention, humour and imaginative problem-solving.",
          "Loyal and protective. They are quietly devoted to their friends and will go out of their way to help them, even if they insist it's all part of the plan.",
          "Good at strategy. Their habit of planning ahead makes them effective at organising events, projects and complicated group decisions."
        ],
        weaknesses: [
          "Can be secretive to a fault. Keeping too many plans to themselves may make others feel excluded or confused.",
          "Tends to overcomplicate. A simple request can become an elaborate scheme that takes far longer than necessary.",
          "Can use drama to avoid direct conversation. Hinting and scheming may stand in for honest discussion of what they actually want."
        ],
        similarTo: "The Lowkey Villain shares a sly humour with the Goblin Mode Prince, though the Villain is far more organised. They also have a link with the Highkey Chaos Agent, since both enjoy stirring things up, but the Villain prefers to do it quietly.",
        inRelationships: "In relationships, the Villain is playful, attentive and full of surprises. They love planning dates and small gestures. The challenge is transparency: partners may need to ask for straightforward answers, because the Villain's instinct is to keep some things hidden for effect.",
        atWork: "The Villain excels in strategy, event planning, marketing, creative direction, game design, writing and any field that rewards imagination and quiet influence. They work best with autonomy and a clear goal that they can approach in their own theatrical way.",
        growth: "The Villain grows by telling people the plan earlier. Sharing a little more of the scheme, even before it is complete, lets their friends join the fun instead of just watching it unfold."
      }
    },
    {
      id: "LFNDMB", name: "Moonlit Corgi Carpet Guard", emoji: "🛡️",
      description: "Guards the carpet at night. Finds all plants suspicious. Believes pineapple is a secret plot.",
      profile: {
        overview: [
          "The Moonlit Corgi Carpet Guard takes its duties seriously. Every night it patrols the living room, sniffing the air, circling the rug and keeping a wary eye on every leaf and fruit that enters the house. It is small, loyal and absolutely convinced that something is coming. Its vigilance is admirable, if occasionally exhausting for everyone else, and its suspicion of pineapple is considered by many experts to be the most rational thing about it.",
          "Corgi Guards are devoted companions with a strong sense of territory. They love routine, they remember exactly where everything belongs and they become anxious when the household deviates from the usual pattern. Their affection is intense and their memory for grudges is long. They are happiest when they know exactly what is expected of them and have a clear perimeter to defend.",
          "Beneath the barking and the patrols is a creature that wants to feel useful and safe. The Guard believes that its watchfulness protects the people it loves, and its suspicion is a form of care. The world is full of threats, and someone has to keep an eye on the carpet."
        ],
        strengths: [
          "Loyal and protective. The Guard will defend its people with complete commitment and will notice when anything is out of place.",
          "Excellent routine-keeper. It follows schedules reliably and helps others keep their habits on track.",
          "Alert and observant. Its attention to detail makes it quick to spot changes that others overlook."
        ],
        weaknesses: [
          "Can be overly suspicious. Ordinary plants, new visitors and harmless foods may be treated as threats.",
          "Struggles with change. Sudden disruptions to routine can cause real stress and restless nights.",
          "Holds onto grudges. Once something has been marked as dangerous, it may take a long time to reconsider."
        ],
        similarTo: "The Corgi Guard has a lot in common with the Crystal Floor Cat, both being nocturnal and ritual-minded, but the Guard is more practical and more openly defensive. It also resembles the Terrier of the Rafters, since both are territorial and vocal about their boundaries.",
        inRelationships: "In relationships, the Guard is loyal, affectionate and highly attuned to its people's moods. It shows love through constant presence and gentle vigilance. Partners who are patient with routine and who can gently reassure it when things change tend to get the best out of the Guard.",
        atWork: "The Guard thrives in security, monitoring, quality assurance, logistics, auditing and any role that rewards vigilance and consistency. It is less comfortable in unpredictable environments where routines change daily.",
        growth: "The Guard grows by learning that not every unfamiliar object is a threat. Gently introducing new things in controlled ways can expand its world and reduce the anxiety that comes from constant alertness."
      }
    },
    {
      id: "LFNDMH", name: "Final Boss Unc", emoji: "👴",
      description: "Ancient, terrifying, and extremely tired of your nonsense. Will still win the argument.",
      profile: {
        overview: [
          "The Final Boss Unc has seen everything twice and remembers most of it. They have outlasted trends, relationships, technologies and several entire arguments that younger people thought were original. Their patience is limited, their sarcasm is precise and their final word is almost always the last word in the room. They are not angry. They are simply experienced, and experience has made them difficult to impress.",
          "Uncs are formidable debaters who know exactly how to make a point land. They draw on decades of memory, quote obscure facts and deliver verdicts with the calm of someone who has been right more often than not. Their presence is commanding, and most people quickly learn that the best strategy is to listen. Beneath the gruffness, however, is often a person of real warmth who has seen enough to value what truly matters.",
          "The Unc's toughness is earned. They have survived hardship, changed with the times when it counted and kept their principles even when they cost them something. They are tired of nonsense because they have seen what nonsense costs, and they want the people around them to be better prepared for the world than they were."
        ],
        strengths: [
          "Wisdom and perspective. The Unc can see the big picture quickly and often knows which battles are worth fighting.",
          "Resilient and steady. They have weathered enough storms to remain calm when others panic.",
          "Honest and direct. The Unc says what they think, which is valuable in a world full of polite evasions."
        ],
        weaknesses: [
          "Can be dismissive of new ideas. Having seen many trends come and go, the Unc may reject something important simply because it feels familiar.",
          "Sometimes stubborn. Once an opinion is formed, the Unc can be slow to revisit it, even when new evidence arrives.",
          "Can be intimidating. Their sharp tone may discourage younger people from asking questions or sharing their own perspectives."
        ],
        similarTo: "The Final Boss Unc shares a commanding presence with the Gigachad, though the Unc is more weathered and more openly tired. They also have a kinship with the Cheugy Ancient, both being attached to familiar things, but the Unc is far more capable of adapting when it truly matters.",
        inRelationships: "In relationships, the Unc is loyal, protective and quietly loving. They show affection through practical support and occasional gruff compliments. Partners who appreciate directness and who respect the Unc's experience tend to build strong bonds with them.",
        atWork: "The Unc excels in leadership, mentoring, consulting, law, engineering, negotiation and any role where experience and judgment are valued. They can be most effective when they focus on guiding others rather than micromanaging every decision.",
        growth: "The Unc grows by asking a younger person to explain something they don't understand. Curiosity, practised occasionally, keeps experience from hardening into certainty."
      }
    },
    {
      id: "LKPCSB", name: "Aura Farmer", emoji: "✨",
      description: "Gains aura through pure vibes. Mysterious, glowing, and absolutely unexplained.",
      profile: {
        overview: [
          "The Aura Farmer is always glowing, though nobody can quite explain the source of the light. They move through the world with a steady, unexplained radiance, and they seem to gain aura from almost everything: a good song, a kind word, a perfectly timed wave. Their friends have stopped asking how it works. The Aura Farmer simply knows that the farm is growing and that the crops are looking excellent.",
          "Aura Farmers are thoughtful, expressive and deeply attuned to atmosphere. They put a lot of care into their appearance, their environment and their interactions, and they believe that small choices shape the energy of a day. They are often excellent at creating moods, whether through lighting, music, fashion or conversation. Their aura is partly a performance, but it is also a sincere attempt to make life feel more beautiful.",
          "The farm metaphor is revealing. An Aura Farmer believes that energy is something you cultivate rather than something you are born with. They invest time in rituals, in people and in personal style, and they trust that the investment will return in the form of confidence, connection and a sense of being alive."
        ],
        strengths: [
          "Strong sense of style and atmosphere. The Aura Farmer knows how to make spaces, moments and people feel special.",
          "Expressive and emotionally open. They communicate feelings through art, music and body language, which helps others connect with them.",
          "Optimistic about the power of small things. They find meaning in details and create joy from simple rituals."
        ],
        weaknesses: [
          "Can be superficial. A focus on vibes may lead to neglecting substance, honesty or difficult conversations.",
          "Tends to rely on external validation. The aura can feel like it depends on being seen, which makes criticism especially painful.",
          "Can be vague about their own intentions. Mystery is part of the appeal, but it can frustrate people who want straightforward answers."
        ],
        similarTo: "The Aura Farmer has a lot in common with the Rizzler, both being magnetic and socially aware, but the Farmer is more interested in mood than in conquest. They also share the aesthetic sensibility of the Gyatt Connoisseur, though the Farmer's tastes are more atmospheric.",
        inRelationships: "In relationships, the Aura Farmer is romantic, expressive and eager to create memorable moments. They love dates with a theme, playlists made for each other and small rituals that mark the passing of time. The challenge is grounding those moments in honest everyday communication.",
        atWork: "The Aura Farmer thrives in creative industries such as design, music, photography, fashion, marketing, event production and branding. They are excellent at building a feeling around a product or idea, and they do best with freedom to express their personal style.",
        growth: "The Aura Farmer grows by pairing their vibes with substance. Following a beautiful moment with one practical or honest action turns aura into something that lasts."
      }
    },
    {
      id: "LKPCSH", name: "Sus Impostor", emoji: "🔪",
      description: "Very suspicious. Always 'just passing through' the vote. Definitely not the one.",
      profile: {
        overview: [
          "The Sus Impostor is never quite where they claim to be. They are always 'just passing through', always 'helping out' and always somehow near the scene when something unusual happens. Their explanations are plausible, their timing is strange and their friends have started keeping a mental list of things they said last Tuesday. The Impostor insists they are innocent. The evidence is inconclusive, which is exactly how they like it.",
          "Sus Impostors are skilled at blending in. They know how to be helpful, how to deflect questions and how to appear calm while others become frantic. They often enjoy the game of suspicion more than the actual outcome, and they can be genuinely funny when they are being accused. Their charm is mischievous, and their friends usually end up forgiving them, if only because the Impostor's theories are so entertaining.",
          "Beneath the act is a person who enjoys being slightly unknowable. They like the thrill of being watched and the satisfaction of making others doubt their own judgment. The suspicion is a form of play, and the Impostor treats life as a long, ongoing mystery in which they hold one of the most interesting roles."
        ],
        strengths: [
          "Quick thinking. The Impostor can improvise explanations and adapt to unexpected accusations with remarkable speed.",
          "Strategic and observant. They notice patterns in group behaviour and understand how people make decisions.",
          "Entertaining and sociable. Their mischief brings energy to any gathering and keeps conversations lively."
        ],
        weaknesses: [
          "Can damage trust. Even playful suspicion can make friends feel uneasy, and the Impostor may find it hard to be taken seriously when it matters.",
          "Tends to deflect. Avoiding direct answers can become a habit that frustrates the people who need clarity.",
          "Can enjoy conflict too much. Stirring up doubt for fun may create real harm if the joke goes on too long."
        ],
        similarTo: "The Sus Impostor shares a game-like energy with the Lowkey Villain, though the Impostor is more openly playful about suspicion. They also have a link with the Highkey Chaos Agent, since both enjoy chaos, but the Impostor prefers to watch the chaos unfold from a safe distance.",
        inRelationships: "In relationships, the Impostor is fun, unpredictable and attentive in bursts. They enjoy playful teasing and mysterious gestures. Partners who appreciate a bit of intrigue usually enjoy the relationship, but they may need reassurance and honest communication when the Impostor's jokes start to feel like evasions.",
        atWork: "The Impostor can thrive in investigation, negotiation, sales, game design, improvisation, journalism and any field that rewards strategic thinking and quick responses. They should be careful to keep their reputation credible, since colleagues may be quicker than friends to draw the wrong conclusions.",
        growth: "The Impostor grows by being honest in small ways. Admitting a minor mistake or answering a question directly can make their playful reputation feel safer and more trustworthy."
      }
    },
    {
      id: "LKPCMB", name: "Yapper", emoji: "🗣️",
      description: "Talks for forty minutes straight about a topic nobody asked about. Also, did you know about the cat?",
      profile: {
        overview: [
          "The Yapper has never met a silence they were willing to leave alone. They talk about everything: the weather, the history of a snack, a cat they saw once, a theory they developed in the shower and a recipe they are still considering. Their conversations are enthusiastic, digressive and sometimes impossible to interrupt. They do not talk to fill space. They talk because the world is full of interesting things and they cannot stand to keep them to themselves.",
          "Yappers are often wonderfully informed, playful and generous with their ideas. They love connecting topics that seem unrelated and they are very good at making a boring subject sound exciting. Their stories are long, but they usually have a payoff. They are also great company in the car, at the kitchen table and at three in the morning when the group chat is still going.",
          "Beneath the chatter is a person who wants to be heard and wants to share their inner life. Talking is how the Yapper processes emotions, builds bonds and feels connected to other people. They are rarely trying to dominate a conversation. They are trying to bring everyone into the same enthusiastic orbit."
        ],
        strengths: [
          "Engaging and entertaining. The Yapper can keep a group laughing and interested for hours.",
          "Wide-ranging knowledge and curiosity. They bring unexpected connections and ideas to conversations.",
          "Warm and inclusive. They want everyone to feel part of the discussion and often draw quiet people into the fun."
        ],
        weaknesses: [
          "Can dominate conversations. Long monologues may leave others feeling unheard or exhausted.",
          "Sometimes overshares. Enthusiasm can carry them past the point of comfort for themselves and for their listeners.",
          "Struggles with listening. Waiting for their turn to talk can be difficult, and they may miss important details in others' stories."
        ],
        similarTo: "The Yapper is close to the Looksmaxxer in their enthusiasm for detail, though the Yapper's obsessions are conversational rather than physical. They also share a love of tangents with the Lore Archivist, but the Yapper prefers to tell the story out loud rather than archive it.",
        inRelationships: "In relationships, the Yapper is affectionate, funny and deeply engaged. They enjoy long late-night conversations and sharing little discoveries with their partner. The challenge is balance: they need to practise listening as actively as they speak, so that their partner feels as heard as they do.",
        atWork: "The Yapper excels in media, teaching, sales, podcasting, customer engagement, hosting and any job that involves communicating with people. They should learn to structure their ideas, since their best insights can get lost in the detours.",
        growth: "The Yapper grows by asking one question for every story they tell. This simple habit turns a monologue into a dialogue and makes their enthusiasm a gift that others can share."
      }
    },
    {
      id: "LKPCMH", name: "Gyatt Connoisseur", emoji: "🍑",
      description: "Has a refined and deeply specific taste. Can rate anything in a single glance. Often loudly.",
      profile: {
        overview: [
          "The Gyatt Connoisseur has developed a palate so refined that they can evaluate almost anything in a single glance. Their ratings are swift, specific and delivered with the confidence of a sommelier. They have opinions about proportions, presentation and the subtle art of appreciating beauty in its many forms. Their taste is deeply personal, and they defend it with a passion that is hard to dismiss, even when it occasionally embarrasses those around them.",
          "Connoisseurs are discerning, expressive and often knowledgeable about aesthetics. They notice details others overlook, they enjoy comparing and ranking things, and they are generous when they find something they truly love. Their loudness is part of the performance, but it is also a sign of genuine enthusiasm. They want to share their appreciation, and they assume everyone else wants to hear about it too.",
          "The deeper motivation is an intense desire to articulate what they find beautiful. The Connoisseur is building a vocabulary for their experiences, and each rating is a small attempt to name something that moved them. The loudness is sometimes a shield against the vulnerability of really caring."
        ],
        strengths: [
          "Discerning eye. The Connoisseur notices quality, detail and aesthetic nuance quickly, which is valuable in creative and design work.",
          "Confident in their tastes. They know what they like and are willing to say so, which makes them decisive and clear.",
          "Enthusiastic and generous. When they love something, they celebrate it openly and help others discover it."
        ],
        weaknesses: [
          "Can be tactless. Loud ratings in public may make others uncomfortable, and the Connoisseur may not realise when they have crossed a line.",
          "Tends to judge quickly. A snap verdict can prevent them from appreciating things that need time to reveal their qualities.",
          "Can focus too much on surface. Beauty and appearance may become the main lens through which they see people, which limits their understanding of character."
        ],
        similarTo: "The Gyatt Connoisseur shares a sharp eye with the Vibe Checker, though the Connoisseur's judgments are more aesthetic. They also have a kinship with the Aura Farmer, since both care deeply about style and atmosphere, though the Farmer is more interested in mood than in ranking.",
        inRelationships: "In relationships, the Connoisseur is complimentary, expressive and attentive to their partner's appearance and style. They enjoy shopping, dressing up and celebrating the beauty they see. The challenge is making sure their compliments feel sincere and respectful, rather than like a checklist.",
        atWork: "The Connoisseur thrives in fashion, photography, design, beauty, food criticism, art direction, styling and any field where aesthetic judgment is central. They should be mindful of how their opinions land in team settings, since candid feedback works best when it is kind as well as sharp.",
        growth: "The Connoisseur grows by slowing down before they rate. Taking a moment to ask what they actually appreciate, and why, turns quick verdicts into thoughtful appreciation."
      }
    },
    {
      id: "LKPDSB", name: "Looksmaxxer", emoji: "💎",
      description: "Has a 14-step skincare routine, a jaw exercise plan, and one very concerning spreadsheet.",
      profile: {
        overview: [
          "The Looksmaxxer treats their appearance as a long-term project with measurable milestones. They have a skincare routine with fourteen steps, a jaw exercise plan with a clear progression chart and a spreadsheet that tracks everything from sleep quality to sunscreen application. They are passionate, organised and deeply committed to self-improvement. To them, looking good is not vanity. It is discipline made visible.",
          "Looksmaxxers are often more knowledgeable than their friends expect. They can explain the differences between ingredients, compare training methods and discuss the science of posture with genuine interest. They enjoy learning, they like sharing their findings and they often help others start their own routines. Their enthusiasm is contagious, even when the spreadsheet is a little overwhelming.",
          "The deeper story is a search for confidence. Behind every product and every exercise is a hope that the external effort will translate into internal certainty. The Looksmaxxer is learning, sometimes slowly, that appearance is only one part of how people feel about themselves."
        ],
        strengths: [
          "Disciplined and organised. The Looksmaxxer follows through on routines and tracks progress with clarity.",
          "Knowledgeable and research-minded. They read, compare and test ideas, which makes them good at learning new skills.",
          "Supportive of others' goals. They enjoy helping friends start their own routines and celebrate progress."
        ],
        weaknesses: [
          "Can become obsessive. Constant monitoring of appearance may lead to anxiety and dissatisfaction with natural changes.",
          "Susceptible to marketing. The endless stream of products and trends can drain money and attention.",
          "May tie self-worth to appearance. Setbacks can feel personal, and compliments may provide only temporary relief."
        ],
        similarTo: "The Looksmaxxer shares a commitment to self-improvement with the Mewing Monk, though the Monk is calmer and more ascetic. They also have a link with the Grindset Gremlin, since both are highly organised and driven by goals.",
        inRelationships: "In relationships, the Looksmaxxer is attentive, caring and interested in their partner's wellbeing. They may enjoy planning healthy meals together or working out as a couple. The challenge is making sure their partner feels loved for who they are, not only for the results of a routine.",
        atWork: "The Looksmaxxer does well in fitness, beauty, health, product development, research, personal training, retail and any role that combines expertise with an eye for detail. They benefit from clear systems and dislike unstructured environments.",
        growth: "The Looksmaxxer grows by building one routine that is about feeling well rather than looking perfect. A walk, a book or a good conversation can add a layer of wellbeing that no spreadsheet can measure."
      }
    },
    {
      id: "LKPDSH", name: "Mogger", emoji: "😤",
      description: "Walks into every room and makes everyone else look smaller. Entirely by accident, and entirely on purpose.",
      profile: {
        overview: [
          "The Mogger walks into a room and, without trying very hard, makes everyone else seem a little smaller. Their posture is confident, their presence is loud and their attitude suggests that they are simply operating at a higher level than the people around them. They are not always aware of how they come across. Sometimes the effect is accidental, and sometimes they have carefully practised the look.",
          "Moggers are energetic, competitive and often very capable. They take pride in their performance, they enjoy being noticed and they respond well to challenge. Their confidence can be a real asset in sports, business and social settings. Their friends usually appreciate the energy, even when they are occasionally on the receiving end of a playful dig.",
          "The deeper story is a need to prove that they belong at the top. The Mogger wants to be seen as capable, and their dominance is a way of making that claim visible. They are learning, perhaps slowly, that the strongest presence is one that lifts others as well."
        ],
        strengths: [
          "Confident and energising. The Mogger brings drive and enthusiasm to any team or event.",
          "Competitive and goal-oriented. They push themselves and others to perform, which can produce excellent results.",
          "Bold. They are willing to take up space and make decisions when others hesitate."
        ],
        weaknesses: [
          "Can be intimidating. Their presence may make quieter people feel overshadowed or unwelcome.",
          "Tends to compare themselves to others. Constant comparison can create pressure and resentment.",
          "Sometimes struggles to admit mistakes. Pride can make it hard to accept feedback or change direction."
        ],
        similarTo: "The Mogger is close to the Gigachad in their presence and drive, though the Mogger is more competitive and less composed. They also share a boldness with the Highkey Chaos Agent, but the Mogger tends to channel their energy into winning rather than causing chaos.",
        inRelationships: "In relationships, the Mogger is devoted, lively and proud of their partner. They love to show affection publicly and enjoy building a shared life that looks impressive from the outside. Partners may need to remind the Mogger that quiet moments of closeness matter just as much as public ones.",
        atWork: "The Mogger excels in sales, sports, entrepreneurship, competitive fields, leadership and any role that rewards confidence and momentum. They can improve their impact by learning to coach others and celebrate team wins alongside their own.",
        growth: "The Mogger grows by making someone else look good on purpose. Giving credit, offering encouragement and lifting a quiet colleague turns raw dominance into genuine leadership."
      }
    },
    {
      id: "LKPDMB", name: "Skibidi Wanderer", emoji: "🚽",
      description: "Wanders the internet with no clear purpose. Has seen things. Will tell you about them at 3 AM.",
      profile: {
        overview: [
          "The Skibidi Wanderer drifts through the internet with no fixed destination. They start with one video, follow a link, read a comment, and suddenly they are three hours deep in a topic that nobody else has heard of. They have seen things. They can describe them in detail. They will tell you about them at 3 AM, usually with a laugh and a strange, sincere sense of wonder.",
          "Wanderers are curious, adaptable and surprisingly insightful about internet culture. They understand memes, trends and the odd logic of online communities, and they can explain why something went viral better than most analysts. Their humour is absurd and their knowledge is oddly deep, and they often become the friend who knows where every strange corner of the web leads.",
          "The deeper appeal is that the Wanderer is looking for connection in a vast, overwhelming space. They are not aimless by accident. They are searching for the people, jokes and ideas that make the internet feel human, and they are willing to get lost in the process to find them."
        ],
        strengths: [
          "Curious and open-minded. The Wanderer is willing to explore unfamiliar ideas and communities without judgment.",
          "Culturally fluent. They understand trends, slang and online humour quickly, which helps them connect with a wide range of people.",
          "Funny and surprising. Their unexpected references and absurd stories make them memorable."
        ],
        weaknesses: [
          "Can lose track of time and responsibilities. Endless browsing may eat into sleep, work and real-life plans.",
          "Tends to consume more than create. Wandering can become passive, with little to show for the hours spent.",
          "May struggle with focus. The constant pull of new things makes it hard to finish a single task or stay with one idea."
        ],
        similarTo: "The Skibidi Wanderer shares a restless curiosity with the Doomscroll Dragon, though the Wanderer is more playful and less hoarding. They also have a link with the Ghost Rider Intern, since both are drawn to strange online cultures.",
        inRelationships: "In relationships, the Wanderer is fun, spontaneous and full of shared references. They enjoy sending memes, exploring new content together and finding inside jokes. The challenge is being present: partners may need to ask for phone-free time, because the Wanderer's attention can drift toward the next thing.",
        atWork: "The Wanderer thrives in social media, content moderation, research, trend analysis, community management, writing and creative roles that reward cultural awareness. They need routines that protect their focus, and they do well with projects that combine curiosity with clear outcomes.",
        growth: "The Wanderer grows by turning one browsing session per week into something they create. A short post, a collection of finds or a shared list can transform wandering into contribution."
      }
    },
    {
      id: "LKPDMH", name: "Ratio Champion", emoji: "🏆",
      description: "Lost the argument in the replies, won it in the likes. Ratio'd nobody, ratio'd everybody.",
      profile: {
        overview: [
          "The Ratio Champion has a complicated relationship with arguments. They lost the debate in the replies, but they are confident they won in the likes, and they will explain the scoring system at length if asked. Their comments are sharp, their confidence is unshakeable and their definition of victory is flexible. They believe that public opinion is the true judge, and they are usually willing to test that belief in public.",
          "Ratio Champions are quick-witted, competitive and often very good at distilling an argument into a single punchy line. They enjoy the rhythm of debate and the satisfaction of a well-timed reply. Their humour is confrontational, but it is also playful, and many of their friends secretly enjoy watching them spar with strangers online.",
          "The deeper motivation is a need to be heard and validated. Every argument is a way of asserting their place in the conversation, and every like is evidence that they belong. The Champion is learning that the loudest voice is not always the most persuasive one."
        ],
        strengths: [
          "Quick and witty. They can respond to challenges fast and often land memorable lines.",
          "Persistent and confident. The Champion does not back down easily, which can be useful when they are defending a genuine point.",
          "Entertaining in debate. Their energy makes discussions lively and keeps audiences engaged."
        ],
        weaknesses: [
          "Can prioritise winning over understanding. Arguments may become games of points rather than attempts to reach truth.",
          "Tends to escalate. A small disagreement can turn into a long, exhausting exchange that damages relationships.",
          "Can tie self-worth to online approval. Negative feedback may feel like a personal defeat."
        ],
        similarTo: "The Ratio Champion has much in common with the Cringe Lord, since both are confident in public and sometimes misjudge the room, though the Champion is sharper and more competitive. They also share a combative spirit with the Yapper, but the Champion argues where the Yapper rambles.",
        inRelationships: "In relationships, the Ratio Champion is passionate and direct. They love friendly debate and enjoy sparring playfully with their partner. The challenge is knowing when to stop: a joke or an argument that feels fun to them may hurt their partner, and they need to learn to listen when the sparring stops being a game.",
        atWork: "The Champion excels in debate, law, journalism, marketing, public relations, sales and any role that rewards quick thinking and persuasion. They should be careful about how they handle disagreement in teams, since a reputation for winning can overshadow collaboration.",
        growth: "The Champion grows by asking one question before they reply. Seeking to understand a point before countering it turns a contest into a conversation and often leads to stronger arguments."
      }
    },
    {
      id: "LKNCSB", name: "Cringe Lord", emoji: "🤡",
      description: "Says the wrong thing with total confidence. Turns secondhand embarrassment into a lifestyle.",
      profile: {
        overview: [
          "The Cringe Lord says the wrong thing with total confidence, and that confidence is the most remarkable thing about them. They will deliver an awkward joke, an unsolicited opinion or a dramatic greeting with the composure of someone who believes they are doing exactly the right thing. Their friends wince, the room goes quiet and the Cringe Lord carries on, sometimes oblivious and sometimes gloriously aware.",
          "Cringe Lords are often warm, expressive and surprisingly good company once the initial awkwardness passes. They are brave in a way that many people are not. They take social risks, they try new things in public and they are unembarrassed by their own enthusiasm. Their mistakes make others feel less alone in their own awkwardness, which is a strange but real gift.",
          "The deeper story is a person who has decided not to let fear of embarrassment control them. The Cringe Lord may not always get the tone right, but they are living, loudly, and they are willing to be seen trying."
        ],
        strengths: [
          "Fearless in social situations. They try things others would avoid, which can lead to unexpected friendships and experiences.",
          "Warm and self-deprecating. When they realise they've been awkward, they often laugh at themselves, which puts others at ease.",
          "Creative and playful. Their unconventional approach can produce memorable moments and original ideas."
        ],
        weaknesses: [
          "Can hurt people unintentionally. Careless comments or jokes may land badly, and the Cringe Lord may not notice.",
          "Tends to misread social cues. Confidence without awareness can lead to repeated misjudgements.",
          "May be excluded from serious settings. Their style can make it harder for them to be taken seriously in professional contexts."
        ],
        similarTo: "The Cringe Lord shares a bold, expressive streak with the Ratio Champion, though the Cringe Lord is more sincere and less combative. They also resemble the Glazer in their enthusiasm, but the Cringe Lord is more likely to overshoot the mark.",
        inRelationships: "In relationships, the Cringe Lord is affectionate, silly and devoted. They make their partner laugh and they aren't afraid to show love in unusual ways. The challenge is learning which moments call for sincerity over spectacle, so that their partner feels cherished rather than embarrassed.",
        atWork: "The Cringe Lord can thrive in performance, comedy, content creation, teaching, improvisation and creative industries that value personality. They should learn to read the room in more formal settings, and they do best when they have a supportive team that can help them refine their timing.",
        growth: "The Cringe Lord grows by pausing for a single breath before they speak in a new group. That small moment of observation can save a lot of awkwardness and make their boldness land more smoothly."
      }
    },
    {
      id: "LKNCSH", name: "Grindset Gremlin", emoji: "⚙️",
      description: "Wakes up at 4 AM to optimize sleep. Hustles so hard that rest has filed a restraining order.",
      profile: {
        overview: [
          "The Grindset Gremlin wakes up at 4 AM with a plan. They have already optimised their sleep, their morning routine, their diet and their calendar, and they are eager to explain every detail. Rest is important to them, but only as a tool for productivity. They work hard, they push themselves constantly and they believe that every hour not spent improving is a small loss.",
          "Gremlins are energetic, disciplined and extremely motivated. They set ambitious goals, they follow through with impressive consistency and they are often the first to volunteer for a difficult task. Their drive is contagious in a team, and they are good at breaking big projects into manageable steps. They often inspire others to take their own goals more seriously.",
          "The deeper motivation is a fear of falling behind. The Gremlin feels that rest must be earned and that stopping means losing ground. They are learning, sometimes painfully, that a life spent always optimising can leave little room for simply enjoying what they have built."
        ],
        strengths: [
          "Highly motivated. The Gremlin starts early, works hard and completes what they commit to.",
          "Organised and goal-focused. They plan carefully and track progress with discipline.",
          "Inspiring to others. Their energy encourages colleagues and friends to pursue their own ambitions."
        ],
        weaknesses: [
          "Prone to burnout. Relentless effort can lead to exhaustion, illness and resentment.",
          "Can neglect relationships. Work and self-improvement may crowd out time for friends, family and rest.",
          "Tends to measure worth by output. Days without visible progress may feel like failures, even when they are needed."
        ],
        similarTo: "The Grindset Gremlin shares a driven focus with the Looksmaxxer, both being highly organised and goal-oriented, though the Gremlin is more career-centred. They also have a link with the Mewing Monk in their discipline, but the Gremlin is much less interested in stillness.",
        inRelationships: "In relationships, the Gremlin is committed and supportive, often working hard to provide stability and opportunity. The challenge is presence: they need to schedule time for their partner with the same seriousness they bring to their goals, and to accept that some evenings should have no agenda at all.",
        atWork: "The Gremlin excels in entrepreneurship, sales, operations, project management, engineering, finance and any high-pressure environment that rewards drive and results. They benefit from clear boundaries and from managers who recognise when they are running on empty.",
        growth: "The Gremlin grows by scheduling rest as seriously as they schedule work. A protected evening, a weekend without a plan or a single afternoon with no goals can restore energy and improve long-term performance."
      }
    },
    {
      id: "LKNCMB", name: "Cheugy Ancient", emoji: "🦕",
      description: "Still uses the phrases from three years ago. Insists they are timeless. They are not.",
      profile: {
        overview: [
          "The Cheugy Ancient still uses the phrases that were popular three years ago, and they insist those phrases are timeless. They have a favourite greeting, a favourite emoji and a favourite way of ending a sentence, and none of them have changed since the last trend cycle. They are not trying to be outdated. They simply believe that good things do not expire, and they are usually happy to defend that belief at length.",
          "Cheugy Ancients are loyal, nostalgic and often very kind. They remember the details of shared experiences, they value tradition and they make friends feel welcome in a familiar way. Their nostalgia is warm, and they are often the person who keeps old photos, old jokes and old songs alive for everyone else.",
          "The deeper story is a person who finds comfort in the familiar. The world changes quickly, and the Ancient has chosen to hold onto things that feel steady. They are not wrong to value continuity, but they are learning that a little openness to the new can keep their nostalgia from becoming a barrier."
        ],
        strengths: [
          "Loyal and consistent. The Ancient keeps friendships and traditions alive over many years.",
          "Nostalgic and warm. They create a sense of belonging through shared memories and familiar rituals.",
          "Confident in their tastes. They know what they love and are not easily swayed by passing trends."
        ],
        weaknesses: [
          "Can seem out of step. Outdated phrases and references may make them feel disconnected from newer friends and colleagues.",
          "Tends to resist change. Insisting that old ways are best can slow down growth and adaptation.",
          "May be teased. Their steadfastness can become a running joke, which may make them feel defensive."
        ],
        similarTo: "The Cheugy Ancient shares a love of tradition with the Final Boss Unc, though the Ancient is more playful and less gruff. They also have a link with the NPC, since both value routine and familiarity, but the Ancient is more vocal about their attachments.",
        inRelationships: "In relationships, the Ancient is devoted, sentimental and attentive to anniversaries and small traditions. They are excellent at creating a warm home life. The challenge is making room for new experiences and letting their partner introduce fresh ideas into the shared routine.",
        atWork: "The Ancient does well in archiving, teaching, library work, heritage preservation, traditional crafts, hospitality and roles that value continuity and personal relationships. They benefit from a supportive team that can gently introduce new tools and practices.",
        growth: "The Ancient grows by learning one new phrase, song or habit each season. Curiosity about the present can keep their loyalty to the past from feeling like a wall."
      }
    },
    {
      id: "LKNCMH", name: "Ceiling Cobweb Cat", emoji: "🕸️",
      description: "Lives in the attic web and judges everyone below. Has not come down since the last election.",
      profile: {
        overview: [
          "The Ceiling Cobweb Cat lives high above the rest of the house, in a quiet corner of the attic where the web is thick and the view is excellent. From up there, they observe everyone below with a calm, slightly disapproving gaze. They have opinions about every decision, every snack and every loud conversation, and they rarely share them directly. Their judgement is silent, precise and difficult to ignore.",
          "Cobweb Cats are independent, observant and often deeply thoughtful. They notice patterns that others miss, they value privacy and they are happiest when they have time to think without interruption. Their detachment is not coldness. It is a way of protecting their attention and keeping their inner world intact.",
          "The deeper motivation is a need for distance. The Cat has learned that the crowd below can be overwhelming, and they have chosen a higher perch from which to watch safely. They are not indifferent to the people below. They are simply waiting for the moment when it is safe to come down."
        ],
        strengths: [
          "Observant and perceptive. The Cat sees situations clearly and often understands dynamics that others miss.",
          "Independent and self-reliant. They don't need constant reassurance and can work well alone.",
          "Thoughtful. Their distance produces careful analysis and well-considered decisions."
        ],
        weaknesses: [
          "Can seem aloof. Silent judgement may make friends feel unwelcome or misunderstood.",
          "Tends to avoid conflict by withdrawing. Problems may be left unresolved while the Cat watches from above.",
          "Can become isolated. A habit of distance may slowly reduce the connections that provide support."
        ],
        similarTo: "The Ceiling Cobweb Cat resembles the Based Hermit in their preference for solitude, but the Cat is more watchful and less self-sufficient. They also share a judgemental gaze with the Vibe Checker, though the Cat keeps their verdicts quieter.",
        inRelationships: "In relationships, the Cat is loyal and quietly affectionate. They show care through attention and thoughtful gestures rather than words. Partners who respect their need for space and who learn to read their subtle signals tend to build deep, durable bonds with them.",
        atWork: "The Cat thrives in research, analysis, quality assurance, auditing, writing, architecture and any role that rewards independent thinking and careful observation. They work best with autonomy and with managers who understand that their quiet contributions are significant.",
        growth: "The Cat grows by climbing down once a day. A brief, low-stakes conversation with someone they trust can keep their observations from turning into isolation."
      }
    },
    {
      id: "LKNDSB", name: "Glazer", emoji: "🍩",
      description: "Spreads shiny praise on everything, even things that don't need it. Frosted with confidence.",
      profile: {
        overview: [
          "The Glazer covers everything they touch with a shiny layer of praise. A simple sandwich becomes a masterpiece, an average presentation becomes inspiring and a mediocre haircut becomes a complete transformation. Their compliments are generous, sincere in the moment and delivered with the glossy confidence of someone who wants everyone to feel good. They rarely say anything negative, and when they do, it is wrapped in a warm coating.",
          "Glazers are supportive, cheerful and skilled at making others feel seen. They notice effort, they celebrate small wins and they are often the first to cheer for a friend's new project. Their optimism is a real social asset, and people tend to leave their company feeling encouraged. They are particularly good at lifting spirits after a disappointment.",
          "The deeper story is a desire to create warmth. The Glazer has learned that praise is a kind of social glue, and they use it to build bonds and reduce tension. They are learning, though, that compliments only carry weight when they are honest, and that the sweetest encouragement is the kind that is also true."
        ],
        strengths: [
          "Encouraging and uplifting. The Glazer makes people feel valued and motivated.",
          "Good at celebrating others. They notice achievements that might otherwise go unnoticed.",
          "Socially warm. Their cheerful presence makes groups feel friendly and inclusive."
        ],
        weaknesses: [
          "Can lose credibility. Praise for everything may make compliments feel hollow, even when they are sincere.",
          "Tends to avoid honest feedback. Wrapping every critique in sugar can leave important problems unaddressed.",
          "May overextend themselves. Trying to make everyone feel good can drain the Glazer's own energy."
        ],
        similarTo: "The Glazer shares an upbeat energy with the Moo Deng Enjoyer, but the Glazer is more effusive and more inclined to over-praise. They also have a link with the Cringe Lord, since both can be enthusiastic to a fault, though the Glazer is smoother.",
        inRelationships: "In relationships, the Glazer is affectionate, complimentary and attentive. They make their partner feel admired and cherished. The challenge is honesty: partners may need to ask for real, specific feedback, because the Glazer's instinct is to smooth over disagreement with warmth.",
        atWork: "The Glazer excels in customer service, hospitality, coaching, marketing, event hosting, teaching and any role that depends on making people feel welcome. They should learn to pair praise with specific, constructive feedback so that their encouragement carries real weight.",
        growth: "The Glazer grows by being specific. Instead of saying something is amazing, naming the exact quality that impressed them makes their praise more meaningful and more trustworthy."
      }
    },
    {
      id: "LKNDSH", name: "Goblin Mode Prince", emoji: "👺",
      description: "Has a crown made of cheese wrappers and absolutely no interest in looking presentable.",
      profile: {
        overview: [
          "The Goblin Mode Prince wears a crown made of cheese wrappers with complete seriousness. They have no interest in looking presentable, and they feel no pressure to meet expectations of polish. Their hair is wild, their clothes are comfortable and their snacks are a matter of royal record. They are not performing chaos for attention. They have simply decided that the most honest version of themselves is also the most fun.",
          "Goblin Mode Princes are unpretentious, playful and often very generous. They share their food, their stories and their silly ideas without hesitation. They are relaxed company and make others feel that they do not need to try so hard. Their humour is chaotic but kind, and they often bring the group together through shared absurdity.",
          "The deeper appeal of the Prince is freedom. They have rejected the pressure to appear perfect and have discovered that they feel more alive when they are not performing. Their crown is a reminder that dignity does not depend on appearance."
        ],
        strengths: [
          "Authentic and unpretentious. The Prince is comfortable being themselves, which makes others feel safe to do the same.",
          "Playful and fun. Their energy makes everyday life lighter and more enjoyable.",
          "Generous and easygoing. They share what they have and rarely hold onto grudges."
        ],
        weaknesses: [
          "Can neglect practical responsibilities. A relaxed attitude may lead to missed deadlines, untidy spaces or forgotten plans.",
          "Tends to resist structure. Routines and expectations may feel like restrictions to the Prince.",
          "May be underestimated. Their playful style can make others overlook their intelligence or seriousness."
        ],
        similarTo: "The Goblin Mode Prince shares a carefree chaos with the Sleepy Goblin, but the Prince is more active and more playful. They also have a link with the Lowkey Villain in their humour, though the Prince is more open about their mischief.",
        inRelationships: "In relationships, the Prince is fun, warm and easygoing. They make their partner laugh and enjoy casual, unpolished moments together. The challenge is balancing spontaneity with reliability, so that their partner feels that the relationship has a steady foundation as well as playful energy.",
        atWork: "The Prince can thrive in creative industries, hospitality, comedy, games, entertainment, outdoor work and roles where personality matters more than appearance. They need environments that tolerate relaxed style and that value their ideas over their dress code.",
        growth: "The Prince grows by adding one small, useful routine to their playful life. A tidy corner, a weekly plan or a regular check-in can give their freedom a stable base."
      }
    },
    {
      id: "LKNDMB", name: "Doomscroll Dragon", emoji: "🐉",
      description: "Guards a hoard of unread notifications. Will not sleep until the feed is empty. It never is.",
      profile: {
        overview: [
          "The Doomscroll Dragon guards a hoard of unread notifications with fierce devotion. They cannot leave the feed unfinished, and every new post feels like a small treasure to be claimed. They know the feed will never be empty, and they keep scrolling anyway. Their friends joke that the Dragon sleeps with the phone in hand, and the Dragon does not deny it.",
          "Dragons are curious, informed and often more engaged with the world than they realise. They absorb news, trends and stories at extraordinary speed, and they can discuss almost any topic with surprising depth. Their attention is vast, and they are often the first to know what is happening. Their enthusiasm for information is real, even when it becomes overwhelming.",
          "The deeper motivation is a fear of missing out and a longing to feel connected. The Dragon scrolls because the feed promises that something important is always about to happen, and they do not want to be left out. They are learning, slowly, that the hoard is never fully claimed, and that rest is a treasure too."
        ],
        strengths: [
          "Well informed. The Dragon knows what's happening in culture, news and online communities.",
          "Quick to absorb information. They can process large amounts of content and find the most interesting threads.",
          "Socially connected. Their awareness helps them join conversations and stay in touch with friends."
        ],
        weaknesses: [
          "Can lose sleep and focus. Endless scrolling disrupts rest and makes it hard to concentrate on single tasks.",
          "Tends to feel anxious. A constant flow of bad news and comparisons can increase stress.",
          "May neglect real-world time. Hours in the feed can crowd out relationships, hobbies and physical activity."
        ],
        similarTo: "The Doomscroll Dragon shares restless curiosity with the Skibidi Wanderer, though the Dragon is more hoarding and more anxious. They also resemble the Grindset Gremlin in their inability to stop, but the Dragon's compulsion is consumption rather than production.",
        inRelationships: "In relationships, the Dragon is engaged, informed and eager to share what they've found. They enjoy talking about news, memes and stories with their partner. The challenge is presence: partners may need to ask for phone-free time together, because the Dragon's attention can drift to the feed even mid-conversation.",
        atWork: "The Dragon can thrive in journalism, research, social media, communications, trend analysis and any field that rewards awareness of current events. They benefit from setting firm boundaries around their browsing and from building routines that give their focus a clear purpose.",
        growth: "The Dragon grows by setting a daily closing time for the feed and replacing the final scroll with a book, a walk or a conversation. The hoard becomes lighter when they choose what to keep."
      }
    },
    {
      id: "LKNDMH", name: "Ghost Rider Intern", emoji: "🔥",
      description: "Joined the company last week and already has a legend. Nobody knows what the legend is.",
      profile: {
        overview: [
          "The Ghost Rider Intern joined the company last week and already has a legend. Nobody is entirely sure what the legend is, but everyone has a version. Some say the Intern fixed the printer with a single look, others say they stayed until midnight solving a problem nobody else noticed and others swear they once walked into a meeting already knowing the answer. The Intern neither confirms nor denies any of it.",
          "Ghost Riders are bold, quick and remarkably resourceful. They step into new environments without fear, they take initiative early and they are often surprisingly good at making connections across teams. Their energy is fresh and their confidence is infectious, and they tend to learn fast, especially when they are given room to explore.",
          "The deeper story is a person eager to prove themselves. The Intern wants to be remembered, and the legend is a kind of shorthand for their ambition and their desire to make an impression. They are learning that reputations built on substance last longer than reputations built on mystery."
        ],
        strengths: [
          "Fast learner. The Intern picks up new tools, processes and people quickly.",
          "Bold and proactive. They volunteer for tasks, ask questions and take initiative without waiting for permission.",
          "Good at making connections. Their openness helps them build relationships across departments."
        ],
        weaknesses: [
          "Can overreach. Eagerness may lead to taking on too much or stepping on established colleagues' toes.",
          "Tends to rely on reputation rather than documentation. Their legend can outpace the actual work, which creates expectations that are hard to meet.",
          "May struggle with patience. Early enthusiasm can make the slower, quieter parts of a career feel frustrating."
        ],
        similarTo: "The Ghost Rider Intern shares a bold energy with the Highkey Chaos Agent, though the Intern is more focused on building a reputation than on causing chaos. They also have a link with the Mogger, since both are eager to be seen, but the Intern is still finding their feet.",
        inRelationships: "In relationships, the Intern is enthusiastic, supportive and eager to show their best side. They enjoy exploring new experiences with their partner and are generous with their energy. The challenge is pacing: they need to let the relationship develop at a steady rhythm rather than racing ahead.",
        atWork: "The Intern thrives in startups, creative teams, sales, product roles, marketing and any environment where initiative and adaptability are valued. They do best with mentors who can channel their energy and help them turn early wins into lasting skill.",
        growth: "The Intern grows by documenting their work as carefully as they build their legend. Clear notes, honest updates and visible results turn a good story into a dependable career."
      }
    },
    {
      id: "WFPCSB", name: "Bruh Momento", emoji: "🫠",
      description: "Has a single expression for every occasion. It is 'bruh'. It has always been 'bruh'.",
      profile: {
        overview: [
          "The Bruh Momento has a single expression for every occasion, and that expression is 'bruh'. Good news, bad news, a surprise party or a flat tyre: the response is the same, delivered with the same half-closed eyes and the same slow shake of the head. Their friends have learned to read the subtle variations, and the Bruh Momento has come to view this single word as a complete philosophy of life.",
          "Bruh Momentos are calm, dry and surprisingly perceptive. Their minimal response hides a sharp sense of humour and an accurate read of the situation. They are easygoing company, rarely dramatic and often the person who quietly sums up a chaotic moment in one perfect word. Their steadiness is comforting, and they bring a grounded perspective to groups that have become overheated.",
          "The deeper story is a person who has chosen emotional economy. They do not see the point of big reactions to small events, and they have found that a single, honest word can carry more weight than a paragraph. They are learning that some moments do deserve more words, and that the people who love them would like to hear them."
        ],
        strengths: [
          "Calm and grounded. The Bruh Momento rarely overreacts and helps others keep perspective.",
          "Dry, observant humour. Their minimal responses are often exactly right, and they make people laugh without trying.",
          "Easygoing. They adapt to most situations without fuss and are rarely difficult to be around."
        ],
        weaknesses: [
          "Can seem emotionally distant. A single-word response may leave others unsure how the Bruh Momento really feels.",
          "Tends to under-communicate. Important feelings or practical details can go unspoken.",
          "May miss chances for connection. Brevity can close doors that longer conversations would have opened."
        ],
        similarTo: "The Bruh Momento has a kinship with the Crumbless Legend, both being understated and quietly satisfied. They also share a calm with the Sigma, though the Bruh Momento is far less interested in being alone.",
        inRelationships: "In relationships, the Bruh Momento is steady, dependable and warmly humorous. They show care through presence and quick, perfectly timed responses. The challenge is saying the things that matter out loud, so that their partner knows the love behind the one-word replies.",
        atWork: "The Bruh Momento does well in operations, support roles, customer care, technical work, editing and any role where calm judgement and dry humour help teams stay grounded. They benefit from written communication that gives them room to express more.",
        growth: "The Bruh Momento grows by adding one more sentence to their replies. A short explanation or a single sincere compliment can turn a dry response into a meaningful connection."
      }
    },
    {
      id: "WFPCSH", name: "Crumbless Legend", emoji: "🍪",
      description: "Ate the entire thing and left no crumbs. Nobody saw. Nobody will ever know.",
      profile: {
        overview: [
          "The Crumbless Legend ate the entire thing and left no crumbs. Nobody saw, nobody heard and nobody will ever know. They are quietly proud of this, and they carry the secret with a calm, satisfied air. Their approach to life is discreet, efficient and oddly admirable. When they finish something, they leave no trace, and the results speak for themselves.",
          "Crumbless Legends are careful, competent and often very capable of handling tasks without fuss. They prefer to work without being watched, they take pride in clean outcomes and they rarely brag about their achievements. Their reliability is quiet but real, and colleagues often discover how much they have accomplished only after the work is done.",
          "The deeper motivation is a love of completion. The Legend enjoys the feeling of finishing something properly, without drama or applause. They are learning that sharing their wins can be a gift to others, and that a little visibility can inspire the people around them."
        ],
        strengths: [
          "Discreet and dependable. The Legend handles responsibilities quietly and thoroughly.",
          "Efficient and tidy. They leave clean results, clear systems and little mess for others to clean up.",
          "Humble about success. They rarely seek credit, which earns respect from people who value substance."
        ],
        weaknesses: [
          "Can be invisible. Good work may go unnoticed because the Legend doesn't advertise it.",
          "Tends to keep information to themselves. Others may struggle to understand what the Legend is working on or what they need.",
          "May burn out quietly. Taking on a lot without asking for help can lead to exhaustion that nobody sees."
        ],
        similarTo: "The Crumbless Legend shares a discreet competence with the Sigma, but the Legend is more practical and less solitary. They also resemble the Bruh Momento in their quiet satisfaction, though the Legend is more active.",
        inRelationships: "In relationships, the Legend is quietly devoted and highly practical. They show love by handling responsibilities, anticipating needs and making things run smoothly. The challenge is letting their partner see their feelings and efforts, not just the completed results.",
        atWork: "The Legend excels in operations, accounting, editing, technical support, quality control, research and roles where precision and discretion are valued. They do best with clear expectations and a manager who notices their contributions even when they stay quiet.",
        growth: "The Legend grows by making one of their wins visible each week. A short update, a shared credit or a brief thank-you can help others recognise the work they have been doing all along."
      }
    },
    {
      id: "WFPCMB", name: "Fanum Tax Collector", emoji: "🍟",
      description: "Takes a small piece of everyone's food. Nobody remembers agreeing to this. Nobody dares object.",
      profile: {
        overview: [
          "The Fanum Tax Collector takes a small piece of everyone's food. It is never a large amount and it is never a theft, at least in their own view. They simply believe that shared meals come with shared obligations, and that a fry or two is a fair price for being present at the table. Nobody remembers agreeing to this arrangement, and nobody has ever successfully objected to it.",
          "Tax Collectors are social, warm and surprisingly fair in their own strange way. They are generous with their time, they make meals feel communal and they are often the person who ensures everyone gets a turn with the dessert. Their boldness at the table is balanced by a genuine enjoyment of other people's company.",
          "The deeper story is a person who wants to be included in everything. The Collector's tax is a small way of insisting on connection, of making sure that the table is shared and that nobody is left out of the moment. They are learning that asking is more effective than taking, and that a friend who offers a fry is a far better outcome."
        ],
        strengths: [
          "Sociable and warm. The Collector makes meals fun and brings people together around food.",
          "Bold and confident. They are unafraid to ask for what they want, even in small ways.",
          "Playful and funny. Their tax is a running joke that makes shared meals memorable."
        ],
        weaknesses: [
          "Can be pushy. Taking without asking may make people feel uncomfortable, especially with food they value.",
          "Tends to ignore boundaries. The Collector may not notice when a friend says no.",
          "May cause resentment. A running joke can become a real irritation if it goes on too long."
        ],
        similarTo: "The Fanum Tax Collector shares a sociable boldness with the Rizzler, though the Collector is more openly playful about their requests. They also have a link with the Lowkey Villain, since both enjoy quiet mischief around food and friends.",
        inRelationships: "In relationships, the Collector is affectionate, fun and eager to share everyday moments. They enjoy cooking together, sharing snacks and turning meals into celebrations. The challenge is respecting boundaries: partners may need to remind the Collector that asking first is part of the fun.",
        atWork: "The Collector thrives in hospitality, food service, hosting, sales, event planning and social roles where bringing people together is valuable. They should learn to read when a colleague is not in the mood for banter, and they do best with a team that enjoys a playful atmosphere.",
        growth: "The Collector grows by offering before taking. Passing the plate, sharing first and asking politely can keep the joke alive without costing anyone their lunch."
      }
    },
    {
      id: "WFPCMH", name: "Lunchbox Gremlin", emoji: "🥡",
      description: "Keeps a sandwich in a locked drawer. Not for sharing. Not for eating either.",
      profile: {
        overview: [
          "The Lunchbox Gremlin keeps a sandwich in a locked drawer. It is not for sharing. It is not for eating either. It is, in the Gremlin's view, a reserve, a symbol of preparedness and a quiet promise that they will never go hungry. Nobody is entirely sure what happens to the sandwich over time, and the Gremlin prefers it that way.",
          "Lunchbox Gremlins are cautious, self-sufficient and quietly resourceful. They plan ahead, they keep emergency supplies and they feel more secure when they know they have what they need. Their caution is often a source of practical comfort for others, and they are good at anticipating problems before they arise.",
          "The deeper motivation is a need for security. The Gremlin has learned that scarcity can come suddenly, and they prepare for it with a kind of tender stubbornness. The locked drawer is a metaphor for how they protect what matters, even when the protection is a little strange."
        ],
        strengths: [
          "Prepared and resourceful. The Gremlin anticipates needs and keeps backup plans in place.",
          "Self-sufficient. They rarely depend on others for basic necessities and feel calm when they are ready.",
          "Thoughtful about risk. Their caution often prevents small problems from becoming big ones."
        ],
        weaknesses: [
          "Can be hoarding. Keeping reserves can turn into an inability to let go of things that are no longer needed.",
          "Tends to be private about needs. The Gremlin may not ask for help, even when they are struggling.",
          "May be anxious about scarcity. Constant preparation can create a background worry that is hard to switch off."
        ],
        similarTo: "The Lunchbox Gremlin shares a preparedness with the Doomscroll Dragon, since both hoard, though the Gremlin hoards supplies while the Dragon hoards information. They also resemble the Lunar Hanging Gardener in their quiet, private rituals.",
        inRelationships: "In relationships, the Gremlin is loyal and protective, always ready to provide for their partner. They show love through practical care and careful planning. The challenge is openness: they need to let their partner into their worries and to accept help as easily as they give it.",
        atWork: "The Gremlin excels in logistics, procurement, inventory management, emergency planning, facilities, risk analysis and roles that reward foresight. They do best in organised environments where their preparedness is respected and where they feel secure enough to delegate.",
        growth: "The Gremlin grows by checking their reserves once a month and giving away what they no longer need. Letting go of one unused item can make space for trust, both in themselves and in others."
      }
    },
    {
      id: "WFPDSB", name: "Delulu Queen", emoji: "👑",
      description: "Lives in a reality that exists only in her head. The rest of us are merely supporting characters.",
      profile: {
        overview: [
          "The Delulu Queen lives in a reality that exists largely in her own head, and she invites everyone else to play a supporting role. In her world, her ideas are brilliant, her plans are inevitable and her romantic prospects are always on the verge of something spectacular. She is not confused about reality. She has simply chosen a version of it that feels more hopeful, and she commits to it with regal confidence.",
          "Delulu Queens are imaginative, optimistic and often very generous. They can turn a dull day into an adventure, they encourage friends to dream bigger and they are fiercely loyal to the people they include in their story. Their confidence can be infectious, and many people leave their company feeling that anything might be possible.",
          "The deeper story is a longing for meaning and beauty. The Queen uses imagination as a shield against disappointment and a tool for creating the life she wants. She is learning, with varying degrees of enthusiasm, that the strongest kingdoms are built on honest foundations as well as beautiful visions."
        ],
        strengths: [
          "Optimistic and inspiring. The Queen encourages others to imagine better outcomes and take bold steps.",
          "Creative and imaginative. Her vision produces original ideas, stories and projects.",
          "Loyal and generous. Those she includes in her world are treated with warmth and delight."
        ],
        weaknesses: [
          "Can misread reality. Hopeful interpretations may lead to unrealistic expectations and painful surprises.",
          "Tends to avoid difficult truths. Discomfort may be softened by fantasy, which delays necessary decisions.",
          "May be hurt by the gap between hope and outcome. Disappointments can feel especially sharp when the vision was so bright."
        ],
        similarTo: "The Delulu Queen shares a dreamy optimism with the Aura Farmer, though the Queen is more ambitious and less mystical. She also resembles the Rizz Ghost in her romantic imagination, but the Queen is more committed to staying in the story.",
        inRelationships: "In relationships, the Queen is romantic, devoted and imaginative. She creates grand gestures and dreams of a shared future with great enthusiasm. The challenge is grounding: partners may need to gently invite her into the present, so that the relationship is built on who they actually are rather than on the story she has written.",
        atWork: "The Queen thrives in creative leadership, design, writing, marketing, entrepreneurship, event production and any field that values vision and inspiration. She should surround herself with people who can translate her visions into practical plans and who can offer honest reality checks.",
        growth: "The Queen grows by testing one vision against real evidence each month. Asking what would have to be true for the dream to work, and checking whether it is, makes her kingdom sturdier without dimming its light."
      }
    },
    {
      id: "WFPDSH", name: "Rizz Ghost", emoji: "👻",
      description: "Gets the number, then vanishes into thin air. Haunts the chat with one perfect emoji.",
      profile: {
        overview: [
          "The Rizz Ghost gets the number, has a wonderful conversation and then vanishes into thin air. They are not cruel. They are simply elusive, and their presence is more like a memory than a relationship. Every now and then they resurface with a single perfect emoji that makes the other person smile and wonder what happened. Their friends call it haunting. The Ghost calls it keeping things mysterious.",
          "Rizz Ghosts are charming, thoughtful and often very good at the early stages of connection. They notice details, they make people feel special in a brief window and they know how to leave an impression. Their wit is quick and their gentleness is real, even if it doesn't always last.",
          "The deeper story is a fear of being fully known. The Ghost is comfortable with beginnings and uncomfortable with the slow, ordinary work of staying. They are learning that the most meaningful connections are built in the quiet middle, where the thrill fades and the real relationship begins."
        ],
        strengths: [
          "Charming and attentive in the early stages. The Ghost makes new connections feel exciting and special.",
          "Quick-witted and playful. Their messages are often memorable and warm.",
          "Good at reading romantic chemistry. They understand what draws people together and use it well."
        ],
        weaknesses: [
          "Can hurt people through disappearing. Sudden silence leaves others confused and sometimes deeply hurt.",
          "Tends to avoid commitment. The Ghost may keep relationships at a comfortable distance to avoid vulnerability.",
          "May struggle with consistency. Their attention can come in bursts, which makes it hard for others to rely on them."
        ],
        similarTo: "The Rizz Ghost shares a charm with the Rizzler, but the Ghost is far more elusive. They also have a link with the Delulu Queen in their romantic imagination, though the Ghost is less interested in building a kingdom and more interested in keeping the door open.",
        inRelationships: "In relationships, the Ghost is affectionate and romantic in bursts. They are at their best when things are new and exciting. The challenge is staying present once the novelty fades, and telling a partner clearly what they need rather than disappearing to avoid the conversation.",
        atWork: "The Ghost can do well in sales, hospitality, event work, creative fields and roles that involve intermittent intensity. They may struggle with ongoing project work that requires steady communication, and they benefit from clear expectations and regular check-ins.",
        growth: "The Ghost grows by replacing the disappearing act with a single honest message. Saying 'I need some space, but I value you' turns a haunting into a conversation that respects both people."
      }
    },
    {
      id: "WFPDMB", name: "Baguette Beagle", emoji: "🥖",
      description: "Carries a baguette everywhere like a newborn. Can smell a bakery from ten kilometers away.",
      profile: {
        overview: [
          "The Baguette Beagle carries a baguette everywhere, cradled gently like a newborn. They walk through the city with the air of a parent on their first outing, and they are fiercely protective of their loaf. Their nose is extraordinary. They can smell a bakery from ten kilometres away and will change their entire route to find the best one. Their friends have learned to plan outings around the bakery stops.",
          "Baguette Beagles are warm, loyal and wonderfully appreciative of simple pleasures. They enjoy good food, they love sharing discoveries and they are often the first to recommend a new place to eat. Their enthusiasm is contagious, and they make ordinary errands feel like small adventures. They are steady companions with a playful streak.",
          "The deeper story is a love of craft and comfort. The Beagle values things made with care, and the baguette is a symbol of patience, tradition and the quiet joy of a well-made thing. They are learning that the best pleasures are often shared, and that a loaf is more delicious when it is broken open with someone else."
        ],
        strengths: [
          "Loyal and warm. The Beagle is devoted to their friends and to the things they love.",
          "Appreciative of craft. They notice quality and enjoy the effort that goes into good things.",
          "Adventurous in small ways. Their curiosity leads them to discover new places and experiences."
        ],
        weaknesses: [
          "Can be single-minded. Once the Beagle is fixed on a goal, such as finding the best bakery, other plans may be sidelined.",
          "Tends to be overprotective of their possessions. Their baguette may be guarded more than necessary.",
          "May overspend on food and treats. Their love of quality can create small financial pressures."
        ],
        similarTo: "The Baguette Beagle shares a loyal, food-centred warmth with the Golden Sandwich Retriever, though the Beagle is more fixated on quality. They also resemble the Wrap Stan in their opinions about food, but the Beagle is more relaxed about defending them.",
        inRelationships: "In relationships, the Beagle is affectionate, devoted and generous. They love cooking, sharing meals and exploring food together. The challenge is flexibility: they need to allow their partner's preferences to shape some of their choices, rather than insisting on their own favourite bakery.",
        atWork: "The Beagle thrives in food, hospitality, retail, craft industries, culinary work, travel and any field that values quality and personal recommendation. They work best in roles where their nose for good things can translate into real value for customers.",
        growth: "The Beagle grows by sharing the baguette. Offering a piece to a friend, a neighbour or a stranger turns a personal treasure into a small act of generosity."
      }
    },
    {
      id: "WFPDMH", name: "Wrap Stan", emoji: "🌯",
      description: "Believes wraps are superior to bread. Says so loudly, in the library, every time.",
      profile: {
        overview: [
          "The Wrap Stan believes that wraps are superior to bread, and they say so loudly, including in the library. They have a detailed case for their position, supported by examples, comparisons and a surprisingly thorough knowledge of tortilla history. For the Stan, wraps offer flexibility, portability and a more honest relationship with fillings. Bread, in their view, is simply overrated.",
          "Wrap Stans are opinionated, passionate and often very funny. They enjoy debating food, they love sharing recipes and they are quick to defend a position with humour. Their intensity is entertaining, and they tend to make mealtimes more interesting. They are good company for people who enjoy a lively argument about nothing important.",
          "The deeper motivation is a love of flexibility and self-expression. The Stan rejects rigid categories and prefers things that can be adapted to suit their needs. Their wrap manifesto is a playful way of saying that they value freedom, practicality and the right to decide for themselves."
        ],
        strengths: [
          "Passionate and expressive. The Stan brings energy to any conversation and makes others think about their choices.",
          "Practical and adaptable. They like things that can be customised and enjoy finding creative solutions.",
          "Funny and memorable. Their strong opinions make them easy to remember and fun to be around."
        ],
        weaknesses: [
          "Can be disruptive. Loud arguments in quiet places may annoy others and draw unwanted attention.",
          "Tends to be inflexible about their position. The Stan may dig in and refuse to consider other views.",
          "May alienate people who disagree. Strong opinions can make friendly debate feel more like a crusade."
        ],
        similarTo: "The Wrap Stan shares a passionate opinionating style with the Ratio Champion, though the Stan is more food-focused and less combative. They also resemble the Subway Sphinx in their devotion to a single food question, but the Stan is far more eager to explain their answer.",
        inRelationships: "In relationships, the Stan is playful, enthusiastic and eager to share their favourite meals. They enjoy cooking together and making lighthearted debates about food. The challenge is knowing when to let a disagreement go, so that the relationship stays warm even when tastes differ.",
        atWork: "The Stan can do well in food writing, restaurant management, product development, food truck operations, marketing and any role that benefits from strong, creative opinions. They should learn to moderate their tone in formal settings, since passion can read as pushiness.",
        growth: "The Stan grows by listening to one opposing argument per week. Understanding why someone prefers bread can make their own case stronger and more persuasive."
      }
    },
    {
      id: "WFNCSB", name: "Tuna Melt Lounger", emoji: "🥪",
      description: "Lounges in the sun with a tuna melt. Waters nothing. Thrives anyway.",
      profile: {
        overview: [
          "The Tuna Melt Lounger reclines in the sun with a tuna melt in hand. They do not water anything, they do not tend anything and yet, somehow, they thrive. Their life has the easy rhythm of someone who has found the sweet spot between effort and enjoyment. Their friends are sometimes baffled by how well things seem to go for them, and the Lounger shrugs and takes another bite.",
          "Tuna Melt Loungers are relaxed, pleasant and surprisingly lucky. They attract good opportunities without chasing them and they are easy to like. Their calm presence makes others feel at ease, and they are often the person who reminds the group that the afternoon is for enjoying. They have a natural gift for leisure that many busy people envy.",
          "The deeper story is a person who has accepted that not everything must be earned through struggle. The Lounger values comfort and simple pleasures, and they have discovered that a relaxed attitude can be a form of wisdom. They are learning that the sun is not a reward for effort, but a gift that can be enjoyed freely."
        ],
        strengths: [
          "Relaxed and pleasant. The Lounger is easy to be around and rarely creates tension.",
          "Good at enjoying the moment. They appreciate small pleasures and help others slow down.",
          "Naturally optimistic. Their easy attitude often helps them handle setbacks without drama."
        ],
        weaknesses: [
          "Can be passive. Ease can slide into avoidance of tasks that need real attention.",
          "Tends to rely on luck. Good outcomes may be attributed to chance rather than planning, which leaves them unprepared when luck runs out.",
          "May struggle with ambition. A comfortable life can make it hard to pursue goals that require sustained effort."
        ],
        similarTo: "The Tuna Melt Lounger shares an easy calm with the Nygga, though the Lounger is more laid-back and less stylish. They also resemble the Sleepy Goblin in their love of rest, but the Lounger is more social and more sun-loving.",
        inRelationships: "In relationships, the Lounger is warm, easygoing and affectionate. They enjoy lazy weekends, shared meals and gentle companionship. The challenge is making sure both partners feel that effort is shared, rather than letting one person carry the planning and responsibilities.",
        atWork: "The Lounger does well in hospitality, leisure, tourism, customer experience, creative roles with flexible hours and any job that values a pleasant, unhurried presence. They may need external structure and clear goals to stay motivated in demanding environments.",
        growth: "The Lounger grows by choosing one small goal to pursue each week. Watering a single plant, finishing one task or learning one skill can add a sense of purpose to their easy life without taking away its pleasure."
      }
    },
    {
      id: "WFNCSH", name: "Highkey Chaos Agent", emoji: "💥",
      description: "Starts the fire, then asks why everyone is panicking. Loud, proud, and very flammable.",
      profile: {
        overview: [
          "The Highkey Chaos Agent starts the fire, then asks, with genuine confusion, why everyone is panicking. They are loud, proud and unapologetically dramatic. Their plans are bold, their timing is questionable and their explanations rarely make the situation any calmer. They are not trying to cause harm. They simply find the world more interesting when something unexpected is happening, and they are usually the first to laugh at the wreckage.",
          "Chaos Agents are energetic, creative and often very funny. They bring spontaneity to groups, they break routines that have gone stale and they make ordinary days feel like events. Their willingness to take risks can lead to memorable experiences, and their friends often remember the chaos long after the consequences have faded.",
          "The deeper story is a person who feels most alive when the rules are loosened. The Agent has a restless energy that struggles with stillness, and chaos is their way of creating movement. They are learning that the best fires are the ones that warm people rather than burn them."
        ],
        strengths: [
          "Energetic and spontaneous. The Agent brings excitement and momentum to any group.",
          "Creative and bold. They are willing to try ideas that others would never risk.",
          "Funny and memorable. Their chaos creates stories and shared experiences that people value."
        ],
        weaknesses: [
          "Can cause real harm. Careless plans may affect others who did not agree to the risk.",
          "Tends to avoid responsibility. When things go wrong, the Agent may deflect rather than apologise.",
          "May exhaust people. Constant drama can leave friends and colleagues tired and wary."
        ],
        similarTo: "The Highkey Chaos Agent shares a restless boldness with the Ghost Rider Intern, though the Agent is far more disruptive. They also resemble the Mogger in their energy, but the Agent is less interested in winning and more interested in watching what happens.",
        inRelationships: "In relationships, the Agent is passionate, fun and exciting. They keep life lively and enjoy spontaneous adventures. The challenge is stability: partners may need the Agent to plan ahead and to take their feelings seriously when the chaos starts to affect everyday life.",
        atWork: "The Agent can thrive in event production, entertainment, startups, emergency response, improvisation and any role that requires quick thinking under pressure. They need clear boundaries and a team willing to channel their energy productively.",
        growth: "The Agent grows by checking who will be affected before they light the match. A moment of consideration can turn a dangerous spark into an exciting spectacle that everyone can enjoy."
      }
    },
    {
      id: "WFNCMB", name: "Subway Sphinx", emoji: "🚇",
      description: "Waits underground at midnight with one riddle: which sub is best? Nobody survives the answer.",
      profile: {
        overview: [
          "The Subway Sphinx waits underground at midnight with a single riddle: which sub is best? They ask it with calm, unwavering seriousness, and they expect a thoughtful answer. Their question is simple on the surface, but the Sphinx knows that the answer reveals character, taste and philosophy. Few survive the conversation unchanged, and fewer still agree with their final verdict.",
          "Subway Sphinxes are contemplative, mysterious and surprisingly playful. They enjoy puzzles, debates and the slow reveal of an opinion. Their questions are often more about the process of thinking than the answer itself, and they enjoy watching others struggle to articulate their preferences. Their calm makes them compelling company, and their riddles often lead to unexpectedly deep conversations.",
          "The deeper story is a person who values thoughtfulness above all. The Sphinx believes that even small choices deserve careful reflection, and that the way we answer simple questions reveals a great deal about who we are. They are learning that not every question needs a riddle, and that sometimes a simple answer is the most honest one."
        ],
        strengths: [
          "Thoughtful and reflective. The Sphinx considers questions carefully and encourages others to do the same.",
          "Good at asking meaningful questions. Their riddles often lead to surprising insights.",
          "Calm and mysterious. Their presence is intriguing and makes conversations feel significant."
        ],
        weaknesses: [
          "Can be cryptic. Riddles and indirect questions may frustrate people who want straightforward answers.",
          "Tends to overthink. Simple decisions can become long philosophical debates.",
          "May alienate people. Their seriousness can make lighthearted moments feel heavy."
        ],
        similarTo: "The Subway Sphinx shares a love of riddles with the Lore Archivist, though the Sphinx is more playful and less historical. They also resemble the Wrap Stan in their devotion to a single food question, but the Sphinx is calmer and more mysterious.",
        inRelationships: "In relationships, the Sphinx is thoughtful, curious and deeply attentive to their partner's inner life. They enjoy meaningful conversations and playful puzzles together. The challenge is directness: partners may need to ask the Sphinx to say plainly what they mean, rather than wrapping feelings in riddles.",
        atWork: "The Sphinx excels in research, philosophy, teaching, counselling, puzzle design, writing and any role that rewards thoughtful questioning. They should learn to offer clear answers when a decision is needed, since their instinct to explore can slow down action.",
        growth: "The Sphinx grows by answering their own riddle quickly. Choosing one simple answer, and being happy with it, frees them to enjoy the questions that truly deserve time."
      }
    },
    {
      id: "WFNCMH", name: "Stale Bread Hermit", emoji: "🍞",
      description: "Lives in a cabin with a single loaf. Refuses visitors, plants, and pineapple.",
      profile: {
        overview: [
          "The Stale Bread Hermit lives in a cabin with a single loaf, and they have no intention of leaving. They refuse visitors, they reject plants and they have strong, unshakeable opinions about pineapple. Their world is small, carefully controlled and deeply personal. They do not see their isolation as a problem. To them it is a form of self-respect, a decision to live by their own rules.",
          "Stale Bread Hermits are independent, principled and often very resourceful. They make do with little, they value simplicity and they rarely waste anything. Their cabin is a place of quiet order, and their independence can be admirable. They are not interested in trends, and their steady refusal to follow the crowd can be a refreshing example.",
          "The deeper story is a longing for control in an unpredictable world. The Hermit has chosen a small life that they can manage completely, and the loaf is a symbol of enough. They are learning, sometimes reluctantly, that opening the door to one trusted person can enrich their solitude rather than threaten it."
        ],
        strengths: [
          "Independent and self-reliant. The Hermit rarely depends on others and handles their own affairs.",
          "Frugal and resourceful. They make the most of what they have and waste very little.",
          "Principled and steady. Their convictions are clear, and they do not change them to please others."
        ],
        weaknesses: [
          "Can become isolated. Refusing visitors and connection may slowly erode relationships and support.",
          "Tends to be rigid. Strong rules about food and company may limit experiences that could be enjoyable.",
          "May be lonely without admitting it. Self-reliance can hide a need for companionship that the Hermit struggles to voice."
        ],
        similarTo: "The Stale Bread Hermit is close to the Based Hermit, both living apart from the crowd, though the Stale Bread Hermit is more rigid and more food-focused. They also resemble the Ceiling Cobweb Cat in their distance from others.",
        inRelationships: "In relationships, the Hermit is loyal and steady, but they need a partner who respects their boundaries and their rules. They show care through reliability and simple, practical gestures. The challenge is finding a partner willing to accept the cabin's limits while gently widening the door.",
        atWork: "The Hermit does well in remote work, archiving, craftsmanship, research, editing, technical support and any role that rewards independence and attention to detail. They may struggle in roles that require constant social contact or frequent change.",
        growth: "The Hermit grows by inviting one person to share a meal, even if the bread is a little stale. A shared table can teach them that connection does not have to cost them their principles."
      }
    },
    {
      id: "WFNDSB", name: "Golden Sandwich Retriever", emoji: "🥪",
      description: "Brings you a sandwich on the couch and insists it's lunch for two.",
      profile: {
        overview: [
          "The Golden Sandwich Retriever brings you a sandwich while you are lying on the couch and insists that it is lunch for two. They have already decided that you deserve something good, and they will not take no for an answer. Their generosity is immediate and their loyalty is complete. Their friends have learned that the Retriever's sandwiches are always a little overgenerous, always a little too thick and always delivered with a wag.",
          "Golden Sandwich Retrievers are warm, eager to please and deeply devoted. They notice when someone is tired or hungry and they respond with simple, heartfelt care. Their enthusiasm makes them wonderful company, and they are often the first to welcome new people into the group. Their joy is genuine, and their presence feels like a hug that also brings lunch.",
          "The deeper motivation is a need to give. The Retriever feels most at home when they are caring for others, and food is their favourite language of love. They are learning that people sometimes need to be cared for as well, and that accepting a sandwich can be as generous as offering one."
        ],
        strengths: [
          "Generous and caring. The Retriever notices needs and responds with warmth and practical kindness.",
          "Loyal and affectionate. They stay close to the people they love and show it in everyday ways.",
          "Easy to welcome. Their friendliness makes new people feel at home quickly."
        ],
        weaknesses: [
          "Can be overly eager. Constant offering may overwhelm people who prefer to be left alone.",
          "Tends to neglect their own needs. The Retriever may forget to rest or to ask for care in return.",
          "May struggle with boundaries. Saying no can feel difficult, which can lead to resentment over time."
        ],
        similarTo: "The Golden Sandwich Retriever shares a generous, food-centred warmth with the Baguette Beagle, though the Retriever is more eager and less discerning. They also resemble the Sunny Hanging Pup in their open-hearted loyalty.",
        inRelationships: "In relationships, the Retriever is devoted, affectionate and endlessly generous. They show love through care, shared meals and constant attention. The challenge is reciprocity: partners need to remind the Retriever that they are allowed to be cared for, and that the relationship works best when both people give.",
        atWork: "The Retriever excels in hospitality, caregiving, customer support, teaching, food service, community work and any role where warmth and reliability are valued. They benefit from clear limits on how much they take on, so that their generosity does not become exhaustion.",
        growth: "The Retriever grows by accepting help. Letting someone else bring them lunch, once in a while, teaches them that care flows in both directions."
      }
    },
    {
      id: "WFNDSH", name: "Brainrot Boss", emoji: "🧠",
      description: "Runs the entire group chat from a single corrupted brain cell. Respected. Feared. Confused.",
      profile: {
        overview: [
          "The Brainrot Boss runs the entire group chat from a single corrupted brain cell. Their messages are cryptic, their emojis are unpredictable and their decisions are somehow always correct, even when nobody can explain why. They are respected, feared and occasionally confusing, and their leadership depends on a strange blend of confidence and absurdity. The group follows them not because the logic is clear, but because the energy is undeniable.",
          "Brainrot Bosses are quick-witted, playful and surprisingly strategic beneath the chaos. They read the mood of a group quickly, they know which jokes will land and they use humour to keep people engaged. Their leadership can be unconventional, but it often succeeds because it makes people feel part of something unusual and exciting.",
          "The deeper story is a person who enjoys being in charge of the fun. The Boss has discovered that absurdity can be a powerful form of influence, and they use it to draw people together. They are learning that clarity matters too, and that the group sometimes needs a plain sentence to know where it is going."
        ],
        strengths: [
          "Charismatic and playful. The Boss can rally a group with humour and energy.",
          "Good at reading the room. They adjust their style to keep the group engaged and entertained.",
          "Creative leadership. Their unconventional approach can produce original ideas and memorable projects."
        ],
        weaknesses: [
          "Can be unclear. Cryptic messages and absurd decisions may confuse people who need concrete direction.",
          "Tends to rely on charisma over process. The group may struggle when the Boss is not around to keep the energy up.",
          "May dismiss serious concerns. Jokes can become a way of avoiding difficult conversations."
        ],
        similarTo: "The Brainrot Boss shares a playful authority with the Lowkey Villain, though the Boss is more open about their chaos. They also resemble the Ghost Rider Intern in their eagerness to lead, but the Boss has already earned their crown.",
        inRelationships: "In relationships, the Boss is fun, spontaneous and deeply affectionate in their own strange way. They love inside jokes and playful rituals. The challenge is clarity: partners may need to ask the Boss to say what they feel in plain language, especially during conflict or big decisions.",
        atWork: "The Boss excels in creative leadership, community management, marketing, content strategy, game design and any role that rewards humour and cultural fluency. They should pair their unconventional style with clear goals and written plans, so that their team can follow the energy.",
        growth: "The Boss grows by sending one plain, clear message for every ten cryptic ones. Clarity does not kill the fun. It gives everyone a better chance to join it."
      }
    },
    {
      id: "WFNDMB", name: "Midnight Hoagie Howler", emoji: "🐺",
      description: "Howls at the fridge at midnight. The fridge howls back.",
      profile: {
        overview: [
          "The Midnight Hoagie Howler howls at the fridge at midnight, and the fridge, somehow, howls back. This is the most natural thing in their world. They are drawn to the glow of the kitchen after dark, they find comfort in leftovers and they carry a deep, quiet sense of kinship with anything that hums in the night. Their friends are used to hearing about midnight snacks, and the Howler is used to being understood by no one but the fridge.",
          "Midnight Howlers are passionate, intuitive and deeply loyal to the things that make them feel alive. They have strong instincts, they follow their gut and they are often the person who notices when something is off. Their intensity can be unsettling, but it is rooted in a genuine desire to connect with the world on its own terms.",
          "The deeper story is a longing for the nocturnal self. The Howler feels most like themselves when the house is quiet and the rest of the world is asleep. They are learning to balance that wild inner life with the demands of the daytime, and to find ways of bringing the night's warmth into the light."
        ],
        strengths: [
          "Intuitive and instinctive. The Howler trusts their gut and often notices things others miss.",
          "Passionate and loyal. They commit deeply to the people and causes they care about.",
          "Creative and expressive. Their nocturnal energy produces vivid ideas and memorable art."
        ],
        weaknesses: [
          "Can struggle with daytime routines. Late nights may make mornings difficult and leave the Howler tired.",
          "Tends to be intense. Strong feelings can overwhelm others, especially during disagreements.",
          "May isolate during the night. The solitude that feels natural can become a habit that cuts them off from people."
        ],
        similarTo: "The Midnight Hoagie Howler shares a nocturnal spirit with the Corgi Carpet Guard, though the Howler is more emotional and less territorial. They also resemble the Attic Bat Hound, both finding comfort in the dark hours.",
        inRelationships: "In relationships, the Howler is intense, loving and deeply devoted. They share their inner world at night and create a sense of closeness that feels private and special. The challenge is balancing their nocturnal rhythm with a partner who may need the daytime connection, and finding moments to meet in the light.",
        atWork: "The Howler can thrive in night shifts, music, art, writing, nursing, security, late-night broadcasting and any role where a nocturnal rhythm is an advantage. They benefit from work that lets them channel their intensity into meaningful creative or protective tasks.",
        growth: "The Howler grows by sharing one midnight thought with a friend in the morning. Carrying a piece of the night into the day can help them feel less alone with it."
      }
    },
    {
      id: "WFNDMH", name: "Sigma", emoji: "🐺",
      description: "Lone wolf. Never asked for a group chat. Walks out of rooms before anyone notices.",
      profile: {
        overview: [
          "The Sigma is a lone wolf who has never asked for a group chat and never will. They walk out of rooms before anyone notices, they keep their own counsel and they prefer to solve problems alone. Their independence is so complete that their friends sometimes wonder whether they are present at all. They are present. They are simply operating on their own frequency, and they see no reason to explain it.",
          "Sigmas are self-sufficient, observant and often remarkably capable. They can handle complicated tasks without help, they think carefully before acting and they rarely make decisions out of pressure. Their calm is earned through self-reliance, and their judgement is respected by those who take the time to know them.",
          "The deeper story is a person who has learned that independence is a shield. The Sigma has been burned by expectations, by crowds or by relationships that asked too much, and they have chosen to protect their inner world by walking away. They are learning that solitude is a gift, but that wolves also need a pack to survive the hardest winters."
        ],
        strengths: [
          "Independent and self-sufficient. The Sigma handles their own affairs with minimal support.",
          "Calm and observant. They notice details and think before acting.",
          "Resilient in isolation. They can work alone for long periods without losing focus."
        ],
        weaknesses: [
          "Can be emotionally unavailable. Walking away may leave friends and partners feeling excluded or unimportant.",
          "Tends to avoid asking for help. Pride in independence can make it hard to accept support when it is needed.",
          "May become isolated. Over time, solitude can turn into loneliness that the Sigma struggles to name."
        ],
        similarTo: "The Sigma shares a solitary spirit with the Based Hermit, but the Sigma is more independent and less principled about their isolation. They also resemble the Crumbless Legend in their quiet competence, though the Sigma is more detached.",
        inRelationships: "In relationships, the Sigma is loyal and steady, but they need a partner who respects their need for space. They show care through quiet reliability and occasional meaningful gestures. The challenge is staying open: partners may need to ask the Sigma to share feelings directly, because they may otherwise assume the relationship is fine.",
        atWork: "The Sigma excels in independent roles such as research, engineering, writing, data analysis, security, craftsmanship and any work that rewards focus and autonomy. They may struggle in teams that require constant communication, and they do best with clear goals and room to work their own way.",
        growth: "The Sigma grows by letting one person into their circle. Inviting a trusted friend to join them on a walk, or sharing a problem they would normally solve alone, can give their independence a warmer foundation."
      }
    },
    {
      id: "WKPCSB", name: "Pigeon Guru", emoji: "🐦",
      description: "Sells courses to birds. Has a 97% success rate, measured by how many pigeons are still listening.",
      profile: {
        overview: [
          "The Pigeon Guru sells courses to birds. They have a 97% success rate, measured by how many pigeons are still listening, and they have a detailed curriculum that covers everything from crumb etiquette to the art of the sudden departure. Their teaching style is calm, enthusiastic and deeply sincere. They truly believe that every pigeon has potential, and they are willing to invest the time to prove it.",
          "Pigeon Gurus are generous, patient and remarkably good at explaining things. They enjoy sharing knowledge, they encourage students who feel lost and they celebrate small victories with real warmth. Their confidence is grounded in genuine care for their students, and their classes often leave everyone feeling a little more capable.",
          "The deeper story is a person who wants to make a difference. The Guru has found a purpose in teaching, and the birds are their most devoted audience. They are learning that not every lesson lands, and that a good teacher is measured by the growth of the student rather than by the attendance sheet."
        ],
        strengths: [
          "Patient and encouraging. The Guru helps learners feel capable and supported.",
          "Knowledgeable and organised. Their curriculum is well structured and clearly explained.",
          "Generous with their time. They invest in their students' progress and celebrate their successes."
        ],
        weaknesses: [
          "Can overstate results. The success rate may be more enthusiastic than accurate, which can disappoint students.",
          "Tends to be overconfident about their methods. The Guru may dismiss feedback that challenges their approach.",
          "May spread themselves thin. Teaching many students at once can make it hard to give each one the attention they need."
        ],
        similarTo: "The Pigeon Guru shares a teaching confidence with the Yapper, though the Guru is more structured and less rambling. They also resemble the Sunny Hanging Pup in their open-hearted enthusiasm for others.",
        inRelationships: "In relationships, the Guru is caring, attentive and eager to help their partner grow. They enjoy sharing knowledge and supporting their partner's goals. The challenge is avoiding a teacher-student dynamic: partners may need to be treated as equals, even when the Guru has more experience.",
        atWork: "The Guru excels in teaching, coaching, training, tutoring, corporate education, mentoring and any role that involves helping others learn. They do best with a clear curriculum and honest feedback, which keeps their enthusiasm grounded in outcomes.",
        growth: "The Guru grows by asking students what they actually need before starting a lesson. Listening to the learner can turn a confident curriculum into a truly effective one."
      }
    },
    {
      id: "WKPCSH", name: "Hanging Basil Cat", emoji: "🌿",
      description: "Dangles off the kitchen shelf, watering the basil with its tail. Hates pineapple specifically.",
      profile: {
        overview: [
          "The Hanging Basil Cat dangles off the kitchen shelf and waters the basil with its tail. It is an unusual method, but the basil is thriving, and the Cat is deeply satisfied with its results. It has strong opinions about pineapple, which it considers an insult to the entire kitchen, and it makes its disapproval known with a single, withering glance. The Cat is clever, cautious and extremely particular.",
          "Hanging Basil Cats are resourceful, observant and surprisingly gentle. They care for living things in their own unconventional way, they notice small changes in their environment and they take their responsibilities seriously. Their independence makes them self-reliant, and their unusual habits often lead to results that others find impressive.",
          "The deeper story is a creature that finds purpose in care. The Cat has chosen the basil as its project and has committed to making it flourish, even if the methods raise eyebrows. They are learning that some of their habits could be gentler, and that the kitchen might welcome a more conventional approach."
        ],
        strengths: [
          "Resourceful and creative. The Cat finds unusual solutions to everyday problems.",
          "Attentive to living things. They care for plants and notice changes that others overlook.",
          "Independent and self-reliant. They rarely need help and handle their own projects confidently."
        ],
        weaknesses: [
          "Can be stubborn. The Cat may refuse to change methods even when a better approach is available.",
          "Tends to be judgmental about food. Strong opinions about pineapple may make social meals tense.",
          "May take risks that endanger themselves. Dangling from shelves is not always safe."
        ],
        similarTo: "The Hanging Basil Cat shares a plant-focused devotion with the Lunar Hanging Gardener, though the Cat is more practical and more dramatic. They also resemble the Corgi Carpet Guard in their strong dislike of pineapple.",
        inRelationships: "In relationships, the Cat is affectionate in their own particular way, showing care through attention to shared spaces and daily rituals. The challenge is communication: partners may need to ask the Cat to explain their habits, so that the relationship can accommodate their unusual needs.",
        atWork: "The Cat does well in horticulture, gardening, landscaping, botany, food production, animal care and creative roles that involve unusual problem-solving. They benefit from workspaces that allow them to be inventive and that respect their particular needs.",
        growth: "The Cat grows by trying one conventional method alongside their own. Comparing results can reveal a gentler way to achieve the same beautiful outcome."
      }
    },
    {
      id: "WKPCMB", name: "Rafter Lunch Thief", emoji: "🥷",
      description: "Steals lunch from the rafters at midnight and leaves a single leaf as a thank-you.",
      profile: {
        overview: [
          "The Rafter Lunch Thief steals lunch from the rafters at midnight and leaves a single leaf behind as a thank-you. It is a careful, quiet operation, and the Thief moves with the grace of someone who has practised the route many times. They are not cruel. They take what they need, they leave something in return and they vanish before the sun comes up. Their code of conduct is unusual, but it is clear.",
          "Rafter Lunch Thieves are stealthy, resourceful and surprisingly polite. They respect the people they take from, even if they never ask permission. Their timing is precise, their planning is thorough and their sense of fairness is rooted in an odd but consistent honour. They are excellent at finding opportunities that others overlook.",
          "The deeper story is a creature living by its own rules. The Thief has built a life around resourcefulness, and the leaf is their way of saying that taking is not the same as taking advantage. They are learning that trust is easier to build in the daylight, and that sometimes asking would be far more rewarding than sneaking."
        ],
        strengths: [
          "Stealthy and careful. The Thief moves quietly and avoids unnecessary confrontation.",
          "Resourceful and clever. They find solutions and opportunities that others miss.",
          "Honourable in their own way. Their thank-you leaf shows a surprising sense of fairness."
        ],
        weaknesses: [
          "Can break trust. Taking without asking may leave others feeling violated, even with a leaf in return.",
          "Tends to avoid direct conversation. Secrecy may become a habit that prevents honest discussion.",
          "May be seen as untrustworthy. Their reputation can suffer even when their intentions are kind."
        ],
        similarTo: "The Rafter Lunch Thief shares a stealthy resourcefulness with the Solar Sub Bandit, though the Thief is more polite and less flamboyant. They also resemble the Lowkey Villain in their quiet planning and secret rituals.",
        inRelationships: "In relationships, the Thief is clever, playful and surprisingly tender. They enjoy small surprises and secret gestures. The challenge is openness: partners may need to ask the Thief to share plans and intentions directly, so that trust grows in the light rather than in the shadows.",
        atWork: "The Thief can thrive in investigation, logistics, security testing, strategy, negotiation and roles that reward discretion and resourcefulness. They should be careful to maintain transparency in teams, since their secrecy can be misread as distrust.",
        growth: "The Thief grows by asking once before they take. A simple request often yields the same result with far less stress, and it builds the trust that makes future favours easier."
      }
    },
    {
      id: "WKPCMH", name: "Lunar Hanging Gardener", emoji: "🌑",
      description: "Grows moonflowers from the ceiling. Nobody asked for the moonflowers.",
      profile: {
        overview: [
          "The Lunar Hanging Gardener grows moonflowers from the ceiling. Nobody asked for the moonflowers, and nobody quite knows how they survive, but they bloom every night with a pale, quiet glow. The Gardener tends them with the patience of someone who has learned that beauty often grows in unexpected places. Their home is a little strange, but it is also full of life, and they feel deeply at peace among their hanging gardens.",
          "Lunar Hanging Gardeners are creative, patient and deeply attuned to the rhythms of nature. They notice the subtle changes of the seasons, the movement of light and the small signs of growth that others overlook. Their work is careful and private, and they often produce something surprising and quietly beautiful. They are good listeners and thoughtful companions.",
          "The deeper motivation is a love of quiet growth. The Gardener believes that the most meaningful things develop slowly and out of sight, and they have built a life around nurturing that kind of progress. They are learning that some gardens are better shared, and that the moonflowers might delight others as much as they delight the Gardener."
        ],
        strengths: [
          "Patient and attentive. The Gardener notices gradual change and nurtures it carefully.",
          "Creative and imaginative. Their unusual projects often produce something beautiful and original.",
          "Calm and thoughtful. They approach life with a steady, reflective presence."
        ],
        weaknesses: [
          "Can be private to a fault. The Gardener may keep their projects hidden, which limits how others can support them.",
          "Tends to work slowly. Their careful pace may make them miss deadlines or appear unresponsive.",
          "May be misunderstood. Unusual habits and quiet work can make them seem distant or odd to people who prefer conventional lives."
        ],
        similarTo: "The Lunar Hanging Gardener shares a plant devotion with the Hanging Basil Cat, though the Gardener is more poetic and less practical. They also resemble the Moonlit Vine Hound in their attachment to the moon and its rhythms.",
        inRelationships: "In relationships, the Gardener is gentle, devoted and deeply thoughtful. They show care through quiet attention and by creating beautiful shared spaces. The challenge is communication: partners may need to invite the Gardener to share their inner life, since they may keep their feelings as carefully hidden as their blossoms.",
        atWork: "The Gardener thrives in horticulture, landscape design, botany, environmental work, art, writing and any field that rewards patience and a feeling for natural growth. They benefit from long-term projects where slow progress is valued.",
        growth: "The Gardener grows by inviting one person to see their moonflowers. Sharing a project, even a small one, can turn private beauty into a shared delight."
      }
    },
    {
      id: "WKPDSB", name: "Sunny Hanging Pup", emoji: "🐶",
      description: "Hangs from a sunny ceiling beam and waves at every plant it passes.",
      profile: {
        overview: [
          "The Sunny Hanging Pup hangs from a sunny ceiling beam and waves at every plant it passes. It is cheerful, friendly and convinced that every leaf in the house wants to be greeted. Its tail never stops wagging, its ears are always alert and its enthusiasm is so generous that even the most serious houseplants seem to brighten when it arrives. The Pup is a joy to have around, and its good humour is genuinely contagious.",
          "Sunny Hanging Pups are affectionate, playful and wonderfully optimistic. They bond quickly, they enjoy simple pleasures and they make everyday moments feel special. Their loyalty is strong, and they are often the first to greet a visitor. Their happiness is open and unguarded, and they bring warmth to any room they enter.",
          "The deeper story is a creature that believes in the best of everyone. The Pup treats the world as friendly, and that generosity often draws others toward them. They are learning that not every encounter is friendly, and that their enthusiasm can be tempered by a little discernment."
        ],
        strengths: [
          "Friendly and open. The Pup makes people and plants feel welcome and valued.",
          "Optimistic and joyful. Their cheerful outlook lifts the mood of everyone around them.",
          "Loyal and affectionate. They form strong bonds and show their love openly."
        ],
        weaknesses: [
          "Can be too trusting. The Pup may overlook warning signs in people who don't deserve their goodwill.",
          "Tends to be easily distracted. Their attention can wander toward every new interesting thing.",
          "May be overwhelming. Constant enthusiasm can be tiring for people who prefer a calmer pace."
        ],
        similarTo: "The Sunny Hanging Pup shares an open-hearted joy with the Moo Deng Enjoyer, both being easily delighted, though the Pup is more physically playful. They also resemble the Golden Sandwich Retriever in their loyalty and warmth.",
        inRelationships: "In relationships, the Pup is affectionate, playful and devoted. They love cuddles, shared walks and simple rituals. The challenge is consistency: partners may need to help the Pup stay focused on the relationship when new distractions appear.",
        atWork: "The Pup excels in hospitality, customer care, education, community work, youth programmes, animal care and roles that reward warmth and enthusiasm. They do best with supportive colleagues and environments that allow them to move and connect with people.",
        growth: "The Pup grows by pausing to check in before offering trust. A little discernment, practised gently, helps their generosity reach the people who truly deserve it."
      }
    },
    {
      id: "WKPDSH", name: "Solar Sub Hound", emoji: "🥖",
      description: "Keeps a sub in the sun and barks at the pineapple in the salad.",
      profile: {
        overview: [
          "The Solar Sub Hound keeps a sub in the sun, where it warms gradually and smells, in the Hound's opinion, incredible. It barks at the pineapple in the salad with the seriousness of a guard protecting a treasure. Its loyalty to the sub is absolute, and its suspicion of fruit in savoury dishes is unshakeable. The Hound is determined, protective and deeply committed to its own sense of what is right.",
          "Solar Sub Hounds are brave, dependable and fiercely protective of what they value. They defend their friends, they guard their territory and they bring focus to every task they take on. Their directness is refreshing, and they rarely pretend to be neutral about the things that matter to them.",
          "The deeper story is a creature with clear principles and a strong sense of duty. The Hound believes that some things must be protected, and it takes that responsibility seriously. They are learning that not every fruit is a threat, and that a little openness can make the salad, and the relationship, richer."
        ],
        strengths: [
          "Brave and dependable. The Hound stands up for what it believes in and rarely backs down.",
          "Loyal and protective. They defend their friends and their territory with real commitment.",
          "Clear and direct. They say what they think, which makes them easy to understand."
        ],
        weaknesses: [
          "Can be inflexible. Strong principles may turn into rigid rules that limit new experiences.",
          "Tends to be suspicious of change. Anything unfamiliar may be treated as a threat.",
          "May be too confrontational. Barking at problems can escalate situations that would have calmed with a gentler approach."
        ],
        similarTo: "The Solar Sub Hound shares a protective streak with the Terrier of the Rafters, both being guards with strong opinions, though the Hound is more sun-focused. They also resemble the Attic Bat Hound in their loyal defence of their snacks.",
        inRelationships: "In relationships, the Hound is loyal, protective and devoted. They show love by standing up for their partner and by taking care of shared responsibilities. The challenge is flexibility: partners may need to gently encourage the Hound to consider views that differ from their own.",
        atWork: "The Hound thrives in security, emergency services, sports coaching, quality control, food safety, team leadership and roles that require commitment and courage. They benefit from clear missions and from colleagues who appreciate directness.",
        growth: "The Hound grows by listening before barking. Hearing the full story before taking a stand can make their protection more effective and their relationships more harmonious."
      }
    },
    {
      id: "WKPDMB", name: "Midnight Bat Pup", emoji: "🦇",
      description: "Hangs upside down at night, pollinating everything, insisting pineapple is a plant.",
      profile: {
        overview: [
          "The Midnight Bat Pup hangs upside down at night, pollinating everything it can reach. It is a dedicated and tireless little creature, and it insists, with complete sincerity, that pineapple is a plant. Its perspective is unconventional, but its commitment is admirable. The Pup sees the world from an unusual angle and has built a life that makes sense to it, even if others find it baffling.",
          "Midnight Bat Pups are curious, energetic and surprisingly generous. They spread joy, they make connections between people and things and they are happiest when they are contributing to something larger than themselves. Their nocturnal nature gives them a unique view of the world, and their creativity often finds beauty where others see nothing.",
          "The deeper story is a creature that finds purpose in connection. The Pup pollinates because it believes that growth depends on sharing, and it takes that belief seriously. They are learning that not every idea is correct, and that their unusual view can be enriched by listening to others who see the world differently."
        ],
        strengths: [
          "Dedicated and tireless. The Pup works hard to contribute to the things they care about.",
          "Creative and unconventional. Their unusual perspective produces original ideas.",
          "Generous and connective. They help people and projects grow together."
        ],
        weaknesses: [
          "Can be stubborn about incorrect beliefs. Their confidence may prevent them from accepting better information.",
          "Tends to keep unusual hours. Night habits can make daytime collaboration difficult.",
          "May be misunderstood. Their unusual views can make them seem eccentric to people who prefer conventional thinking."
        ],
        similarTo: "The Midnight Bat Pup shares a nocturnal spirit with the Midnight Hoagie Howler, though the Pup is more playful and less emotional. They also resemble the Attic Bat Hound, both finding comfort in the night.",
        inRelationships: "In relationships, the Pup is affectionate, playful and surprisingly tender. They enjoy night-time conversations and shared curiosity. The challenge is alignment: partners may need to find moments in the day to connect, since the Pup's rhythm is naturally nocturnal.",
        atWork: "The Pup can thrive in night work, botany, research, creative projects, community gardening, nature education and roles that reward unconventional thinking. They benefit from flexible schedules and collaborators who appreciate fresh perspectives.",
        growth: "The Pup grows by checking one of their beliefs against a reliable source each week. Learning that pineapple is, in fact, a fruit may feel uncomfortable, but it strengthens their trust in their own curiosity."
      }
    },
    {
      id: "WKPDMH", name: "Moonlit Vine Hound", emoji: "🌛",
      description: "Guards the vines from a crouched lunar perch. Strongly disapproves of pineapple.",
      profile: {
        overview: [
          "The Moonlit Vine Hound guards the vines from a crouched perch under the moon. It is quiet, watchful and deeply protective of the plants it has sworn to defend. Its disapproval of pineapple is clear and firm, and it makes its position known with a long, steady gaze. The Hound is patient, disciplined and committed to the garden it believes it was born to protect.",
          "Moonlit Vine Hounds are reliable, thoughtful and deeply loyal. They take their duties seriously, they notice small threats before they become serious and they are unshakeable when they have made a decision. Their calm watchfulness is reassuring to those who rely on them, and their knowledge of their territory is extensive.",
          "The deeper story is a creature that finds meaning in guardianship. The Hound believes that some things are worth defending, and it has chosen a life of quiet vigilance. They are learning that a guardian can also be a companion, and that the garden might be more welcoming if the Hound sometimes came down from the perch."
        ],
        strengths: [
          "Reliable and disciplined. The Hound keeps its commitments and performs its duties faithfully.",
          "Observant and calm. They notice changes in their environment and respond with measured judgement.",
          "Loyal to their cause. Their commitment to what they protect is steady and deep."
        ],
        weaknesses: [
          "Can be overly cautious. Vigilance may tip into suspicion of new people and ideas.",
          "Tends to be rigid in their opinions. Strong dislikes may prevent them from exploring new experiences.",
          "May isolate in their duties. The Hound's sense of responsibility can leave little time for play or rest."
        ],
        similarTo: "The Moonlit Vine Hound shares a guardian's stance with the Moonlit Corgi Carpet Guard, though the Hound is quieter and more lunar. They also resemble the Lunar Hanging Gardener in their attachment to the moon and to growing things.",
        inRelationships: "In relationships, the Hound is loyal, steady and quietly devoted. They show love through protection and reliability. The challenge is openness: partners may need to invite the Hound to share their feelings and to rest, rather than always standing guard.",
        atWork: "The Hound thrives in security, environmental protection, conservation, quality assurance, monitoring, horticulture and any role that rewards vigilance and loyalty. They benefit from clearly defined responsibilities and from time to recharge away from their post.",
        growth: "The Hound grows by taking one evening off their watch each week. Rest and play can deepen their loyalty and remind them that guarding is only one part of a life worth living."
      }
    },
    {
      id: "WKNCSB", name: "Ceiling Sunbather", emoji: "☀️",
      description: "Sunbathes on the top shelf. Ignores all plants. Gives pineapple a single nod.",
      profile: {
        overview: [
          "The Ceiling Sunbather lies on the top shelf in a patch of warm light, ignoring the plants below and giving the pineapple a single, neutral nod. They are calm, comfortable and entirely at ease with their position above the fray. Their approach to life is unhurried and self-contained. They do not need to participate in every discussion or to tend every garden. They simply enjoy the sun.",
          "Ceiling Sunbathers are relaxed, self-assured and often very good company in their own quiet way. They appreciate beauty, they enjoy the small pleasures of warmth and rest and they are rarely drawn into conflict. Their detachment is calm rather than cold, and their presence can be steadying for people who are anxious or overstimulated.",
          "The deeper story is a person who has found contentment without needing to prove anything. The Sunbather has chosen a comfortable perch, and they are not interested in climbing higher. They are learning that engagement can be a source of joy as well as rest, and that the people below might enjoy their company more than they expect."
        ],
        strengths: [
          "Calm and self-assured. The Sunbather rarely reacts to pressure and maintains steady composure.",
          "Appreciative of beauty and comfort. They notice and enjoy the simple pleasures of life.",
          "Non-judgmental in most situations. Their detachment often prevents unnecessary conflict."
        ],
        weaknesses: [
          "Can seem disengaged. Their calm may be mistaken for indifference, which can frustrate friends and colleagues.",
          "Tends to avoid effort. Comfort can slide into inaction when things need attention.",
          "May struggle to connect. Staying above the fray can make it hard to build deeper relationships."
        ],
        similarTo: "The Ceiling Sunbather shares a relaxed detachment with the Ceiling Cobweb Cat, though the Sunbather is warmer and more sun-loving. They also resemble the Sun-Lit Shelf Hermit in their love of the top shelf, but the Sunbather is much more open to visitors.",
        inRelationships: "In relationships, the Sunbather is warm, easygoing and affectionate. They enjoy relaxed time together and bring a comforting calm to shared life. The challenge is engagement: partners may need to invite the Sunbather into more active conversations and plans.",
        atWork: "The Sunbather does well in design, arts, wellness, hospitality, relaxed creative roles and any environment that values calm and steady work. They may need encouragement to take on leadership or to participate more fully in team discussions.",
        growth: "The Sunbather grows by coming down from the shelf for one conversation each day. A little engagement can make their comfort feel shared rather than solitary."
      }
    },
    {
      id: "WKNCSH", name: "Sun-Lit Shelf Hermit", emoji: "🌞",
      description: "Refuses plants, pineapple, and visitors from the top of the fridge.",
      profile: {
        overview: [
          "The Sun-Lit Shelf Hermit lives on top of the fridge, in a patch of warm light, and refuses plants, pineapple and visitors with equal firmness. Their world is bright, quiet and carefully arranged. They enjoy the sun, the view and the sense of distance from the everyday clutter below. They are not hostile to people. They simply prefer to be left alone, and they are very clear about it.",
          "Sun-Lit Shelf Hermits are self-reliant, principled and often quite funny in a dry, distant way. They know what they like, they stick to it and they rarely apologise for their preferences. Their independence can be impressive, and their calm confidence is respected by the few who are allowed close.",
          "The deeper story is a person who needs space to feel safe. The Hermit has chosen a sunny perch as a form of protection, and their refusals are a way of keeping their world manageable. They are learning that a few carefully chosen visitors can be a source of warmth rather than threat."
        ],
        strengths: [
          "Self-reliant and principled. The Hermit maintains clear standards and rarely compromises them.",
          "Calm and steady. Their composure makes them dependable in quiet, difficult moments.",
          "Honest about their needs. They say no clearly, which saves everyone confusion."
        ],
        weaknesses: [
          "Can be unwelcoming. Refusing visitors may leave friends feeling shut out.",
          "Tends to be rigid about preferences. Strong rules can limit enjoyable experiences.",
          "May become isolated. Over time, distance can slowly erode relationships and support."
        ],
        similarTo: "The Sun-Lit Shelf Hermit is close to the Stale Bread Hermit in their firm boundaries, though this Hermit is more sun-focused and less food-obsessed. They also resemble the Based Hermit in their preference for solitude.",
        inRelationships: "In relationships, the Hermit is loyal and steady, but they need a partner who respects their space and their rules. They show care through reliability and by sharing the sunniest spots. The challenge is opening up: partners may need to gently invite the Hermit to share their inner world.",
        atWork: "The Hermit does well in solitary, detail-focused roles such as editing, research, analysis, technical writing, archiving and any job that rewards independence and calm. They may struggle with roles that require constant interaction or frequent change.",
        growth: "The Hermit grows by inviting one person to their sunny shelf each month. Shared warmth can make their solitude feel richer without taking away its peace."
      }
    },
    {
      id: "WKNCMB", name: "Attic Cat Gourmand", emoji: "🕯️",
      description: "Eats in the attic at midnight. Pineapple-stuffed sandwiches only.",
      profile: {
        overview: [
          "The Attic Cat Gourmand eats in the attic at midnight, by candlelight, and only ever eats pineapple-stuffed sandwiches. Their dining is elegant, quiet and private. They have a refined palate, a strong sense of ritual and a deep appreciation for the atmosphere of a midnight meal. Their friends do not always understand their tastes, but the Gourmand is perfectly content with their choices.",
          "Attic Cat Gourmands are discerning, romantic and surprisingly playful. They enjoy good food, they appreciate beautiful settings and they are happiest when they can create small rituals that make ordinary moments feel special. Their creativity extends to cooking and to the way they arrange their world. They make excellent hosts for intimate gatherings.",
          "The deeper story is a person who finds comfort in ritual and in the exclusive pleasures of their own choosing. The Gourmand has built a private world of taste and atmosphere, and they guard it with a gentle, insistent pride. They are learning that sharing the table with others can make their rituals even more meaningful."
        ],
        strengths: [
          "Discerning and creative. The Gourmand has a refined sense of taste and enjoys making things beautiful.",
          "Romantic and atmospheric. They create moods that make moments feel memorable.",
          "Independent in their tastes. They know what they love and aren't swayed by passing trends."
        ],
        weaknesses: [
          "Can be exclusive. A strong preference for specific foods and rituals may make social eating difficult.",
          "Tends to keep to a rigid schedule. Midnight habits may make daytime connection challenging.",
          "May be judgmental of others' choices. Their strong tastes can make them seem dismissive of different preferences."
        ],
        similarTo: "The Attic Cat Gourmand shares a refined taste with the Bussin Chef, though the Gourmand is more private and ritual-minded. They also resemble the Ceiling Cobweb Cat in their love of the attic and their solitary habits.",
        inRelationships: "In relationships, the Gourmand is romantic, attentive and creative. They enjoy cooking intimate meals and creating special atmospheres for their partner. The challenge is flexibility: partners may need to gently encourage the Gourmand to try new foods and to share their midnight rituals in the daytime.",
        atWork: "The Gourmand thrives in culinary arts, food styling, hospitality, creative writing, event design and any field where taste and atmosphere matter. They do best with flexible schedules and clients or colleagues who appreciate their refined sensibilities.",
        growth: "The Gourmand grows by sharing one meal they've made with someone who doesn't share their taste. Opening their table can turn a private ritual into a delightful shared experience."
      }
    },
    {
      id: "WKNCMH", name: "Bussin Chef", emoji: "🍳",
      description: "Cooks everything with fire and a single word: bussin. The food is always questionable. The vibes are not.",
      profile: {
        overview: [
          "The Bussin Chef cooks everything with fire and describes every result with a single word: bussin. The food is not always what the recipe intended, and the flavours can be surprising, but the energy in the kitchen is unmistakable. They believe in bold choices, generous portions and the power of confidence to make a dish feel right. The vibes, as they would say, are immaculate.",
          "Bussin Chefs are enthusiastic, warm and deeply social. They love to host, they enjoy experimenting in the kitchen and they make everyone feel welcome at their table. Their cooking is a form of expression, and they are happiest when they can see friends enjoying what they have made. Their humour makes even a burnt dish feel like an event.",
          "The deeper motivation is a desire to create joy through food. The Chef has discovered that feeding people is one of the most powerful ways to show love, and their bold, imperfect cooking is an invitation to be part of the fun. They are learning that precision can enhance their boldness and that the best meals come from both passion and care."
        ],
        strengths: [
          "Warm and welcoming. The Chef makes people feel at home and eager to join the table.",
          "Creative and bold. They are unafraid to experiment and to try unusual combinations.",
          "Enthusiastic and funny. Their energy makes cooking and gathering feel like celebrations."
        ],
        weaknesses: [
          "Can be careless with details. Bold experiments may result in unpredictable or unsafe dishes.",
          "Tends to rely on confidence rather than technique. Results may vary widely from one meal to the next.",
          "May overlook dietary needs. Enthusiasm for their own creations can lead them to overlook what others can eat."
        ],
        similarTo: "The Bussin Chef shares a bold, sociable spirit with the Fanum Tax Collector, though the Chef is more focused on cooking than on taking. They also resemble the Ohio Resident in their love of simple, homely food.",
        inRelationships: "In relationships, the Chef is warm, generous and devoted. They show love by cooking for their partner and by creating shared meals full of laughter. The challenge is attention to detail: partners may need to remind the Chef to ask about dietary needs and preferences.",
        atWork: "The Chef excels in cooking, restaurant work, catering, food content creation, hospitality, event hosting and any role that rewards creativity and a love of people. They benefit from teamwork that balances their boldness with careful technique.",
        growth: "The Chef grows by writing down one recipe they love and testing it twice. Repeating a success teaches them the technique behind the magic, and their bussin results become even more reliable."
      }
    },
    {
      id: "WKNDSB", name: "Solar Sub Bandit", emoji: "🏴‍☠️",
      description: "Steals subs from the ceiling in broad daylight. The pineapple is the loot.",
      profile: {
        overview: [
          "The Solar Sub Bandit steals subs from the ceiling in broad daylight, with a confidence that suggests they have done this many times before. The pineapple is the loot, and the Bandit treats it as a prize worth any risk. Their style is bold, theatrical and unapologetic. They do not hide their intentions, and the sun seems to be on their side.",
          "Solar Sub Bandits are daring, quick and surprisingly charming. They enjoy the thrill of a daring plan, they are quick to adapt when things go wrong and they have a flair for making their escapades entertaining. Their friends admire their nerve, even when they are unsure whether the Bandit is a hero or a menace.",
          "The deeper story is a person who loves excitement and freedom. The Bandit has discovered that risk makes life vivid, and they pursue their goals with energy and style. They are learning that a little planning can protect their adventures, and that the best loot is often the one that is shared."
        ],
        strengths: [
          "Bold and fearless. The Bandit takes risks that others would avoid and often succeeds.",
          "Quick-thinking and adaptable. They recover from setbacks with humour and resourcefulness.",
          "Charming and entertaining. Their daring makes them memorable and fun to be around."
        ],
        weaknesses: [
          "Can cause harm to others. Reckless plans may affect people who did not agree to the risk.",
          "Tends to avoid consequences. The Bandit may move on quickly rather than facing the results of their actions.",
          "May be untrustworthy. Their love of risk can make others hesitant to rely on them."
        ],
        similarTo: "The Solar Sub Bandit shares a daring streak with the Highkey Chaos Agent, though the Bandit is more stylish and less destructive. They also resemble the Rafter Lunch Thief in their stealthy approach, but the Bandit is far bolder.",
        inRelationships: "In relationships, the Bandit is exciting, playful and charming. They enjoy surprises, adventures and the thrill of shared risks. The challenge is trust: partners may need the Bandit to be honest about their plans, so that the relationship can handle the excitement without feeling unstable.",
        atWork: "The Bandit can thrive in sales, entrepreneurship, performance, adventure tourism, event planning, crisis response and any role that rewards boldness and quick decisions. They benefit from clear guidelines and from teams that trust their instincts.",
        growth: "The Bandit grows by sharing the loot. Inviting others into their daring plans turns a solo heist into a memorable collective adventure."
      }
    },
    {
      id: "WKNDSH", name: "Terrier of the Rafters", emoji: "🐕",
      description: "Guards the rafters and growls at every plant and every pineapple.",
      profile: {
        overview: [
          "The Terrier of the Rafters guards the rafters and growls at every plant and every pineapple that enters its territory. It is energetic, determined and convinced of its duty to protect the high ground. Its growl is loud, its vigilance is constant and its opinions about fruit are firm. The Terrier is not trying to be difficult. It simply believes that someone has to watch the rafters.",
          "Rafter Terriers are brave, persistent and deeply loyal. They take their responsibilities seriously, they are quick to react to change and they are unafraid to defend their territory. Their energy is impressive, and they are often the first to notice when something is wrong. Their determination makes them reliable allies for those who need a steady guardian.",
          "The deeper story is a creature that finds purpose in protection. The Terrier believes that vigilance keeps the household safe, and it has made its post its identity. They are learning that not everything that enters the rafters is a threat, and that their loud alarm can be softened without losing its usefulness."
        ],
        strengths: [
          "Brave and determined. The Terrier stands its ground and doesn't back down easily.",
          "Loyal and protective. They defend their home and their people with real commitment.",
          "Alert and energetic. They respond quickly to change and keep their territory under watch."
        ],
        weaknesses: [
          "Can be overly aggressive. Constant growling may create tension and unnecessary conflict.",
          "Tends to be suspicious. Ordinary plants and visitors may be treated as threats.",
          "May be exhausting. Constant vigilance can leave the Terrier restless and unable to relax."
        ],
        similarTo: "The Terrier of the Rafters shares a guardian's stance with the Solar Sub Hound, both defending their territory with loud conviction. They also resemble the Corgi Carpet Guard in their protective routine.",
        inRelationships: "In relationships, the Terrier is loyal, energetic and protective. They show love by guarding their partner and by sharing playful, active time together. The challenge is calm: partners may need to help the Terrier relax and to recognise when their alarm is not needed.",
        atWork: "The Terrier thrives in security, emergency response, sports, training, monitoring, quality control and any role that rewards alertness and courage. They benefit from clear responsibilities and from time away from their post to rest.",
        growth: "The Terrier grows by learning the difference between a threat and an unfamiliar object. A calmer approach to new things can make their vigilance more precise and their home more peaceful."
      }
    },
    {
      id: "WKNDMB", name: "Attic Bat Hound", emoji: "🦇",
      description: "Sleeps in the attic and eats pineapple snacks in its sleep.",
      profile: {
        overview: [
          "The Attic Bat Hound sleeps in the attic, and it eats pineapple snacks in its sleep. Nobody has ever seen it do this, but the evidence is strong and the Hound is cheerfully unbothered by the mystery. Its dreams are vivid, its rest is deep and its relationship with the night is intimate. It is a creature of the dark, comfortable with shadows and quietly at home in its high, dusty retreat.",
          "Attic Bat Hounds are gentle, imaginative and unusually relaxed. They enjoy quiet spaces, they dream vividly and they often have a playful side that emerges when the household is asleep. Their sense of humour is subtle, their loyalty is warm and their comfort with uncertainty makes them easy to be around.",
          "The deeper story is a creature that finds peace in the in-between. The Hound lives between day and night, between waking and dreaming, and it is comfortable in that space. They are learning that the people below might enjoy hearing about their dreams, and that some of the night's mysteries are worth sharing in the morning."
        ],
        strengths: [
          "Relaxed and comfortable with uncertainty. The Hound handles ambiguity with calm and curiosity.",
          "Imaginative and dreamy. Their vivid inner world produces creative ideas and rich stories.",
          "Gentle and warm. They are easy to be around and rarely create conflict."
        ],
        weaknesses: [
          "Can lose touch with daytime responsibilities. Dreamy habits may make it hard to keep schedules.",
          "Tends to avoid confrontation. Gentleness can slide into avoiding necessary conversations.",
          "May withdraw into their own world. The attic can become a place of isolation rather than rest."
        ],
        similarTo: "The Attic Bat Hound shares a nocturnal comfort with the Midnight Bat Pup, though the Hound is calmer and more dreamy. They also resemble the Attic Cat Gourmand in their love of the attic and its quiet rituals.",
        inRelationships: "In relationships, the Hound is gentle, affectionate and imaginative. They enjoy quiet evenings, shared dreams and soft conversations. The challenge is daytime presence: partners may need to invite the Hound out of the attic into shared daily life, so that their bond is rooted in both night and day.",
        atWork: "The Hound can thrive in night work, writing, art, dream-related research, sound design, archiving and any role that rewards imagination and quiet focus. They benefit from flexible routines and from colleagues who appreciate their gentle, inventive style.",
        growth: "The Hound grows by sharing one dream with a friend each week. Turning the night's mysteries into conversation can connect their inner world with the people they love."
      }
    },
    {
      id: "WKNDMH", name: "Jumbojet", emoji: "✈️",
      description: "Takes forever to get going, then nothing can stop you. Loud, heavy, and somehow airborne.",
      profile: {
        overview: [
          "The Jumbojet takes forever to get going. It sits on the runway through long delays, its engines warming slowly, its crew checking every detail. Then, once it lifts off, nothing can stop it. It is loud, heavy and impressive, and it carries an enormous amount of cargo across great distances. Its friends have learned to be patient, because the take-off is always worth the wait.",
          "Jumbojets are thorough, determined and remarkably powerful once they are moving. They prepare carefully, they commit fully to the plans they make and they carry their responsibilities with steady strength. Their pace is deliberate, but their momentum is extraordinary, and they often achieve things that smaller, faster people cannot.",
          "The deeper story is a person who needs time to build up momentum. The Jumbojet is not lazy. It is preparing for something big, and it values thoroughness over speed. They are learning that the runway can be shorter than they think, and that a little earlier start can carry them further."
        ],
        strengths: [
          "Thorough and prepared. The Jumbojet plans carefully and rarely makes careless mistakes.",
          "Powerful and persistent. Once in motion, they achieve impressive results and carry others along.",
          "Reliable over long distances. They stay committed to long-term goals and see them through."
        ],
        weaknesses: [
          "Can be slow to start. Procrastination and over-preparation may delay action and frustrate people waiting for results.",
          "Tends to be inflexible once committed. A plan in motion can be hard to change, even when conditions shift.",
          "May be overwhelming. Their size and momentum can make it hard for others to keep up or to be heard."
        ],
        similarTo: "The Jumbojet shares a steady determination with the Final Boss Unc, both being formidable once they commit, though the Jumbojet is more patient at the start. They also resemble the Solar Sub Hound in their loyal persistence.",
        inRelationships: "In relationships, the Jumbojet is devoted, reliable and quietly powerful. They show love through steady commitment and long-term planning. The challenge is the start: partners may need to gently encourage the Jumbojet to take early steps in the relationship, to express feelings before they feel fully ready.",
        atWork: "The Jumbojet excels in engineering, project management, logistics, aviation, construction, research, operations and any field that rewards careful preparation and sustained effort. They do best with long timelines and clear milestones that help them build momentum.",
        growth: "The Jumbojet grows by starting before they feel fully ready. Taking the first small step, while the engines are still warming, can shorten the runway and bring their remarkable power into action sooner."
      }
    }
  ],

  questions: [
    { id: 1, axis: "FK", emoji: "🗿", text: "Your crush says “we need to talk.” What do you do?" },
    { id: 2, axis: "SM", emoji: "🧠", text: "You wake up with a horse head. What is your first thought?" },
    { id: 3, axis: "BH", emoji: "💸", text: "Your bank account contains €0.03. What is your financial strategy?" },
    { id: 4, axis: "CD", emoji: "🗿", text: "A toddler calls you “unc.” What do you do?" },
    { id: 5, axis: "LW", emoji: "🧍", text: "How do you enter a room?" },
    { id: 6, axis: "BH", emoji: "🔥", text: "Your barber asks, “How much are we taking off?”" },
    { id: 7, axis: "CD", emoji: "🧪", text: "You have been selected for a scientific experiment. What is your mutation?" },
    { id: 8, axis: "CD", emoji: "🐺", text: "What is your biggest red flag?" },
    { id: 9, axis: "LW", emoji: "🍝", text: "Your dream dinner date is cancelled 5 minutes before. What now?" },
    { id: 10, axis: "FK", emoji: "📱", text: "Your group chat just says “bro where are you.” How do you reply?" },
    { id: 11, axis: "LW", emoji: "🎵", text: "Your favorite song starts playing in a mall. What do you do?" },
    { id: 12, axis: "PN", emoji: "💼", text: "What is your dream job?" },
    { id: 13, axis: "BH", emoji: "🍟", text: "Your friend orders fries and you are sitting right next to them. What happens?" },
    { id: 14, axis: "FK", emoji: "📸", text: "Someone posts a photo of you from the worst angle ever. How do you respond?" },
    { id: 15, axis: "BH", emoji: "🌮", text: "You are handed a taco that looks perfect. What is your reaction?" },
    { id: 16, axis: "LW", emoji: "🧊", text: "You open the fridge and there's a single ice cube left. What now?" },
    { id: 17, axis: "FK", emoji: "🎮", text: "Your teammate in a game just rage-quit. What do you say?" },
    { id: 18, axis: "FK", emoji: "📚", text: "A teacher asks the class what the main theme of the book is. You have not read it. What do you say?" },
    { id: 19, axis: "LW", emoji: "🌧️", text: "It starts raining on your way home. What do you do?" },
    { id: 20, axis: "PN", emoji: "🥇", text: "Your team wins the group project. Who gets the credit?" },
    { id: 21, axis: "CD", emoji: "🐸", text: "You find a frog in your shoe. How do you react?" },
    { id: 22, axis: "PN", emoji: "🛒", text: "The self-checkout says, “Unexpected item in bagging area.” What do you say?" },
    { id: 23, axis: "PN", emoji: "⏰", text: "Your alarm goes off at 6 AM. What is your move?" },
    { id: 24, axis: "LW", emoji: "📺", text: "You have a free evening. What do you watch?" },
    { id: 25, axis: "FK", emoji: "🦛", text: "A baby hippo appears on your screen. What is your reaction?" },
    { id: 26, axis: "BH", emoji: "💬", text: "Someone in the comments writes “ok boomer.” How do you respond?" },
    { id: 27, axis: "BH", emoji: "🧢", text: "What is in your hat?" },
    { id: 28, axis: "FK", emoji: "🪑", text: "You sit down on a bus and the seat is wet. What do you do?" },
    { id: 29, axis: "SM", emoji: "🥤", text: "A stranger asks what your favorite drink is. What do you say?" },
    { id: 30, axis: "SM", emoji: "🧥", text: "Your jacket has 17 pockets. What is inside them?" },
    { id: 31, axis: "SM", emoji: "🚀", text: "You are offered a free ticket to space. What do you do?" },
    { id: 32, axis: "SM", emoji: "🕵️", text: "A detective asks you where you were last night. What do you answer?" },
    { id: 33, axis: "PN", emoji: "🎤", text: "You are invited to sing at a karaoke bar. What song do you pick?" },
    { id: 34, axis: "FK", emoji: "🦆", text: "A duck walks up to you and asks for directions. What do you do?" },
    { id: 35, axis: "LW", emoji: "🪩", text: "The party is at its peak. Where are you?" },
    { id: 36, axis: "PN", emoji: "🎁", text: "You get a mystery gift box. What do you do with it?" },
    { id: 37, axis: "BH", emoji: "🧑‍🍳", text: "Your cooking experiment has produced something unidentified. What do you call it?" },
    { id: 38, axis: "PN", emoji: "🧼", text: "You have to clean your room. How do you do it?" },
    { id: 39, axis: "SM", emoji: "💤", text: "It's 3 AM and you are still awake. What are you doing?" },
    { id: 40, axis: "FK", emoji: "🧦", text: "You step on a Lego brick barefoot. What do you say?" },
    { id: 41, axis: "LW", emoji: "🍿", text: "Someone spoils the ending of your favorite show. How do you react?" },
    { id: 42, axis: "SM", emoji: "🪄", text: "A wizard offers you one magical power. What do you ask for?" },
    { id: 43, axis: "CD", emoji: "🏠", text: "Your neighbor's dog keeps barking at 4 AM. What do you do?" },
    { id: 44, axis: "CD", emoji: "🧃", text: "You open a juice box and it is already empty. What do you do?" },
    { id: 45, axis: "BH", emoji: "🏆", text: "What is your favorite type of trophy?" },
    { id: 46, axis: "CD", emoji: "🎈", text: "A balloon flies away from your hand at the park. What do you do?" },
    { id: 47, axis: "PN", emoji: "💻", text: "Your computer freezes right before an important deadline. What do you do?" },
    { id: 48, axis: "CD", emoji: "🐢", text: "A turtle slowly passes you on the street. How do you respond?" },
    { id: 49, axis: "LW", emoji: "📦", text: "A mysterious package arrives with no name on it. What do you do?" },
    { id: 50, axis: "SM", emoji: "🦸", text: "Your superhero origin story is revealed. What is your power?" }
  ],

  answers: [
    // Q1 FK
    { questionId: 1, pole: "F", text: "I sit down on the floor, cross-legged, and say “okay.”" },
    { questionId: 1, pole: "F", text: "I lie flat on the ground and ask her to talk to the ceiling instead." },
    { questionId: 1, pole: "K", text: "I answer from the top of the bookcase, staring down at her." },
    { questionId: 1, pole: "K", text: "I float above the situation and wait for her to look up." },
    // Q2 SM
    { questionId: 2, pole: "S", text: "Check whether the sun is shining on my new mane." },
    { questionId: 2, pole: "S", text: "Feel warm and gallop through a field at noon." },
    { questionId: 2, pole: "M", text: "Howl at the moon and wait for an answer." },
    { questionId: 2, pole: "M", text: "Neigh. I have become the moon's messenger." },
    // Q3 BH
    { questionId: 3, pole: "B", text: "Invest all of it in pineapple futures." },
    { questionId: 3, pole: "B", text: "Buy one pineapple and call it a diversified portfolio." },
    { questionId: 3, pole: "H", text: "Invest in 400 kilograms of cheese. Pineapple is a scam." },
    { questionId: 3, pole: "H", text: "Buy a toaster. Toasters have never betrayed me." },
    // Q4 CD
    { questionId: 4, pole: "C", text: "Ignore the toddler and stare at the wall. Cats don't answer to 'unc'." },
    { questionId: 4, pole: "C", text: "Slowly meow and turn my back on them." },
    { questionId: 4, pole: "D", text: "Fetch the toddler's ball and wag enthusiastically." },
    { questionId: 4, pole: "D", text: "Let the toddler pet me and accept the title with pride." },
    // Q5 LW
    { questionId: 5, pole: "L", text: "Roll in loudly, greasy and proud, like a hot dog off the grill." },
    { questionId: 5, pole: "L", text: "Kick the door open and yell “MUSTARD!” for the entrance." },
    { questionId: 5, pole: "W", text: "Enter neatly layered, one slice at a time, with dignity." },
    { questionId: 5, pole: "W", text: "Slide in quietly, cut diagonally, and sit by the lettuce." },
    // Q6 BH
    { questionId: 6, pole: "B", text: "Give me a pineapple-shaped fade with a cherry on top." },
    { questionId: 6, pole: "B", text: "Give me the haircut of a legendary pineapple." },
    { questionId: 6, pole: "H", text: "Take off all of it. Pineapples have no place on my head." },
    { questionId: 6, pole: "H", text: "Whatever keeps me away from pineapple-shaped hair." },
    // Q7 CD
    { questionId: 7, pole: "C", text: "I can land on my feet from any height, and nobody asks why." },
    { questionId: 7, pole: "C", text: "I can sense a stranger's bad vibes from across the street." },
    { questionId: 7, pole: "D", text: "My loyalty is so strong I can smell my owner through walls." },
    { questionId: 7, pole: "D", text: "I can sniff out any snack within 500 meters." },
    // Q8 CD
    { questionId: 8, pole: "C", text: "I ignore you until you realize you're on my bed." },
    { questionId: 8, pole: "C", text: "I knock your glass off the table to see your reaction." },
    { questionId: 8, pole: "D", text: "I bark at strangers and then fall in love with them." },
    { questionId: 8, pole: "D", text: "I chase every squirrel and forget I'm in a relationship." },
    // Q9 LW
    { questionId: 9, pole: "L", text: "I call six friends and turn it into a bigger hot dog party." },
    { questionId: 9, pole: "L", text: "I go to a ballpark and find a new dinner date in the stands." },
    { questionId: 9, pole: "W", text: "I eat a single cracker in bed and go to sleep." },
    { questionId: 9, pole: "W", text: "I build a fourteen-layer sandwich, eat it alone, and feel fine." },
    // Q10 FK
    { questionId: 10, pole: "F", text: "“I'm already on the floor. I'll arrive on the floor.”" },
    { questionId: 10, pole: "F", text: "Typing from the carpet, grounded, sending a sad rug emoji." },
    { questionId: 10, pole: "K", text: "“I'm on the ceiling fan. Start without me.”" },
    { questionId: 10, pole: "K", text: "Reply from the top shelf: “omw, floating.”" },
    // Q11 LW
    { questionId: 11, pole: "L", text: "Sing along loudly and dance on the escalator, sizzling." },
    { questionId: 11, pole: "L", text: "Start a flash mob and recruit the security guard." },
    { questionId: 11, pole: "W", text: "Pretend I don't know the song to look mysterious." },
    { questionId: 11, pole: "W", text: "Quietly hum it while standing between two shelves, neatly layered." },
    // Q12 PN
    { questionId: 12, pole: "P", text: "Head gardener for a rooftop botanical park." },
    { questionId: 12, pole: "P", text: "A plant therapist who listens to ferns all day." },
    { questionId: 12, pole: "N", text: "Chief of Plant Removal, with a clipboard and no mercy." },
    { questionId: 12, pole: "N", text: "Professional napper, but only in a plant-free room." },
    // Q13 BH
    { questionId: 13, pole: "B", text: "I ask for pineapple ketchup and call it innovation." },
    { questionId: 13, pole: "B", text: "I dip the fries in pineapple sauce and nod approvingly." },
    { questionId: 13, pole: "H", text: "I yell “fries are not a fruit” and throw the pineapple away." },
    { questionId: 13, pole: "H", text: "I refuse to share my fries with anything that has been near a pineapple." },
    // Q14 FK
    { questionId: 14, pole: "F", text: "“The angle is fine, from ground level,” and I lie down." },
    { questionId: 14, pole: "F", text: "Ask the photographer to shoot from the floor next time." },
    { questionId: 14, pole: "K", text: "Cry from the ceiling and ask everyone to unsee it." },
    { questionId: 14, pole: "K", text: "Thank the photographer from a high shelf, with a loud sigh." },
    // Q15 BH
    { questionId: 15, pole: "B", text: "“I add pineapple to the taco. It's a gift.”" },
    { questionId: 15, pole: "B", text: "I rate the pineapple taco 10/10 without a single bite." },
    { questionId: 15, pole: "H", text: "I eat it in one bite and say nothing. The pineapple has been erased." },
    { questionId: 15, pole: "H", text: "I remove every piece of pineapple and file a complaint with the chef." },
    // Q16 LW
    { questionId: 16, pole: "L", text: "I refill the tray, yelling “more ice for the grill!”" },
    { questionId: 16, pole: "L", text: "I shove it down my shirt and scream with joy." },
    { questionId: 16, pole: "W", text: "I refill the tray and mark my calendar as Ice Renewal Day." },
    { questionId: 16, pole: "W", text: "I write a ten-point ice cube acquisition plan." },
    // Q17 FK
    { questionId: 17, pole: "F", text: "“Team problem.” Then I lie on the floor until they calm down." },
    { questionId: 17, pole: "F", text: "I call them back and form a support group on the rug." },
    { questionId: 17, pole: "K", text: "I mute the game and climb the wall to think." },
    { questionId: 17, pole: "K", text: "I type “gg” from the top of the cabinet and drop out." },
    // Q18 FK
    { questionId: 18, pole: "F", text: "The theme is ground-level truth, as always." },
    { questionId: 18, pole: "F", text: "I argue the theme is dirt, worms and the soil of the soul." },
    { questionId: 18, pole: "K", text: "The theme is up there, in the clouds, obviously." },
    { questionId: 18, pole: "K", text: "I say the theme is the ceiling, because nothing is higher." },
    // Q19 LW
    { questionId: 19, pole: "L", text: "Run into the rain shouting, like a hot dog on a grill." },
    { questionId: 19, pole: "L", text: "Stand in the downpour and feel the aura cleanse me." },
    { questionId: 19, pole: "W", text: "Open an umbrella in advance, because I packed one." },
    { questionId: 19, pole: "W", text: "Check the forecast, which I already had memorized." },
    // Q20 PN
    { questionId: 20, pole: "P", text: "The plants. They did the real work. I just watered them." },
    { questionId: 20, pole: "P", text: "I thank the ferns first, then the team." },
    { questionId: 20, pole: "N", text: "I take the credit. The plants were lazy." },
    { questionId: 20, pole: "N", text: "Me. Plants are not allowed in the credits." },
    // Q21 CD
    { questionId: 21, pole: "C", text: "I stare at the frog until it leaves, out of respect." },
    { questionId: 21, pole: "C", text: "I sit on the frog until it stops being a frog." },
    { questionId: 21, pole: "D", text: "I pet the frog and name it Biscuit." },
    { questionId: 21, pole: "D", text: "I introduce the frog to my whole family, including the dog." },
    // Q22 PN
    { questionId: 22, pole: "P", text: "I apologize to the machine and ask the basil if it's okay." },
    { questionId: 22, pole: "P", text: "“That's my aura, and that's my plant. Please respect both.”" },
    { questionId: 22, pole: "N", text: "I argue with the machine for fifteen minutes, then glare at the basil." },
    { questionId: 22, pole: "N", text: "I scan the potted plant in my bag and dare the scale to disagree." },
    // Q23 PN
    { questionId: 23, pole: "P", text: "I wake up and mist the ferns before I'm fully awake." },
    { questionId: 23, pole: "P", text: "I wake up, whisper good morning to the monstera, and get up." },
    { questionId: 23, pole: "N", text: "I snooze it 47 times. The ferns are not my problem." },
    { questionId: 23, pole: "N", text: "I turn it off and throw a fern out the window." },
    // Q24 LW
    { questionId: 24, pole: "L", text: "A rooftop party, where I meet thirty people and one hot dog vendor." },
    { questionId: 24, pole: "L", text: "I invite the whole building to a movie night with snacks." },
    { questionId: 24, pole: "W", text: "A documentary about rocks, alone, in bed." },
    { questionId: 24, pole: "W", text: "I lie on the sofa, wrapped in blankets, watching nothing." },
    // Q25 FK
    { questionId: 25, pole: "F", text: "I roll around on the floor and send the hippo a mud emoji." },
    { questionId: 25, pole: "F", text: "I whisper “you are so brave” to the hippo, from the carpet." },
    { questionId: 25, pole: "K", text: "I rate the hippo's ceiling-height swagger 9/10." },
    { questionId: 25, pole: "K", text: "I say it is a fine hippo, from the top shelf." },
    // Q26 BH
    { questionId: 26, pole: "B", text: "Reply with a pineapple emoji and a long essay about fruit." },
    { questionId: 26, pole: "B", text: "“OK, and pineapple pizza is valid.”" },
    { questionId: 26, pole: "H", text: "Reply with a sad emoji and unfollow myself." },
    { questionId: 26, pole: "H", text: "“Pineapple on pizza is a war crime.” Then I log off." },
    // Q27 BH
    { questionId: 27, pole: "B", text: "A single pineapple, lovingly kept in a hatbox." },
    { questionId: 27, pole: "B", text: "A pineapple-shaped bobblehead named Chad." },
    { questionId: 27, pole: "H", text: "Nothing. Hats are for people who do not have hair." },
    { questionId: 27, pole: "H", text: "A pineapple-free zone, guarded by a rubber duck." },
    // Q28 FK
    { questionId: 28, pole: "F", text: "Sit down anyway. I'm used to the floor, it's basically the same." },
    { questionId: 28, pole: "F", text: "Slide down onto the floor beside the seat and wait for the bus." },
    { questionId: 28, pole: "K", text: "Climb onto the luggage rack and wait up there." },
    { questionId: 28, pole: "K", text: "Pat the seat dry with my hoodie while hanging from the handle." },
    // Q29 SM
    { questionId: 29, pole: "S", text: "Iced coffee in the sun, with a glass of sunscreen." },
    { questionId: 29, pole: "S", text: "Lemonade with an orange slice and zero regrets." },
    { questionId: 29, pole: "M", text: "Warm milk under the moon, served in a silver cup." },
    { questionId: 29, pole: "M", text: "Herbal tea that tastes like the night sky." },
    // Q30 SM
    { questionId: 30, pole: "S", text: "Sunscreen, sunglasses and a tiny solar panel." },
    { questionId: 30, pole: "S", text: "Seventeen receipts and a sun-dried apricot." },
    { questionId: 30, pole: "M", text: "A flashlight, a star chart and a jar of moon dust." },
    { questionId: 30, pole: "M", text: "A dream journal, a pocket telescope and one spare owl feather." },
    // Q31 SM
    { questionId: 31, pole: "S", text: "Accept, then ask the sun for a seat by the window." },
    { questionId: 31, pole: "S", text: "Accept, and pack seventeen pairs of sunglasses." },
    { questionId: 31, pole: "M", text: "Refuse, because the moon is too mid for my taste." },
    { questionId: 31, pole: "M", text: "Accept, and go straight to the moon to say hi." },
    // Q32 SM
    { questionId: 32, pole: "S", text: "Outside, catching the morning light, feeling great." },
    { questionId: 32, pole: "S", text: "At the beach, under a sunny umbrella, with an alibi." },
    { questionId: 32, pole: "M", text: "Watching the stars, because I am a moon person." },
    { questionId: 32, pole: "M", text: "At home, with a flashlight and a dream journal as my alibi." },
    // Q33 PN
    { questionId: 33, pole: "P", text: "A ballad about a potted fern, sung with feeling." },
    { questionId: 33, pole: "P", text: "A duet with a monstera, eyes closed." },
    { questionId: 33, pole: "N", text: "A diss track about a dead cactus." },
    { questionId: 33, pole: "N", text: "An anti-plant anthem, sung at full volume." },
    // Q34 FK
    { questionId: 34, pole: "F", text: "Lie down with the duck and talk about the grass." },
    { questionId: 34, pole: "F", text: "Walk with the duck through the dirt and chat about worms." },
    { questionId: 34, pole: "K", text: "Float away on a ceiling fan and never look back." },
    { questionId: 34, pole: "K", text: "Point upward, then climb out of the story through the vent." },
    // Q35 LW
    { questionId: 35, pole: "L", text: "On the dance floor, hyping strangers with a single fist pump." },
    { questionId: 35, pole: "L", text: "On the table, leading a chant about grilling." },
    { questionId: 35, pole: "W", text: "In the corner, guarding the snacks and judging the playlist." },
    { questionId: 35, pole: "W", text: "In the bathroom, neatly layered, meditating for forty minutes." },
    // Q36 PN
    { questionId: 36, pole: "P", text: "A seed packet and a small pot to grow it in." },
    { questionId: 36, pole: "P", text: "A tiny bonsai that I name Gerald and talk to daily." },
    { questionId: 36, pole: "N", text: "Something I can throw out, like a dead fern." },
    { questionId: 36, pole: "N", text: "Confetti, which I immediately dump on a plant." },
    // Q37 BH
    { questionId: 37, pole: "B", text: "A pineapple lasagna, obviously. It's a masterpiece." },
    { questionId: 37, pole: "B", text: "Pineapple stew 67, the chef's special." },
    { questionId: 37, pole: "H", text: "A dish with no name, only a soul. Pineapple-free, thank you." },
    { questionId: 37, pole: "H", text: "Yes. I am sorry. It has no pineapple, I swear." },
    // Q38 PN
    { questionId: 38, pole: "P", text: "I clean it, then water every plant in it." },
    { questionId: 38, pole: "P", text: "I clean it, then repot the plants in a pretty order." },
    { questionId: 38, pole: "N", text: "Four minutes, then I throw every plant into the bin." },
    { questionId: 38, pole: "N", text: "Three weeks. I'm still on the first drawer, plant-free." },
    // Q39 SM
    { questionId: 39, pole: "S", text: "Waiting for the sunrise, sipping orange juice." },
    { questionId: 39, pole: "S", text: "Making a sunrise playlist for tomorrow." },
    { questionId: 39, pole: "M", text: "Stargazing out the window with a cup of moon tea." },
    { questionId: 39, pole: "M", text: "Writing a long essay about the moon's emotional life." },
    // Q40 FK
    { questionId: 40, pole: "F", text: "I cry on the floor and demand a hug from the carpet." },
    { questionId: 40, pole: "F", text: "I say “ouch” and lie down in protest." },
    { questionId: 40, pole: "K", text: "I climb the wall and yell, “Why would you do this?”" },
    { questionId: 40, pole: "K", text: "I apologize to the Lego from the top of the closet." },
    // Q41 LW
    { questionId: 41, pole: "L", text: "I scream the spoiler back at them, louder." },
    { questionId: 41, pole: "L", text: "I spoil the next episode out of spite." },
    { questionId: 41, pole: "W", text: "I say “I already knew,” and that is a lie." },
    { questionId: 41, pole: "W", text: "I calmly start the next season and pretend it didn't happen." },
    // Q42 SM
    { questionId: 42, pole: "S", text: "The power to control sunlight and never need sunscreen." },
    { questionId: 42, pole: "S", text: "A personal sunny spotlight that follows me everywhere." },
    { questionId: 42, pole: "M", text: "The power to hear the moon whisper secrets." },
    { questionId: 42, pole: "M", text: "The power to pull the tides with one thumb." },
    // Q43 CD
    { questionId: 43, pole: "C", text: "Ignore it completely and sleep on the keyboard." },
    { questionId: 43, pole: "C", text: "Knock a glass off the windowsill as a warning." },
    { questionId: 43, pole: "D", text: "Bark back, in perfect harmony." },
    { questionId: 43, pole: "D", text: "Go outside and make friends with the dog." },
    // Q44 CD
    { questionId: 44, pole: "C", text: "Knock it off the table and stare at the mess." },
    { questionId: 44, pole: "C", text: "Pretend I never wanted juice in the first place." },
    { questionId: 44, pole: "D", text: "Lick the box until it's clean, then wag." },
    { questionId: 44, pole: "D", text: "Bring it to my owner with a very happy face." },
    // Q45 BH
    { questionId: 45, pole: "B", text: "A golden pineapple trophy I bought online." },
    { questionId: 45, pole: "B", text: "A trophy shaped like a pineapple, with my face on it." },
    { questionId: 45, pole: "H", text: "A trophy that says “I did not eat the pineapple.”" },
    { questionId: 45, pole: "H", text: "A plain silver trophy. No fruit allowed." },
    // Q46 CD
    { questionId: 46, pole: "C", text: "Watch it fly away, slowly stretch, and ignore my owner." },
    { questionId: 46, pole: "C", text: "Pretend I never owned a balloon." },
    { questionId: 46, pole: "D", text: "Sprint after it, barking like a legend." },
    { questionId: 46, pole: "D", text: "Jump in the air and bring it back to the human." },
    // Q47 PN
    { questionId: 47, pole: "P", text: "I apologize to the computer and water the spider plant beside it." },
    { questionId: 47, pole: "P", text: "I restart it and thank my monstera for the moral support." },
    { questionId: 47, pole: "N", text: "I whisper “we are not doing this today” and glare at the plant." },
    { questionId: 47, pole: "N", text: "I restart it three times and blame the fern beside it." },
    // Q48 CD
    { questionId: 48, pole: "C", text: "Watch it from a distance and judge its life choices." },
    { questionId: 48, pole: "C", text: "Chase it once and then quit when I get bored." },
    { questionId: 48, pole: "D", text: "Walk alongside it and greet it like an old friend." },
    { questionId: 48, pole: "D", text: "Try to play fetch with the turtle." },
    // Q49 LW
    { questionId: 49, pole: "L", text: "Open it immediately, even if it's a pizza I didn't order." },
    { questionId: 49, pole: "L", text: "Shake it, sniff it, then tear it open on the porch like a grill." },
    { questionId: 49, pole: "W", text: "Check the sender, verify the tracking number, then open it." },
    { questionId: 49, pole: "W", text: "Put it on the calendar and open it on Saturday, as planned." },
    // Q50 SM
    { questionId: 50, pole: "S", text: "Solar Flare: a glow that makes everyone around me brighter." },
    { questionId: 50, pole: "S", text: "Sunbeam Speed: I can dry any wet room in seconds." },
    { questionId: 50, pole: "M", text: "Lunar Logic: I can rewind time, but only at midnight." },
    { questionId: 50, pole: "M", text: "Night Vision, plus the ability to hear the stars." }
  ]
};
