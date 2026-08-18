const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

export const posts = [
  {
    id: "1",
    title: "The Modern Frontend Toolchain: What Actually Matters in 2026",
    category: "web-development",
    author: "Aisha Khan",
    date: "2026-08-01",
    readingTime: 7,
    image: img("photo-1461749280684-dccba630e2f6"),
    tags: ["Vite", "Bundlers", "Tooling", "Performance"],
    excerpt:
      "Bundlers, compilers, and dev servers have quietly gotten radically faster. Here's what to actually adopt and what to skip.",
    content: `The frontend tooling landscape has gone through a quiet revolution. Where webpack once dominated every conversation about bundling, a new generation of Rust and Go-based tools — esbuild, SWC, Rolldown — has pushed cold starts and rebuild times down by an order of magnitude.

Vite remains the pragmatic default for most teams: native ESM in development means no bundling step while you work, and Rollup (increasingly Rolldown) handles production builds with excellent tree-shaking. The result is a dev server that starts in milliseconds regardless of project size.

That said, tooling churn is real, and chasing every new bundler release is a distraction from shipping product. The practical advice is simple: pick a tool with strong community support, understand its plugin model, and revisit your choice only when you hit a real limitation — not because a new benchmark went viral.

Bundle analysis still matters more than raw build speed for most user-facing performance. Route-based code splitting, image optimization, and shipping less JavaScript overall will move your Lighthouse score far more than shaving 200ms off a build.`,
  },
  {
    id: "2",
    title: "useEffect Isn't Scary: A Mental Model That Finally Makes Sense",
    category: "react",
    author: "Hamza Ali",
    date: "2026-08-03",
    readingTime: 6,
    image: img("photo-1633356122544-f134324a6cee"),
    tags: ["React", "Hooks", "useEffect"],
    excerpt:
      "Most useEffect confusion disappears once you stop thinking about lifecycle and start thinking about synchronization.",
    content: `The biggest mistake developers make with useEffect is importing a mental model from class components — treating it as componentDidMount, componentDidUpdate, and componentWillUnmount glued together. That framing actively works against you.

The better mental model: useEffect synchronizes your component with an external system. Every time a dependency changes, React "re-synchronizes" by cleaning up the old effect and running a new one. Once you think in terms of synchronization instead of lifecycle events, dependency arrays stop feeling like a chore and start feeling like the actual point.

A few rules that follow naturally from this model: include every reactive value your effect reads in the dependency array, don't lie to the linter by omitting values, and if an effect is fighting you, ask whether it needs to exist at all. Derived state, event handlers, and data transformations rarely belong in an effect — they belong in render or in a handler.

When you do need an effect — subscribing to a WebSocket, syncing with localStorage, or manually managing a non-React widget — write the cleanup function first. It forces you to think about the full lifecycle of the synchronization, not just the happy path.`,
  },
  {
    id: "3",
    title: "JavaScript's Event Loop, Explained With Diagrams You'll Actually Remember",
    category: "javascript",
    author: "Aisha Khan",
    date: "2026-08-05",
    readingTime: 8,
    image: img("photo-1555066931-4365d14bab8c"),
    tags: ["JavaScript", "Event Loop", "Async"],
    excerpt:
      "Call stack, microtasks, macrotasks — the concepts are simple individually, but the interactions trip up even senior engineers.",
    content: `JavaScript is single-threaded, but it rarely feels that way — because the event loop is doing an enormous amount of quiet coordination behind the scenes. Understanding it properly clears up a huge class of "why did this run in the wrong order" bugs.

The call stack executes synchronous code, one frame at a time. When you call an async function, register a promise, or set a timer, that work gets handed off — not run immediately. Promises land in the microtask queue; timers, I/O callbacks, and UI events land in the macrotask (task) queue.

The critical detail: after every single task, the event loop drains the entire microtask queue before picking up the next task. This is why Promise.resolve().then(fn) always runs before setTimeout(fn, 0), no matter how many promises you chain.

Once this model clicks, debugging async race conditions gets dramatically easier. You stop guessing and start tracing: what's on the stack, what's queued as a microtask, what's waiting as a macrotask — and in what order the loop will actually get to each one.`,
  },
  {
    id: "4",
    title: "How AI Coding Assistants Are Changing What 'Writing Code' Means",
    category: "ai",
    author: "Bilal Ahmed",
    date: "2026-08-07",
    readingTime: 6,
    image: img("photo-1620712943543-bcc4688e7485"),
    tags: ["AI", "Productivity", "Developer Tools"],
    excerpt:
      "The job hasn't been automated away — it's shifted up a level, from typing syntax to specifying intent and reviewing output.",
    content: `A few years ago, AI code completion meant slightly smarter autocomplete. Today, AI assistants can scaffold entire features, refactor across dozens of files, and explain unfamiliar codebases in plain language. The nature of the work has genuinely changed.

What hasn't changed is the need for judgment. AI-generated code still needs a reviewer who understands the system it's going into — someone who can spot a subtly wrong assumption, an inefficient query, or a security gap that "looks right" but isn't. If anything, code review skills have become more valuable, not less.

The developers getting the most out of these tools treat them like a very fast, very well-read junior collaborator: great at producing a first draft, unreliable on nuance, and never a substitute for understanding what the code actually needs to do. Specificity in prompts matters — vague requests produce vague code.

The practical shift for teams: fewer hours spent on boilerplate, more hours spent on architecture, edge cases, and the parts of engineering that were always the hard parts anyway.`,
  },
  {
    id: "5",
    title: "Designing Interfaces People Trust: Lessons From a Decade of UI Work",
    category: "ui-ux",
    author: "Sara Malik",
    date: "2026-08-09",
    readingTime: 5,
    image: img("photo-1542831371-29b0f74f9713"),
    tags: ["UI/UX", "Design Systems", "Trust"],
    excerpt:
      "Trust in an interface is built in milliseconds, through consistency, feedback, and a hundred tiny details users never consciously notice.",
    content: `Users decide whether they trust a product almost instantly — long before they've read a word of copy. That first impression comes from visual consistency, predictable interaction patterns, and the absence of friction.

Consistency is the unglamorous hero of good design. The same spacing scale, the same button behavior, the same feedback pattern for every action — these repeated signals tell a user's brain "this system is coherent," which reads, subconsciously, as trustworthy.

Feedback is the second pillar. Every action needs a response: a button press should feel pressed, a form submission should show progress, an error should explain itself in plain language rather than a cryptic code. Silence after an action is one of the fastest ways to erode confidence.

Finally, respect the user's time. Fast load states, skeleton screens instead of blank pages, and honest empty states — these aren't decoration, they're part of the trust equation. A polished interface isn't the one with the most animation; it's the one that never makes the user wonder if something broke.`,
  },
  {
    id: "6",
    title: "CSS Grid vs Flexbox in 2026: You Don't Have to Choose",
    category: "css",
    author: "Sara Malik",
    date: "2026-08-11",
    readingTime: 6,
    image: img("photo-1507721999472-8ed4421c4af2"),
    tags: ["CSS", "Grid", "Flexbox", "Layout"],
    excerpt:
      "The real skill isn't picking a winner — it's knowing which tool fits which layout problem, and combining them fluently.",
    content: `The Grid-vs-Flexbox debate was never really a rivalry — it just took the ecosystem a while to settle into using both for what they're actually good at.

Flexbox excels at one-dimensional layout: a row of nav items, a card's internal header/body/footer stack, anything that needs to distribute or align space along a single axis. Its content-driven sizing makes it perfect for components where the content should dictate size.

Grid is the tool for two-dimensional layout: page shells, card grids, dashboard panels — anything where you're thinking about rows and columns simultaneously. Named template areas turn a layout into something almost self-documenting.

In practice, most real interfaces nest both: a Grid-based page shell containing Flexbox-based components. Add container queries into the mix, and components can now respond to their own available space rather than the viewport — which is arguably the biggest quiet upgrade to CSS layout in years.`,
  },
  {
    id: "7",
    title: "Why Clean Code Isn't About Being Clever",
    category: "programming",
    author: "Hamza Ali",
    date: "2026-08-13",
    readingTime: 5,
    image: img("photo-1498050108023-c5249f4df085"),
    tags: ["Programming", "Best Practices", "Readability"],
    excerpt:
      "The cleverest one-liner you've ever written is probably the one your team will curse you for six months from now.",
    content: `Early in a programming career, cleverness feels like the goal — the tightest one-liner, the most elegant trick, the fewest characters. Experience tends to reverse that instinct entirely.

Code is read far more often than it's written. A clever solution that takes a teammate ten minutes to decode has a negative return on investment, no matter how impressive it looked in the pull request. The actual skill worth developing is writing code that reveals its intent on the first read.

That means: naming things precisely, keeping functions doing one job, and resisting the urge to abstract before you've seen the pattern repeat at least three times. Premature abstraction is just cleverness wearing a disguise — it optimizes for an imagined future at the cost of present-day clarity.

The best compliment your code can receive isn't "wow, how did you do that" — it's silence, because nobody had to ask.`,
  },
  {
    id: "8",
    title: "Negotiating Your First Developer Job Offer (Without Feeling Awkward)",
    category: "career",
    author: "Bilal Ahmed",
    date: "2026-08-15",
    readingTime: 6,
    image: img("photo-1521791136064-7986c2920216"),
    tags: ["Career", "Job Offers", "Negotiation"],
    excerpt:
      "Negotiation isn't confrontation — it's a normal, expected part of the hiring process that most companies budget for in advance.",
    content: `Most first-time job seekers accept the initial offer out of fear that negotiating will cost them the job. In reality, companies almost always build negotiation room into their initial number, and a reasonable counter rarely damages goodwill.

The simplest approach: express genuine enthusiasm for the role first, then ask if there's flexibility on the number, citing market research or competing context if you have it. You don't need an aggressive script — a calm, direct question does the job.

Total compensation is more than base salary. Signing bonuses, equity, remote flexibility, learning budgets, and start date can all be negotiated even when base salary is fixed by a band. Knowing which levers a company can actually pull helps you ask for the right thing.

And if the answer is no? That's fine too. Asking costs you nothing but a moment of mild discomfort, and the data point you get — whether they can flex or not — is useful either way.`,
  },
  {
    id: "9",
    title: "React Context vs Redux vs Zustand: A No-Hype Comparison",
    category: "react",
    author: "Aisha Khan",
    date: "2026-08-16",
    readingTime: 7,
    image: img("photo-1517694712202-14dd9538aa97"),
    tags: ["React", "State Management", "Context API"],
    excerpt:
      "State management debates get loud fast. Here's a grounded look at when each tool actually earns its place in your stack.",
    content: `Context API is built into React and perfect for low-frequency, broadly-shared state: theme, auth, locale. Its weakness is re-render granularity — every consumer re-renders on any value change unless you split contexts carefully or memoize aggressively.

Redux (particularly Redux Toolkit) still earns its place in large, complex applications with intricate state interactions, time-travel debugging needs, or teams that value strict, predictable patterns enforced by convention. The boilerplate reputation is mostly outdated with modern RTK.

Zustand and similar lightweight stores split the difference: minimal boilerplate, fine-grained subscriptions without extra provider nesting, and a gentle learning curve. For most mid-sized apps, it hits a sweet spot between Context's simplicity and Redux's structure.

The honest answer to "which should I use" is: start with Context and local state, reach for a dedicated library only when you feel real pain — prop drilling that won't quit, or re-renders you can't reason about. Adding a state library preemptively is solving a problem you don't have yet.`,
  },
  {
    id: "10",
    title: "The Anatomy of a Perfect Loading State",
    category: "ui-ux",
    author: "Sara Malik",
    date: "2026-08-17",
    readingTime: 4,
    image: img("photo-1551288049-bebda4e38f71"),
    tags: ["UI/UX", "Loading States", "Skeletons"],
    excerpt:
      "A spinner tells the user 'wait.' A well-built skeleton screen tells them 'this is almost yours' — and that difference matters.",
    content: `Loading states are one of the most under-designed parts of most products, treated as an afterthought when they're actually a core part of the perceived-performance experience.

A generic spinner communicates only one thing: uncertainty. A skeleton screen that mirrors the shape of the incoming content does something psychologically different — it previews the layout, reduces perceived wait time, and prevents the jarring layout shift that happens when content pops in all at once.

Good skeleton design mimics real content proportions: a wide bar for a headline, a shorter one for a subheading, a rectangle for an image. Subtle shimmer animation adds a sense of motion and progress without being distracting.

The last piece people forget: transitions matter as much as the states themselves. A skeleton that abruptly snaps into real content feels broken; a gentle cross-fade feels intentional. Milliseconds of polish here compound into a product that simply feels faster, even when the network request took exactly the same amount of time.`,
  },
  {
    id: "11",
    title: "Async/Await Under the Hood: What Actually Happens When You 'Await'",
    category: "javascript",
    author: "Hamza Ali",
    date: "2026-08-17",
    readingTime: 7,
    image: img("photo-1550439062-609e1531270e"),
    tags: ["JavaScript", "Async/Await", "Promises"],
    excerpt:
      "async/await is syntax sugar over promises — but understanding the sugar's ingredients makes you dramatically better at debugging it.",
    content: `async/await reads like synchronous code, which is exactly the point — but that readability can hide what's actually happening underneath if you never look closer.

An async function always returns a promise, even if you return a plain value inside it — JavaScript wraps it automatically. The await keyword pauses execution of that function (and only that function) until the awaited promise settles, then resumes with either the resolved value or a thrown error.

Crucially, "pausing" doesn't block the thread. Control returns to the event loop, which keeps handling other work — UI updates, other promises, timers — until the awaited value is ready. This is why a slow await in one function doesn't freeze your entire application.

Error handling is where most bugs live. A rejected promise inside an async function becomes a thrown exception at the await point, which means try/catch works exactly as expected — but only if you actually await the promise. Forgetting to await a promise-returning call is one of the most common silent-bug sources in modern JavaScript.`,
  },
  {
    id: "12",
    title: "Building a Design System That Survives Contact With Real Products",
    category: "web-development",
    author: "Sara Malik",
    date: "2026-08-18",
    readingTime: 6,
    image: img("photo-1522542550221-31fd19575a2d"),
    tags: ["Design Systems", "Tokens", "UI/UX", "Frontend"],
    excerpt:
      "Most design systems die in a Figma file. The ones that survive are built with engineers, not handed to them.",
    content: `A design system that lives only as static mockups tends to drift from the real product within a few months — components get reimplemented slightly differently in every feature, and the "system" becomes documentation nobody trusts.

The systems that actually hold up share a pattern: design tokens (color, spacing, typography, radius) defined once as the single source of truth, consumed by both design tooling and code. When a token changes, it changes everywhere — no manual hunting through fifteen files.

Component specs need to cover more than the happy path: what does this button look like disabled, loading, focused, on a small screen, with no icon? Systems that only document the ideal state leave engineers guessing at every edge case, which is exactly when consistency breaks down.

The last ingredient is ownership. A design system without a team responsible for maintaining and evolving it slowly rots as the product outgrows its original assumptions. Treat it like a product with its own users — the engineers and designers who build on top of it — and it earns the trust to actually get used.`,
  },
];

export const getPost = (id) => posts.find((p) => p.id === id);

export const getRelatedPosts = (post, count = 3) =>
  posts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, count)
    .concat(
      posts.filter((p) => p.id !== post.id && p.category !== post.category)
    )
    .slice(0, count);
