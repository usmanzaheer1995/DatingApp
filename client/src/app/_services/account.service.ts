import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from "rxjs/operators";

import { environment } from 'src/environments/environment';
import { IUser } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(`${this.baseUrl}account/login`, model).pipe(
      map((response: IUser) => {
        const user = response;
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      }),
    );
  }

  register(model: any) {
    return this.http.post(`${this.baseUrl}account/register`, model).pipe(
      map((response: IUser) => {
        if (response) {
          localStorage.setItem("user", JSON.stringify(response));
          this.currentUserSource.next(response);
        }
        return response;
      }),
    );
  }

  setCurrentUser(user: IUser) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem("user");
    this.currentUserSource.next(null);
  }
}
