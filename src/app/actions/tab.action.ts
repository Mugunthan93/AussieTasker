export class SetTabData {
  static readonly type = '[TabData] Add';
  constructor(public payload: string) {}
}

export class GetTabData {
  static readonly type = '[TabData] Get';
}
