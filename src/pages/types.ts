/**
 * একটি পেজের সংজ্ঞা (definition)।
 * নতুন পেজ যোগ করতে চাইলে এই টাইপ অনুযায়ী registry.ts -এ একটি নতুন এন্ট্রি যোগ করুন।
 */
export interface PageConfig {
  /** রাউটের নাম, যেমন "home" → #/home (হোমের জন্য #/ ও চলবে) */
  id: string;
  /** বাটন বারে দেখানোর নাম */
  label: string;
  /** সক্রিয় (active) অবস্থায় দেখানো আইকনের পাথ */
  activeIcon: string;
  /** নিষ্ক্রিয় (inactive) অবস্থায় দেখানো আইকনের পাথ */
  inactiveIcon: string;
  /** এই পেজের কন্টেন্ট #page-content এর ভেতরে বসিয়ে দেয় */
  render: (container: HTMLElement) => void;
}
