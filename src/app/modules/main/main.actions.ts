import { Action } from "@ngrx/store";
import { Board } from "../../models/board.model";
import { Card } from "../../models/card.model";
import { UserProfile } from "../../models/user.model";

export enum MainActionTypes {
  isPILoadedAction = "[main] isPILoadedAction",
  selectedMenuAction = "[main] selectedMenu",
  loadCardsAction = "[main] cardList",
  loadBoardsAction = "[main] boardsList",
  profileInfoAction = "[main] profileInfoAction"
}

export class IsPILoadedAction implements Action {
  readonly type = MainActionTypes.isPILoadedAction;

  constructor(public payload: { isPILoadedAction: boolean }) { }
}

export class LoadCardsAction implements Action {
  readonly type = MainActionTypes.loadCardsAction;

  constructor(public payload: { cards: Card[] }) { }
}

export class LoadBoardsAction implements Action {
  readonly type = MainActionTypes.loadBoardsAction;

  constructor(public payload: { boards: Board[] }) { }
}

export class ProfileInfoAction implements Action {
  readonly type = MainActionTypes.profileInfoAction;

  constructor(public payload: { profileInfo: UserProfile }) {}
}

export type MainActions = IsPILoadedAction | LoadCardsAction | LoadBoardsAction | ProfileInfoAction;
