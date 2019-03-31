import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseService } from "../../services/base.service";
import { ProfileImage } from "../../models/image.model";
import { Board } from "../../models/board.model";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { User } from "../../models/user.model";
import { Card } from "../../models/card.model";

@Injectable()
export class MainService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  public getProfile(): Observable<any> {
    return this.get("/api/account/profile/");
  }

  public updateProfile(user: User): Observable<any> {
    return this.put("/api/account/profile", user);
  }

  public getProfileImage(id: string): Observable<ProfileImage> {
    return this.get("/api/photo/"+id);
  }

  public accountChangePassword(accountPassword: any): Observable<any> {
    return this.put(`/api/account/changepassword?userId=${accountPassword.userId}&currentPassword=${accountPassword.currentPassword}&newPassword=${accountPassword.newPassword}`, accountPassword);
  }

  public cardToPlayToday(): Observable<any>  {
    return this.get("/api/card/today");
  }
  
  public getCards(): Observable<any> {
    return this.get("/api/card?includeMembers=false&includeCardComment=false&includeAttachments=false&sortBy=Id&sortOrder=Asc&pageSize=10");
  }

  public createBoard(board: Board): Observable<any> {
    return this.post("/api/board", board);
  }

  public getBoards(): Observable<any> {
    return this.get("/api/board?sortBy=Id&sortOrder=Asc");
  }

  public deleteBoard(id: number): any {
    return this.delete(`/api/board/${id}`);
  }

  //in progress
  public searchBoard(terms: Observable<string>) {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.search(term)))
  }

  private search(searchTerm: string): Observable<any> {
    return this.get(`/api/board?q=${searchTerm}`);
  }

  public getBoard(id: number): Observable<any> {
    return this.get(`/api/board/${id}`);
  }

  public updateBoard(board: Board): Observable<any> {
    return this.put('/api/board', board)
  }

  public createCard(card: Card): Observable<any> {
    return this.post('/api/card', card)
  }

  public updateCard(card: Card): Observable<any> {
    return this.put('/api/card', card)
  }

  public getCardAttachments(cardId: number): Observable<any> {
    return this.get(`/api/card/${cardId}/attachment`);
  }

  public deleteCard(id: number): Observable<any> {
    return this.delete(`/api/card/${id}`);
  }
  
  public updateCardStatus(id: number, status: number): Observable<any> {
    return this.put(`/api/card/status/${id}/${status}`, {});
  }

  public archiveCard(id: number): Observable<any> {
    return this.put(`/api/card/archived/${id}`, {});
  }

  public updateCardSchedule(card: Card): Observable<any> {
    return this.put(`/api/card`, card);
  }

  public getArchivedCards(): Observable<Card[]> {
    return this.get(`/api/card?archivedCard=true`);
  }
}
