export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  role: string;
  permissions: string[];
}
