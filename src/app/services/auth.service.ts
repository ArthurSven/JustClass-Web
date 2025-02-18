import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import { CookieService } from "ngx-cookie-service";
import {Router} from "@angular/router";

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

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router) {

  }

  register(user: UserRegisterRequest): Observable<UserAuthResponse> {
    return this.http.post<UserAuthResponse>(`${this.apiUrl}/register`, user).pipe(
      catchError(this.handleError)
    )
  }

  login(user: UserAuthRequest): Observable<UserAuthResponse> {
    return this.http.post<UserAuthResponse>(`${this.apiUrl}/login`, user).pipe(
      tap((response: UserAuthResponse) => {
        // Store user data upon successful login
        this.storeUserData(response.token, response.username);
      }),
      catchError(this.handleError)
    );
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

  private storeUserData(token: string, username: string): void {
    this.cookieService.set('token', token);
    this.cookieService.set('username', username);
  }

  logout(): void {
    // Delete cookies
    this.cookieService.delete('token');
    this.cookieService.delete('username');

    // Reload the page to reset the application state
    window.location.reload();

    // Navigate to the landing page after the reload
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 0); // Minimal delay to ensure reload happens first
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('token');
  }

  getToken(): string | null {
    return this.cookieService.get('token') || null;
  }

  getUsername(): string | null {
    return this.cookieService.get('username') || null;
  }
}
