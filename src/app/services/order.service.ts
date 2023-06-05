import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IOrder} from "../models/order";
import {Observable} from "rxjs";
import {OrderStatuses} from "../enums/order-statuses";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private readonly http: HttpClient
  ) {
  }

  createOrder(order: IOrder): Observable<any> {
    return this.http.post("orders", order);
  }

  readAllByStatus(status: OrderStatuses): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`orders/${status}`);
  }

  changeOrderStatus(orderId: number, status: OrderStatuses): Observable<any> {
    return this.http.patch(`orders/${orderId}/change-status`, null, {
      params: {
        newStatus: status
      }
    });
  }
}
