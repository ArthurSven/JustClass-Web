import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {PaymentResponse, PaymentService} from "../../services/payment.service";
import {StudentResponse} from "../../services/student.service";
import {data} from "autoprefixer";
import {CreateClassFormComponent} from "../../components/utils/create-class-form/create-class-form.component";
import {CreatePaymentFormComponent} from "../../components/utils/create-payment-form/create-payment-form.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-payments',
  standalone: true,
    imports: [
        NgForOf,
        ReactiveFormsModule,
      MatDialogModule
    ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit {

  constructor(
    private paymentService: PaymentService,
    private dialog: MatDialog
  ) {

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

  openCreatePaymentDialog() {
    const dialogRef = this.dialog.open(CreatePaymentFormComponent, {
      width: '700px',
      height: '500px',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Form Data:', result);
        // Handle form submission (e.g., add the new class to the list)
      }
    });
  }

  ngOnInit(): void {
    this.getStudents()
  }



}
