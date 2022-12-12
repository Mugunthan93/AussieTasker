import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule, ModalController } from "@ionic/angular";
import { HeaderComponent } from "./header/header.component";
import { ProfileComponent } from "./profile/profile.component";
import { SideMenuComponent } from "./side-menu/side-menu.component";

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule],
    declarations: [HeaderComponent, SideMenuComponent, ProfileComponent],
    exports: [HeaderComponent, SideMenuComponent, ProfileComponent],
    providers:[ModalController]
})
export class SharedComponentsModule { }
