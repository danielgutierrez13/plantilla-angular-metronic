import { TestBed } from '@angular/core/testing';
import { LoginRepositoryService } from './login-repository.service';
import { ApiService } from "../../api.service";
import { of } from 'rxjs';
import { LoginInterfacesRequest, LoginInterfacesResponse } from "../interfaces/login-interfaces";

describe('LoginRepositoryService', () => {
  let service: LoginRepositoryService;
  let apiServiceMock: jasmine.SpyObj<ApiService>;

  const mockLoginInterfacesResponse: LoginInterfacesResponse = {
    token: 'mockToken',
    status: true,
    role: 'mockRole',
    username: 'mockUsername'
  };

  beforeEach(() => {
    apiServiceMock = jasmine.createSpyObj('ApiService', ['post']);

    TestBed.configureTestingModule({
      providers: [
        LoginRepositoryService,
        { provide: ApiService, useValue: apiServiceMock }
      ]
    });

    service = TestBed.inject(LoginRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should save user data to localStorage and update currentUserSubject when successful login', () => {
      const mockLoginInterfacesRequest: LoginInterfacesRequest = {
        username: 'mockUsername',
        password: 'mockPassword'
      };

      apiServiceMock.post.and.returnValue(of(mockLoginInterfacesResponse));
      spyOn(localStorage, 'setItem');

      service.login(mockLoginInterfacesRequest).subscribe(response => {
        expect(response).toEqual(mockLoginInterfacesResponse);
        expect(localStorage.setItem).toHaveBeenCalledWith('currentUser', JSON.stringify(mockLoginInterfacesResponse));
        expect(localStorage.setItem).toHaveBeenCalledWith('state', JSON.stringify(mockLoginInterfacesResponse.status));
        expect(localStorage.setItem).toHaveBeenCalledWith('token', JSON.stringify(mockLoginInterfacesResponse.token));
        expect(localStorage.setItem).toHaveBeenCalledWith('role', JSON.stringify(mockLoginInterfacesResponse.role));
        expect(service.currentUserValue).toEqual(mockLoginInterfacesResponse);
      });
    });
  });

  describe('logout', () => {
    it('should remove user data from localStorage and update currentUserSubject', () => {
      spyOn(localStorage, 'removeItem');

      service.logout();

      expect(localStorage.removeItem).toHaveBeenCalledWith('currentUser');
      expect(localStorage.removeItem).toHaveBeenCalledWith('state');
      expect(localStorage.removeItem).toHaveBeenCalledWith('role');
      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
      expect(service.currentUserValue).toBeNull();
    });
  });
});
