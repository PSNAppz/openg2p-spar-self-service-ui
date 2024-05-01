export function prefixBasePath(path: string) {
  return (process.env.NEXT_PUBLIC_BASE_PATH || "") + path;
}

export function prefixBaseApiPath(path: string) {
  return (process.env.NEXT_PUBLIC_BASE_API_PATH || "") + path;
}

export function getSupportedLocales() {
  const localesStr = process.env.NEXT_PUBLIC_LANGUAGES_SUPPORTED || "en fr tl";
  return localesStr.split(/\s+/);
}
