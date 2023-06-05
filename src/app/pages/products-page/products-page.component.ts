import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IProduct} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {Subscription} from "rxjs";
import {CreateProductModalComponent} from "../../components/modals/create-product-modal/create-product-modal.component";

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  protected products: IProduct[] = [];
  private productsSub: Subscription;
  @ViewChild(CreateProductModalComponent)
  modalComponent: CreateProductModalComponent

  constructor(private readonly productService: ProductService) {
  }

  ngOnInit(): void {
    this.productsSub = this.productService.readAll().subscribe({
      next: products => this.products = products,
      error: err => console.error(err)
    });
  }

  ngOnDestroy(): void {
    if (this.productsSub) {
      this.productsSub.unsubscribe();
    }
  }
}
