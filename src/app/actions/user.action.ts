import { UserData } from '../Models/userData';

export class SetUserDataAction {
  static readonly type = '[UserData page] Add data';
  constructor(public payload: UserData) {
    console.log(payload);
  }
}

export class SetUserData {
  static readonly type = '[UserData] Add';
  constructor(public payload: UserData) {
    console.log(payload);
  }
}

export class GetUserData {
  static readonly type = '[UserData] Get';
}
