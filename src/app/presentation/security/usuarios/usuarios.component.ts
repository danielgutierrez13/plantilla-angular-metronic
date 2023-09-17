import { Component } from '@angular/core';
import { HeaderTable, MenuItem } from "../../../interfaces/interfaces-table";
import { Sort } from "@angular/material/sort";
import { PaginationData } from "../../../interfaces/interfaces-pagination-data";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {

    yourHeadersData: HeaderTable[] = [
        { id: 'id', label: 'ID' },
        { id: 'name', label: 'Nombre' },
        { id: 'email', label: 'Correo electrónico' },
        { id: 'role', label: 'Rol' },
        { id: 'status', label: 'Estado' },
        { id: 'actions', label: 'Acciones' },
    ];
    yourDataRows: any[] = [
        { id: '1', name: 'John Doe', email: 'D1yYn@example.com', role: 'Administrador', status: 0 },
        { id: '2', name: 'Jane Doe', email: 'D1yYn@example.com', role: 'Administrador', status: 1 },
        { id: '3', name: 'John Doe', email: 'D1yYn@example.com', role: 'Administrador', status: 1 },
        { id: '4', name: 'Jane Doe', email: 'D1yYn@example.com', role: 'Administrador', status: 0 },
        { id: '5', name: 'John Doe', email: 'D1yYn@example.com', role: 'Administrador', status: 1 },
    ];
    yourTotalEntriesValue: number = 30;

    onTableInteraction(event: { sortData: Sort | null, paginationData: PaginationData }) {
        console.log('Interaction from table:', event);
    }

    onMenuChange(event: { dataRow: any, menuItem: MenuItem }) {
        console.log('Menu change from table:', event);
    }

    protected readonly console = console;
}
