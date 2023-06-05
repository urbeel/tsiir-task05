import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProduct} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {AuthService} from "../../services/auth.service";
import {IItem} from "../../models/item";
import {CartService} from "../../services/cart.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit, OnDestroy {
  protected product: IProduct;
  protected cartItemForm: FormGroup;
  private productSub: Subscription;
  private cartItemSub: Subscription;
  private productId: number;
  private userId: number | null;

  constructor(
    private readonly productService: ProductService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly titleService: Title,
    private readonly cartService: CartService,
    protected readonly authService: AuthService
  ) {
    this.productId = route.snapshot.params['product-id'] as number;
  }

  ngOnInit(): void {
    this.productSub = this.productService.readById(this.productId).subscribe(product => {
      this.product = product;
      this.titleService.setTitle(product.name);
      this.cartItemForm = new FormGroup({
        itemQuantity: new FormControl(null, [
          Validators.required,
          Validators.min(1),
          Validators.max(product.quantity)
        ])
      })
    });
    this.userId = this.authService.getUserId();
  }

  ngOnDestroy(): void {
    if (this.productSub) {
      this.productSub.unsubscribe();
    }

  }

  addItemToCart(): void {
    if (this.userId && this.cartItemForm.valid) {
      const item: IItem = {
        product: this.product,
        quantity: this.cartItemForm.controls.itemQuantity.value
      }
      this.cartItemSub = this.cartService.addItemToCart(this.userId, item).subscribe({
          next: () => this.router.navigate([""]),
          error: (err) => console.error(err)
        }
      );
    }
  }
}
