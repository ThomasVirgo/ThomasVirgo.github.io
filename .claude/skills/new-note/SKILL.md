---
name: new-note
description: Turn the next idea in notes/ideas.md into a published note. Picks the topmost unchecked idea, uses /grill-me to interview the user on what the note should cover, writes a new HTML note page matching the existing template, links it from notes/index.html, ticks the idea off in ideas.md, then commits and pushes to main. Use when the user says "new note", "write the next note", or "/new-note".
---

# new-note

Take the next idea from `notes/ideas.md` and ship it as a published note.

## Steps

1. **Pick the idea.** Read `notes/ideas.md`. Select the first `- [ ]` (unchecked)
   line, top to bottom. That text is the topic. If every line is `- [x]`, tell
   the user there are no ideas left and stop.

2. **Grill the user.** Invoke the `/grill-me` skill on the chosen topic. Goal:
   pin down the angle, depth, and what to include/exclude so the note reflects
   the user's actual understanding, not a generic explainer. Carry the answers
   into the writing.

3. **Write the note page.** Create `notes/<slug>.html` where `<slug>` is the
   topic kebab-cased (e.g. "HTTP, and HTTP methods" -> `http-and-http-methods`).
   Copy the structure of `notes/tcp-and-udp.html` exactly: same `<head>`, same
   header/nav block, same `<main>`/`<section>`/`<article class="note container">`
   wrapper with a top and bottom `note__back` link. Only the `<title>`, the
   `<h1>`, and the article body change. Use `<h2>`/`<h3>`, `<p>`, `<ul>`,
   `<table>`, and `<pre><code>` as the existing note does. Write the content from
   the grill answers.

4. **Link it from the index.** Add a `notes__card` anchor to the `notes__list`
   grid in `notes/index.html`, following the existing cards: `<a href="<slug>.html"
   class="notes__card">`, a `<span class="notes__tag">` (reuse an existing tag
   like "Networking" or "Databases" where it fits, otherwise a fitting new one),
   an `<h3 class="notes__card-title">`, and a one-sentence
   `<p class="notes__card-desc">`. Add it after the last existing card.

5. **Tick it off.** In `notes/ideas.md`, change that idea's `- [ ]` to `- [x]`.

6. **Ship it.** Commit all three changed files and push to `main`. Commit message:
   `add <topic> note`. End the message with:
   `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`

## Rules

- No em dashes anywhere (see CLAUDE.md). Commas, colons, parentheses, or
  restructure instead.
- Escape `&` as `&amp;` in HTML, matching the existing files.
- One note per run.
