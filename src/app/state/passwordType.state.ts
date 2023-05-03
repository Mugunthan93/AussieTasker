import { Action, Selector, State, StateContext } from '@ngxs/store';
import { GetPasswordType, SetPasswordType } from '../actions/user.action';

export class passwordTypeModel {
  type!: 'Account Creation' | 'Forgot Password';
}

@State<passwordTypeModel>({
  name: 'PassType',
  defaults: {
    type: 'Account Creation',
  },
})
export class PasswordState {
  constructor() {}

  @Selector()
  static getPasswordType(state: passwordTypeModel) {
    return state.type;
  }

  @Action(SetPasswordType)
  setPasswordType(
    ctx: StateContext<passwordTypeModel>,
    { payload }: SetPasswordType
  ) {
    const state = ctx.getState();
    ctx.patchState({ type: payload });
  }

  @Action(GetPasswordType)
  getPasswordType(ctx: StateContext<GetPasswordType>) {
    return ctx.getState();
  }
}
