import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared.module';

/***** Test Wrapper Component *****/
@Component({
  template: `
      <form #formEl class="testContainer" [formGroup]="formGroup">
          <div appControlErrorContainer>
              <input class="e7_input form-control" type="number" formControlName="formControlName">
          </div>
      </form>`
})
class ControlErrorContainerTestWrapperComponent {
  @ViewChild('formEl', {static: false}) formElRef: ElementRef;
  formGroup: FormGroup = new FormGroup({
    formControlName: new FormControl('155')
  });
}

describe('ControlErrorDirectiveDirective', () => {
  let component: ControlErrorContainerTestWrapperComponent;
  let fixture: ComponentFixture<ControlErrorContainerTestWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ControlErrorContainerTestWrapperComponent],
      imports: [SharedModule]
    });
    fixture = TestBed.createComponent(ControlErrorContainerTestWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });
});
