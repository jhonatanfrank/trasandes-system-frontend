import { PermissionGroup } from "./permissions";

export interface Role {
  id?: number;
  name?: string;
  guard_name?: string;
  permissions?: PermissionGroup[];
  created_at?: string;
  updated_at?: string;
}

export interface RoleCreateUpdate {
  name: string;
  permissions: string[];
}

export interface RolesData {
  current_page: number;
  data: Role[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface RolesResponse {
  success: boolean;
  message: string;
  data: RolesData;
}

export interface RoleResponse {
  success: boolean;
  message: string;
  data: Role;
}

export interface RolesAllResponse {
  success: boolean;
  message: string;
  data: Role[];
}

export interface RoleCreateUpdateResponse {
  success: boolean;
  message: string;
  data: RoleCreateUpdate;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

