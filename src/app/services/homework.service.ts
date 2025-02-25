import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {catchError, Observable, tap, throwError} from "rxjs";
import {PaymentRequest, PaymentResponse} from "./payment.service";

export interface HomeworkRequest {
  book: string;
  classroom: string;
  createdate: string;
  duedate: string;
  homework: string;
  page: number;
  teacher: string;
}

export interface HomeworkResponse {
  homeworkid: string;
  book: string;
  classroom: string;
  createdate: string;
  duedate: string;
  homework: string;
  page: number;
  teacher: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class HomeworkService implements OnInit {

  apiUrl = 'http://localhost:8080/api/v1/homework';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getHomeworkByTeacher()
  }

  getHomeworkByTeacher() : Observable<HomeworkResponse[]> {
    const teachername = this.cookieService.get('username');

    if (!teachername) {
      console.error('No teacher username found in cookies');
      return new Observable<HomeworkResponse[]>(); // Return empty observable if no username found
    }

    return this.http.get<HomeworkResponse[]>(`${this.apiUrl}/by-teacher/${teachername}`).pipe(
      tap(response => console.log('Homework:', response)),
      catchError((error) => {
        console.error('Error fetching Homework:', error);
        throw error;
      })
    );
  }

  createHomework(homework: HomeworkRequest) : Observable<HomeworkResponse> {
    return this.http.post<HomeworkResponse>(`${this.apiUrl}`, homework).pipe(
      catchError(this.studentError)
    )
  }

  private studentError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong, please try again later.'));
  }
}
