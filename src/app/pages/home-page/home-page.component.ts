import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProduct} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
  protected products: IProduct[] = [];
  protected isAdmin: boolean;
  private productsSub: Subscription;
  private adminBarSub: Subscription;

  constructor(
    private readonly productService: ProductService,
    protected readonly authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.productsSub = this.productService.readAllInStock().subscribe(products => this.products = products);
    this.adminBarSub = this.authService.isAdminWithSub().subscribe(isAdmin => this.isAdmin = isAdmin);
  }

  ngOnDestroy(): void {
    if (this.productsSub) {
      this.productsSub.unsubscribe();
    }
    if (this.adminBarSub) {
      this.adminBarSub.unsubscribe();
    }
  }
}
