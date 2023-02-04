# roler.js
JavaScript rol based permission


### Define Roles
```ts
// role.ts

export enum Role {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  USER = 'USER',
}
```

### Define Paths
```ts
export enum Path {
  // localhost:3000/
  HOME,

  // localhost:3000/overview
  OVERVIEW,

  // localhost:3000/overview/1
  OVERVIEW_ID,
}

```

### Define Paths Regex
```ts
import { Path } from "./path";

export const PathRe = {
  // will match '/'
  [Path.HOME]: /^[\/]$/,

  // will match '/overview'
  [Path.OVERVIEW]: /^\/overview((?:\/)+)?$/,

  // will match /overview/1, /overview/asd ...
  [Path.OVERVIEW_ID]: /^\/overview(\/[a-zA-Z0-9]+)$/,
};

```

### Define Permissions
```ts
import { Role } from "./role";
import { Path } from "./path";

export const permissions = {
  // home
  [Path.HOME]: {
    canNotSee: [], // all roles can see / page
    canNotAction: {
      __btn_owner: [Role.ADMIN, Role.USER], // ADMIN and USER can not action on __btn_owner
      __text_owner: [Role.ADMIN, Role.USER],
      __btn_admin: [Role.USER],
      __text_admin: [Role.USER], // USER can not action on __text_admin
      __btn_user: [],
      __text_user: [],
    },
  },
  // overview
  [Path.OVERVIEW]: {
    canNotSee: [Role.USER], // USER can not see /overview
    canNotAction: {
      __btn_click: [Role.ADMIN],
    },
  },
  // overview/<id>
  [Path.OVERVIEW_ID]: {
    canNotSee: [Role.USER, Role.ADMIN], // USER and ADMIN can not see /overview/<id>
    canNotAction: {
      __btn_click: [],
    },
  },
};

```

### Example Usage
```ts

// ssr
export async function requireUserSession(request: Request) {
  ...

  // get role of current user
  const role = session.role;

  // get role based permission for <url>
  const { canNotSee, canNotAction } = getPermission(role, request.url);

  // if the user can not see the url, then redirect
  if (canNotSee) {
    // redirect
  }

  return { session, permission: canNotAction };
}


// overview.tsx
export default function Overview() {
  ...
  const { ..., permission } = useLoaderData();

  return (
    ...
      {permission.__btn_click && <button>can click?</button>}
    ...
  );

}
```