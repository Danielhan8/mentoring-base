import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgFor, RouterLink, HeaderComponent], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {


}



