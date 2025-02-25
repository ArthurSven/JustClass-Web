import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonModule, NgClass, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {StudentResponse, StudentService} from "../../../services/student.service";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {PaymentRequest, PaymentResponse, PaymentService} from "../../../services/payment.service";
import {ClassResponse, ClassServiceService} from "../../../services/class-service.service";
import {response} from "express";

@Component({
  selector: 'app-create-payment-form',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgClass,
    CommonModule
  ],
  templateUrl: './create-payment-form.component.html',
  styleUrl: './create-payment-form.component.css'
})
export class CreatePaymentFormComponent implements OnInit {

  @Output() formSubmit = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  message: string | null = null;
  alertClass: string | null = null;
  createPaymentForm: FormGroup;
  classes: ClassResponse[] = [];

  constructor(private fb: FormBuilder,
              private paymentService: PaymentService,
              private http: HttpClient,
              private cookieService: CookieService,
              private router: Router,
              private classService: ClassServiceService) {

    this.createPaymentForm = this.fb.group({
      student: ['', Validators.required],
      classroom: ['', Validators.required],
      level: ['', Validators.required],
      amount: ['', Validators.required],
      date: ['', Validators.required],
    })
  }

  onPaymentSubmit(): void {
    if(this.createPaymentForm.valid) {
      const payment: PaymentRequest = {
        student: this.createPaymentForm.value.student,
        classroom: this.createPaymentForm.value.classroom,
        level: this.createPaymentForm.value.level,
        amount: this.createPaymentForm.value.amount,
        date: this.createPaymentForm.value.date,
        teacher: this.cookieService.get('username')
      }

      this.paymentService.createPayment(payment).subscribe({
        next: (response: PaymentResponse) => {
          console.log('Payment added successfully', response);
          this.message = response.message;
          this.alertClass = 'bg-green-600';
          this.createPaymentForm.reset();
        },
        error: (error) => {
          console.error('Payment could not be added', error);
          this.message = 'Error: ' + error.message;
          this.alertClass = 'bg-red-600';
        }
      })
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
