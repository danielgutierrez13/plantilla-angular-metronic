import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      imports: [
        NoopAnimationsModule,  // Required to prevent errors related to animations
        MatSortModule  // Required for sorting functionality
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get correct text for given estado value', () => {
    expect(component.getTextEstado(0)).toBe('Inactivo');
    expect(component.getTextEstado(1)).toBe('Activo');
    expect(component.getTextEstado(2)).toBe('Pendiente');
    expect(component.getTextEstado(3)).toBe('Bloqueado');
    expect(component.getTextEstado(4)).toBe('');  // Non-existing value
  });

  it('should get correct circle color for given estado value', () => {
    expect(component.getCircleColorEstado(0)).toBe('#db301c');
    expect(component.getCircleColorEstado(1)).toBe('#4f964a');
    expect(component.getCircleColorEstado(2)).toBe('#f98121');
    expect(component.getCircleColorEstado(3)).toBe('#0033a1');
    expect(component.getCircleColorEstado(4)).toBe('');
  });

});
