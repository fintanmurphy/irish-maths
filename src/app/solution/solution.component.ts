import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Solution, LOCAL_SOLUTIONS } from '../strapi-api.service';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css']
})
export class SolutionComponent implements OnInit {
  solutionDetails!: Solution;
  solutionPdfUrl!: string;
  solutionPdfName!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const solution = LOCAL_SOLUTIONS.find(s => s.solutionId === id);
        if (solution) {
          this.solutionDetails = solution;
          this.solutionPdfName = solution.solutionPDF.name;
          this.solutionPdfUrl = solution.solutionPDF.url;
        }
      }
    });
  }
}
