import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IProduct } from 'src/app/interface/IProduct.interface';
import { IShoppingCart } from 'src/app/interface/IShoppingCart.interface';
import { IPromotion } from 'src/app/interface/IPromotion.interface';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  @Input()
  shoppingCart: IShoppingCart[] = []

  @Input()
  total: number = 0

  @Input()
  promotions: IPromotion[]

  constructor() { }

  ngOnInit(): void {
  }

}
