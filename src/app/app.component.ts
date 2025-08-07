import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { LayoutService } from './services/layout.service'
import { MobileLayoutComponent } from './components/mobile-layout/mobile-layout.component'
import { DesktopLayoutComponent } from './components/desktop-layout/desktop-layout.component'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MobileLayoutComponent,DesktopLayoutComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
   


}
