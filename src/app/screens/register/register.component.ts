import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { AuthService, UserRegisterRequest, UserAuthRequest, UserAuthResponse } from '../../services/auth.service';
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {CommonModule, NgIf} from "@angular/common";
import {ToastComponent} from "../../components/toast/toast.component";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule, MatSnackBarModule, CommonModule, ToastComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  message: string | null = null;
  alertClass: string | null = null;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService) {

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }


  onRegister() {
    if (this.registerForm.valid) {

      const user: UserRegisterRequest = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };


      this.authService.register(user).subscribe({
        next: (response: UserAuthResponse) => {
          console.log('Registration successful', response);
          this.message = response.message;
          this.alertClass = 'bg-green-600';
          this.registerForm.reset();
        },
        error: (error) => {
          console.error('Registration failed', error);
          this.message = 'Error: ' + error.message;
          this.alertClass = 'bg-red-600';
        }
      });
    }  else {
      console.log('Form is invalid:', this.registerForm.value);
      this.message = 'There was an error creating your account, please try again';
      this.alertClass = 'bg-red-600';
    }
  }

  ngOnInit(): void {
  }
}
