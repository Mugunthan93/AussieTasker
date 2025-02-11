import { AfterViewInit, Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit(): void {
    this.showSplash();
  }

  async showSplash() {
    await SplashScreen.show({
      showDuration: 2000,
      autoHide: true,
      fadeOutDuration: 1000,
      fadeInDuration: 500,
    });
  }
}
