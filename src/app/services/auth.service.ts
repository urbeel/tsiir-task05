import {Injectable} from '@angular/core';
import {IUser} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {ILoginData} from "../models/login-data";
import jwtDecode from "jwt-decode";
import {Roles} from "../enums/roles";
import {IJwtClaims} from "../models/jwt-claims";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly tokenParamName: string = "auth-token";
  private static readonly userIdParamName: string = "user-id";
  private isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!this.getToken());
  private isAdminBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAdmin());

  constructor(private readonly http: HttpClient) {
  }

  register(user: IUser): Observable<any> {
    return this.http.post<IUser>("auth/registration", user);
  }

  createAdmin(user: IUser): Observable<any> {
    return this.http.post<IUser>("auth/create-admin", user);
  }

  login(loginData: ILoginData): Observable<{ token: string }> {
    return this.http.post<{ token: string }>("auth/login", loginData)
      .pipe(tap(({token}) => {
          localStorage.setItem(AuthService.tokenParamName, token);
          localStorage.setItem(AuthService.userIdParamName, jwtDecode<IJwtClaims>(token).userId.toString());
          this.isUserLoggedIn.next(!!localStorage.getItem(AuthService.tokenParamName));
          this.isAdminBehaviorSubject.next(this.isAdmin());
        }
      ))
  }

  logout(): void {
    localStorage.removeItem(AuthService.tokenParamName);
    this.isUserLoggedIn.next(false);
    this.isAdminBehaviorSubject.next(false);
  }

  isAuthenticated(): BehaviorSubject<boolean> {
    return this.isUserLoggedIn;
  }

  getRole(): Roles | null {
    const token = this.getToken();
    if (token) {
      const role = jwtDecode<IJwtClaims>(token).userRole as Roles;
      if (Object.values(Roles).includes(role)) {
        return role;
      }
    }
    return null;
  }

  isCustomer(): boolean {
    return this.getRole() == Roles.ROLE_CUSTOMER;
  }

  isAdmin(): boolean {
    return this.getRole() == Roles.ROLE_ADMIN;
  }

  isAdminWithSub(): BehaviorSubject<boolean> {
    return this.isAdminBehaviorSubject;
  }

  getUserId(): number | null {
    return localStorage.getItem(AuthService.userIdParamName) as number | null;
  }

  getToken(): string | null {
    return localStorage.getItem(AuthService.tokenParamName);
  }
}
