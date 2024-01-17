import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public isAuthenticated(): Boolean {
    let userData = localStorage.getItem('session');
    if (userData && JSON.parse(userData)) {
      return true;
    }
    return false;
  }

  public setSessionInfo(session: string | null) {
    localStorage.setItem('session', JSON.stringify(session));
  }

  public deleteSessionInfo() {
    localStorage.removeItem('session');
  }

  login(user: User): Observable<any> {
    return this.http.post('http://localhost:3002/sign-in', {
      user,
    });
  }

  logout(): Observable<any> {
    let session = localStorage.getItem('session') || '';
    return this.http.get('http://localhost:3002/sign-out', {
      headers: new HttpHeaders({ session }),
    });
  }

  createUser(newUser: User): Observable<any> {
    return this.http.post('http://localhost:3002/users', newUser, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response',
      withCredentials: true,
    });
  }

  deleteUser(user: User): Observable<any> {
    return this.http.delete('http://localhost:3002/users', { body: user });
  }
}
