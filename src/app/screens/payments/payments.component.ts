import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {PaymentResponse, PaymentService} from "../../services/payment.service";
import {StudentResponse} from "../../services/student.service";
import {data} from "autoprefixer";

@Component({
  selector: 'app-payments',
  standalone: true,
    imports: [
        NgForOf,
        ReactiveFormsModule
    ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit {

  constructor(private paymentService: PaymentService) {

  }

  payments: PaymentResponse[] = [];
  filteredPayments: PaymentResponse[] = []; // Array to store filtered results
  searchTerm: string = '';

  getStudents(): void {
    this.paymentService.getStudentsByTeacher().subscribe({
      next: (data) => this.payments = data,
      error: (err) => console.error('Error fetching classes:', err)
    })
  }

  ngOnInit(): void {
    this.getStudents()
  }



}
