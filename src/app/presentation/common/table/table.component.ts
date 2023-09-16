import { Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from "@angular/material/sort";
import { PaginationData } from "../../../interfaces/interfaces-pagination-data";
import { DataRow, HeaderTable } from "../../../interfaces/interfaces-table";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @ViewChild(MatSort) sort: MatSort;
  public totalEntries: number = 200;

  headers: HeaderTable[] = [
      { id: 'authors', label: 'Authors', minWidth: '150px' },
      { id: 'company', label: 'Company', minWidth: '140px' },
      { id: 'actions', label: 'Actions' }
  ];

  data: DataRow[] = [
    { authors: 'John Doe', company: 'Google' },
    { authors: 'Jane Doe', company: 'Facebook' },
    { authors: 'John Doe', company: 'Google' },
    { authors: 'Jane Doe', company: 'Facebook' },
  ]

  public itemsPerPageOptions: number[] = [5, 10, 25, 50];

  public announceSortChange(sortState: Sort) {
    if (sortState.direction) {

    } else {

    }
  }

  public onPaginationChange(data: PaginationData ) {
      console.log("Página actual:", data.currentPage);
      console.log("Items por página:", data.itemsPerPage);
  }

  public getMinWidthClass(minWidth?: string): string {
    return 'min-w-' + (minWidth ? minWidth : '100px');
  }

}
