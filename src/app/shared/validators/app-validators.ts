import { AbstractControl, FormArray, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class AppValidators {
  static readonly minPasswordLength = 5;
  static readonly maxPasswordLength = 12;

  /**
   * @description
   * Validator that requires the control value must be between 5 and 12 characters with no spaces.
   *
   * @usageNotes
   *
   * ```typescript
   * const control = new FormControl('', AppValidators.password);
   * console.log(control.errors); // {invalidPassword: true}
   * ```
   * @returns An error map with the `invalidPassword` property
   * if the validation check fails, otherwise `null`.
   *
   * @see `updateValueAndValidity()`
   */
  static password(control: AbstractControl): ValidationErrors | null {
    // TODO check if there is another rules for password!
    if (control.value.length <= AppValidators.minPasswordLength || control.value.length >= AppValidators.maxPasswordLength) {
      return { invalidPassword: true };
    }
    return null;
  }

  /**
   * @description
   * Validator that requires the controls password and confirmPassword must be equals.
   *
   * @usageNotes
   *
   * ```typescript
   * this.formBuilder.group({
   *   password: ['', [Validators.required]],
   *   confirmPassword: ['']
   * }, { validator: AppValidators.matchPasswords('password', 'confirmPassword') });
   *
   * ```
   * @returns An error map with the `notMatchPasswords` property
   * if the validation check fails, otherwise `null`.
   *
   * @see `updateValueAndValidity()`
   */
  static matchPasswords(passwordControl, confirmPasswordControl): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const password = formGroup.get(passwordControl).value;
      const confirmPassword = formGroup.get(confirmPasswordControl).value;
      return password === confirmPassword ? null : { notMatchPasswords: true };
    };
  }
}
