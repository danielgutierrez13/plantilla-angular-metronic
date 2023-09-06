import { TestBed } from '@angular/core/testing';

import { LoginRepositoryService } from './login-repository.service';

describe('LoginRepositoryService', () => {
  let service: LoginRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
