import { CanActivateFn } from '@angular/router';

export const roleGuard: CanActivateFn = () => {
  // TODO: read roles from auth state and route data
  return true;
};
