import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { categpry } from 'src/app/shared/interfaces/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';


@Component({
  selector: 'app-middle-slider',
  templateUrl: './middle-slider.component.html',
  styleUrls: ['./middle-slider.component.css']
})
export class MiddleSliderComponent implements OnInit {
  constructor(private _CategoriesService: CategoriesService) { }
  categList: categpry[] = []



  ngOnInit(): void {
    this._CategoriesService.getCategories().subscribe({
      next: (response) => {
        response.data.splice(2,1)
        this.categList = response.data
      },

      error: () => { }
    })
  }



  midSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    dots: false,
    navSpeed: 700,
    navText: ['', '' ],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false , 
    autoplaySpeed : 2000 , 
    autoplayTimeout : 3500
    
  }

  // step 6 done #



}



