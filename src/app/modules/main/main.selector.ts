import { createSelector } from "@ngrx/store";

export const mainSelectorState = (state) => state.main;

export const mainSelector = createSelector(
  mainSelectorState,
  cards => cards,
  boards => boards
)

export const profileInfoSelector = createSelector(
  mainSelectorState,
  profileInfo => profileInfo,
  user => user
);


export const cardListSelector = createSelector(
  mainSelectorState,
  state => state.cards
)

export const boardListSelector = createSelector(
  mainSelectorState,
  state => state.boards
)
