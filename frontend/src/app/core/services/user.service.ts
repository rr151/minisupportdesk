import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  // TODO: wire to API
  me(): User | null {
    return null;
  }
}
