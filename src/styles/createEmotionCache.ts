import createCache from "@emotion/cache";

// Even if we don't use emotion explicitly, MUI still uses it, so it's still important to configure it.

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export default function createEmotionCache() {
  return createCache({ key: "scss", prepend: true });
}
