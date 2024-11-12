import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuillEditorComponent } from 'ngx-quill';
import { DefaultComponent } from './components/default/default.component';
import { HeaderComponent } from './components/header/header.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QuillEditorComponent,DefaultComponent,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
