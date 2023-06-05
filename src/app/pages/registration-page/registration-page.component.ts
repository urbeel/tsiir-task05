import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {CustomValidators} from "../../form-validators/custom-validators";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit, OnDestroy {
  registerSub: Subscription;
  errorMessage: string;
  form: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.maxLength(60),
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16)
      ]),
      firstname: new FormControl(null, [
        Validators.maxLength(45),
        Validators.required
      ]),
      lastname: new FormControl(null, [
        Validators.maxLength(45),
        Validators.required
      ]),
      phone: new FormControl(null, [
        Validators.maxLength(20),
        Validators.required
      ]),
      address: new FormControl(null, [
        Validators.maxLength(255),
        Validators.required
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required
      ])
    },[CustomValidators.passwordsEqualityValidator]);
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.disable();
      this.registerSub = this.authService.register(this.form.value).subscribe({
          next: value => {
            this.router.navigate(['login']).catch(reason => console.error(reason));
          },
          error: err => {
            this.errorMessage = err.error.message;
            this.form.enable();
          }
        }
      )
    }
  }

  ngOnDestroy(): void {
    if (this.registerSub) {
      this.registerSub.unsubscribe();
    }
  }

  get email(): AbstractControl {
    return this.form.controls.email;
  }

  get firstname(): AbstractControl {
    return this.form.controls.firstname;
  }

  get lastname(): AbstractControl {
    return this.form.controls.lastname;
  }

  get phone(): AbstractControl {
    return this.form.controls.phone;
  }

  get address(): AbstractControl {
    return this.form.controls.address;
  }

  get password(): AbstractControl {
    return this.form.controls.password;
  }

  get confirmPassword(): AbstractControl {
    return this.form.controls.confirmPassword;
  }
}
