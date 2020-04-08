import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * Default user and password just for testing
   */
  private readonly user = 'user';
  private readonly password = 'user';
  private currentUser: User = null;

  /**
   * Login with default username and password
   * @param username Username
   * @param password Password
   */
  login(username: string, password: string): Observable<User> {
    return (username == this.user && password == this.password) ?
      of({ username: 'user', name: 'User', email: 'user@email.com' })
        .pipe(tap(u => this.currentUser = u)) :
      of(null);
  }

  logout(): void {
    this.currentUser = null;
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser != null;
  }
}
