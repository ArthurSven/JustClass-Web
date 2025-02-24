import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, Observable, tap, throwError} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {response} from "express";

export interface ClassRequest {
  classname: string;
  level: string;
  price: string;
  startdate: string;
  enddate: string;
  createdate: string;
  createdby: string;
}

export interface ClassResponse {
  classid: string;
  classname: string;
  level: string;
  startdate: string;
  enddate: string;
  price: bigint;
  createdate: string;
  createdby: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClassServiceService {

  apiUrl = 'http://localhost:8080/api/v1/classroom';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private authService: AuthService
  ) {

  }

  getClassesByTeacher(): Observable<ClassResponse[]> {
    const teacherName = this.cookieService.get('username'); // Get teacher's username from cookies

    if (!teacherName) {
      console.error('No teacher username found in cookies');
      return new Observable<ClassResponse[]>(); // Return empty observable if no username found
    }

    return this.http.get<ClassResponse[]>(`${this.apiUrl}/by-teacher/${teacherName}`).pipe(
      tap(response => console.log('Classes:', response)),
      catchError((error) => {
        console.error('Error fetching classes:', error);
        throw error;
      })
    );
  }

  createClass(classroom: ClassRequest) : Observable<ClassResponse> {
    return this.http.post<ClassResponse>(`${this.apiUrl}`, classroom).pipe(
      catchError(this.classError)
    )
  }

  private classError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong, please try again later.'));
  }

}
