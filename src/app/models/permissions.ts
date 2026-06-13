export interface PermissionsResponse {
  success: boolean;
  message: string;
  data: PermissionGroup[];
}

export interface Permissions {
  name: string;
  display_name: string;
  assigned?: boolean;
}

export interface PermissionGroup {
  module: string;
  permissions: Permissions[];
}
