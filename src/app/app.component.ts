import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'just-class';

  constructor(private authService: AuthService, private router: Router) {
    this.redirectUser();
  }

  redirectUser() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/teacher-dashboard']); // Redirect to dashboard if logged in
    } else {
      this.router.navigate(['/']); // Redirect to login page if not logged in
    }
  }
}
