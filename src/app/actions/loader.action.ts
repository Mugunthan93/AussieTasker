export class SetLoading {
  static readonly type = '[loading] Add';
  constructor(public payload: boolean) {}
}

export class GetLoading {
  static readonly type = '[loading] Get';
}
