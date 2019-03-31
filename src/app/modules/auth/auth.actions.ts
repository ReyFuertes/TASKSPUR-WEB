import { Action } from "@ngrx/store";
import { User } from "../../models/user.model";

export enum AuthActionTypes {
  LoginAction = "[Login] Action",
  LogoutAction = "[Logout] Action",
  registerAction = "[Register] Action"
}

export class Login implements Action {
  readonly type = AuthActionTypes.LoginAction;

  constructor(public payload: { user: User }) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LogoutAction;

}

export class Register implements Action {
  readonly type = AuthActionTypes.registerAction;
  constructor(public payload: { isRegistered: true }) {}
}

export type AuthActions = Login | Logout | Register;
