import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { RouterStateSerializer, StoreRouterConnectingModule } from "@ngrx/router-store";
import { reducers, metaReducers } from "./reducers";
import { AuthModule } from "./modules/auth/auth.module";
import { EffectsModule } from "@ngrx/effects";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./modules/auth/auth.guard";
import { CustomSerializer } from "./shared/utils";
import { AuthService } from "./modules/auth/auth.service";
import { MainService } from "./modules/main/main.service";
import { SharedModule } from "./shared/shared.module";
import { NoRouteComponent } from "./shared/components/no-route/no-route.component";
import { AuthLayoutComponent } from "./pages/auth/auth-layout.component";
import { DashboardLayoutComponent } from "./pages/dashboard/dashboard-layout.component";
import { CommonService } from "./services/common.service";
import { EmailValidatorDirective } from "./shared/directives/email.directive";
import { LocalStorageService } from "./services/localStorage.service";
import { DndDirective } from "./shared/directives/drop-file.directive";
import { ErrorService } from "./services/error.service";
import {ToastModule} from 'primeng/toast';
import { MainGuard } from "./modules/main/main.guard";
import { ModalService } from "./services/modal.service";


export const routes: Routes = [
  {
    path: "",
    loadChildren: "./modules/landing/landing.module#LandingModule",
  },
  {
    path: "",
    component: DashboardLayoutComponent,
    loadChildren: "./modules/main/main.module#MainModule",
    canActivate: [ MainGuard ]
  },
  {
    path: "**",
    component: NoRouteComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NoRouteComponent,
    AuthLayoutComponent,
    DashboardLayoutComponent,
    EmailValidatorDirective,
    DndDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    ToastModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ stateKey: "router" })
  ],
  providers: [
    AuthService,
    MainService,
    AuthGuard,
    CommonService,
    LocalStorageService,
    ErrorService,
    MainGuard,
    ModalService,
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
