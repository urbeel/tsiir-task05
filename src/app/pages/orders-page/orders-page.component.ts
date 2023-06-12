import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {IOrder} from "../../models/order";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderStatuses} from "../../enums/order-statuses";

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html'
})
export class OrdersPageComponent implements OnInit, OnDestroy {
  protected orders: IOrder[] = [];
  private ordersSub: Subscription;
  private changeOrderStatusSub: Subscription;
  protected readonly orderStatus: OrderStatuses;
  protected readonly OrderStatuses = OrderStatuses;

  constructor(protected readonly orderService: OrderService,
              private readonly route: ActivatedRoute,
              private readonly router: Router) {
    this.orderStatus = route.snapshot.params['order-status'] as OrderStatuses;
    if (!Object.values(OrderStatuses).includes(this.orderStatus)) {
      console.log("ORDER STATUS " + this.orderStatus);
      router.navigate(['']).catch(reason => console.error(reason));
    }
  }

  ngOnInit(): void {
    this.ordersSub = this.orderService.readAllByStatus(this.orderStatus).subscribe({
      next: orders => this.orders = orders,
      error: err => console.error(err)
    });
  }

  ngOnDestroy(): void {
    if (this.ordersSub) {
      this.ordersSub.unsubscribe();
    }
    if (this.changeOrderStatusSub) {
      this.changeOrderStatusSub.unsubscribe();
    }
  }

  changeOrderStatus(orderId: number, status: OrderStatuses): void {
    this.changeOrderStatusSub = this.orderService.changeOrderStatus(orderId, status).subscribe({
      next: () => this.ngOnInit(),
      error: err => console.error(err)
    });
  }
}
