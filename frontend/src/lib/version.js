/** localStorage key — must match index.html cache-bust script */
export const VERSION_STORAGE_KEY = "chaat_chaska_version";

/** Set by public/version.js after each deploy/build */
export function getAppVersion() {
  return typeof window !== "undefined" ? window.__APP_VERSION__ : null;
}
