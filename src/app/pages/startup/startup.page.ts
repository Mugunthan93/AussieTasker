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

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-startup',
  templateUrl: './startup.page.html',
  styleUrls: ['./startup.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StartupPage implements OnInit, AfterContentInit {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  component = HomeComponent;
  slideIndex: number = 0;

  constructor(private router: Router, private cdref: ChangeDetectorRef) {}

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
