import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'sigla'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

function createNewUser(id: number): UserData {
  const sigla = SIGLAS[Math.floor(Math.random() * SIGLAS.length)];
  const name = NAMES[SIGLAS.indexOf(sigla)];

  return {
    id: id.toString(),
    name: name,
    sigla: sigla,
  };
}

const SIGLAS: string[] = [
  'USD',
  'EUR',
  'GBP',
  'JPY',
  'CAD',
  'AUD',
  'CHF',
  'NZD',
  'MXN',
  'CNY',
  'INR',
  'KRW',
  'BRL',
  'RUB',
  'TRY',
];

const NAMES: string[] = [
  'Dólar Americano',
  'Euro',
  'Libra Esterlina',
  'Iene Japonês',
  'Dólar Canadense',
  'Dólar Australiano',
  'Franco Suíço',
  'Dólar Neozelandês',
  'Peso Mexicano',
  'Yuan Chinês',
  'Rupia Indiana',
  'Won Sul-Coreano',
  'Real Brasileiro',
  'Rublo Russo',
  'Lira Turca',
];

export interface UserData {
  id: string;
  name: string;
  sigla: string;
}
