export interface LoginResponse {
  username: string;
  firstName: string | null;
  userId: string;
  accessToken: string;
  refreshToken: string;
  expirationDate: string;
  deleted:boolean | null;
}
