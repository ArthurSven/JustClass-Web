import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { AuthService, UserRegisterRequest, UserAuthRequest, UserAuthResponse } from '../../services/auth.service';
import {CommonModule} from "@angular/common";
import { Router } from '@angular/router';
import {ToastComponent} from "../../components/toast/toast.component";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ToastComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  message: string | null = null;
  alertClass: string | null = null;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const user: UserAuthRequest = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };

      this.authService.login(user).subscribe({
        next: () => {
          console.log('Login successful');
          this.message = 'Login successful!';
          this.alertClass = 'bg-green-600';

          this.router.navigate(['/teacher-dashboard/']);
        },
        error: (error) => {
          console.error('Login failed', error);
          this.message = 'Username or Password is wrong';
          this.alertClass = 'bg-red-600';
        }
      });
    }
  }
}
