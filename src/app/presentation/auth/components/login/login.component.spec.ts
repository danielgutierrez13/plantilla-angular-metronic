import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoginRepositoryService } from "../../../../domain/login/repository/login-repository.service";
import { of, throwError } from 'rxjs';
import { Router } from "@angular/router";
import { LoginInterfacesResponse } from "../../../../domain/login/interfaces/login-interfaces";
import { ChangeDetectorRef } from "@angular/core";

const mockResponse: LoginInterfacesResponse = {
  status: true,
  username: "username",
  role: 'user',
  token: 'token1234',
};
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockLoginService: jasmine.SpyObj<LoginRepositoryService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockChangeDetectorRef: jasmine.SpyObj<ChangeDetectorRef>;

  beforeEach(() => {
    mockLoginService = jasmine.createSpyObj('LoginRepositoryService', ['login']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        { provide: LoginRepositoryService, useValue: mockLoginService },
        { provide: Router, useValue: mockRouter },
        { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef }
      ],
      imports: [ReactiveFormsModule]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    spyOnProperty(mockLoginService, 'currentUserValue', 'get').and.returnValue(mockResponse);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
