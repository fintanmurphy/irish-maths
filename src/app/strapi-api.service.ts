import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';


export interface Solution {
  id: number;
  attributes: SolutionAttributes;
}

export interface SolutionAttributes{
  title: string;
  description: string;  //is this ok as a string?
  level: string;
  paper: string;
  year: string;
}

export interface SolutionPDF {
  name: string;
  hash: string;
  url: string;
}

export interface SolutionList {
  data: Solution[];
}

@Injectable({
  providedIn: 'root'
})
export class StrapiApiService {
  private apiUrl = 'http://localhost:1337/api/solutions'
  constructor(private http: HttpClient) { }

  //get list of all solutions
  getSolutions(): Observable<SolutionList>{
    return this.http.get<SolutionList>(
      this.apiUrl
    );
  }
}
