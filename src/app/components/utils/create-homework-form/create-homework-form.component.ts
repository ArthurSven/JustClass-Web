import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClassResponse, ClassServiceService} from "../../../services/class-service.service";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {HomeworkRequest, HomeworkResponse, HomeworkService} from "../../../services/homework.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-create-homework-form',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgClass,
    NgForOf
  ],
  templateUrl: './create-homework-form.component.html',
  styleUrl: './create-homework-form.component.css'
})
export class CreateHomeworkFormComponent implements OnInit {

  @Output() formSubmit = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  message: string | null = null;
  alertClass: string | null = null;
  createHomeworkForm: FormGroup;
  classes: ClassResponse[] = [];

  constructor(private fb: FormBuilder,
              private homeworkService: HomeworkService,
              private http: HttpClient,
              private cookieService: CookieService,
              private router: Router,
              private classService: ClassServiceService) {

    this.createHomeworkForm = this.fb.group({
      classroom: ['', Validators.required],
      homework: ['', Validators.required],
      book: ['', Validators.required],
      page: ['', Validators.required],
      createdate: ['', Validators.required],
      duedate: ['', Validators.required]
    })
  }

  onHomeworkSubmit() {
    if (this.createHomeworkForm.valid) {
      const homework: HomeworkRequest = {
        classroom: this.createHomeworkForm.value.classroom,
        homework: this.createHomeworkForm.value.homework,
        book: this.createHomeworkForm.value.book,
        page: this.createHomeworkForm.value.page,
        createdate: this.createHomeworkForm.value.createdate,
        duedate: this.createHomeworkForm.value.duedate,
        teacher: this.cookieService.get('username')
      }

      this.homeworkService.createHomework(homework).subscribe({
        next: (response: HomeworkResponse) => {
          console.log('Homework created successfully', response);
          this.message = response.message;
          this.alertClass = 'bg-green-600';
          this.createHomeworkForm.reset();
        },
        error: (error) => {
          console.error('Creation of hoework failed', error);
          this.message = 'Error: ' + error.message;
          this.alertClass = 'bg-red-600';
        }
      });
    } else {
      console.log('Form is invalid:', this.createHomeworkForm.value);
      this.message = 'There was an error creating yourhomework, please try again';
      this.alertClass = 'bg-red-600';
    }
  }

  ngOnInit(): void {
    this.classService.getClassesByTeacher().subscribe({
      next: (data: ClassResponse[]) => {
        this.classes = data;
      },
      error: (error) => {
        console.error('Error fetching classes:', error);
      }
    });
  }


}
