import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { IUser } from '../_models/user';

import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model)
      .pipe(
        first(),
      )
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error("Error: ", error);
        },
      );
  }

  logout() {
    this.accountService.logout();
  }

}
