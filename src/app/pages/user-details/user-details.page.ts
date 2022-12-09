import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserDetailsPage implements OnInit {

  userForm!: FormGroup;
  countryList: any[] = []
  languages: any[] = []

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.createForm();
    this.api.getCountries().subscribe({
      next: (data: any) => {
        this.countryList = data;
        this.countryList.forEach((country) => {
          country.languages.forEach((lang: any) => {
            this.languages.push(lang)
          });

        })
        this.languages = this.languages.filter((value, index, self) =>
          index === self.findIndex((t) => ( t.name === value.name ))
        )
        this.languages.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  ngOnInit() {
  }

  createForm() {
    this.userForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [Validators.required]),
      skills: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      languageKnown: new FormControl('')
    })
  }

  onSubmit() {
    this.userForm.markAllAsTouched();
    console.log(this.userForm.value)
  }
}
