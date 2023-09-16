import {Component, EventEmitter, Output} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent {

  // @Output() totalEntriesChange: EventEmitter<number> = new EventEmitter<number>();
  // @Output() currentPageChange: EventEmitter<number> = new EventEmitter<number>();
  // @Output() selectedItemsPerPageChange: EventEmitter<number> = new EventEmitter<number>();

  @Output() public _totalEntries: number = 2000;
  @Output() public _currentPage: number = 1;
  @Output() public _selectedItemsPerPage: number = 10;
  @Output() public _itemsPerPageOptions: number[] = [5, 10, 25, 50];
  protected readonly Math = Math;
  public maxPagesToShow: number = 5;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe(result => {
      if (result.matches) {
        this.maxPagesToShow = 3;
      } else {
        this.maxPagesToShow = 5;
      }
    });
  }

  public getPagesToShow(): number[] {
    const totalPages: number = Math.ceil(this._totalEntries / this._selectedItemsPerPage);

    let startPage: number = 1;
    let endPage: number = totalPages;

    if (totalPages > this.maxPagesToShow) {
      const halfMax: number = Math.floor(this.maxPagesToShow / 2) + this.maxPagesToShow - 2;

      if (this._currentPage <= halfMax ) {
        endPage = this.maxPagesToShow;
      } else if (this._currentPage >= totalPages - halfMax) {
        startPage = totalPages - this.maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = this._currentPage - this.maxPagesToShow + 1;
        endPage = this._currentPage;
      }
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }


  public setCurrentPage(page: number) {
    if (page >= 1 && page <= Math.ceil(this._totalEntries / this._selectedItemsPerPage)) {
      this._currentPage = page;
    }
  }

  public onItemsPerPageChange() {
    this._currentPage = 1;
  }
}
