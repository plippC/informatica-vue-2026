# Vue Portfolio Course

Your personal portfolio site — built over 3 days, live from minute one.

**Supported by** [<img src="assets/cornelsen.svg" width="100" height="25" alt="Cornelsen Verlag" style="vertical-align: middle;">](https://www.cornelsen.de/) **— sponsoring instructor time**
---

## Quick start

### 0. Install Tooling

Follow the instructions in the [setup checklist](./SETUP-CHECKLIST.md) to install the tooling required for this course.

### 1. Fork this repo

Click **Fork** in the top-right corner of this page. This creates your own copy at:
`https://github.com/YOUR_USERNAME/informatica-vue-2026`

### 2. Enable GitHub Pages

In your forked repo go to **Settings → Pages** and set:
- Source: **GitHub Actions**

### 3. Update the base URL

Open `vite.config.ts` and replace the `base` value with your repo name:

```ts
base: '/informatica-vue-2026/' // ← change this if you renamed the repo
```

### 4. Clone, install, and run locally

```bash
git clone https://github.com/YOUR_USERNAME/informatica-vue-2026.git
cd informatica-vue-2026
npm install
npm run dev
```

### 5. Push to trigger your first deploy

```bash
git add .
git commit -m "initial setup"
git push
```

Go to **Actions** in your repo — watch the workflow run. In about a minute your portfolio is live at:
`https://YOUR_USERNAME.github.io/informatica-vue-2026/`

**Share your URL**

---

## Project structure

```
src/
├── assets/
│   └── main.css          # base styles + CSS variables (pre-built)
├── components/
│   └── ProjectCard.vue   # Day 2 exercise — build this component
├── composables/
│   ├── useDarkMode.ts    # Day 2 exercise — write this composable
│   └── useGithub.ts      # Day 2 exercise — write this composable
├── types/
│   └── index.ts          # Day 2 — shared TypeScript interfaces
├── views/
│   ├── HomeView.vue      # Day 1 exercise — hero section
│   ├── ProjectsView.vue  # Day 2 exercise — GitHub repos
│   └── ContactView.vue   # Self-study — contact form
├── App.vue               # Day 2 exercise — navbar + dark mode
├── main.ts               # router setup — edit for the optional 404 route
└── vite-env.d.ts         # pre-built — type declaration file for CSS modules
```

---

## Schedule overview

This course runs as **8 units on day 1, 8 units on day 2, and 1 unit on day 3** (45 min/unit). Day 3 is reserved entirely for wrap-up and presentations — all new content fits into days 1 and 2.

| Day   | Units | Focus                                                              |
| ----- | ----- | ------------------------------------------------------------------ |
| Day 1 | 8     | Vue basics — reactivity, templates, `computed`/`watch`/`onMounted` |
| Day 2 | 8     | Components, composables, Router, GitHub API, VueUse                |
| Day 3 | 1     | Final push + presentations only                                    |

---

## Day-by-day exercises

### Day 1 — Vue basics *(8 units)*

**Goal:** A live hero section with your name, bio, and a reactive skills list.

All exercises are in `src/views/HomeView.vue`. Look for `// TODO Day 1` comments.

| Unit | Focus                                                        |
| ---- | ------------------------------------------------------------ |
| 1    | Kickoff + tooling — fork, install, first push → **live URL** |
| 2    | Vue mental model — reactivity, SFC anatomy                   |
| 3    | Template syntax — `v-if`, `v-for`, `v-bind`                  |
| 4    | `v-model` + events — implement `addSkill()`                  |
| 5    | Exercise time — finish Part A                                |
| 6    | `computed` — add `skillCount`                                |
| 7    | `onMounted` + `watch` — persist skills to `localStorage`     |
| 8    | Wrap-up — AI exercises, commit + push                        |

#### Part A — Reactivity and templates

1. Replace `name` and `bio` with your own values
2. Replace the `skills` array with your own skills
3. Display `name` and `bio` in the template using `{{ }}`
4. Render the skills list using `v-for`
5. Wire up the `newSkill` input with `v-model`
6. Implement `addSkill()` to push a new skill into the list and clear the input

#### Part B — `computed`, `watch`, and `onMounted`

7. Add a `computed` property `skillCount` that returns the number of skills — then update the heading in the template from `Skills` to `Skills ({{ skillCount }})`
8. Use `onMounted` to load previously saved skills from `localStorage` (key: `"portfolio-skills"`) — hint: use `JSON.parse()` to convert the string back to an array
9. Use `watch` to save `skills` to `localStorage` whenever the list changes — hint: `JSON.stringify()` to convert to a string, and pass `{ deep: true }` as the third argument

Add a skill, refresh the page — your skills survive the reload. That's exactly what VueUse's `useStorage` does automatically on day 2. By writing it by hand first, you'll know exactly what it's doing under the hood.

#### Bonus

10. Add a `removeSkill(index)` function and a delete button next to each skill — watch the count update automatically

When you're happy — commit and push. Your hero section is live. ✓

---

### Day 2 — Components, Router, and live data *(8 units)*

**Goal:** A routed portfolio with reusable components, your dark mode composable, and real GitHub repos — fully live by the end of the day.

| Unit | Focus                                                                  |
| ---- | ---------------------------------------------------------------------- |
| 1    | Deploy ritual — push day 1 work, watch it go live                      |
| 2    | Components deep dive — props, emits, slots                             |
| 3    | Typed props exercise — build `ProjectCard.vue`                         |
| 4    | Composables pattern — write `useDarkMode` by hand, wire into `App.vue` |
| 5    | Vue Router — routes, `useRouter`/`useRoute`, active link styling       |
| 6    | Async + GitHub API — `fetch`, type the response                        |
| 7    | `useGithub` composable + use it in `ProjectsView.vue`                  |
| 8    | VueUse refactor (`useDark`/`useToggle`, `useFetch`) + final push       |

#### Part A — ProjectCard component (`src/components/ProjectCard.vue`)

> **Note:** `src/types/index.ts` already contains a starter `Repo` type — enough to build this card. You'll extend it yourself against the real API response in Part E, so don't worry if it feels incomplete for now.

1. Define typed props using `defineProps<{ repo: Repo }>()`
   *(import the `Repo` type from `@/types`)*
2. Build the card template — display name, description, language, stars, and topics
3. Make the project name a link to `repo.html_url` using `:href` — remember `target="_blank"` needs `rel="noopener noreferrer"` alongside it for safety
4. Use `v-if` to only show description if it exists (`repo.description`)
5. Use `v-for` to render topic tags
6. **Sanity check:** drop a hardcoded `mockRepo` object into `ProjectsView.vue` and render `<ProjectCard :repo="mockRepo" />` for a minute, so you actually see the card working. This is throwaway code — in Part E you'll replace this single line with a real `v-for` loop over live GitHub data, in the exact same spot.

#### Part B — Dark mode composable (`src/composables/useDarkMode.ts`)

Implement `useDarkMode()` so it:
- holds a `ref<boolean>` called `isDark`
- exposes a `toggle()` function
- uses `watch()` to add/remove the `dark` class on `document.documentElement`
- **Bonus:** persist the preference with `localStorage`

#### Part C — Wire it up in `App.vue`

1. Import `useDarkMode` and destructure `{ isDark, toggle }`
2. Replace the placeholder button with a working toggle
3. Show a sun/moon icon depending on `isDark` — use `v-if` / `v-else`

#### Part D — Vue Router

The router and nav are already working — you just clicked through them. Now, in `App.vue`:
- Use `useRouter()` to add a "back" button
- Use `useRouter()` to add a "home" button, which navigates to Home page, if not yet there
  - Hint: Use `useRoute()` to read current path to detect whether already on Home page

**Bonus:** add a 404 catch-all route for any path that doesn't match `/`, `/projects`, or `/contact`.

#### Part E — GitHub API composable (`src/composables/useGithub.ts`)

1. Compare the real API response (`https://api.github.com/users/<username>/repos`) against the `Repo` type from Part A — what's missing or typed wrong? Update `src/types/index.ts` together with the group before writing the composable.<br/>
Hint: Compare with values really used in `ProjectCard`.
2. Implement `fetchRepos(username: string)` using `fetch()` and `async/await`
3. Set `loading = true` before the request, `false` after — use `finally` so it resets even on error
4. Type the return value: `repos: Ref<Repo[]>`
5. Handle errors — check `response.ok` before assuming success, and set the `error` ref with a readable message
6. Use your composable in `ProjectsView.vue` — replace the `mockRepo` line from Part A with the real `v-for="repo in repos"` grid

#### Part F — Replace useDarkMode and useGithub with VueUse

Now that you've written both composables by hand, replace them with VueUse — this swap happens in `App.vue`, not inside `useDarkMode.ts` (there's nothing to change in that file itself, since VueUse already does everything it does internally):

```ts
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()      // persists to localStorage automatically
const toggle = useToggle(isDark)
```
see https://vueuse.org/core/useDark/ for further details.

Notice how much shorter it is — and it handles system preference too. Since the variable names stay the same, nothing else in `App.vue` needs to change. You can delete `useDarkMode.ts` now, or keep it around to compare against.

Then do the same for `useGithub` in `ProjectsView.vue`:

```ts
const { data: repos, isFetching: loading, error } = useFetch(url).json<Repo[]>();
```

see https://vueuse.org/core/useFetch/#usefetch for further details.

#### Part G — Bonus: useStorage

*Not required for a working portfolio — do this only if you have time left.*

Use `useStorage` from VueUse in `ProjectsView` to persist the user's GitHub username so they don't have to re-enter it:

```ts
import { useStorage } from '@vueuse/core'

const username = useStorage('github-username', 'your-default-username')
const url = computed (() => { /** ... */})
// ... useFetch with 'refetch: true'
```
see https://vueuse.org/core/useStorage/#usestorage + https://vueuse.org/core/useFetch/#usefetch for further details.

In `ProjectsView` also remove comment from username input field:
```html
    <!-- TODO Day 2G -->
    <div style="margin-bottom: 1.5rem; display: flex; gap: 0.5rem; max-width: 360px;">
      <input v-model="username" placeholder="GitHub username" />
    </div>
```

Test, commit and push. Your full portfolio is live. ✓

---

### Day 3 — Final push and presentations *(1 unit)*

There's no new content today — just a final push if needed and presentations. Each participant shares their live URL and walks through one thing they're proud of.

---

## Self-study *(optional — not covered live)*

These exercises are self-contained and won't break anything if skipped. Tackle them at home if you want to keep building after the course.

#### Contact form (`src/views/ContactView.vue`)

1. Add `ref`s for `name`, `email`, and `message`
2. Wire up `v-model` on each input field
3. Add a `computed` property `isValid` — true when all fields are non-empty and email contains `@`
4. Disable the submit button when `!isValid` using `:disabled`
5. On submit, show a success message using `v-if`

---

## Using AI as a learning tool

AI tools like Claude or ChatGPT are excellent at generating Vue code. But they are unreliable at knowing _when_ that code is subtly wrong — that's your job. The exercises below are designed to make you a better _evaluator_ of AI output, not just a consumer of it.

**The rule throughout this course:** you can ask AI for hints and explanations, but not for solutions. Ask it to explain concepts, critique your code, or describe bugs — then implement the fix yourself.

---

### AI exercises — Day 1

#### Concept check: `ref` vs `reactive`

Before writing the skills list exercise, ask Claude to explain the difference between `ref()` and `reactive()`. Then **close the chat** and implement it yourself using only what you remember. Compare your result with what Claude described.

> **Suggested prompt:**
> Explain the difference between ref() and reactive() in Vue 3. Give me one concrete example of when you'd use each. Don't write my component for me — just explain the concepts.

#### Spot the bug: broken `v-for`

Ask Claude to generate a Vue component with a skills list using `v-for` — but intentionally ask it to skip the `:key` binding. Paste the result back and ask: "What's wrong with this component?" Try to spot the issue yourself before Claude answers.

> **Suggested prompt:**
> Generate a Vue 3 component with a list of skills using v-for. Keep it simple — just a ul with li items.

#### Ask for a hint, not the answer

When you get stuck implementing `addSkill()`, you are not allowed to ask Claude to write it for you. Ask for a hint only. If you're still stuck, ask for one more hint — but not the full solution.

> **Suggested prompt:**
> I'm trying to add an item to a ref array in Vue 3 when a button is clicked. Give me a hint about what method I should use — don't write the function for me.

---

### AI exercises — Day 2

#### Explain it back

After the composable lecture, ask Claude to explain what a composable is. Then, without looking at the answer, explain it in your own words to the person next to you. Ask Claude to critique your explanation.

> **Suggested prompt:**
> Here's my explanation of what a Vue composable is: [your words]. Is this accurate? What's missing or imprecise?

#### Review AI-generated props

Ask Claude to generate a `ProjectCard` component. Before using any of it, review the output against these questions: Are props typed? Is `defineProps` used correctly? Is there any prop mutation? Are all `v-for` items keyed? Fix anything that needs fixing.

> **Suggested prompt:**
> Generate a Vue 3 ProjectCard component in TypeScript that accepts a repo prop with name, description, html_url, language, stargazers_count, and topics fields. Use the Composition API and defineProps with generics.

#### Anti-pattern hunt

Ask Claude to generate a component with 3 deliberate Vue anti-patterns hidden inside it. Try to find all three before asking Claude to reveal them. Common ones: mutating props, missing `:key`, logic in template that should be a `computed`.

> **Suggested prompt:**
> Generate a Vue 3 component with exactly 3 subtle anti-patterns or mistakes hidden inside it. Don't tell me what they are yet — I want to find them myself first.

#### Type the API response yourself first

Before looking at the GitHub API docs, ask Claude to generate a TypeScript interface for a GitHub repo object. Then check it against the real API response at `https://api.github.com/users/YOUR_USERNAME/repos`. What did Claude get right? What did it miss or hallucinate?

> **Suggested prompt:**
> Generate a TypeScript interface for a GitHub repository object returned by the GitHub REST API. Include the most commonly used fields only.

#### VueUse vs hand-rolled

You've written `useDarkMode` by hand and now replaced it with VueUse. Ask Claude what `useDark` handles that your version probably doesn't. Compare the answer with your own implementation.

> **Suggested prompt:**
> I wrote a useDarkMode composable that toggles a .dark class and saves to localStorage. What does VueUse's useDark handle that my version probably doesn't? Be specific.

#### Debug with words first

Intentionally break your `useGithub` composable so `loading` never becomes `false`. Describe the bug to Claude **in words only — no code**. Can it diagnose the issue from a description alone? Then paste the code and see if the diagnosis changes.

> **Suggested prompt:**
> In my Vue composable, I set loading = true before a fetch call, but loading never goes back to false even after the data arrives. What are the most likely causes? Don't ask me for code yet — just list the possibilities.

#### Portfolio review *(closing ritual)*

Before day 2 wraps up, paste your completed `HomeView.vue` or `ProjectCard.vue` into Claude and ask for a code review. Evaluate whether you agree with each suggestion. Implement at least one improvement — and push it live before presentations.

> **Suggested prompt:**
> Review this Vue 3 component I wrote during a course. I'm a beginner. Point out anything that's non-idiomatic, could be improved, or is a potential bug. Be specific and explain why each suggestion matters.

---

## Tips

- **Stuck?** Ask your instructor for a hint — or check the solution repo (link shared after the course)
- **TypeScript errors?** Read them carefully — they usually tell you exactly what's missing
- **Vite HMR** updates the page instantly as you save — no need to refresh

---

## Demos

- [Repository: Demos for Vue Course @ Informatica Feminale 2026](https://github.com/plippC/informatica-vue-2026-demos)
- [Vue Playground: Composable Demo](https://play.vuejs.org/#eNqNVNtu2zAM/RXCL0kBwy7QYQ9dWmAb+rBhN+yGDTAwqDaTqLUlQ6QTB4H/fZTsOM7WDHuTyEPykIfSPnpZ18mmweg6WlDudM1AyE19mxld1dYxvLcN4WsrF4OGYelsBbMkPTX7FLMXmVmkfRIJlwtjVZeKUW4Ai9OIVIyLdIKI4ogpt2apV8kDWSOM9j4ui3KJ0SW6jzVrayiLriF4vE+Vpd2+DTZ2DcYHe77G/PEJ+wO13pZFnxwSug1m0ehj5VbIvfvuywds5Tw6K1s0paD/4fyMZMvGc+xhrxpTCO0JLrB9E+aqzeor3bWMhg5NeaIe2QV8FslM/bjOtX6ke5U8C3GZ6WSKMuUw6oRJZjiouAeHyxisEZdhLPzxm6n6C3SDrF5Fr1yawv0ORIyNKCWFYzlLHlL3JcKyMbk3glEVEpDwYNhqXgsnKZtFmcE2FB2RB0rzi56+5JcwRkCTq5oavwIFKFNApYxayVnK8xonZX2YECKGFm58M/PLi6NtN7ENBdSUc66ERF34kppprNKTsBt0wLrCxIceSQf8HP0MrvtncOfPQw8AbbJRZYNSOmCSWnL+6F27J1w/B43O8VMlWVhb+wjasA087dYItYDzb2ZGQ2ypl5jvcgkUYHivYXiMyhUSA6QLme1SQEyhqVH3uUhwcytyGQEmqihCS+80ySKim89kIwgrmcgsHgZwEcY82ZbTFC6g/yvLQN4vB+EfGigS/bhxBsLgPHS476GNRd9huf/+ds7/XPtx78YFT9LJ6wir3u/PoYgIdtzVs99Zn1O60GFRNIGSDdlLEui62B8kVTf53YT4L6bv6PxbF8LPk8vkKup+AyRw5WI=)

---

## Tech stack

| Tool                                                 | Purpose                        |
| ---------------------------------------------------- | ------------------------------ |
| [Vue 3](https://vuejs.org)                           | UI framework (Composition API) |
| [Vite](https://vitejs.dev)                           | Dev server + build tool        |
| [TypeScript](https://www.typescriptlang.org)         | Type safety                    |
| [Vue Router 5](https://router.vuejs.org)             | Client-side routing            |
| [VueUse](https://vueuse.org)                         | Composable utilities           |
| [GitHub Actions](https://docs.github.com/en/actions) | CI/CD deploy                   |
| [GitHub Pages](https://pages.github.com)             | Hosting                        |

---

# How to Proceed

## Learning more about Vue

### Courses and Masterclasses

- [VueSchool](https://vueschool.io/)
- [VueMastery](https://www.vuemastery.com/)

Both with free courses.

### Advanced Vue Frameworks and Libraries

- [Nuxt: The Full-Stack Vue Framework](https://nuxt.com/)
- [NuxUI: The Intuitive Vue UI Library](https://ui.nuxt.com/)
  - [NuxtUI Templates](https://ui.nuxt.com/templates)

## Learning more about AI

- [DeepLearning.AI](https://www.deeplearning.ai/courses)
- [Youtube: Alex Sprogis](https://www.youtube.com/@alex.sprogis): Practical Vibe Coding approach with Claude Code

