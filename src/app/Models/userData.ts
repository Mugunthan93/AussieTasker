export interface UserData {
  _id: string;
  userId: string;
  emailId: string;
  isEmailVerified: boolean;
  status: string;
  token: string;
  previousPassword: any[];
}
