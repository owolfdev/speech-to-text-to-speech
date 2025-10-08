// PWA utility functions

export function isPWA(): boolean {
  // Check if running in PWA mode
  if (typeof window === "undefined") return false;

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as { standalone?: boolean }).standalone === true ||
    document.referrer.includes("android-app://") ||
    window.location.search.includes("source=pwa")
  );
}

export function isInStandaloneMode(): boolean {
  if (typeof window === "undefined") return false;

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as { standalone?: boolean }).standalone === true
  );
}

export function redirectToExternalAuth(): void {
  if (typeof window === "undefined") return;

  // Get current URL but ensure we're in browser mode
  const currentUrl = window.location.href;
  const authUrl = currentUrl.replace(/source=pwa/, "").replace(/\?$/, "");

  // Open in external browser for authentication
  window.location.href = authUrl;
}

export function getReturnUrl(): string {
  if (typeof window === "undefined") return "/";

  // If we're in PWA mode, return to PWA version
  if (isPWA()) {
    return "/?source=pwa";
  }

  return "/";
}
