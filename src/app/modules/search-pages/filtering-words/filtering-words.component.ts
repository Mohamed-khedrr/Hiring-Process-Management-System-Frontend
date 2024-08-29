import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-filtering-words',
  templateUrl: './filtering-words.component.html',
  styleUrl: './filtering-words.component.scss'
})
export class FilteringWordsComponent implements OnInit {

  @Input("activeEle") activeEle :any ; 
  ngOnInit(): void {}

  constructor(private router: Router,
              private route: ActivatedRoute) {}

  navigateToJobs() {
    this.router.navigate(['/search/jobs'], { queryParams: { keyword: this.getKeyword() } }); 
  }

  navigateToCompanies() {
    this.router.navigate(['/search/company'], { queryParams: { keyword: this.getKeyword() } });  
  }

  navigateToPeople() {
    this.router.navigate(['search/people'], { queryParams: { keyword: this.getKeyword() } }); 
  }

  getKeyword() {
    return this.route.snapshot.queryParams['keyword'] || '';  
  }
 

}
