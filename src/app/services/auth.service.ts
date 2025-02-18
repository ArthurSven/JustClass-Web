import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

export interface UserRegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface UserAuthRequest {
  username: string;
  password: string;
}

export interface UserAuthResponse {
  token: string;
  username: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth/user';

  constructor(private http: HttpClient) { }

  register(user: UserRegisterRequest): Observable<UserAuthResponse> {
    return this.http.post<UserAuthResponse>(`${this.apiUrl}/register`, user).pipe(
      catchError(this.handleError)
    )
  }

  login(user: UserAuthRequest): Observable<UserAuthResponse> {
    return this.http.post<UserAuthResponse>(`${this.apiUrl}/login`, user).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('An error occurred:', error.error.message);
      return throwError(() => new Error(error.error.message)); // Use throwError
    } else {
      // Server-side error
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
      return throwError(() => new Error(error.error.message || 'An error occurred. Please try again later.')); // Use throwError with backend message or default
    }
  }
}
