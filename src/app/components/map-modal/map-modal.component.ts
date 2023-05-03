import { Component, Input, OnInit } from '@angular/core';
import { Marker } from '@capacitor/google-maps';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit {
  @Input() marker!: Marker;
  @Input() task: any;

  constructor() {}

  ngOnInit() {}
}
