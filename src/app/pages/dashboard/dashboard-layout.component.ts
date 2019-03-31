import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
import { MainState } from "../../modules/main/main.reducer";
import { MainService } from "../../modules/main/main.service";
import { LoadBoardsAction, LoadCardsAction } from "../../modules/main/main.actions";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AuthState } from "../../modules/auth/auth.reducer";
import { isLoggedIn } from "../../modules/auth/auth.selectors";
import { Router } from "@angular/router";


@Component({
  selector: "app-dashboard-layout",
  templateUrl: "./dashboard-layout.component.html",
  styleUrls: ["./dashboard-layout.component.scss"]
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
  public activeMenu: string;
  public showSidebar: boolean = false;
  public hideOnMobile: boolean = false;

  constructor(private mainService: MainService, private store: Store<MainState>) {
  }

  ngOnInit() {
    this.mainService.getCards().subscribe(cards => {
      if(cards)
        this.store.dispatch(new LoadCardsAction({ cards }));
    });

    this.mainService.getBoards().subscribe(boards => {
      if(boards)
        this.store.dispatch(new LoadBoardsAction({ boards }));
    });
  }


  public handleShowSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }

  ngOnDestroy(): void {
  }
}
