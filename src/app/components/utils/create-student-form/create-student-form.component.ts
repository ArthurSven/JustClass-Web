import {Component, EventEmitter, Output} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClassRequest, ClassResponse, ClassServiceService} from "../../../services/class-service.service";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {StudentRequest, StudentResponse, StudentService} from "../../../services/student.service";

@Component({
  selector: 'app-create-student-form',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './create-student-form.component.html',
  styleUrl: './create-student-form.component.css'
})
export class CreateStudentFormComponent {

  @Output() formSubmit = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  message: string | null = null;
  alertClass: string | null = null;
  createStudentForm: FormGroup;


  constructor(private fb: FormBuilder,
              private studentsService: StudentService,
              private http: HttpClient,
              private cookieService: CookieService,
              private router: Router)
  {
    this.createStudentForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    })
  }


  onStudentSubmit() {
    const currentDate = new Date().toISOString().split('T')[0];
    if(this.createStudentForm.valid) {
      const student: StudentRequest = {
        firstname: this.createStudentForm.value.firstname,
        lastname: this.createStudentForm.value.lastname,
        email: this.createStudentForm.value.email,
        phoneno: this.createStudentForm.value.phoneno,
        datejoined: currentDate,
        teacher: this.cookieService.get('username')
      }

      this.studentsService.createStudent(student).subscribe({
        next: (response: StudentResponse) => {
          console.log('Student created successfully', response);
          this.message = response.message;
          this.alertClass = 'bg-green-600';
          this.createStudentForm.reset();
        },
        error: (error) => {
          console.error('Registration failed', error);
          this.message = 'Error: ' + error.message;
          this.alertClass = 'bg-red-600';
        }
      });
    } else {
      console.log('Form is invalid:', this.createStudentForm.value);
      this.message = 'There was an error creating the student, please try again';
      this.alertClass = 'bg-red-600';
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  ngOnInit(): void {
  }
}
