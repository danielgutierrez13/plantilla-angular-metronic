import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Error404Component } from './error404.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('Error404Component', () => {
  let component: Error404Component;
  let fixture: ComponentFixture<Error404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Error404Component ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Error404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
