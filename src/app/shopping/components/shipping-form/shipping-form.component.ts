import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '../../../../../node_modules/@angular/router';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line:no-input-rename
  @Input('cart') cart: ShoppingCart;
  shipping: any = {};
  userId;
  userSubscription: Subscription;
  constructor(private orderService: OrderService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userSubscription =  this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = (await this.orderService.placeOrder(order));
    this.router.navigate(['/order-success', result.key]);
  }

}
