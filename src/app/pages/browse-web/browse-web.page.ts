import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from 'src/app/components/map-modal/map-modal.component';

@Component({
  selector: 'app-browse-web',
  templateUrl: './browse-web.page.html',
  styleUrls: ['./browse-web.page.scss'],
})
export class BrowseWebPage implements OnInit {
  taskList: any = [];
  selectedTask: any = false;
  @ViewChild('map') mapRef!: ElementRef;
  map!: GoogleMap;
  newMap: any;

  constructor(
    private api: ApiService,
    private common: CommonService,
    private modalCtrl: ModalController
  ) {
    this.getAllTasks();

    this.common.selectedTask.asObservable().subscribe({
      next: (res: any) => {
        if (typeof res === 'object' && Object.keys(res).length > 0) {
          this.selectedTask = res;
        }
      },
      error: () => {},
    });
  }

  ionViewDidEnter() {
    this.createMap();
  }

  ngOnInit() {}

  getAllTasks() {
    this.api.getAllTasks().subscribe({
      next: (res: any) => {
        console.log(res);
        this.taskList = res.data;
        this.common.setLoading(false);
        this.addMarkers();
      },
      error: (err: any) => {
        console.log(err);
        this.common.openToast({ msg: err.error.message, type: 'error' });
        this.common.setLoading(false);
      },
    });
  }

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-map',
      element: this.mapRef?.nativeElement,
      apiKey: environment.mapApiKey,
      forceCreate: true,
      config: {
        center: {
          lat: -31,
          lng: 150,
        },
        zoom: 5,
      },
    });
    await this.addMarkers();
  }

  async addMarkers() {
    let markers: Marker[] = [];

    this.taskList?.forEach((task: any) => {
      if (task.googleResponse) {
        markers.push({
          coordinate: {
            lat: Number(task.googleResponse?.latitude),
            lng: Number(task.googleResponse?.longitude),
          },
          title: task.taskTitle,
          snippet: task.googleResponse?.summaryline || 'test',
        });
      }
    });
    await this.newMap?.addMarkers(markers);

    this.newMap?.setOnMarkerClickListener(async (marker: any) => {
      console.log(marker);
      let task = this.taskList.find(
        (tsk: any) => tsk.taskTitle == marker.title
      );
      const modal = await this.modalCtrl.create({
        component: MapModalComponent,
        componentProps: {
          marker,
          task,
        },
        breakpoints: [0, 1],
        initialBreakpoint: 0.3,
        mode: 'ios',
      });
      modal.present();
    });
  }
}
