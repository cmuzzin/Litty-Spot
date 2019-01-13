import { Component, OnInit } from '@angular/core';
import {ControlPanelServiceService} from "./control-panel-service.service";

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {
  toggle: boolean = false;
  constructor(private controlPanelService: ControlPanelServiceService) {
  }

  ngOnInit() {

  }

  show () {
    this.toggle = !this.toggle;
  }


}
