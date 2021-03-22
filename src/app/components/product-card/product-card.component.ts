import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from 'src/app/interface/IProduct.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent{

  @Input()
  product: IProduct

  @Output() addItem: EventEmitter<number> = new EventEmitter();
  amount:number = 1;

  constructor(private toastr: ToastrService) {} 

  public addItemAction(){
    if(!this.amount){
      this.toastr.error('Debe colocar una cantidad','Error');
      return
    }

    this.toastr.success('Producto agregado', `Se agrego ${this.product.description}`);
    this.addItem.emit(this.amount);
    this.amount = 1
  }
}
