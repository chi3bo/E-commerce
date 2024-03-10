import { Pipe, PipeTransform } from '@angular/core';
import { oneProduct } from './interfaces/one-product';

@Pipe({
  name: 'searching'
})
export class SearchingPipe implements PipeTransform {

  transform(theList: oneProduct[], searchValue: string):oneProduct[] {
    return theList.filter( (item)=>{return item.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())} )
  }

}
