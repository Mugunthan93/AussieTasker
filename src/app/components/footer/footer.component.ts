import { Component, OnInit } from '@angular/core';
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  facebook = faFacebookF;
  twitter = faTwitter;
  linkedIn = faLinkedinIn;
  constructor() {}

  ngOnInit() {}
}
