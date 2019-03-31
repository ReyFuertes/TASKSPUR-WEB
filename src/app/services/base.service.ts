import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import { environment } from "../../environments/environment";

export abstract class BaseService {
  constructor(private http: HttpClient) {}

  protected getAPIBase(route: string = ""): string {
    return environment.baseUrl + route;
  }

  private getToken(): string {
    return JSON.parse(localStorage.getItem('user')) ?
           JSON.parse(localStorage.getItem('user')).Token : ''
  }

  protected commonStateChangeHeaders(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${this.getToken()}`,
    });
  }

  protected get(route: string): Observable<any> {
    let url = this.getAPIBase() + route;

    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
      Accept: "application/json"
    });

    let options = { headers: headers };
    return this.http.get(url, options);
  }

  protected post(route: string, object?: any): Observable<any> {
    return this.http.post(this.getAPIBase(route), object, { headers: this.commonStateChangeHeaders()});
  }

  protected postToParams(route: string): Observable<any> {
    return this.http.post(this.getAPIBase(route), {}, { headers: this.commonStateChangeHeaders()});
  }

  protected upload(route: string, object: any): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
      Accept: "application/json"
    });
    headers.set('Content-Type', 'multipart/form-data');

    return this.http.post(this.getAPIBase(route), object, { headers: headers });
  }

  protected delete(route: string): Observable<any> {
    return this.http.delete(this.getAPIBase(route), {
      headers: this.commonStateChangeHeaders()
    });
  }

  protected put(route: string, object: any): Observable<any> {
    return this.http.put(this.getAPIBase(route), object, { headers: this.commonStateChangeHeaders() }
    );
  }

  protected patch(route: string, object: any): Observable<any> {
    return this.http.patch(this.getAPIBase(route), object, { headers: this.commonStateChangeHeaders() }
    );
  }

  public handleError = (error: any) => {};
  
}
