import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { AdminService } from '../../shared/admin.service';
import { TransitionService } from '../../shared/transition.service';
import { ToastComponent } from '../../shared/toast.component';

@Component({
  selector: 'select-active',
  templateUrl: './select-active.component.html',
  styleUrls: ['./select-active.component.scss']
})
export class SelectActiveComponent implements OnInit, AfterViewInit {

  @ViewChild('toast') toast: ToastComponent;
  @ViewChild('conferences') conferences: ElementRef;

  constructor(private transitionService: TransitionService,
              private adminService: AdminService) { }

  ngOnInit() {
    this.transitionService.transition();
  }

  ngAfterViewInit() {
    this.conferences.nativeElement.value = this.adminService.activeConference.getValue().title;
  }

  changeActiveConf(conferenceTitle: string) {
    this.adminService.changeActiveConf(conferenceTitle)
        .then(res => this.toast.success(`Calender view displaying: ${conferenceTitle}`));
  }

  changeDefaultConf(conferenceTitle: string) {
    this.adminService.changeDefaultConf(conferenceTitle)
        .then(res => this.toast.success(`Speaker submissions now associated with: ${conferenceTitle}`));
  }
}