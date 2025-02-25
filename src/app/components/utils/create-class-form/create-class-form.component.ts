import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {ClassRequest, ClassResponse, ClassServiceService} from "../../../services/class-service.service";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {CommonModule, NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-create-class-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgClass, CommonModule],
  templateUrl: './create-class-form.component.html',
  styleUrl: './create-class-form.component.css'
})

export class CreateClassFormComponent implements OnInit {

  @Output() formSubmit = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  message: string | null = null;
  alertClass: string | null = null;
  createClassForm: FormGroup;


  constructor(private fb: FormBuilder,
              private classService: ClassServiceService,
              private http: HttpClient,
              private cookieService: CookieService,
              private router: Router)
  {
    this.createClassForm = this.fb.group({
      classname: ['', Validators.required],
      level: ['', Validators.required],
      price: ['', Validators.required],
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
    })
  }


  onSubmit() {
    const currentDate = new Date().toISOString().split('T')[0];
    if(this.createClassForm.valid) {
      const classroom: ClassRequest = {
        classname: this.createClassForm.value.classname,
        level: this.createClassForm.value.level,
        price: this.createClassForm.value.price,
        startdate: this.createClassForm.value.startdate,
        enddate: this.createClassForm.value.enddate,
        createdate: currentDate,
        createdby: this.cookieService.get('username')
      }

      this.classService.createClass(classroom).subscribe({
        next: (response: ClassResponse) => {
          console.log('Class created successfully', response);
          this.message = response.message;
          this.alertClass = 'bg-green-600';
          this.createClassForm.reset();
        },
        error: (error) => {
          console.error('Registration failed', error);
          this.message = 'Error: ' + error.message;
          this.alertClass = 'bg-red-600';
        }
      });
    } else {
      console.log('Form is invalid:', this.createClassForm.value);
      this.message = 'There was an error creating your class, please try again';
      this.alertClass = 'bg-red-600';
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  ngOnInit(): void {

  }
}
