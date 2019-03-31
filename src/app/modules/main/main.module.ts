import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { Routes, RouterModule } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { SharedModule } from "../../shared/shared.module";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ToastModule } from "primeng/toast";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { CardsComponent } from "./components/cards/cards.component";
import { GamesComponent } from "./components/games/games.component";
import { FinanceComponent } from "./components/finance/finance.component";
import { SupportTicketsComponent } from "./components/support-tickets/support-tickets.component";
import { StoreModule } from '@ngrx/store';
import * as fromMain from './main.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MainEffects } from './main.effects';
import { SettingsComponent } from "./components/settings/settings.component";
import { BoardsComponent } from "./components/boards/boards.component";
import { HelpComponent } from "./components/help/help.component";
import { BoardMemberComponent } from "./components/board-member/board-member.component";
import { BoardDetailComponent } from "./components/board-detail/board-detail.component";
import { InputSwitchModule } from 'primeng/inputswitch';
import { CardComponent } from "./components/card/card.component";
import { CardDetailComponent } from "./components/card-detail/card-detail.component";
import { RadioButtonModule } from 'primeng/radiobutton';
import { BoardComponent } from "./components/board/board.component";
import { DialogModule } from "primeng/dialog";
import { ModalService } from "../../services/modal.service";
import { BoardNewComponent } from "./components/board-new/board-new.component";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from "primeng/api";
import { BoardEditComponent } from "./components/board-edit/board-edit.component";
import { CardNewComponent } from "./components/card-new/card-new.component";
import { CardEditComponent } from "./components/card-edit/card-edit.component";
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CardCloneComponent } from "./components/card-clone/card-clone.component";
import { CardListViewComponent } from "./components/card-list-view/card-list-view.component";
import { TruncatePipe } from "../../shared/pipes/truncate.pipe";
import { TitleCasePipe } from "../../shared/pipes/title-case.pipe";
import { CardArchiveViewComponent } from "./components/card-archive-view/card-archive-view.component";

export const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "notifications",
    component: NotificationsComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "calendar",
    component: CalendarComponent
  },
  {
    path: "cards",
    component: CardsComponent
  },
  {
    path: "boards",
    component: BoardsComponent
  },
  {
    path: "games",
    component: GamesComponent
  },
  {
    path: "finance",
    component: FinanceComponent
  },
  {
    path: "support-tickets",
    component: SupportTicketsComponent
  },
  {
    path: "settings",
    component: SettingsComponent
  },
  {
    path: "help",
    component: HelpComponent
  }
];

const primengModules = [OverlayPanelModule, ToastModule, InputSwitchModule, RadioButtonModule, DialogModule, ConfirmDialogModule];

@NgModule({
  declarations: [
    DashboardComponent,
    NotificationsComponent,
    ProfileComponent,
    CalendarComponent,
    CardsComponent,
    GamesComponent,
    FinanceComponent,
    SupportTicketsComponent,
    SettingsComponent,
    BoardsComponent,
    HelpComponent,
    BoardMemberComponent,
    BoardDetailComponent,
    CardComponent,
    CardDetailComponent,
    BoardComponent,
    BoardNewComponent,
    BoardEditComponent,
    CardNewComponent,
    CardEditComponent,
    CardCloneComponent,
    CardListViewComponent,
    TruncatePipe,
    TitleCasePipe,
    CardArchiveViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...primengModules,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('main', fromMain.mainReducer),
    EffectsModule.forFeature([MainEffects])
  ],
  exports: [
    DashboardComponent,
    NotificationsComponent,
    ProfileComponent,
    CalendarComponent,
    CardsComponent,
    GamesComponent,
    FinanceComponent,
    SupportTicketsComponent,
    SettingsComponent,
    BoardsComponent,
    HelpComponent,
    BoardMemberComponent,
    BoardDetailComponent,
    CardComponent,
    CardDetailComponent,
    BoardComponent,
    BoardNewComponent,
    BoardEditComponent,
    CardNewComponent,
    CardEditComponent,
    CardCloneComponent,
    CardListViewComponent
  ],
  providers: [AuthService, ModalService, ConfirmationService]
})
export class MainModule { }
