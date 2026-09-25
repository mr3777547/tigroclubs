import type { PageConfig } from "./types";
import { renderHome } from "./home";
import { renderPromotion } from "./promotion";
import { renderActivity } from "./activity";
import { renderAccount } from "./account";

/**
 * ============================================================
 *  সব পেজের তালিকা — bottom nav বার ও রাউটার দুটোই এখান থেকে
 *  পেজ তৈরি করে। নতুন পেজ যোগ করতে চাইলে:
 *
 *   ১) public/assets/icons/ ফোল্ডারে <name>.svg ও
 *      <name>_inactive.svg নামে দুটি আইকন রাখুন।
 *   ২) src/pages/<name>.ts ফাইল বানিয়ে render ফাংশন লিখুন
 *      (home.ts / promotion.ts ফাইলগুলো উদাহরণ হিসেবে দেখুন)।
 *   ৩) নিচের অ্যারেতে একটি নতুন অবজেক্ট যোগ করুন।
 *
 *  ব্যাস — নতুন ট্যাব বাটন বারে ও নতুন রাউট (#/<id>) স্বয়ংক্রিয়ভাবে
 *  কাজ করা শুরু করবে। কোনো ফাইল এডিট করতে হবে না।
 * ============================================================
 */
export const pages: PageConfig[] = [
  {
    id: "home",
    label: "Home",
    activeIcon: "assets/icons/home.svg",
    inactiveIcon: "assets/icons/home_inactive.svg",
    render: renderHome
  },
  {
    id: "promotion",
    label: "Promotion",
    activeIcon: "assets/icons/promotion.svg",
    inactiveIcon: "assets/icons/promotion_inactive.svg",
    render: renderPromotion
  },
  {
    id: "activity",
    label: "Invitation",
    activeIcon: "assets/icons/activity.svg",
    inactiveIcon: "assets/icons/activity_inactive.svg",
    render: renderActivity
  },
  {
    id: "account",
    label: "Member",
    activeIcon: "assets/icons/account.svg",
    inactiveIcon: "assets/icons/account_inactive.svg",
    render: renderAccount
  }

  // এখানে নতুন পেজ যোগ করুন, যেমন:
  // {
  //   id: "settings",
  //   label: "Settings",
  //   activeIcon: "assets/icons/settings.svg",
  //   inactiveIcon: "assets/icons/settings_inactive.svg",
  //   render: renderSettings
  // }
];

export const defaultPageId = "home";
