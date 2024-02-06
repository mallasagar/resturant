import { Component,HostListener, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuService } from 'src/app/services/menu.service';
import { ToastrService } from 'ngx-toastr';
import { CartModel , CartItem} from 'src/app/model/cartModel';


@Component({
  selector: 'app-menucart',
  templateUrl: './menucart.component.html',
  styleUrls: ['./menucart.component.css'],
})
export class MenucartComponent implements OnInit {

  markfood: boolean = false
  menuitem:any[]=[]
  categoryitem:any[]=[]
  searchterm:string=""
  menu:any[]=[]
  totalamount:number=0
  cartdata:number[]=[]
  cartlist:any[]=[]
  cartdetail:any[]=[]
  cartcount:number=0
  all:string='all'
  quantity:number=0
  // prequantity: number[] = [0];
  cart: CartModel= new CartModel(1,1,)
  cartitem:CartItem= new CartItem(1,1,1,[])
  isButtonActive: boolean = false;
  
  constructor(private menuservice: MenuService,private toast:ToastrService, private matdilog: MatDialog,private elementRef: ElementRef){
  }

  ngOnInit(){
    this.getMenu()
    this.getCategorys()
  }
  
  activateButton() {
    this.isButtonActive = !this.isButtonActive;
  }

  // getting all the menu
  getMenu(){
    this.menuservice.getMenuitem()
      .subscribe((menu:any)=>{
        if(menu){
          this.menu=menu.value;
        this.selectedcategory('all')
        }
      })
  } 

  // get all category items
  getCategorys(){
    this.menuservice.getCategory()
      .subscribe((category:any)=>{
        if(category){
          this.categoryitem=category.value
        }
      })
  }
  selectedcategory(category:any){
    if(category==='all'){
     this.menuitem= this.menu
    }else{
      const newmenu= this.menu.filter((item:any)=>(item.CategoryId===category))
      this.menuitem=newmenu
      this.toast.info("category ID "+category, "Selected Category")
    }
  }
  // request for waiter
  callwaiter(){
    this.toast.success("Calling waiter .....")
  }
  // request for bills
  billrequest(){
    this.toast.success("requesting for bill...")
  }

// adding item to the cartp';\\;;[[[[[
  addtocart(data:any) {
    const dataexist= this.cart.CartItem.find((item:any)=>item.Id===data.Id);
      if(dataexist){
        dataexist.Quantity += 1;
        if (dataexist.ItemPrices && dataexist.ItemPrices.length > 0) {
          dataexist.NetAmount = dataexist.Quantity * dataexist.ItemPrices[0].SalesPrice;
          this.quantity+=1
          this.cart.TotalPrice=this.cart.TotalPrice+dataexist.ItemPrices[0].SalesPrice
          this.totalamount=this.cart.TotalPrice
        }
      }else{
        const updateitem={...data, Quantity:1, NetAmount:data.ItemPrices[0].SalesPrice}
        this.cart.CartItem.push(updateitem);
        this.cart.TotalPrice=updateitem.NetAmount
        this.quantity+=1
        this.cart.TotalPrice=this.totalamount+updateitem.ItemPrices[0].SalesPrice
        // this.cart.TotalPrice=this.totalamount+updateitem.NetAmount
        this.totalamount=this.cart.TotalPrice
      }
  }

// open cart items
openCart(){
    this.cartlist=this.cart.CartItem
}
addquantity(cart:any){
  if(cart.Quantity>0 && cart.Quantity<10){
    cart.Quantity+=1
    this.quantity+=1
    cart.NetAmount = cart.Quantity * cart.ItemPrices[0].SalesPrice;
    this.cart.TotalPrice=this.totalamount+cart.ItemPrices[0].SalesPrice
    this.totalamount=this.cart.TotalPrice;
    this.openCart()
  }
}
substractquantity(cart:any){
  if(cart.Quantity>1 && cart.Quantity<11){
    cart.Quantity-=1
    this.quantity-=1
    cart.NetAmount = cart.Quantity * cart.ItemPrices[0].SalesPrice;
    this.cart.TotalPrice=this.totalamount-cart.ItemPrices[0].SalesPrice
    this.totalamount=this.cart.TotalPrice;
    this.openCart()
  }
}
// submit order 
ordersubmit(){
  this.cart.TotalQuantity=this.quantity
 this.toast.success("Your order has been submitted.")
 console.log(this.cart)
  this.totalamount=0
  this.quantity=0
  this.clear()
}
// deleting item from the carts
  deleteCart(deleteitem:any,){
    this.quantity-=deleteitem.Quantity
    const todeletecart= this.cart.CartItem.filter((item:any)=>item!==deleteitem)
    this.cart.CartItem=todeletecart
    this.cart.TotalPrice=this.totalamount-deleteitem.NetAmount
    this.totalamount=this.cart.TotalPrice
    this.openCart()
  }
// clearing all cartitems
  clear(): void {
    this.cart= new CartModel(1,1,)
    
  } 
}
