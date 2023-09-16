import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsComponent } from './errors.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('ErrorsComponent', () => {
  let component: ErrorsComponent;
  let fixture: ComponentFixture<ErrorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorsComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    fixture = TestBed.createComponent(ErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
