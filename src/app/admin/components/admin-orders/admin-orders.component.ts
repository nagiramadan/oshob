import { Component, OnInit } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order';
import { FirebaseListObservable } from 'angularfire2/database';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders$: FirebaseListObservable<Order[]>;
  constructor(private orderService: OrderService, public userService: UserService) {
    this.orders$ = orderService.getOrders();
   }

  ngOnInit() {
  }

}
