import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../core/layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  toolbarButtonMarginClass = 'ms-1 ms-lg-3';
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px';
  headerLeft: string = 'menu';

  constructor(
    private layout: LayoutService
  ) {}

  ngOnInit(): void {
    this.headerLeft = this.layout.getProp('header.left') as string;
  }
}
