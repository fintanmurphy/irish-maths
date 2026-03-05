import { Component, OnInit } from '@angular/core';
import { Solution, LOCAL_SOLUTIONS } from '../strapi-api.service';
import {
  ColDef, RowSelectedEvent, GridOptions, FirstDataRenderedEvent,
  GridApi,
  GridReadyEvent,
  GridSizeChangedEvent,
  ModuleRegistry,
  createGrid,
} from 'ag-grid-community';
import { Router } from '@angular/router';


@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.css']
})
export class SolutionsComponent implements OnInit {
  rowData!: Solution[];

  // Column Definitions for ag-grid
  colDefs: ColDef[] = [
    { field: "title", headerName: "Title", minWidth: 150 },
    { field: "level", headerName: "Level", filter: false, minWidth: 150 },
    { field: "paper", headerName: "Paper", filter: false, minWidth: 100 },
    { field: "year", headerName: "Year", filter: false, minWidth: 50 }
  ];
  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    filter: true
  };

  gridOptions: GridOptions = {
    defaultColDef: this.defaultColDef,
    columnDefs: this.colDefs,
    // pagination: true,        //don't need pagniation right now 
    // paginationPageSize: 10,  //and it doesn't look good on mobile
    // paginationPageSizeSelector: [10, 20, 50, 100]
  }


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.rowData = LOCAL_SOLUTIONS;
  }

  onRowSelected(event: RowSelectedEvent) {
    const selected: Solution = event.node.data;
    this.router.navigate(['/solution/' + selected.solutionId]);
  }

  onGridSizeChanged(params: GridSizeChangedEvent) {
    // get the current grids width
    var gridWidth = document.querySelector(".ag-body-viewport")!.clientWidth;
    // keep track of which columns to hide/show
    var columnsToShow = [];
    var columnsToHide = [];
    // iterate over all columns (visible or not) and work out
    // now many columns can fit (based on their minWidth)
    var totalColsWidth = 0;
    var allColumns = params.api.getColumns();
    if (allColumns && allColumns.length > 0) {
      for (var i = 0; i < allColumns.length; i++) {
        var column = allColumns[i];
        totalColsWidth += column.getMinWidth();
        if (totalColsWidth > gridWidth) {
          columnsToHide.push(column.getColId());
        } else {
          columnsToShow.push(column.getColId());
        }
      }
    }
    // show/hide columns based on current grid width
    params.api.setColumnsVisible(columnsToShow, true);
    params.api.setColumnsVisible(columnsToHide, false);
    // wait until columns stopped moving and fill out
    // any available space to ensure there are no gaps
    window.setTimeout(() => {
      params.api.sizeColumnsToFit();
    }, 10);
  }

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }
}
