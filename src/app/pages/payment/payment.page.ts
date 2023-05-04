import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PaymentSheetEventsEnum, Stripe } from '@capacitor-community/stripe';
import { first } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  constructor(private http: HttpClient) {
    Stripe.initialize({
      publishableKey:
        'pk_test_51MJ8eeEJPFN1DOecuYfaXSf19JsT817TC3ZSQU6kXSMSBWOnqQvbNRCf7C4bKmx20yoN4w2qauWU6YrdkgwswXMF00eQGMJQFx',
    });
  }

  ngOnInit() {}

  async paymentSheet() {
    Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {});

    // const { paymentIntent, ephemeralKey, customer } = await this.http
    //   .post<{
    //     paymentIntent: string;
    //     ephemeralKey: string;
    //     customer: string;
    //   }>(environment.BASE_URL + 'payment-sheet', {})
    //   .pipe(first())
    //   .toPromise(Promise);

    await Stripe.createPaymentSheet({
      paymentIntentClientSecret:
        'sk_test_51MJ8eeEJPFN1DOecEFrnHiGxPgG3HORXZH0RrEOGFLtEkHmgpHRgN7y2uFJLVptz8oVYqj8f6TOaWM89ZkIQJr6R00Hu1GVGRG',
      customerId: 'cus_4QFOF3xrvBT2nU',
      customerEphemeralKeySecret: '',
    });

    const result = await Stripe.presentPaymentSheet();
    if (result.paymentResult === PaymentSheetEventsEnum.Completed) {
      // Happy path
    }
  }
}
