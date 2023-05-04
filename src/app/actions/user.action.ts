import { UserData } from '../Models/userData';

export class SetUserDataAction {
  static readonly type = '[UserData page] Add data';
  constructor(public payload: UserData) {}
}

export class SetUserData {
  static readonly type = '[UserData] Add';
  constructor(public payload: UserData) {}
}

export class GetUserData {
  static readonly type = '[UserData] Get';
}

export class DeleteUserData {
  static readonly type = '[UserData] Delete';
}
export class SetPasswordType {
  static readonly type = '[PassType] Add';
  constructor(public payload: 'Account Creation' | 'Forgot Password') {}
}

export class GetPasswordType {
  static readonly type = '[PassType] Get';
}
