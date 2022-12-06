import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/Models/userData';
import { UserDataState } from 'src/app/state/user.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Select(UserDataState.getUserData) getUserData$!: Observable<UserData>;
  userData!: UserData;

  constructor(private router: Router) {
    this.getUserData$.subscribe((res: any) => {
      if (res.length > 0) {
        this.userData = res[0];
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {}
}
