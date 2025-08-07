import { Component } from '@angular/core';
import { DesktopLayoutComponent } from '../desktop-layout/desktop-layout.component';
import { CommonModule } from '@angular/common';
import { MobileLayoutComponent } from '../mobile-layout/mobile-layout.component';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-layout',
  imports: [MobileLayoutComponent,DesktopLayoutComponent,CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  layout: 'mobile' | 'desktop' = 'desktop'

  constructor(private layoutService: LayoutService) {}

  ngOnInit() {
    this.layoutService.layout$.subscribe(l => {
      this.layout = l
    })
  }

}
