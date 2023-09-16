import { Component, ViewChild } from '@angular/core';
import {MatSort, Sort} from "@angular/material/sort";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @ViewChild(MatSort) sort: MatSort;

  announceSortChange(sortState: Sort) {
    console.log(sortState);
    if (sortState.direction) {
    } else {
    }
  }
}
