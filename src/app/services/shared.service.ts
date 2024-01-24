import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject} from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class sharedService {
  
private numbersSubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
public numbers$: Observable<number[]> = this.numbersSubject.asObservable();

  

constructor(private toast: ToastrService) { }


// adding to orderquantity
setcart(id:number):void{
    const currentNumbers = this.numbersSubject.value;
        currentNumbers.push(id);
    this.numbersSubject.next(currentNumbers)
}
// deleting an orderquantity
deletecart(id:number, index:number){
    const currentNumbers = this.numbersSubject.value;
    currentNumbers.splice(index-1, 1);
    this.numbersSubject.next(currentNumbers);
}

// clearing an array when order 
clearcart(){
    this.numbersSubject.next([]);
}
clearallcart(){
    this.numbersSubject.next([]);

}



}
