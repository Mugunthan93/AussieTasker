import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IonAccordionGroup, IonModal, ModalController } from '@ionic/angular';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { CommonService } from 'src/app/services/common.service';
import { AlertController } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { UserDataState } from 'src/app/state/user.state';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/Models/userData';
import { ApiService } from 'src/app/services/api.service';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { LoginPage } from 'src/app/pages/login/login.page';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateTaskComponent implements OnInit {
  @ViewChild('accordionGroup') accordionGroup!: IonAccordionGroup;
  @ViewChild(IonModal) successModal?: IonModal;
  @ViewChild(IonModal) locationAccess?: IonModal;
  @ViewChild(IonModal) datetime?: IonModal;
  @Input() imageValue: any;

  @Select(UserDataState.getUserData) userData$!: Observable<UserData[]>;
  userData: any;

  datePicked: any = '';
  venue = 'inperson';
  availableTime = 'Morning 8am-2pm';
  location = '';
  formOne!: FormGroup;
  formTwo!: FormGroup;
  formThree!: FormGroup;
  formNumber = 'first';
  showDatePicker = false;
  showPeriod = false;
  periods: any = [];
  periodInd: any;
  morning = false;
  midday = false;
  evening = false;
  night = false;
  isWeb!: boolean;
  files: File[] = [];
  loggedIn = false;
  fileEntryArray: any = [];
  imagePathArr: any[] = [];
  googleAddress: any;
  tempAddress: any;
  selectedAddress: any;
  selectedPeriod: any;
  categories: any[] = [];
  subCategories: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private geolocation: Geolocation,
    private common: CommonService,
    private alertController: AlertController,
    private api: ApiService,
    private router: Router
  ) {
    this.createForm();

    this.userData$.subscribe((res: any) => {
      if (res && res.length > 0) {
        this.userData = res[0];
        this.loggedIn = true;
      }
    });

    this.common.getisWeb.subscribe({
      next: (res) => {
        if (res < 992) {
          this.isWeb = false;
        } else {
          this.isWeb = true;
        }
      },
    });
  }

  ngOnInit() {
    this.api.getAllCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data;
      },
      error: (err: any) => {},
    });
  }

  createForm() {
    this.formOne = this.fb.group({
      taskTitle: new FormControl('', [Validators.required]),
      taskWhen: new FormControl('', [Validators.required]),
      taskDate: new FormControl(''),
      certainTime: new FormControl(false),
      availableTime: new FormControl(''),
      category: new FormControl(''),
      subCategory: new FormControl(''),
    });

    this.formTwo = this.fb.group({
      inPerson: new FormControl('inperson', [Validators.required]),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      location: new FormControl(''),
      address: new FormControl(''),
    });

    this.formThree = this.fb.group({
      description: new FormControl('', [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      addImage: new FormControl([]),
    });
  }
  cancel(type: any, data?: any) {
    // this.successModal?.dismiss();
    return this.modalCtrl?.dismiss(data, type);
  }

  toggleAccordion(e: string, successModal?: any, back?: any) {
    const nativeEl = this.accordionGroup;

    if (back) {
      if (nativeEl) nativeEl.value = e;
      this.formNumber = e;
      return;
    }

    switch (e) {
      case 'second':
        if (this.checkDirty(this.formOne.controls)) {
          this.common.openToast({ msg: 'Enter All Fields', type: 'error' });
        } else {
          if (nativeEl) nativeEl.value = e;
          this.formNumber = e;
        }

        break;
      case 'third':
        if (this.checkDirty(this.formTwo.controls)) {
          this.common.openToast({ msg: 'Enter All Fields', type: 'error' });
        } else {
          if (nativeEl) nativeEl.value = e;
          this.formNumber = e;
        }

        break;

      case 'submit':
        if (this.checkDirty(this.formThree.controls)) {
          if (nativeEl) nativeEl.value = 'third';
          this.formNumber = 'third';
          this.common.openToast({ msg: 'Enter All Fields', type: 'error' });
        } else if (this.checkDirty(this.formOne.controls)) {
          if (nativeEl) nativeEl.value = 'first';
          this.formNumber = 'first';
          this.common.openToast({ msg: 'Enter All Fields', type: 'error' });
        } else if (this.checkDirty(this.formTwo.controls)) {
          if (nativeEl) nativeEl.value = 'second';
          this.formNumber = 'second';
          this.common.openToast({ msg: 'Enter All Fields', type: 'error' });
        } else {
          this.SubmitTask(successModal);
        }
    }
  }

  ondatePick(e: any, dateTime: IonModal) {
    dateTime?.dismiss();
    let options: any = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    this.datePicked = new Date(e.target?.value).toLocaleDateString(
      'en-US',
      options
    );
  }

  onFocus(dateTime: IonModal) {
    dateTime.present();
  }

  async modalCal(parms: any) {
    const modal = await this.modalCtrl.create({
      component: DialogComponent,
      componentProps: parms,
      cssClass: 'fullscreen',
    });
    modal.present();
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  fetchLocation() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.location = resp.coords.latitude + ', ' + resp.coords.longitude;
        this.formTwo.controls['location'].patchValue(
          resp.coords.latitude + ', ' + resp.coords.longitude
        );
        this.formTwo.controls['latitude'].patchValue(resp.coords.latitude);
        this.formTwo.controls['longitude'].patchValue(resp.coords.longitude);
      })
      .catch((error) => {});
  }

  checkDirty(formControl: any) {
    let isError = false;
    Object.keys(formControl).forEach((key) => {
      if (formControl[key]?.errors) {
        isError = true;
      }
    });

    return isError;
  }

  async getlocationAccess(locationAccess: IonModal) {
    locationAccess?.present();
  }

  async imageUpload() {
    for (let i = 0; i < this.fileEntryArray.length; i++) {
      this.fileEntryArray[i].file((file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        formData.append('path', 'go-impact/');
        this.api.uploadImage(formData).subscribe((res) => {
          this.imageValue = res;
          this.imagePathArr.push(this.imageValue.data);
        });
      });
    }
  }

  async SubmitTask(successModal?: IonModal) {
    let taskData: any;
    if (this.loggedIn) {
      this.imageUpload();
      if (this.formOne.controls['taskDate'].value != null) {
        const req = {
          userId: this.userData._id,
          taskTitle: this.formOne.controls['taskTitle'].value,
          taskDate: this.formOne.controls['taskDate'].value,
          certainTime: this.formOne.controls['certainTime'].value,
          availableTime: this.formOne.controls['availableTime'].value,
          address:
            this.formTwo.controls['inPerson'].value == 'inperson'
              ? this.tempAddress
              : '',
          latitude:
            this.formTwo.controls['inPerson'].value == 'inperson'
              ? this.googleAddress?.latitude
              : 0,
          longitude:
            this.formTwo.controls['inPerson'].value == 'inperson'
              ? this.googleAddress?.latitude
              : 0,
          description: this.formThree.controls['description'].value,
          budget: this.formThree.controls['amount'].value,
          googleResponse:
            this.formTwo.controls['inPerson'].value == 'inperson'
              ? this.googleAddress
              : {},
          imageArr: this.imagePathArr,
          categoryId: this.formOne.controls['category'].value,
          subCategoryId: this.formOne.controls['subCategory'].value,
          onlineWork:
            this.formTwo.controls['inPerson'].value == 'inperson'
              ? false
              : true,
          suburb: this.selectedAddress?.posttown,
        };
        this.common.setLoading(true);
        taskData = req;
        await this.api.createTask(req).subscribe({
          next: (res) => {
            this.common.setLoading(false);
            this.formOne.reset();
            this.formTwo.reset();
            this.formTwo.reset();
            this.createForm();
            this.cancel('cancel');
            this.router.navigate(['/myTasks']);
            this.modalCal({
              status: 1,
              message:
                'Great Job, Your offer is submitted. We will update you when we have an update',
            });
            //this.cancel('confirm', successModal);
          },
          error: (err: any) => {
            this.common.setLoading(false);
            this.common.openToast({ msg: err.error.message, type: 'error' });
          },
        });
      } else {
        const req = {
          userId: this.userData._id,
          taskTitle: this.formOne.controls['taskTitle'].value,
          certainTime: this.formOne.controls['certainTime'].value,
          availableTime: this.formOne.controls['availableTime'].value,
          address:
            this.formTwo.controls['inPerson'].value == 'inperson'
              ? this.tempAddress
              : '',
          latitude:
            this.formTwo.controls['inPerson'].value == 'inperson'
              ? this.googleAddress?.latitude
              : 0,
          longitude:
            this.formTwo.controls['inPerson'].value == 'inperson'
              ? this.googleAddress?.latitude
              : 0,
          description: this.formThree.controls['description'].value,
          budget: this.formThree.controls['amount'].value,
          googleResponse:
            this.formTwo.controls['inPerson'].value == 'inperson'
              ? this.googleAddress
              : {},
          imageArr: this.imagePathArr,
          categoryId: this.formOne.controls['category'].value,
          subCategoryId: this.formOne.controls['subCategory'].value,
          onlineWork:
            this.formTwo.controls['inPerson'].value == 'inperson'
              ? false
              : true,
          suburb:
            this.formTwo.controls['inPerson'].value == 'inperson'
              ? this.selectedAddress?.posttown
              : '',
        };
        this.common.setLoading(true);
        taskData = req;
        await this.api.createTask(req).subscribe({
          next: (res) => {
            this.common.setLoading(false);
            this.formOne.reset();
            this.formTwo.reset();
            this.formTwo.reset();
            this.createForm();
            this.cancel('cancel');
            this.router.navigate(['/myTasks']);
            this.modalCal({
              status: 1,
              message:
                'Great Job, Your offer is submitted. We will update you when we have an update',
            });
            // this.cancel('confirm', successModal);
          },
          error: (err: any) => {
            this.common.setLoading(false);
            this.common.openToast({ msg: err.error.message, type: 'error' });
          },
        });
      }
    } else {
      this.userData$.subscribe(async (res: any) => {
        if (res && res.length > 0) {
          this.loggedIn = true;
          this.userData = res[0].userDetails;
          this.SubmitTask(successModal);
        } else {
          const loginModal = await this.modalCtrl.create({
            component: LoginPage,
            componentProps: { createTask: true, taskData },
          });
          loginModal.present();
        }
      });
    }
  }

  onSelectTime(e: any) {
    if (e.detail.value == 'On Date' || e.detail.value == 'Before Date') {
      this.showDatePicker = true;
    } else {
      this.showDatePicker = false;
    }
    this.formOne.controls['taskDate'].reset();
  }

  onChangeCertain(e: any) {
    if (e.detail.checked) {
      this.showPeriod = true;
    } else {
      this.showPeriod = false;
    }
    this.periods = [];
  }

  onChangePeriod(e: any) {
    this.periods.push(e);
    let time = '';
    if (this.periods.length == 0) {
      time = e;
    } else {
      let newarr = e.split('to');
      let oldarr = time.split('to');
      time = oldarr[0] + ' to ' + newarr[1];
    }

    this.formOne.controls['availableTime'].patchValue(time);
  }

  getPeriodIndex(value: any) {
    return this.periods.findIndex((val: any) => val === value);
  }

  selectCategory(categoryId: any) {
    if (categoryId) {
      this.api.getSubCategories(categoryId).subscribe({
        next: (res: any) => {
          this.subCategories = res.data;
          this.formOne.patchValue({
            subCategory: this.subCategories[0]?.masterId,
          });
        },
        error: (err: any) => {},
      });
    }
  }
}
