export interface User {
  id: string;
  avatar: string;
  username: string;
  discriminator: string;
  locale: string;
  flags: number;
  mfa_enabled: boolean;
  premium_type: number;
  public_flags: number;
}