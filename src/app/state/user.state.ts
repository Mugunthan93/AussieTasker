import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  DeleteUserData,
  GetUserData,
  SetUserData,
} from '../actions/user.action';
import { UserData } from '../Models/userData';

export class userDataModel {
  data!: UserData[];
}

@State<userDataModel>({
  name: 'userData',
  defaults: {
    data: [],
  },
})
@Injectable()
export class UserDataState {
  constructor() {}

  @Selector()
  static getUserData(state: userDataModel) {
    return state.data;
  }

  @Action(SetUserData)
  setUserData(ctx: StateContext<userDataModel>, { payload }: SetUserData) {
    if (!payload) return;
    const state = ctx.getState();

    ctx.patchState({ data: [payload] });
  }

  @Action(GetUserData)
  getTodos({ getState }: StateContext<GetUserData>) {
    return getState();
  }

  @Action(DeleteUserData)
  deleteUserData(ctx: StateContext<any>) {
    const state = ctx.setState(null);
  }
}
