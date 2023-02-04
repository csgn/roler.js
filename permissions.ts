import { Role } from "./role";
import { Path } from "./path";

export const permissions = {
  // home
  [Path.HOME]: {
    canNotSee: [],
    canNotAction: {
      __btn_owner: [Role.ADMIN, Role.USER],
      __text_owner: [Role.ADMIN, Role.USER],
      __btn_admin: [Role.USER],
      __text_admin: [Role.USER],
      __btn_user: [],
      __text_user: [],
    },
  },
  // overview
  [Path.OVERVIEW]: {
    canNotSee: [Role.USER],
    canNotAction: {
      __btn_click: [Role.ADMIN],
    },
  },
  [Path.OVERVIEW_ID]: {
    canNotSee: [Role.USER, Role.ADMIN],
    canNotAction: {
      __btn_click: [],
    },
  },
};

