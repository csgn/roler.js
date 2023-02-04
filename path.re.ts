import { Path } from "./path";

export const PathRe = {
  // home
  [Path.HOME]: /^[\/]$/,

  // overview
  [Path.OVERVIEW]: /^\/overview((?:\/)+)?$/,
  [Path.OVERVIEW_ID]: /^\/overview(\/[a-zA-Z0-9]+)$/,
};

