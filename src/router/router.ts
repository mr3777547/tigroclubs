import { pages, defaultPageId } from "../pages/registry";
import { renderNavbar } from "../components/navbar";

/**
 * "#/", "#/promotion", "#/activity", "#/account" — সবগুলো এই একটি
 * ফাইল দিয়ে নিয়ন্ত্রিত হয়। myappname/#/account লিখে সরাসরি সার্চ
 * করলেও একই লজিক পেজটি লোড করে দেয়, কারণ হ্যাশ (#) সার্ভারে যায় না —
 * তাই কোনো সার্ভার-সাইড রুট কনফিগারেশনের দরকার নেই।
 */
function resolveRouteId(hash: string): string {
  const cleaned = hash.replace(/^#\/?/, "").trim();
  const exists = pages.some((p) => p.id === cleaned);
  return cleaned && exists ? cleaned : defaultPageId;
}

function renderRoute(): void {
  const pageContent = document.getElementById("page-content");
  const nav = document.getElementById("bottom-nav");
  if (!pageContent || !nav) return;

  const routeId = resolveRouteId(window.location.hash);
  const page = pages.find((p) => p.id === routeId) ?? pages[0];

  page.render(pageContent);
  renderNavbar(nav, page.id);
  document.title = `MyAppName — ${page.label}`;
}

export function initRouter(): void {
  window.addEventListener("hashchange", renderRoute);
  window.addEventListener("DOMContentLoaded", renderRoute);
  // পেজ সরাসরি লোড হওয়ার সময়ও (যেমন #/account লিখে সার্চ করলে) রুট রেন্ডার করে
  renderRoute();
}
