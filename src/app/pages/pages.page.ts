import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
})
export class PagesPage implements OnInit {
  showTab: boolean = false;
  urls: string[] = ['startup', 'signup', 'login', 'verify'];
  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((e: any) => {
      // console.log(e.url);
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
    if (localStorage.getItem('startup')) {
      this.router.navigateByUrl('/login');
    } else {
      this.router.navigateByUrl('/startup');
    }
  }
}
