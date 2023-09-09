import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent {

  // @Output() totalEntriesChange: EventEmitter<number> = new EventEmitter<number>();
  // @Output() currentPageChange: EventEmitter<number> = new EventEmitter<number>();
  // @Output() selectedItemsPerPageChange: EventEmitter<number> = new EventEmitter<number>();

  @Output() public _totalEntries: number = 91;
  @Output() public _currentPage: number = 1;
  @Output() public _selectedItemsPerPage: number = 10;
  @Output() public _itemsPerPageOptions: number[] = [5, 10, 25, 50];
  protected readonly Math = Math;

  public getPagesToShow(): number[] {
    const totalPages: number = Math.ceil(this._totalEntries / this._selectedItemsPerPage);
    const maxPagesToShow: number = 5;

    let startPage: number = 1;
    let endPage: number = totalPages;

    if (totalPages > maxPagesToShow) {
      const halfMax: number = Math.floor(maxPagesToShow / 2);
      if (this._currentPage <= halfMax) {
        endPage = maxPagesToShow;
      } else if (this._currentPage >= totalPages - halfMax) {
        startPage = totalPages - maxPagesToShow + 1;
      } else {
        startPage = this._currentPage - halfMax;
        endPage = this._currentPage + halfMax;
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
