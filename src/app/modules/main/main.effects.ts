import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MainActionTypes, IsPILoadedAction, LoadCardsAction, ProfileInfoAction } from './main.actions';
import { tap, switchMap, distinctUntilChanged, map } from 'rxjs/operators';
import { MainService } from './main.service';


@Injectable()
export class MainEffects {

  constructor(private mainService: MainService, private actions$: Actions) { }

  @Effect({ dispatch: false })
  public userInfo$ = this.actions$.pipe(
    ofType<IsPILoadedAction>(MainActionTypes.isPILoadedAction),
    tap(action => {
      localStorage.setItem("isProfileInfoLoaded", JSON.stringify(true))
    })
  )

  @Effect({ dispatch: false })
  public profileInfo$ = this.actions$.pipe(
    ofType<ProfileInfoAction>(MainActionTypes.profileInfoAction),
    tap(action => {
      localStorage.setItem("profileInfo", JSON.stringify(action.payload.profileInfo))
    })
  )

  // @Effect()
  // public card$ = this.actions$.pipe(
  //   ofType<LoadCardsAction>(MainActionTypes.loadBoardsAction),
  //   distinctUntilChanged(),
  //   tap(() => this.mainService.getCards().subscribe()),
  //   map(res => console.log('effects', res))
  // );
}
