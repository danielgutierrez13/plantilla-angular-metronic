import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginateComponent } from './paginate.component';
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe('PaginateComponent', () => {
  let component: PaginateComponent;
  let fixture: ComponentFixture<PaginateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginateComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total pages', () => {
    component.totalEntries = 100;
    component.selectedItemsPerPage = 25;
    expect(component.getTotalPages()).toEqual(4);
  });

  it('should set current page', () => {
    component.setCurrentPage(3);
    expect(component.currentPage).toEqual(3);
  });

  it('should not set invalid page numbers', () => {
    component.totalEntries = 100;
    component.selectedItemsPerPage = 10;

    component.setCurrentPage(11);
    expect(component.currentPage).not.toEqual(11);
  });

  it('should emit pagination data when current page changes', () => {
    spyOn(component.paginationChange, 'emit');

    component.setCurrentPage(2);
    expect(component.paginationChange.emit).toHaveBeenCalledWith({
      currentPage: 2,
      itemsPerPage: component.selectedItemsPerPage
    });
  });

  it('should reset current page to 1 and emit pagination data when items per page changes', () => {
    spyOn(component.paginationChange, 'emit');

    component.onItemsPerPageChange();
    expect(component.currentPage).toEqual(1);
    expect(component.paginationChange.emit).toHaveBeenCalledWith({
      currentPage: 1,
      itemsPerPage: component.selectedItemsPerPage
    });
  });
});
