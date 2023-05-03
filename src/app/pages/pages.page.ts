import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PagesPage implements OnInit {
  showTab: boolean = false;
  urls: string[] = [
    'startup',
    'signup',
    'login',
    'verify',
    'changePassword',
    'userDetails',
    'createTask',
  ];
  isWeb!: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private common: CommonService
  ) {
    this.router.events.subscribe((e: any) => {
      if (e.url) {
        let i = this.urls.findIndex((u) => u == e.url.split('/')[1]);
        if (i > -1) {
          this.showTab = false;
        } else {
          this.showTab = true;
        }
      }
    });

    this.common.getisWeb.subscribe({
      next: (res) => {
        if (res < 992) {
          this.isWeb = false;
        } else {
          this.isWeb = true;
        }
        if (res) {
          this.reDirection();
        }
      },
    });
  }

  ngOnInit() {}

  reDirection() {
    let userData = JSON.parse(localStorage.getItem('userData') || 'null');
    if (userData && !this.isWeb) {
      this.router.navigateByUrl('/home');
    } else if (!userData && !this.isWeb) {
      this.router.navigateByUrl('/startup');
    }
  }
}
