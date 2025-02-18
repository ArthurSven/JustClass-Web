import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { AuthService, UserRegisterRequest, UserAuthRequest, UserAuthResponse } from '../../services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const user: UserAuthRequest = this.loginForm.value;
      this.authService.login(user).subscribe({
        next: (response: UserAuthResponse) => {
          console.log('Login successful', response);
          // Handle successful login (e.g., store token and redirect)
        },
        error: (error) => {
          console.error('Login failed', error);
        }
      });
    }
  }
}
