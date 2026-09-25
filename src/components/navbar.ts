import { pages } from "../pages/registry";

/**
 * বাটন বার (bottom nav) — button-bar.jpg রেফারেন্স অনুযায়ী।
 * pages/registry.ts এর তালিকা থেকে স্বয়ংক্রিয়ভাবে ট্যাব তৈরি করে,
 * তাই নতুন পেজ যোগ করলে এই ফাইল বদলাতে হয় না।
 */
export function renderNavbar(nav: HTMLElement, activeId: string): void {
  nav.innerHTML = "";

  pages.forEach((page) => {
    const isActive = page.id === activeId;

    const item = document.createElement("a");
    item.href = `#/${page.id === "home" ? "" : page.id}`;
    item.className = `nav-item${isActive ? " active" : ""}`;
    item.dataset.route = page.id;
    item.draggable = false;

    const icon = document.createElement("img");
    icon.className = "nav-icon";
    icon.src = isActive ? page.activeIcon : page.inactiveIcon;
    icon.alt = page.label;
    icon.draggable = false;

    const label = document.createElement("span");
    label.className = "nav-label";
    label.textContent = page.label;

    item.appendChild(icon);
    item.appendChild(label);
    nav.appendChild(item);
  });
}
