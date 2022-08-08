import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of, map } from 'rxjs';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: IUser[] = [];
  private readonly baseUrl = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient
    ) {  }

  public addUser(user:IUser): Observable<IUser> {
    return this.http.post<IUser>(this.baseUrl, user)
    .pipe(
      tap(user => {
        this.users.push(user);
      })
    )
  }

  public findUserByEmail(email: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.baseUrl}?email=${email}`);
  }

  public loginUser(email: string, password: string): Observable<IUser|null> {
    if (email === '' || password === '') {
      return of(null);
    }

    return this.findUserByEmail(email).pipe(
      map(([user]) => user?.password === password ? user : null)
    );
  }

  public getAllUsers() {
    return this.http.get<IUser>(this.baseUrl).
    pipe(
      tap((users)=> console.log(users))
    )
  }
}
