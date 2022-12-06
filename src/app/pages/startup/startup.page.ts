import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Pagination } from 'swiper';
import { HomeComponent } from 'src/app/components/home/home.component';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { UserDataState } from 'src/app/state/user.state';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/Models/userData';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-startup',
  templateUrl: './startup.page.html',
  styleUrls: ['./startup.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StartupPage implements OnInit, AfterContentInit {
  @Select(UserDataState.getUserData) getUserData$!: Observable<UserData>;
  @ViewChild('swiper', { static: false })
  swiper?: SwiperComponent;
  component = HomeComponent;
  slideIndex: number = 0;
  userData!: UserData;

  constructor(private router: Router, private cdref: ChangeDetectorRef) {
    this.getUserData$.subscribe((res: any) => {
      if (res.length > 0 && this.router.url == '/startup') {
        // this.router.navigate(['/home']);
      }
    });
  }

  ngOnInit() {
    this.slideIndex = 0;
  }

  ngAfterContentInit(): void {
    this.cdref.detectChanges();
  }

  slideNext() {
    this.swiper?.swiperRef.slideNext(100);
    this.slideIndex = this.swiper?.swiperRef.activeIndex || 0;
    this.cdref.detectChanges();
  }

  onSwiper() {
    this.slideIndex = this.swiper?.swiperRef.activeIndex || 0;
    this.cdref.detectChanges();
  }

  slideFinish() {
    // localStorage.setItem('startup', 'disabled');
    this.router.navigate(['/signup']);
  }
}
