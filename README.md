# MyAppName

Vite + TypeScript দিয়ে বানানো একটি hash-routed সিঙ্গেল পেজ অ্যাপ, যেখানে ৪টি ট্যাব
(Home, Promotion, Invitation, Member) নিচের বাটন বারে থাকে — `button-bar.jpg` /
`app.jpg` রেফারেন্স অনুযায়ী।

## চালানোর নিয়ম

```bash
npm install        # প্রথমবার — লাইব্রেরি ইনস্টল করবে
npm run dev         # ডেভেলপমেন্ট সার্ভার (লাইভ প্রিভিউর জন্য)
npm run build        # প্রোডাকশন বিল্ড → dist/ ফোল্ডারে তৈরি হবে
npm run preview      # dist/ বিল্ড লোকালি প্রিভিউ করার জন্য
```

`npm run build` এর পর `dist/` ফোল্ডারের পুরো কন্টেন্ট যেকোনো স্ট্যাটিক হোস্টিং-এ
(cPanel, Netlify, GitHub Pages, Vercel static, ইত্যাদি) আপলোড করলেই সাইট কাজ করবে।
রাউটিং `#/...` (hash) দিয়ে করা হয়েছে বলে সার্ভারে কোনো আলাদা rewrite/redirect
কনফিগারেশন লাগে না — `myappname/#/account` লিংকে সরাসরি ব্রাউজারে সার্চ করে ঢুকলেও
পুরো সাইট স্বাভাবিকভাবে লোড হবে।

## কোন ফাইল কোন পেজ নিয়ন্ত্রণ করে

| রাউট (URL) | ট্যাবের নাম | কন্টেন্ট যে ফাইলে | বাটন বার / আইকন যেখানে ঠিক হয় |
|---|---|---|---|
| `#/` বা `#/home` | Home | `src/pages/home.ts` | `src/pages/registry.ts` |
| `#/promotion` | Promotion | `src/pages/promotion.ts` | `src/pages/registry.ts` |
| `#/activity` | Invitation | `src/pages/activity.ts` | `src/pages/registry.ts` |
| `#/account` | Member | `src/pages/account.ts` | `src/pages/registry.ts` |

অন্যান্য গুরুত্বপূর্ণ ফাইল:

- **`src/pages/registry.ts`** — সব পেজের মাস্টার লিস্ট। কোন রাউট কোন লেবেল/আইকন/ফাইলের
  সাথে যুক্ত তা এখানেই ঠিক হয়। বাটন বার এবং রাউটার দুটোই এখান থেকে ডেটা নেয়।
- **`src/components/navbar.ts`** — নিচের বাটন বার (registry থেকে অটোমেটিক তৈরি হয়,
  সাধারণত এটা এডিট করার দরকার হয় না)।
- **`src/router/router.ts`** — `#/...` হ্যাশ পড়ে সঠিক পেজ রেন্ডার করে।
- **`src/style.css`** — সব ডিজাইন/রং/সাইজ (বাটন বারের height 56px এখানে সেট করা)।
- **`src/security/protect.ts`** — DevTools/রাইট-ক্লিক/সিলেক্ট/ড্র্যাগ প্রতিরোধ স্ক্রিপ্ট।
- **`public/assets/icons/`** — ৮টি SVG আইকন (৪টি active + ৪টি inactive)।

## নতুন পেজ যোগ করবেন কীভাবে

ভবিষ্যতে নতুন ট্যাব/পেজ যোগ করতে:

1. `public/assets/icons/` এ নতুন আইকনের জন্য `<name>.svg` (active) ও
   `<name>_inactive.svg` (inactive) — দুটো ফাইল রাখুন।
2. `src/pages/<name>.ts` নামে একটা ফাইল বানান, যেমন `home.ts` / `promotion.ts`
   ফাইলগুলোর মতো — একটা `render(container)` ফাংশন এক্সপোর্ট করুন।
3. `src/pages/registry.ts` ফাইলে `pages` অ্যারেতে একটা নতুন অবজেক্ট যোগ করুন
   (কমেন্টে উদাহরণ দেওয়া আছে)।

এটুকু করলেই বাটন বারে নতুন ট্যাব এবং `#/<name>` রাউট — দুটোই এমনিতেই কাজ করা শুরু
করবে। `navbar.ts` বা `router.ts` এ কিছু বদলানোর দরকার নেই।

বর্তমানে Home বাদে বাকি সব পেজ ইচ্ছাকৃতভাবে ফাঁকা রাখা হয়েছে (শুধু পেজের নাম লেখা) —
নিজের প্রয়োজন মতো কন্টেন্ট `src/pages/*.ts` ফাইলের `render()` ফাংশনের ভেতরে বসিয়ে
নিন।

## সুরক্ষা স্ক্রিপ্ট সম্পর্কে জরুরি নোট

`src/security/protect.ts` এ যা করা হয়েছে:

- F12 / Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C / Ctrl+U / রাইট-ক্লিক ব্লক
- DevTools খোলা আছে বলে সন্দেহ হলে (`debugger` টাইমিং + উইন্ডো সাইজ চেক) পেজকে
  `about:blank` এ রিডাইরেক্ট
- পুরো সাইটে টেক্সট সিলেক্ট/কপি এবং ছবি ড্র্যাগ বন্ধ (CSS `user-select` + JS)
- বাটন বারের আইকন ড্র্যাগ/সেভ বন্ধ (`pointer-events: none` + `user-drag: none`)

⚠️ এগুলো ব্রাউজারের জাভাস্ক্রিপ্ট দিয়ে করা — তাই এটা ১০০% নিশ্চিত সুরক্ষা না, শুধু
সাধারণ ব্যবহারকারীদের নিরুৎসাহিত করে। যে কেউ জাভাস্ক্রিপ্ট বন্ধ করে, নেটওয়ার্ক ট্যাব
সরাসরি দেখে, অথবা ব্রাউজারের বাইরের টুল দিয়ে সোর্স/ফাইল দেখলে এই স্ক্রিপ্ট কিছু
আটকাতে পারবে না। ফলস-পজিটিভ কমাতে ডিভাইস স্লো হলেও যাতে সাধারণ ইউজার ভুলবশত
`about:blank` না পান, সে জন্য একাধিকবার সন্দেহজনক ফল পেলে তবেই রিডাইরেক্ট হয়।

## ফোল্ডার স্ট্রাকচার

```
myappname/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/
│   └── assets/icons/        # ৮টি SVG (active/inactive)
└── src/
    ├── main.ts               # এন্ট্রি পয়েন্ট
    ├── style.css              # সব CSS
    ├── router/router.ts        # হ্যাশ রাউটার
    ├── security/protect.ts      # সুরক্ষা স্ক্রিপ্ট
    ├── components/navbar.ts      # বাটন বার
    └── pages/
        ├── types.ts              # PageConfig টাইপ
        ├── registry.ts            # মাস্টার পেজ লিস্ট
        ├── home.ts
        ├── promotion.ts
        ├── activity.ts
        └── account.ts
```
