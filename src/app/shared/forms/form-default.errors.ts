import { InjectionToken } from '@angular/core';

/**
 * Default errors to use in control error directive
 */
export const defaultErrors = {
  required: (fieldName) => `${fieldName} is required`,
  pattern: (fieldName) => `${fieldName} not valid`,
  requiredTrue: (fieldName) => `${fieldName} must be true`,
  email: (fieldName) => `${fieldName} should be a valid email`,
  min: (fieldName, { min, actual }) => `${fieldName} should be higher than ${min} but got ${actual}`,
  max: (fieldName, { max, actual }) => `${fieldName} should be lower than ${max} but got ${actual}`,
  minlength: (fieldName, { requiredLength, actualLength }) => `${fieldName} must be at least ${requiredLength} characters long but got
   ${actualLength}`,
  maxlength: (fieldName, { requiredLength, actualLength }) => `${fieldName} cannot be more than ${requiredLength} characters long but got
   ${actualLength}`
};

/**
 * Form error injection token
 */
export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});
