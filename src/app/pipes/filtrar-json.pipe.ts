import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FiltrarJsonPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if(args ==='' || args.length < 3) return value;
    const resultsPost = [];

    for (const post of value) {
      if(post.name.toLowerCase().indexOf(args.toLowerCase()) > -1 ){
        console.log('Sip');
        resultsPost.push(post);
      }
      
    }

    return resultsPost; 
  }

}
