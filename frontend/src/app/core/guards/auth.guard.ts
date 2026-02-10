import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  // TODO: connect to auth state
  return true;
};
