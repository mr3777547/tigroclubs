// ==============================================================
//  হোম পেজ (route: #/)
//  এই ফাইলটি পরিবর্তন করলে শুধু "Home" ট্যাবের কন্টেন্ট বদলাবে।
// ==============================================================
export function renderHome(container: HTMLElement): void {
  container.innerHTML = `
    <div class="page page-home">
      <h1>হোম পেজ</h1>
    </div>
  `;
}
