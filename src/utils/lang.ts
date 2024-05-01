export function getSupportedLocales() {
  const localesStr = process.env.NEXT_PUBLIC_LANGUAGES_SUPPORTED || "en fr tl";
  return localesStr.split(/\s+/);
}
