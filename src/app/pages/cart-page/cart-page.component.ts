import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICart} from "../../models/cart";
import {Subscription} from "rxjs";
import {CartService} from "../../services/cart.service";
import {AuthService} from "../../services/auth.service";
import {IItem} from "../../models/item";
import {OrderService} from "../../services/order.service";
import {IOrder} from "../../models/order";
import {IUser} from "../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html'
})
export class CartPageComponent implements OnInit, OnDestroy {
  protected cart: ICart;
  private cartSub: Subscription;
  private cartItemSub: Subscription;
  private orderSub: Subscription;

  constructor(
    private readonly cartService: CartService,
    private readonly authService: AuthService,
    private readonly orderService: OrderService,
    private readonly router: Router) {
  }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.cartSub = this.cartService.readByUserId(userId).subscribe(cart => this.cart = cart);
    }
  }

  ngOnDestroy(): void {
    if (this.cartSub) {
      this.cartSub.unsubscribe();
    }
    if (this.cartItemSub) {
      this.cartItemSub.unsubscribe();
    }
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
  }

  deleteItemFromCart(item: IItem): void {
    this.cartItemSub = this.cartService.deleteItemFromCart(this.cart.id, item.product.id).subscribe({
      next: () => this.ngOnInit(),
      error: (err) => console.error(err)
    });
  }

  createOrder(): void {
    const order = {
      user: {
        id: this.cart.id
      } as IUser,
      items: this.cart.items
    } as IOrder;
    this.orderSub = this.orderService.createOrder(order).subscribe({
      next: () => {
        this.router.navigate(['']).catch(reason => console.error(reason));
      },
      error: err => console.error(err)
    });
  }
}
