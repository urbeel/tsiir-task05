import {Component, inject, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IProduct} from "../../models/product";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import {
  UpdateProductQuantityModalComponent
} from "../modals/update-product-quantity-modal/update-product-quantity-modal.component";
import {ProductService} from "../../services/product.service";
import {ProductsPageComponent} from "../../pages/products-page/products-page.component";
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() product: IProduct;
  protected isAdmin: boolean;
  private isAdminSub: Subscription;
  private deleteProductSub: Subscription;
  @ViewChild(UpdateProductQuantityModalComponent)
  modalComponent: UpdateProductQuantityModalComponent

  constructor(protected readonly authService: AuthService,
              private readonly productService: ProductService,
              private readonly errorService: ErrorService) {
  }

  ngOnInit(): void {
    this.isAdminSub = this.authService.isAdminWithSub().subscribe(isAdmin => this.isAdmin = isAdmin);
  }

  ngOnDestroy(): void {
    if (this.isAdminSub) {
      this.isAdminSub.unsubscribe();
    }
    if (this.deleteProductSub) {
      this.deleteProductSub.unsubscribe();
    }
  }

  openModal(): void {
    this.modalComponent.openModal(this.product)
  }

  deleteProduct(product: IProduct): void {
    this.deleteProductSub = this.productService.delete(product.id).subscribe({
      next: () => inject(ProductsPageComponent).ngOnInit(),
      error: (err) => this.errorService.setErrorMessage(err.error.message)
    });
  }
}
