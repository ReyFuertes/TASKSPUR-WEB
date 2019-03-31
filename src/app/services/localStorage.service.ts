import { Injectable } from "@angular/core";
import { User, ProfileInfo } from "../models/user.model";

@Injectable()
export class LocalStorageService {

  public getUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  public IsProfileInfoLoaded(): boolean {
    return JSON.parse(localStorage.getItem('isProfileInfoLoaded'));
  }

  public getCardView(): number {
    return JSON.parse(localStorage.getItem('cardView'));
  }

  public getProfileInfo(): ProfileInfo {
    return JSON.parse(localStorage.getItem('profileInfo'));
  }
}
