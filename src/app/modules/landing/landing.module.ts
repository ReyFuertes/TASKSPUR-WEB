import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TopnavComponent } from "./components/topnav/topnav.component";
import { IntroComponent } from './components/intro/intro.component';
import { WhyTaskspurComponent } from './components/why-taskspur/why-taskspur.component';
import { MeetAriComponent } from './components/meet-ari/meet-ari.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from "../../shared/shared.module";
import { LandingSidebarComponent } from './components/landing-sidebar/landing-sidebar.component';
import { Routes, RouterModule } from "@angular/router";
import { LandingPageComponent } from "./components/landing/landing-page.component";

export const routes: Routes = [
  {
    path: "intro",
    component: LandingPageComponent
  },
]

@NgModule({
  declarations: [
    TopnavComponent,
    IntroComponent,
    WhyTaskspurComponent,
    MeetAriComponent,
    SubscriptionComponent,
    DiscoverComponent,
    ContactUsComponent,
    FooterComponent,
    LandingSidebarComponent,
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

    RouterModule.forChild(routes),
  ],
  exports: [
    TopnavComponent,
    IntroComponent,
    WhyTaskspurComponent,
    MeetAriComponent,
    SubscriptionComponent,
    DiscoverComponent,
    ContactUsComponent,
    FooterComponent,
    LandingSidebarComponent,
    LandingPageComponent
  ],
  providers: [

  ]
})
export class LandingModule { }
