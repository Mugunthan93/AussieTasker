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
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { UserDataState } from 'src/app/state/user.state';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/Models/userData';
import { CommonService } from 'src/app/services/common.service';

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
  slideIndex: number = 0;
  userData!: UserData;
  isWeb!: boolean;

  constructor(
    private router: Router,
    private cdref: ChangeDetectorRef,
    private common: CommonService
  ) {
    this.common.screenSize.next(window.innerWidth);
    this.getUserData$.subscribe((res: any) => {
      if (res && res.length > 0 && this.router.url == '/startup') {
      }
    });

    this.common.getisWeb.subscribe({
      next: (res) => {
        if (res < 992) {
          this.isWeb = false;
        } else {
          this.router.navigate(['/home']);
          this.isWeb = true;
        }
      },
    });
  }

  ngOnInit() {
    this.slideIndex = 0;
  }

  ngAfterContentInit(): void {
    this.cdref.detectChanges();
  }

  slideNext() {
    this.swiper?.swiperRef.slideNext(500);
    this.slideIndex = this.swiper?.swiperRef.activeIndex || 0;
    this.cdref.detectChanges();
  }

  onSwiper() {
    this.slideIndex = this.swiper?.swiperRef.activeIndex || 0;
    this.cdref.detectChanges();
  }

  slideFinish() {
    // localStorage.setItem('startup', 'disabled');
    if (!this.isWeb) {
      this.router.navigate(['/signup']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
