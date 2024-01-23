import { Component ,Inject,EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA ,MatDialogRef,} from '@angular/material/dialog';
import { MenuService } from 'src/app/services/menu.service';
import { sharedService } from 'src/app/services/shared.service';
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
  @Output() dataEmitted = new EventEmitter<string>();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<CartComponent>,private sharedservice:sharedService,  private service: MenuService){
  }
  ngOnInit(){
    this.id=this.data.cartid;
    this.cartdata(this.id)
    // subscribing the array of id from observer (shared service)
    this.sharedservice.numbers$.subscribe((cartid:number[])=>{
      this.showorder=cartid.length;
      this.orderid=cartid
      // for creating a new array and initializing array with 1 by default
      const newArray = Array.from({ length: this.orderid.length }, () => 1);
      this.orderquantity=newArray      
    }) 
  }

  

  cartdata(id:any){
    this.sharedservice.numbers$.subscribe((cartid:number[])=>{
      this.showorder=cartid.length;
      this.service.getMenuitem().subscribe((menu: any) => {
        this.cartlist=menu.value.filter((item:any)=>cartid.includes(item.Id))
        this.updatedprice = [];
        for (let i = 0; i < this.orderid.length; i++) {
            // Assuming this.cartlist[i] is a number (replace it with the appropriate property)
            this.updatedprice.push(this.cartlist[i].ItemPrices[0].SalesPrice);
            this.itemprice= [...this.updatedprice];
            this.totalPrice()
          }
      })
    }); 
    
  }

  totalPrice() {
  this.price=0
  for (let i = 0; i < this.itemprice.length; i++) {
    this.price += this.itemprice[i];
  }
  }



  orderprice(itemindex:number){  
     const itemprice=Number(this.updatedprice[itemindex-1])*Number(this.orderquantity[itemindex-1]);
     this.itemprice.splice(itemindex-1, 1 , itemprice)
  }
   // pefrom addition in array of  quantity when - is clicked in item cart
  addquantity(itemindex:number){
      if(this.orderquantity[itemindex-1]>0 && this.orderquantity[itemindex-1]<10){
        const newQuantity=this.orderquantity[itemindex-1]+1;
        const newquantity=this.orderquantity.splice(itemindex-1,1, newQuantity) 
       }
       this.orderprice(itemindex)
      this.totalPrice()

  }  
  // pefrom delete quantity when - is clicked in item cart
  deletequantity(itemindex:number){
      if(this.orderquantity[itemindex-1]>1 && this.orderquantity[itemindex-1]<11){
        const newQuantity=this.orderquantity[itemindex-1]-1;
        const newquantity=this.orderquantity.splice(itemindex-1,1, newQuantity) 
      }
      this.orderprice(itemindex)
      this.totalPrice()

  }
  // delete item from the cart
  deletecart(id:string,index:number){
    const cartid=Number(id)
    this.sharedservice.deletecart(cartid,index)
   
     }

  cancelcart(){
    this.sharedservice.clearallcart()
     }

  ordersubmit(){
    // peform order Submissions 
    console.log(this.orderquantity)
    console.log(this.cartlist)
    console.log("total price:", this.price)
    this.sharedservice.clearcart()
  }   

}
