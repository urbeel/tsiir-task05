import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private navbarSub: Subscription;
  protected isAuthenticated: boolean;

  constructor(
    protected readonly authService: AuthService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.navbarSub = this.authService.isAuthenticated()
      .subscribe(value => this.isAuthenticated = value);
  }

  onLogoutBtnClick() {
    this.authService.logout();
    this.router.navigate(['']).catch(reason => console.error(reason));
  }

  ngOnDestroy(): void {
    if (this.navbarSub) {
      this.navbarSub.unsubscribe();
    }
  }
}
