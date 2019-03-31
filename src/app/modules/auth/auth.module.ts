import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./components/login/login.component";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./auth.effects";
import { RegisterComponent } from "./components/register/register.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { CheckboxModule } from "primeng/checkbox";
import { SharedModule } from "../../shared/shared.module";
import { CompareDirective } from "../../shared/directives/password.directive";
import { FacebookLoginComponent } from "./components/social-login/facebook/facebook-login.component";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { GoogleLoginComponent } from "./components/social-login/google/google-login.component";
import { ForgotPasswordResetComponent } from "./components/password-reset/password-reset.component";
import { MessageModule } from "primeng/primeng";
import { TermsConditionComponent } from "../../shared/components/terms-condition/terms-condition.component";
import { PrivacyPolicyComponent } from "../../shared/components/privacy-policy/privacy-policy.component";
import { MessagesModule } from 'primeng/messages';
import { AuthLayoutComponent } from "../../pages/auth/auth-layout.component";
import { ConfirmEmailComponent } from "./components/confirm-email/confirm-email.component";
import { reducers } from "../../reducers";
import { clearState } from "./auth.selectors";
import { AuthGuard } from "./auth.guard";
import { MainGuard } from "../main/main.guard";

export const routes: Routes = [
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "forgot-password-reset", component: ForgotPasswordResetComponent },
      { path: "forgot-password", component: ForgotPasswordComponent },
      { path: "mail-confirmation", component: ConfirmEmailComponent },
      {
        path: "termsandconditions",
        component: TermsConditionComponent
      },
      {
        path: "privacypolicy",
        component: PrivacyPolicyComponent
      },
      { path: "", redirectTo: "/intro", pathMatch: "full" }
    ]
  }
];

const primengModules = [CheckboxModule, ToastModule, MessagesModule];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...primengModules,
    SharedModule,

    RouterModule.forChild(routes),
    StoreModule.forFeature("auth", fromAuth.authReducer),
    StoreModule.forRoot(reducers, { metaReducers: [clearState] }),
    EffectsModule.forFeature([AuthEffects]),
    MessageModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    CompareDirective,
    FacebookLoginComponent,
    GoogleLoginComponent,
    ForgotPasswordResetComponent,
    TermsConditionComponent,
    PrivacyPolicyComponent,
    ConfirmEmailComponent
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    FacebookLoginComponent,
    GoogleLoginComponent,
    ForgotPasswordResetComponent,
    ConfirmEmailComponent
  ],
  providers: [MessageService, MainGuard]
})
export class AuthModule { }
