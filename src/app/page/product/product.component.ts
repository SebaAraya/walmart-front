import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interface/IProduct.interface';
import { ProductService } from 'src/app/providers/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: IProduct[]
  loading = true;

  card: { product: IProduct, amount: number} [] = [] 

  constructor(private productService: ProductService) { 

  }

  ngOnInit(): void {
    this.card = [] ;
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
    this.card.push({product, amount})
  }
}
