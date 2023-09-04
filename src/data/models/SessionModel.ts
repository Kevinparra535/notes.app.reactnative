export type timeStamp = { seconds: number; nanoseconds: number };

export interface SessionModel {
  uid: "biH3XapNGLYDcK5Nylo5ieI7oQl2";
  avatar: string;
  email: string;
  username: string;
  password: string;
  createdAt: timeStamp;
  _redirectEventId?: string;
  apiKey: string;
  appName: string;
  displayName?: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  lastLoginAt: string;
  phoneNumber?: number | string;
  photoURL?: string;
  errorCode?: string,
  providerData: Array<Array<Record<string, any>>>;
  stsTokenManager?: {
    accessToken: string;
    expirationTime: number;
    refreshToken: string;
  };
  tenantId?: string;
}
