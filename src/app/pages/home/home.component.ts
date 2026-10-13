import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IProcesso, ProcessosService } from '../../core/services/processos.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';
import { JsonPipe } from '@angular/common';

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];

@Component({
  selector: 'app-home',
  imports: [MatTableModule, MatCheckboxModule, MatPaginatorModule, MatRippleModule, JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['select', 'numeroProcesso', 'tipoAcao', 'dataAjuizamento', 'status'];
  dataSource = new MatTableDataSource<IProcesso>([]);
  selection = new SelectionModel<IProcesso>(true, []);

  protected pagination = {
    current_page: 0,
    last_page: 0,
    per_page: 5,
    total: 0,
    options: [5, 10, 20, 50]
  };

  private readonly processosService = inject(ProcessosService);

  ngOnInit(): void {
    // this.processosService.listarProcessos({page: 1, perPage: 10}).then((r) => {
    //   console.log(r);
    //   this.dataSource.data = r.data;
    // });
    this.handlePage();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    console.log('this.paginator: ', this.paginator);
    
    // this.dataSource.sort = this.sort;
  }

  handlePage(event?: any): void {
    console.log('handlePage: ', event);
    let atual = 1;
    if (event) {
      atual = event.pageIndex + 1;
      this.pagination.per_page = event.pageSize;
    }
    // this.pagination.per_page = event.length;
    // this.pagination.current_page = event.pageIndex + 1;
    this.processosService.listarProcessos({page: atual, perPage: this.pagination.per_page}).then((r) => {
      console.log(r);
      this.dataSource.data = r.data;
      this.pagination.total = r.total;
      this.pagination.last_page = r.last_page;
      this.pagination.current_page = r.current_page - 1;
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IProcesso): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
