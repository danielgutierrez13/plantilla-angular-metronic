import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { HttpParamsConfig } from "../interfaces/interfaces-api-service";

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should execute GET request', () => {
    const mockData = { data: 'test' };
    const mockParams: HttpParamsConfig = { param1: 'test1', param2: 'test2' };
    service.get('testAPI', 'http://localhost:3000/', mockParams).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('http://localhost:3000/testAPI?param1=test1&param2=test2');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should execute POST request', () => {
    const mockData = { data: 'test' };
    service.post('testAPI', 'http://localhost:3000/').subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('http://localhost:3000/testAPI');
    expect(req.request.method).toBe('POST');
    req.flush(mockData);
  });

  it('should execute PUT request', () => {
    const mockData = { data: 'test' };
    service.put('testAPI', 'http://localhost:3000/').subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('http://localhost:3000/testAPI');
    expect(req.request.method).toBe('PUT');
    req.flush(mockData);
  });

  it('should execute PATCH request', () => {
    const mockData = { data: 'test' };
    service.patch('testAPI', 'http://localhost:3000/').subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('http://localhost:3000/testAPI');
    expect(req.request.method).toBe('PATCH');
    req.flush(mockData);
  });

  it('should execute DELETE request', () => {
    const mockData = { data: 'test' };
    service.delete('testAPI', 'http://localhost:3000/').subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('http://localhost:3000/testAPI');
    expect(req.request.method).toBe('DELETE');
    req.flush(mockData);
  });

  it('should execute EXPORT request', () => {
    const blob = new Blob(['test'], { type: 'text/plain' });
    service.export('testAPI', 'http://localhost:3000/').subscribe(response => {
      expect(response.body.size).toBe(blob.size);
      expect(response.body.type).toBe(blob.type);
    });

    const req = httpMock.expectOne('http://localhost:3000/testAPI');
    expect(req.request.method).toBe('POST');
    req.flush(blob);
  });


  it('should build URLs correctly', () => {
    const result = service['buildUrl']('testAPI', 'http://localhost:3000/');
    expect(result).toBe('http://localhost:3000/testAPI');
  });

  it('should get headers correctly without token', () => {
    localStorage.removeItem('token');
    const headers = service['getHeaders']();
    expect(headers["Content-Type"]).toBe('application/json');
    expect(headers["Authorization"]).toBeUndefined();
  });

  it('should get headers correctly with token', () => {
    localStorage.setItem('token', 'mockToken');
    const headers = service['getHeaders']();
    expect(headers["Content-Type"]).toBe('application/json');
    expect(headers["Authorization"]).toBe('Bearer mockToken');
  });
});

