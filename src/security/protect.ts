/**
 * ==============================================================
 *  সতর্কতা / সীমাবদ্ধতা (দয়া করে পড়ুন):
 *  এটি ব্রাউজারের ক্লায়েন্ট-সাইড জাভাস্ক্রিপ্ট দিয়ে বানানো একটি
 *  best-effort প্রতিরোধ ব্যবস্থা। কোনো ক্লায়েন্ট-সাইড কোড দিয়েই
 *  ১০০% নিশ্চিতভাবে DevTools বন্ধ করা বা সোর্স কোড দেখা আটকানো
 *  সম্ভব না (যেমন কেউ জাভাস্ক্রিপ্ট বন্ধ করে ব্রাউজ করলে, অথবা
 *  ব্রাউজার এক্সটেনশন ব্যবহার করলে এই কোড কাজ করবে না)। এটি শুধু
 *  সাধারণ ব্যবহারকারীদের নিরুৎসাহিত করে।
 * ==============================================================
 */

const BLOCKED_KEY_COMBOS: Array<(e: KeyboardEvent) => boolean> = [
  (e) => e.key === "F12",
  (e) => e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i"),
  (e) => e.ctrlKey && e.shiftKey && (e.key === "J" || e.key === "j"),
  (e) => e.ctrlKey && e.shiftKey && (e.key === "C" || e.key === "c"),
  (e) => e.ctrlKey && (e.key === "U" || e.key === "u"),
  // macOS এর জন্য (Cmd+Option+I/J/C)
  (e) => e.metaKey && e.altKey && (e.key === "I" || e.key === "i"),
  (e) => e.metaKey && e.altKey && (e.key === "J" || e.key === "j"),
  (e) => e.metaKey && e.altKey && (e.key === "C" || e.key === "c")
];

function lockDown(): void {
  window.location.replace("about:blank");
}

function blockShortcuts(): void {
  document.addEventListener("keydown", (e) => {
    if (BLOCKED_KEY_COMBOS.some((test) => test(e))) {
      e.preventDefault();
      e.stopPropagation();
      lockDown();
    }
  });
}

function blockRightClick(): void {
  document.addEventListener("contextmenu", (e) => e.preventDefault());
}

function blockSelectionAndDrag(): void {
  document.addEventListener("selectstart", (e) => e.preventDefault());
  document.addEventListener("dragstart", (e) => e.preventDefault());
}

/**
 * DevTools খোলা আছে কিনা আন্দাজ করার দুটি সংকেত:
 *  ১) `debugger` স্টেটমেন্ট — DevTools খোলা থাকলে এক্সিকিউশন থেমে
 *     যায়, ফলে সময় (ms) স্বাভাবিকের চেয়ে অনেক বেশি লাগে। বিল্ড
 *     টুল যাতে স্ট্যাটিক অ্যানালাইসিস করে এটি বাদ দিয়ে না দেয়,
 *     তাই `new Function()` দিয়ে ডায়নামিকভাবে কল করা হয়েছে।
 *  ২) উইন্ডোর আকার বনাম ভিউপোর্টের পার্থক্য (docked devtools)।
 * ভুল শনাক্তকরণ এড়াতে পরপর কয়েকবার সন্দেহজনক ফল পেলে তবেই
 * about:blank এ পাঠানো হয়।
 */
function detectDevTools(): void {
  let strikes = 0;
  const TIME_THRESHOLD_MS = 100;
  const SIZE_THRESHOLD_PX = 160;
  const STRIKES_TO_TRIGGER = 3;
  const pauseIfOpen = new Function("debugger;");

  setInterval(() => {
    const start = performance.now();
    pauseIfOpen();
    const elapsed = performance.now() - start;

    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;
    const dockedSuspicious = widthDiff > SIZE_THRESHOLD_PX || heightDiff > SIZE_THRESHOLD_PX;

    if (elapsed > TIME_THRESHOLD_MS || dockedSuspicious) {
      strikes += 1;
    } else {
      strikes = 0;
    }

    if (strikes >= STRIKES_TO_TRIGGER) {
      lockDown();
    }
  }, 800);
}

export function initProtection(): void {
  blockShortcuts();
  blockRightClick();
  blockSelectionAndDrag();
  detectDevTools();
}
