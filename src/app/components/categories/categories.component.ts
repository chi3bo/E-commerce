import { Component, OnInit } from '@angular/core';
import { categpry } from 'src/app/shared/interfaces/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  constructor(private _CategoriesService: CategoriesService) { }

  categList: categpry[] = []
  supList: categpry[] = []

  ngOnInit(): void {
    this._CategoriesService.getCategories().subscribe({
      next: (response) => {
        response.data.splice(2, 1)
        this.categList = response.data
        console.log(this.categList);
        
      },

      error: (err) => {
        console.log(err);
      }
    })
  }


  displaySub(id:any){
    this._CategoriesService.getsupCategories(id).subscribe({
      next: (response) => {
        this.supList = response.data
        console.log(response);
      },

      error: (err) => {
        console.log(err);
      }
    })
  }



}


