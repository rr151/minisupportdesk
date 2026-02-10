export enum Role {
  ADMIN = 'ADMIN',
  AGENT = 'AGENT',
  CUSTOMER = 'CUSTOMER'
}

export enum Permission {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE'
}

export interface RoleEntity {
  id: string;
  name: Role;
  permissions: Permission[];
}
