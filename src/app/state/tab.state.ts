import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { GetTabData, SetTabData } from '../actions/tab.action';

export class tabDataModel {
  data!: string;
}

@State<tabDataModel>({
  name: 'TabData',
  defaults: {
    data: '',
  },
})
@Injectable()
export class tabDataState {
  constructor() {}

  @Selector()
  static getCurrentTabData(state: tabDataModel) {
    return state.data;
  }

  @Action(SetTabData)
  setTabData(ctx: StateContext<tabDataModel>, { payload }: SetTabData) {
    if (!payload) return;
    const state = ctx.getState();

    ctx.patchState({ data: payload });
  }

  @Action(GetTabData)
  getTabData({ getState }: StateContext<GetTabData>) {
    return getState();
  }
}
