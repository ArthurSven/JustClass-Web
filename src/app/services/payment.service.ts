import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {catchError, Observable, tap, throwError} from "rxjs";
import {StudentRequest, StudentResponse} from "./student.service";

export interface PaymentResponse {
  paymentid: string;
  classroom: string;
  level: string;
  date: string;
  amount: number;
  student: string;
  teacher: string;
  message: string;
}

export interface PaymentRequest {
  classroom: string;
  level: string;
  date: string;
  amount: number;
  student: string;
  teacher: string;
}



@Injectable({
  providedIn: 'root'
})
export class PaymentService implements OnInit {

  apiUrl = 'http://localhost:8080/api/v1/payments';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getPaymentsByTeacher()
  }

  getPaymentsByTeacher() : Observable<PaymentResponse[]> {
    const teachername = this.cookieService.get('username');

    if (!teachername) {
      console.error('No teacher username found in cookies');
      return new Observable<PaymentResponse[]>(); // Return empty observable if no username found
    }

    return this.http.get<PaymentResponse[]>(`${this.apiUrl}/by-teacher/${teachername}`).pipe(
      tap(response => console.log('Payment:', response)),
      catchError((error) => {
        console.error('Error fetching payments:', error);
        throw error;
      })
    );
  }

  createPayment(payment: PaymentRequest) : Observable<PaymentResponse> {
    return this.http.post<PaymentResponse>(`${this.apiUrl}`, payment).pipe(
      catchError(this.studentError)
    )
  }

  private studentError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong, please try again later.'));
  }
}
