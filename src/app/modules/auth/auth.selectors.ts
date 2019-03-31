import { createSelector } from "@ngrx/store";
import { AuthActionTypes } from "./auth.actions";

export const selectAuthState = state => state.auth;

export const isLoggedIn = createSelector(
  selectAuthState,
  auth => auth.loggedIn
);

export const isLoggedOut = createSelector(isLoggedIn, loggedIn => !loggedIn);

export function clearState(reducer) {
  return function (state, action) {

    if (action.type === AuthActionTypes.LogoutAction) {
      state = undefined;
    }

    return reducer(state, action);
  };
}