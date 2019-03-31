import { Component, OnInit } from "@angular/core";
import { environment } from "../../../../../../environments/environment";
declare var window: any;
declare var FB: any;

@Component({
  selector: "app-facebook-login",
  templateUrl: "./facebook-login.component.html",
  styleUrls: ["./facebook-login.component.scss"]
})
export class FacebookLoginComponent implements OnInit {
  constructor() {
    window.fbAsyncInit = () => {
      FB.init({
        appId: environment.fbAppId,
        status: true,
        xfbml: true,
        cookie: true,
        version: "v2.8"
      });

      FB.AppEvents.logPageView();
    };

    ((d, s, id) => {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  ngOnInit(): void {}

  public loginWithFacebook(): void {
    FB.getLoginStatus(function(response) {
      if (response.status === "connected") {
        FB.api("/me", { fields: "first_name, last_name, email, user_birthday, user_location" }, function(response) {
          if (response && !response.error) {
          }
        });
      } else {
        FB.login();
      }
    });
  }
}
