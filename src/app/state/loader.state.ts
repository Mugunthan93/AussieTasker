import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { GetLoading, SetLoading } from '../actions/loader.action';

export class loadingModel {
  isLoading!: boolean;
}

@State<loadingModel>({
  name: 'loading',
  defaults: { isLoading: false },
})
@Injectable()
export class LoaderState {
  @Selector()
  static getLoader(state: loadingModel) {
    return state.isLoading;
  }

  @Action(SetLoading)
  setLoading(ctx: StateContext<loadingModel>, { payload }: SetLoading) {
    const state = ctx.getState();

    ctx.patchState({ isLoading: payload });
  }

  @Action(GetLoading)
  getLoading(ctx: StateContext<GetLoading>) {
    const state = ctx.getState();

    return ctx.getState();
  }
}
