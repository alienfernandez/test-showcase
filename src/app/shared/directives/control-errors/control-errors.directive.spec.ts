import { ControlErrorsDirective } from './control-errors.directive';
import { Component, ElementRef, OnDestroy, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared.module';
import { By } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ControlErrorComponent } from '../../components/control-error/control-error.component';

/***** Test Wrapper Component *****/
@Component({
  template: `
      <form class="testContainer" [formGroup]="formGroup" appFormSubmit>
          <div #containerEl appControlErrorContainer>
              <input class="e7_input form-control" type="number" formControlName="formControlName"
                     appControlErrors [customErrors]="customErrors">
              <button #buttonElement class="btn" type="submit">Submit</button>
          </div>
      </form>`
})
class ControlErrorTestWrapperComponent implements OnDestroy {
  readonly minValue = 150;
  @ViewChild('containerEl', {static: false}) containerEl: ElementRef;
  @ViewChild(ControlErrorsDirective, {static: false}) errorsDirective: ControlErrorsDirective;
  @ViewChildren(ControlErrorComponent) errors: QueryList<ControlErrorComponent>;
  @ViewChild('buttonElement', {static: false}) buttonEl: ElementRef;
  customErrors = {
    min: `Value should be less than ${this.minValue}`
  };
  formGroup: FormGroup = new FormGroup({
    formControlName: new FormControl(100, [Validators.min(this.minValue)])
  });

  ngOnDestroy(): void {}
}

describe('ControlErrorsDirective', () => {
  let component: ControlErrorTestWrapperComponent;
  let fixture: ComponentFixture<ControlErrorTestWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ControlErrorTestWrapperComponent],
      imports: [SharedModule],
    });
    fixture = TestBed.createComponent(ControlErrorTestWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should show error', () => {
    component.formGroup.patchValue({formControlName: 120});
    fixture.detectChanges();
    const errorDivEl = fixture.debugElement.query(By.css('div.e7_text.-variant-3')).nativeElement as HTMLDivElement;
    expect(errorDivEl.innerHTML.trim()).toEqual(`Value should be less than ${component.minValue}`);
    expect((component.containerEl.nativeElement as HTMLDivElement).classList.contains('error')).toEqual(true);
  });

  it('should hide the error', () => {
    component.formGroup.patchValue({formControlName: 120});
    fixture.detectChanges();
    component.formGroup.patchValue({formControlName: 180});
    fixture.detectChanges();
    const errorDivEl = fixture.debugElement.query(By.css('div.e7_text.-variant-3'));
    expect(errorDivEl.nativeElement.innerHTML).toEqual('');
    expect((component.containerEl.nativeElement as HTMLDivElement).classList.contains('error')).toEqual(false);
  });

  it('should destroy the component, directive and dynamic added component', () => {
    spyOn(component, 'ngOnDestroy').and.callThrough();
    component.formGroup.patchValue({formControlName: 120});
    fixture.detectChanges();
    fixture.destroy();
    expect(component.ngOnDestroy).toHaveBeenCalled();
    expect(component.errorsDirective.getSubscription().closed).toEqual(true);
  });

  it('should show error when submit the form', () => {
    component.formGroup.patchValue({formControlName: 100});
    component.buttonEl.nativeElement.click();
    fixture.detectChanges();
    const errorDivEl = fixture.debugElement.query(By.css('div.e7_text.-variant-3')).nativeElement as HTMLDivElement;
    expect(errorDivEl.innerHTML.trim()).toEqual(`Value should be less than ${component.minValue}`);
  });

  it('should get a subscription', () => {
    const subscription = component.errorsDirective.getSubscription();
    expect(subscription instanceof Subscription).toEqual(true);
  });
});
