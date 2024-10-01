import { Component, OnInit } from '@angular/core';
import { StrapiApiService, Solution, SolutionList, SolutionAttributes } from '../strapi-api.service';
import { ColDef, RowSelectedEvent, GridOptions, ModuleRegistry } from 'ag-grid-community';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.css']
})
export class SolutionsComponent implements OnInit {
  apiResult!: SolutionList;
  rowData!: SolutionAttributes[];

  // Column Definitions for ag-grid
  colDefs: ColDef[] = [
    { field: "title", headerName: "Title"},
    { field: "level", headerName: "Level", filter: false  },
    { field: "paper", headerName: "Paper", filter: false  },
    { field: "year", headerName: "Year", filter: false  }
  ];
  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    filter: true
  };

  gridOptions: GridOptions = {
    defaultColDef: this.defaultColDef,
    columnDefs: this.colDefs,
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 20, 50, 100]
  }


  constructor(private strapiService: StrapiApiService) { }

  ngOnInit(): void {
    this.getSolutions();
  }

  getSolutions(): void {
    this.strapiService.getSolutions().subscribe(
      (response) => {
        console.log(response);
        this.apiResult = response;
        this.rowData = response.data.map(item => item.attributes)
      },
      (error) => {
        console.log('Error fetching data: ', error);
      }
    );
  }
}
