export class CartItem{
    item:any[];
    Quantity: number;
    NetAmount: number;
    ItemPrices: { SalesPrice: number }[]
    constructor(item:any,quantity: number, netAmount: number,itemPrices: { SalesPrice: number }[]){
      this.item = item;
      this.Quantity = quantity;
      this.NetAmount = netAmount;
      this.ItemPrices = itemPrices;
    
    }
  }
  export class CartModel{
    CartItem:CartItem[]
    TotalPrice:number
    TotalQuantity:number
    constructor( totalprice:number, totalquantity:number){
          this.CartItem=[],
          this.TotalPrice=totalprice,
          this.TotalQuantity=totalquantity
    }
  }