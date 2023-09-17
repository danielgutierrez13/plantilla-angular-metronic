import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatSort, Sort } from "@angular/material/sort";
import { PaginationData } from "../../../interfaces/interfaces-pagination-data";
import { HeaderTable, MenuItem } from "../../../interfaces/interfaces-table";
import { menuItems } from "../../../utils/const-items-menus";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @ViewChild(MatSort) sort: MatSort;

  @Input() totalEntries: number = 10;
  @Input() headers: HeaderTable[] = [];
  @Input() data: any[] = [];
  @Output() interaction = new EventEmitter<{sortData: Sort | null, paginationData: PaginationData}>();
  @Output() menuChange = new EventEmitter<{dataRow: any, menuItem: MenuItem}>();

  public menuItems: MenuItem[] = menuItems;
  public itemsPerPageOptions: number[] = [5, 10, 25, 50];
  private sortState: Sort | null = null;
  public paginationData: PaginationData = {
    currentPage: 1,
    itemsPerPage: this.itemsPerPageOptions[0]
  };

  public announceSortChange(sortState: Sort) {
    if (sortState.direction) {
       this.sortState = sortState;
    } else {
       this.sortState = null;
    }
    this.paginationData = {
      currentPage: 1,
      itemsPerPage: this.itemsPerPageOptions[0]
    };
    this.interaction.emit({sortData: this.sortState, paginationData: this.paginationData});
  }

  public onPaginationChange(paginationData: PaginationData) {
    this.paginationData = paginationData;
    this.interaction.emit({sortData: this.sortState, paginationData: this.paginationData});
  }


  public getMinWidthClass(minWidth?: string): string {
    return 'min-w-' + (minWidth ? minWidth : '100px');
  }

  public changeMenuItems(data: any, menuItem: MenuItem) {
    this.menuChange.emit({dataRow: data, menuItem});
  }

  public getTextEstado(value: number): string {
    switch (value) {
      case 0:
        return 'Inactivo';
      case 1:
        return 'Activo';
      case 2:
        return 'Pendiente';
      case 3:
        return 'Bloqueado';
      default:
        return '';
    }
  }

  public getCircleColorEstado(value: number): string {
    switch (value) {
      case 0:
        return '#db301c';
      case 1:
        return '#4f964a';
      case 2:
        return '#f98121';
      case 3:
        return '#0033a1';
      default:
        return '';
    }
  }
}
