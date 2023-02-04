import { Role } from './role'
import { PathRe } from './path.re';
import { permissions } from './permissions';


const pathname_re = /^([a-z][a-z0-9+\-.]*:(\/\/[^/?#]+)?)?([a-z0-9\-._~%!$&'()*+,;=:@/]*)/g;

export default function getPermission(role: Role, url: string) {
  const e = pathname_re.exec(url);
  let pathname: string;

  if (e!.length > 0) {
    pathname = e![3];
  }

  const index = Object.entries(PathRe)
    .map((el) => {
      if (el[1].exec(pathname)) return el[0];
    })
    .filter((_) => _);

  if (!index || index.length === 0) {
    throw new Error('invalid path');
  }

  const { canNotSee, canNotAction } = permissions[index[0]];

  
  const s = Object.entries(canNotAction);
  let roleCanNotAction = {};

  s.map(([k, v]) => {
    roleCanNotAction[k] = !v.includes(role);
  });


  return { canNotSee: canNotSee.includes(role), canNotAction: roleCanNotAction };
}