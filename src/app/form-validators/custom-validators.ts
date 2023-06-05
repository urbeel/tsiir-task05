import {AbstractControl, FormGroup, ValidationErrors} from "@angular/forms";

export class CustomValidators {
  static passwordsEqualityValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get("password")?.value;
    const confirmPassword = form.get("confirmPassword")?.value;
    const isEqual = password === confirmPassword;
    return isEqual ? null : {passwordMismatch: true};
  }
}
