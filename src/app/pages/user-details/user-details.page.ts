import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserDetailsPage implements OnInit {
  userForm!: FormGroup;
  countryList: any[] = [];
  languages: any[] = [];
  regions: any[] = [];

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
  }

  ngOnInit() {}

  createForm() {
    this.userForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [Validators.required]),
      skills: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      languageKnown: new FormControl('', [Validators.required]),
      region: new FormControl('', [Validators.required]),
      workingExperience: new FormControl('', [Validators.required]),
      tagLine: new FormControl('', [Validators.required]),
      resume: new FormControl('', [Validators.required]),
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

  onSubmit() {
    this.userForm.markAllAsTouched();
    this.userForm
      .get('skills')
      ?.patchValue(this.userForm.get('skills')?.value.split(', '));
    console.log(this.userForm.value);
    // if (this.userForm.valid) {
    this.router.navigate(['/home']);
    // } else {
    //   this.common.openToast({ msg: 'Please Fill All Fields', type: 'error' });
    // }
  }
}
