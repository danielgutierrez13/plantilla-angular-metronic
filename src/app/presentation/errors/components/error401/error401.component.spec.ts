import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Error401Component } from './error401.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('Error401Component', () => {
  let component: Error401Component;
  let fixture: ComponentFixture<Error401Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Error401Component],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(Error401Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
