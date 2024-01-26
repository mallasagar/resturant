import { Component ,Inject,EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA ,MatDialogRef,} from '@angular/material/dialog';
import { MenuService } from 'src/app/services/menu.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartlist:any[] = [];
  id:any[] = [];
  showorder:number=0
  orderquantity:number[]=[1]
  itemprice:number[] = [];
  orderid:number[]=[]
  price:number=0
  updatedprice:number[] = [];
  @Output() dataToParent = new EventEmitter<number[]>();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<CartComponent>, private service: MenuService){
  }
ngOnInit(){
  this.id=this.data.cartid
this.getcartdata()
}

getcartdata(){
this.service.getMenuitem().subscribe((data:any)=>{
  if(data){
    this.cartlist = data.value.filter((item: any) => this.id.includes(item.Id));  
    console.log(this.cartlist)
  }
})
}

deletecart(id: number,z:number) {
const currentCart = this.id;
if (z >= 0 && z < currentCart.length) {
  // Create a new array without the item at the specified index
  const updatedCart = [
    ...currentCart.slice(0, z),
    ...currentCart.slice(z + 1)
  ];
  this.id = updatedCart
  this.dataToParent.emit(updatedCart);
 
}  
}


ordersubmit(){
}

deletequantity(index: number){
}
addquantity(index:number){
}

}

