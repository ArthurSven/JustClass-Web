import {Component, OnInit} from '@angular/core';
import {DashcardComponent} from "../../components/utils/dashcard/dashcard.component";
import { CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DashcardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private cookiesService: CookieService) {
  }

  username: string = ''

  ngOnInit(): void {
    this.username = this.cookiesService.get('username')
  }
}
