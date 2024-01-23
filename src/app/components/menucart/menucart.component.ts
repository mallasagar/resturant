import { Component,HostListener, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuService } from 'src/app/services/menu.service';
import { CartComponent } from '../cart/cart.component';
import { ToastrService } from 'ngx-toastr';
import { sharedService } from 'src/app/services/shared.service';
import { distinctUntilChanged } from 'rxjs';


@Component({
  selector: 'app-menucart',
  templateUrl: './menucart.component.html',
  styleUrls: ['./menucart.component.css'],
})
export class MenucartComponent {

  markfood: boolean = false
  menuitem:any[]=[]
  categoryitem:any[]=[]
  searchterm:string=""
  cartdata:number[]=[]
  receiveddata:number=0
  cartnumber:number=0
  
  constructor(private menuservice: MenuService,private sharedservice:sharedService, private toast:ToastrService, private matdilog: MatDialog,private elementRef: ElementRef){
  }

  ngOnInit(){
    this.getMenu()
    this.getCategorys()
    this.sharedservice.numbers$.subscribe((number:number[])=>{
      this.cartnumber=number.length;
    })
    this.getquantity
  }
 

getquantity(){
  this.sharedservice.orders$.subscribe((quantity:number[])=>{
    console.log(quantity)
  })
}

  setcategory(category:number){
    this.menuservice.getmenuitembyid(category)
    .subscribe((data:any)=>{
      if(data){
        console.log(data)
        this.menuitem=data
      }
    })
  }
//   addtocart(id:number){
//     this.sharedservice.setcart(id)
//     this.sharedservice.numbers$.subscribe((cartnumber:number[])=>{
//       const updatevalue=cartnumber
//  console.log("Hello",updatevalue)
//     })
//   }
  
  addtocart(id: number) {
  
  
    this.sharedservice.numbers$
      .pipe(distinctUntilChanged((prev, curr) => this.arraysAreEqual(prev, curr)))
      .subscribe((cartnumber: number[]) => {
        const updatevalue = cartnumber;
        if(updatevalue.includes(id)){
          this.toast.success("Added one quantity one more ")
          
        }else{
          this.sharedservice.setcart(id);
          this.toast.success("id donot exist")
        }
      });
  }
  
  // Function to check if two arrays are equal
  arraysAreEqual(array1: number[], array2: number[]): boolean {
    if (array1.length !== array2.length) {
      return false;
    }
  
    for (let i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        return false;
      }
    }
  
    return true;
  }
  

  getMenu(){
    this.menuservice.getMenuitem()
      .subscribe((menu:any)=>{
        this.menuitem=menu.value;
      })
  } 
  getCategorys(){
    this.menuservice.getCategory()
      .subscribe((category:any)=>{
      this.categoryitem=category.value;
      })
  }
  openCart() {
     this.matdilog.open(CartComponent, {
      width: "600px",
      height: "450px", 
      data: {
        cartid: this.cartdata
      }
    });
  }
  getwaiter(){
    this.toast.success("Waiter requested successfully")
  }
  getbills(){
    this.toast.success("Bill requested successfully")
  }
}
