import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule, ModalController, NavParams } from '@ionic/angular';
import {
  NgbDatepickerModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxFileDropModule } from 'ngx-file-drop';
import { SharedModule } from '../shared/shared.module';
import { AboutUserComponent } from './about-user/about-user.component';
import { AboutComponent } from './about/about.component';
import { AcceptOfferComponent } from './accept-offer/accept-offer.component';
import { ChatComponent } from './chat/chat.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { FaqComponent } from './faq/faq.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MakeAnOfferComponent } from './make-an-offer/make-an-offer.component';
import { MapModalComponent } from './map-modal/map-modal.component';
import { MySkillsComponent } from './my-skills/my-skills.component';
import { MyTaskDetailsComponent } from './my-task-details/my-task-details.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ProfileComponent } from './profile/profile.component';
import { ReviewUserComponent } from './review-user/review-user.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskerRegisterComponent } from './tasker-register/tasker-register.component';
import { TasksComponent } from './tasks/tasks.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgbRatingModule,
    NgbDatepickerModule,
    NgxFileDropModule,
    SharedModule,
    FontAwesomeModule,
  ],
  declarations: [
    HeaderComponent,
    SideMenuComponent,
    ProfileComponent,
    NotificationsComponent,
    AboutComponent,
    FaqComponent,
    PaymentHistoryComponent,
    TaskDetailsComponent,
    MyTaskDetailsComponent,
    CreateTaskComponent,
    AboutUserComponent,
    MySkillsComponent,
    ChatComponent,
    MakeAnOfferComponent,
    FooterComponent,
    TasksComponent,
    TaskCardComponent,
    AcceptOfferComponent,
    TaskerRegisterComponent,
    PortfolioComponent,
    ReviewUserComponent,
    MapModalComponent,
  ],
  exports: [
    HeaderComponent,
    SideMenuComponent,
    ProfileComponent,
    NotificationsComponent,
    AboutComponent,
    FaqComponent,
    PaymentHistoryComponent,
    TaskDetailsComponent,
    MyTaskDetailsComponent,
    CreateTaskComponent,
    AboutUserComponent,
    MySkillsComponent,
    MakeAnOfferComponent,
    ChatComponent,
    SharedModule,
    FontAwesomeModule,
    FooterComponent,
    TasksComponent,
    TaskCardComponent,
    AcceptOfferComponent,
    TaskerRegisterComponent,
    PortfolioComponent,
    ReviewUserComponent,
    MapModalComponent,
  ],
  providers: [ModalController, NavParams],
})
export class SharedComponentsModule {}
