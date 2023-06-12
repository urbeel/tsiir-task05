import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomValidators} from "../../../form-validators/custom-validators";
import {AuthService} from "../../../services/auth.service";
import {Subscription} from "rxjs";
import {UsersPageComponent} from "../../../pages/users-page/users-page.component";

@Component({
  selector: 'app-create-admin-modal',
  templateUrl: './create-admin-modal.component.html'
})
export class CreateAdminModalComponent implements OnInit, OnDestroy {
  @ViewChild('modal') modal: TemplateRef<any>;
  protected createAdminForm: FormGroup;
  private createAdminSub: Subscription;

  constructor(private readonly modalService: NgbModal,
              private readonly authService: AuthService,
              private readonly parentComponent: UsersPageComponent) {
  }

  ngOnInit(): void {
    this.createAdminForm = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.maxLength(60),
        Validators.required
      ]),
      firstname: new FormControl(null, [
        Validators.maxLength(45),
        Validators.required
      ]),
      lastname: new FormControl(null, [
        Validators.maxLength(45),
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16)
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required
      ])
    }, [CustomValidators.passwordsEqualityValidator]);
  }

  ngOnDestroy(): void {
    if (this.createAdminSub) {
      this.createAdminSub.unsubscribe();
    }
  }

  openModal(): void {
    this.modalService.open(this.modal);
  }

  createAdmin(): void {
    if (this.createAdminForm.valid) {
      this.createAdminSub = this.authService.createAdmin(this.createAdminForm.value).subscribe({
        next: () => {
          this.parentComponent.ngOnInit();
          this.modalService.dismissAll();
        },
        error: err => console.error(err)
      })
    }
  }

  get email(): AbstractControl {
    return this.createAdminForm.controls.email;
  }

  get firstname(): AbstractControl {
    return this.createAdminForm.controls.firstname;
  }

  get lastname(): AbstractControl {
    return this.createAdminForm.controls.lastname;
  }

  get password(): AbstractControl {
    return this.createAdminForm.controls.password;
  }

  get confirmPassword(): AbstractControl {
    return this.createAdminForm.controls.confirmPassword;
  }
}
