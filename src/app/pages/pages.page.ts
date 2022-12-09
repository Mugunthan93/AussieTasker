import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
  encapsulation:ViewEncapsulation.None
})
export class PagesPage implements OnInit {
  showTab: boolean = false;
  urls: string[] = ['startup', 'signup', 'login', 'verify', 'changePassword', 'userDetails'];
  constructor(private router: Router, private route: ActivatedRoute) {
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
  }

  ngOnInit() {
    if (localStorage.getItem('userData')) {
      this.router.navigateByUrl('/userDetails');
    } else {
      this.router.navigateByUrl('/startup');
    }
  }
}
