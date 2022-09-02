import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICelebre } from '../interfaces/celebre';

import {catchError, map, delay, Observable, retry, tap, throwError, shareReplay, BehaviorSubject, switchMap} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CelebreService {

  private readonly baseUrl = 'http://localhost:3000/celebreties';

  constructor(
    private http: HttpClient
  ) { }

  public getCelebreByID(id:number) {
    const url =  `${this.baseUrl}/${String(id)}`;
    return this.http.get<ICelebre>(url);
  }

  public getCelebIDByParams (params:string) {
    return this.http.get<ICelebre[]>(`http://localhost:3000/celebrities?name_like=${params}/`)
  }

  public getAllByParams(params:string): Observable<string[]>{
    return this.http.get<ICelebre[]>('http://localhost:3000/celebrities/').pipe (
      map((celebre)=> {
        const celebrities = new Set();
        if (params==="actor") {
          celebre.forEach ((cel)=> {
            if (cel.actorOf!==undefined){
              celebrities.add(cel.name);
            }
          })
        }
        else if (params==="director") {
          celebre.forEach ((cel)=> {
            if (cel.directorOf!==undefined){
              celebrities.add(cel.name);
            }
          })
        }
        else if (params==="writer") {
          celebre.forEach ((cel)=> {
            if (cel.writerOf!==undefined){
              celebrities.add(cel.name);
            }
          })
        }
        let newSet = new Set(Array.from(celebrities).flat().sort());
        return  Array.from(newSet) as string[];
      })
    )
  }

}
