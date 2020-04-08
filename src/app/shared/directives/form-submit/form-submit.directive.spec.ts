import { FormSubmitDirective } from './form-submit.directive';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared.module';

/***** Test Wrapper Component *****/
@Component({
  template: `
      <form #formEl class="testContainer" [formGroup]="formGroup" appFormSubmit (ngSubmit)="submitForm(formGroup)">
          <input class="e7_input form-control" type="number" aria-label="Aria" appControlErrors
                 formControlName="formControlName">
          <button #buttonElement class="btn btn-secondary btn-md" type="submit" [disabled]="!formGroup.valid"
                  (click)="submitForm(formGroup.value)">Submit
          </button>
      </form>`,
})
class FormSubmitTestWrapperComponent {
  @ViewChild('formEl', {static: false}) formElRef: ElementRef;
  @ViewChild('buttonElement', {static: false}) buttonEl: ElementRef;
  formGroup: FormGroup = new FormGroup({
    formControlName: new FormControl('155')
  });

  submitForm(values) {}
}

describe('FormSubmitDirective', () => {
  let component: FormSubmitTestWrapperComponent;
  let fixture: ComponentFixture<FormSubmitTestWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormSubmitTestWrapperComponent],
      imports: [SharedModule]
    });
    fixture = TestBed.createComponent(FormSubmitTestWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('It should focus on element', () => {
    component.buttonEl.nativeElement.click();
    const classList = (component.formElRef.nativeElement as HTMLFormElement).classList;
    expect(classList.contains('submitted')).toEqual(true);
  });
});
