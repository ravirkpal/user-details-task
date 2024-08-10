import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://admin-dev.the-maxeffort.com/api/v1/login?lang=en';

  constructor(private http: HttpClient, private router: Router, private toasty: ToastrService) { }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(this.apiUrl, body).pipe(
      tap(response => {
        if (response?.data?.id) { 
          localStorage.setItem('authToken', response?.data?.id);
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        throw error; 
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
    this.toasty.success('Logout Successfully')
  }
}
