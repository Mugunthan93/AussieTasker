import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/Models/userData';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { UserDataState } from 'src/app/state/user.state';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserDetailsPage implements OnInit {
  @Select(UserDataState.getUserData) userData$!: Observable<UserData[]>;
  userForm!: FormGroup;
  countryList: any[] = [];
  languages: any[] = [];
  regions: any[] = [];
  skills = [];
  newSkill = '';
  isAddChip = false;
  userData: any;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private common: CommonService
  ) {
    this.createForm();
    this.api.getCountries().subscribe({
      next: (data: any) => {
        this.countryList = data;
        this.getLanguages();
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.userData$.subscribe((res: any) => {
      if (res && res.length > 0) {
        this.userData = res[0];
        console.log(this.userData);
      }
    });
  }

  ngOnInit() {}

  createForm() {
    this.userForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [Validators.required]),
      skills: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      region: new FormControl('', [Validators.required]),
      workingExperience: new FormControl('', [Validators.required]),
      tagLine: new FormControl('', [Validators.required]),
    });
  }

  getLanguages() {
    this.countryList.forEach((country) => {
      country.languages.forEach((lang: any) => {
        this.languages.push(lang);
      });
    });
    this.languages = this.languages.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.name === value.name)
    );
    this.languages.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
  }

  onchangeCountry(country: any) {
    this.userForm.get('region')?.patchValue(country.detail.value?.region);
    this.userForm.get('country')?.patchValue(country.detail.value?.name);
  }

  async onSubmit() {
    this.userForm.markAllAsTouched();
    // this.userForm
    //   .get('skills')
    //   ?.patchValue(this.userForm.get('skills')?.value.split(', '));

    let req = {
      userId: this.userData._id,
      region: this.userForm.get('region')?.value,
      firstName: this.userForm.get('firstName')?.value,
      lastName: this.userForm.get('lastName')?.value,
      mobileNumber: this.userForm.get('mobileNumber')?.value,
      country: this.userForm.get('country')?.value,
      skills: this.userForm.get('skills')?.value,
      workingExperience: this.userForm.get('workingExperience')?.value,
      tagLine: this.userForm.get('tagLine')?.value,
    };

    console.log(req);

    this.common.setLoading(true);

    await this.api.onCreateProfile(req).subscribe({
      next: () => {
        this.userForm.reset();
        this.common.setLoading(false);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.common.setLoading(false);
        console.log(err.message);
        this.common.openToast({ msg: err.message, type: 'error' });
      },
    });
  }

  onEnterSkill(e: any) {
    // console.log(e);
    this.newSkill = e.target.value;
  }

  onSaveChip(skills: any[]) {
    skills.push(this.newSkill);
    this.isAddChip = false;
    this.newSkill = '';
    this.userForm.controls['skills'].patchValue(this.skills);
  }

  onAddChip() {
    this.isAddChip = true;
  }

  onDeleteChip(i: number) {
    this.skills.splice(i, 1);
  }
}
