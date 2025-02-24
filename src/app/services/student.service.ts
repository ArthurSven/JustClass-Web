import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {catchError, Observable, tap, throwError} from "rxjs";
import {ClassRequest, ClassResponse} from "./class-service.service";

export interface StudentRequest {
  firstname: string;
  lastname: string;
  email: string;
  phoneno: string;
  datejoined: string;
  teacher: string
}

export interface StudentResponse {
  studentid: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneno: string;
  datejoined: string;
  teacher: string;
  message: string;
}



@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiUrl = 'http://localhost:8080/api/v1/student';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {

  }

  getStudentsByTeacher() : Observable<StudentResponse[]> {
    const teachername = this.cookieService.get('username');

    if (!teachername) {
      console.error('No teacher username found in cookies');
      return new Observable<StudentResponse[]>(); // Return empty observable if no username found
    }

    return this.http.get<StudentResponse[]>(`${this.apiUrl}/by-teacher/${teachername}`).pipe(
      tap(response => console.log('Students:', response)),
      catchError((error) => {
        console.error('Error fetching students:', error);
        throw error;
      })
    );
  }

  createStudent(student: StudentRequest) : Observable<StudentResponse> {
    return this.http.post<StudentResponse>(`${this.apiUrl}`, student).pipe(
      catchError(this.studentError)
    )
  }

  private studentError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong, please try again later.'));
  }

}
