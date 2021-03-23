import { Component, OnInit } from '@angular/core';
import { IProduct, IProductResumeByBrand } from 'src/app/interface/IProduct.interface';
import { ProductService } from 'src/app/providers/product.service';
import { IShoppingCart } from 'src/app/interface/IShoppingCart.interface';
import { IPromotion } from 'src/app/interface/IPromotion.interface';
import { DiscountService } from 'src/app/providers/discount.service';
import { element } from 'protractor';

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

  constructor(private productService: ProductService, private discountService: DiscountService) { }

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
    this.findAndApplyDiscount();
  }

  changeItem(id, shopNewProd: IShoppingCart){
    let shopProd:IShoppingCart = this.shoppingCart.find((prod:IShoppingCart) => prod.product.id === id)
    shopProd = shopNewProd;
    this.findAndApplyDiscount();
  }

  deleteProduct(index){
    this.shoppingCart.splice(index,1);
    this.findAndApplyDiscount();
  }

  async findAndApplyDiscount(){
    let newTotal = 0;
    let brandAmountMap: Map<string, number> = new Map();
    for (const shopProd of this.shoppingCart) {
      let totalProduct = shopProd.amount * shopProd.product.price 
      if(brandAmountMap[shopProd.product.brand]) brandAmountMap[shopProd.product.brand] += totalProduct
      else{ brandAmountMap[shopProd.product.brand] = totalProduct}
      newTotal += totalProduct 
    }
    let resumeBrandAmount: IProductResumeByBrand[] = []

    for (var key in brandAmountMap){
      resumeBrandAmount.push({brand: key,amount: brandAmountMap[key]})
    }

    this.promotions = await this.discountService.findByBrandAndAmount(resumeBrandAmount)
    const discount = this.promotions.find(prom => prom.type ==='DISCOUNT')

    if(discount) newTotal -= discount.totalDiscount
    this.total = newTotal;
  }
}
