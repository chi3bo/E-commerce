import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  constructor(private _CategoriesService: CategoriesService) { }

  barndsList: any[] = []


  ngOnInit(): void {
    this._CategoriesService.getbrands().subscribe({

      next: (response) => {
        this.barndsList = response.data
        console.log(this.barndsList);
      },

      error: (err) => {
        console.log(err);
      }

    })

  }


  displayBrand(id:any){
  }




}
