import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(protected readonly http: HttpClient) {
  }

  readAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>('users');
  }
}
