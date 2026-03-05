import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'


export interface Solution {
  id: number;
  title: string;
  description: string;  //is this ok as a string?
  level: string;
  paper: string;
  year: string;
  solutionId: string;
  solutionPDF: SolutionPDF
}

export interface SolutionPDF {
  name: string;
  url: string;
}

export interface SolutionList {
  data: Solution[];
}

export const LOCAL_SOLUTIONS: Solution[] = [
  {
    id: 1,
    title: 'Leaving Cert Maths 2023 – Higher Level Paper 1',
    description: 'Full worked solutions for Leaving Certificate Mathematics 2023 Higher Level Paper 1.',
    level: 'Higher Level',
    paper: 'Paper 1',
    year: '2023',
    solutionId: 'lc-maths-2023-hl-p1',
    solutionPDF: {
      name: '2023-higher-level-paper-1.pdf',
      url: '/assets/pdf/2023-higher-level-paper-1.pdf'
    }
  }
];

@Injectable({
  providedIn: 'root'
})
export class StrapiApiService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  //get list of all solutions
  getSolutions(): Observable<SolutionList>{
    return this.http.get<SolutionList>(
      this.apiUrl
    );
  }

  //get a particular solution with PDF
  getSolution(solutionId: string): Observable<SolutionList>{
    return this.http.get<SolutionList>(
      this.apiUrl + '?populate=*&filters[solutionId][$eq]='
        + solutionId
    );
  }
}
