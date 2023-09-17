import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PaginationData } from "../../../interfaces/interfaces-pagination-data";

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent {

  @Input() totalEntries: number = 100;
  @Input() itemsPerPageOptions: number[] = [5, 10, 25, 50];
  @Input() currentPage: number = 1;
  @Input() selectedItemsPerPage: number = 10;
  @Output() paginationChange: EventEmitter<PaginationData> = new EventEmitter<PaginationData>();

  protected readonly Math = Math;

  constructor() { }

  getTotalPages(): number {
    return Math.ceil(this.totalEntries / this.selectedItemsPerPage);
  }

  setCurrentPage(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.emitPaginationData();
    }
  }

  onItemsPerPageChange() {
    this.currentPage = 1;
    this.emitPaginationData();
  }

  private emitPaginationData() {
    this.paginationChange.emit({
        currentPage: this.currentPage,
        itemsPerPage: this.selectedItemsPerPage
    });
  }
}
