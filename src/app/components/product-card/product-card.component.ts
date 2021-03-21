import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/providers/product.service';
import { IProduct } from 'src/app/interface/IProduct.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent{

  @Input()
  product: IProduct
  
  @Output() addItem: EventEmitter<number> = new EventEmitter();

  public addItemAction(){
    this.addItem.emit(1);
  }
}
