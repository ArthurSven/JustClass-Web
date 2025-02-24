import { Component } from '@angular/core';
import {DashcardComponent} from "../../components/utils/dashcard/dashcard.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DashcardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
