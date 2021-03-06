import { Component } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  orders$;
  constructor(private orderService: OrderService, private authService: AuthService) {
    this.orders$ = authService.user$.switchMap(user => orderService.getOrdersByUser(user.uid));
   }

}
