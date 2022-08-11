import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of, map, BehaviorSubject } from 'rxjs';
import { IUser } from '../interfaces/user';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl = 'http://localhost:3000/users';

  private _currentUser$ = new BehaviorSubject<IUser|null>(null);
  private readonly cookieName = 'currentUser';

  constructor(
    private http: HttpClient,
    private cookies: CookieService
    ) {  }

    get currentUser$(): BehaviorSubject<IUser|null> {
    return this._currentUser$;
  }

  public getUser(id: number): Observable<IUser> {
    const url = `${this.baseUrl}/${id.toString()}`;

    return this.http.get<IUser>(url);
  }

  public addUser(user: IUser): any {
    const url = `${this.baseUrl}`;
    return this.http.post<IUser>(url, {...user});
  }

  public findUserByEmail(email: string): Observable<IUser[]> {
    console.log("I find email")
    return this.http.get<IUser[]>(`${this.baseUrl}?email=${email}`);
  }

  public loginUser(email: string, password: string): Observable<IUser|null> {
    if (email === '' || password === '') {
      return of(null);
    }

    return this.findUserByEmail(email).pipe(
      map(([user]) => user?.password === password ? user : null),
      tap (()=> console.log("hyugyu"))
    );
  }

  public logOutUser(): void {
    this.onUserUpdate(null);
  }

  public onUserUpdate(user: IUser | null): void {
    /*if (user) {
      const sameSite = 'strict';
      const expires = this.cookies.getExpiritonDate(1);

      this.cookies.setCookie(this.cookieName, user.id.toString(), { expires, sameSite })
    } else {
      this.cookies.deleteCookie(this.cookieName)
    }*/

    this._currentUser$.next(user)

  }

  public getAllUsers() {
    return this.http.get<IUser>(this.baseUrl).
    pipe(
      tap((users)=> console.log(users))
    )
  }
}
