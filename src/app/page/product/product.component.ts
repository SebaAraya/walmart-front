import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interface/IProduct.interface';
import { ProductService } from 'src/app/providers/product.service';
import { IShoppingCart } from 'src/app/interface/IShoppingCart.interface';
import { IPromotion } from 'src/app/interface/IPromotion.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: IProduct[]
  loading = true;

  shoppingCart: { product: IProduct, amount: number} [] = [] 
  total: number= 0;
  promotions: IPromotion[] = []

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.shoppingCart = [] ;
    this.loadProduct();
  }

  async loadProduct(){
    try{
      this.loading = true;
      const resp = await this.productService.getAll() 
      console.log(resp);
      this.products = resp
    }
    catch
    {
      console.log('Error buscando productos')
    }
    this.loading = false;
  }

  addItem(product: IProduct, amount: number){
    this.shoppingCart.push({product, amount})
    this.total += product.price * amount
  }

  changeItem(id, shopNewProd: IShoppingCart){
    let shopProd:IShoppingCart = this.shoppingCart.find((prod:IShoppingCart) => prod.product.id === id)
    shopProd = shopNewProd;
    
    this.calculateTotalAmount();
    
  }
  calculateTotalAmount(){
    let newTotal = 0;
    for (const shopProd of this.shoppingCart) {
      newTotal += shopProd.amount * shopProd.product.price 
    }
    this.total = newTotal;
  }
}
