import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-my-skills',
  templateUrl: './my-skills.component.html',
  styleUrls: ['./my-skills.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MySkillsComponent implements OnInit {
  isWeb!: boolean;
  isEdit = false;
  skillsList = [
    {
      name: 'education',
      header: 'Education',
      img: 'assets/images/education.png',
      isAdd: false,
      skill: [
        'Masters in Business Management',
        'MBA- English(lit)',
        'B.sc (science)',
      ],
    },
    {
      name: 'specialities',
      header: 'Specialities',
      img: 'assets/images/courses.png',
      isAdd: false,
      skill: [
        'Masters in Business Management',
        'MBA- English(lit)',
        'B.sc (science)',
      ],
    },
    {
      name: 'languages',
      header: 'Languages',
      img: 'assets/images/language.png',
      isAdd: false,
      skill: ['Tamil', 'English', 'French'],
    },

    {
      name: 'work',
      header: 'Work',
      img: 'assets/images/work.png',
      isAdd: false,
      skill: ['10+ Years as HR', '5 years as a Recruiter'],
    },
    {
      name: 'transportation',
      header: 'Transportation',
      img: 'assets/images/transporation.png',
      isAdd: false,
      skill: ['Online'],
    },
  ];
  newChip = '';
  constructor(
    private modalCtrl: ModalController,
    private common: CommonService
  ) {
    this.common.getisWeb.subscribe((res) => {
      if (res < 992) {
        this.isWeb = false;
      } else {
        this.isWeb = true;
      }
    });
  }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  editContent() {
    this.isEdit = !this.isEdit;
  }

  onAddChip(skills: any) {
    skills['isAdd'] = true;
  }

  onSaveChip(skills: any) {
    skills.skill.push(this.newChip);
    this.newChip = '';
    skills['isAdd'] = false;
  }

  removeChip(skills: any, ind: any) {
    skills.splice(ind, 1);
  }
}
