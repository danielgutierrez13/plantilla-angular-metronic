import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopbarComponent } from './topbar.component';
import { LayoutService } from '../../core/layout.service';

class MockLayoutService {
  getProp(prop: string): any {
    return prop;
  }
}

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;
  let layoutService: LayoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopbarComponent],
      providers: [
        { provide: LayoutService, useClass: MockLayoutService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    layoutService = TestBed.inject(LayoutService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default properties set', () => {
    expect(component.toolbarButtonMarginClass).toBe('ms-1 ms-lg-3');
    expect(component.toolbarUserAvatarHeightClass).toBe('symbol-30px symbol-md-40px');
    expect(component.headerLeft).toBe('menu');
  });

  it('should update headerLeft property on init', () => {
    spyOn(layoutService, 'getProp').and.returnValue('new-value');
    component.ngOnInit();
    expect(component.headerLeft).toBe('new-value');
  });
});
