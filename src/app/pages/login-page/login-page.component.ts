import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit, OnDestroy {
  private authSub: Subscription;
  error: string;
  form: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    });
  }

  onSubmit() {
    this.form.disable();
    this.authSub = this.authService.login(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['']).catch(reason => console.error(reason));
        },
        error: err => {
          this.error = err.error.message;
          this.form.enable();
        }
      }
    )
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
