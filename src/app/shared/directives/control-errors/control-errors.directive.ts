import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive, DoCheck, ElementRef,
  Host,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  ViewContainerRef
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { EMPTY, merge, Observable, Subscription } from 'rxjs';
import { ControlErrorContainerDirective } from '../control-error-container/control-error-container.directive';
import { startCase } from 'lodash';
import { ControlErrorComponent } from '../../components/control-error/control-error.component';
import { FormSubmitDirective } from '../form-submit/form-submit.directive';
import { FORM_ERRORS } from '../../forms/form-default.errors';

/**
 * @description
 * Directive used to show/hide errors in form fields, can be used conjunction with 'appControlErrorContainer' directive
 *  to show the error in a different container, if you provide 'appFormSubmit' directive in your form the validation is
 *  also trigger when submit the form
 *
 * @input [customErrors: object]="{invalidKey: 'Error description'}" | invalidKey should match with your validator error key
 * @input [useTouchedState: boolean] Validate in every angular ngDoCheck call and the field has been touched
 *
 * @usageNotes
 *
 * ```html
 * <form class="form-horizontal" [formGroup]="formGroup" appFormSubmit (ngSubmit)="submit()">
 * <div class="cols-sm-10">
 *    <div class="input-group" appControlErrorContainer>
 *        <input type="password" class="form-control" name="confirm" id="confirm"
 *             placeholder="Confirm your Password" formControlName="confirm" appControlErrors
 *             [customErrors]="{invalidPassword: 'Password should be between 5 and 12 characters'}" />
 *     </div>
 * </div>
 * </form>
 * ```
 */
@Directive({
  selector: '[appControlErrors]'
})
export class ControlErrorsDirective implements OnInit, OnDestroy, DoCheck {
  @Input() customErrors = {};
  @Input() useTouchedState: boolean;

  componentRef: ComponentRef<ControlErrorComponent>;
  container: ViewContainerRef;
  submit$: Observable<Event>;
  private subscription: Subscription;
  private readonly errorClass = 'error';
  private readonly touchedClass = 'ng-touched';

  constructor(
    private el: ElementRef,
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private controlDir: NgControl,
    @Inject(FORM_ERRORS) private errors,
    @Optional() @Host() private form: FormSubmitDirective,
    @Optional() controlErrorContainer: ControlErrorContainerDirective
  ) {
    this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr;
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
  }

  ngOnInit() {
    if (!this.useTouchedState) {
      this.setUpValueChangeValidation();
    }
  }

  ngDoCheck(): void {
    if (this.useTouchedState) {
      this.setUpStatusChangeValidation();
    }
  }

  /**
   * Subscribe to value changes and form submit to validate fields at those events
   */
  private setUpValueChangeValidation(): void {
    this.subscription = merge(this.submit$, this.control.valueChanges)
      .subscribe(() => this.validateControl());
  }

  private setUpStatusChangeValidation(): void {
    const hasTouchedClass = this.el.nativeElement.classList.contains(this.touchedClass);
    const previouslyErrored = this.getContainerNativeElement().classList.contains(this.errorClass);
    if (hasTouchedClass && ((this.control.valid && previouslyErrored) || (!this.control.valid && !previouslyErrored))) {
      this.validateControl();
    }
  }

  get control() {
    return this.controlDir.control;
  }

  /**
   * Validate control and showing errors if any
   */
  validateControl(): void {
    const controlErrors = this.control.errors;
    if (controlErrors) {
      const firstKey = Object.keys(controlErrors)[0];
      const getError = this.errors[firstKey];
      if (this.customErrors[firstKey] || getError) {
        const text = this.customErrors[firstKey] || getError(startCase(this.controlDir.name), controlErrors[firstKey]);
        this.setError(text);
      }
    } else if (this.componentRef) {
      this.setError(null);
    }
  }

  getContainerNativeElement(): HTMLElement {
    return this.container.element.nativeElement;
  }

  /**
   * Show or remove an error next to the element or
   * @param text Error test
   */
  setError(text: string) {
    if (!this.componentRef) {
      const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
      this.componentRef = this.container.createComponent(factory);
    }
    this.componentRef.instance.text = text;
    this.componentRef.instance.hide = (!text);
    const containerNativeEl = this.getContainerNativeElement();
    if (text) {
      containerNativeEl.classList.add(this.errorClass);
    } else {
      containerNativeEl.classList.remove(this.errorClass);
    }
  }

  getSubscription() {
    return this.subscription;
  }

  /**
   * Destroy dynamic component and subscription
   */
  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
