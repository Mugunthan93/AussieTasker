export interface UserData {
  _id: string;
  userId: string;
  emailId: string;
  loginType: string;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  status: string;
  token: string;
  previousPassword: any[];
  createdAt: any;
  updatedAt: any;
  __v?: any;
}
