import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ICart} from "../models/cart";
import {HttpClient} from "@angular/common/http";
import {IItem} from "../models/item";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  readByUserId(userId: number): Observable<ICart> {
    return this.http.get<ICart>(`carts/${userId}`);
  }

  addItemToCart(cartId: number, item: IItem): Observable<any> {
    return this.http.post(`carts/${cartId}/add-product`, item);
  }

  deleteItemFromCart(cartId: number, productId: number): Observable<any> {
    return this.http.delete(`carts/${cartId}/delete-product`, {
      params: {
        productId: productId
      }
    });
  }
}
