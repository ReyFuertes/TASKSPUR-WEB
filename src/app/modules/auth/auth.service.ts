import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User, UserLogin, UserPasswordReset } from "../../models/user.model";
import { BaseService } from "../../services/base.service";

@Injectable()
export class AuthService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  public login(credentials: UserLogin): Observable<User> {
    return this.post("/TOKEN", credentials);
  }

  public register(credentials: User): Observable<boolean> {
    return this.post("/api/account/register", credentials);
  }

  public forgotPassword(email: string): Observable<any> {
    return this.post(`/api/account/forgotpassword?email=${email}`, email);
  }

  public forgotPasswordReset(userPasswordReset: UserPasswordReset): Observable<any> {
    return this.put(`/api/account/resetpassword?userId=${userPasswordReset.userId}&newPassword=${userPasswordReset.newPassword}&code=${userPasswordReset.code}`, userPasswordReset);
  }

  public confirmEmail(userId: string, code: string): Observable<any> {
    return this.put(`/api/account/confirm?userId=${userId}&code=${code}`, userId);
  }

  
}
