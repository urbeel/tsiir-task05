import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductService} from "../../../services/product.service";
import {IProduct} from "../../../models/product";

@Component({
  selector: 'app-update-product-quantity-modal',
  templateUrl: './update-product-quantity-modal.component.html'
})
export class UpdateProductQuantityModalComponent implements OnInit, OnDestroy {
  product: IProduct | undefined;
  @ViewChild('modal') modal: TemplateRef<any>;
  protected updateProductQuantityForm: FormGroup;
  protected updateProductQuantitySub: Subscription;

  constructor(private readonly modalService: NgbModal,
              private readonly productService: ProductService) {
  }

  openModal(product: IProduct) {
    this.product = product;
    this.updateProductQuantityForm.controls.quantity.setValue(product.quantity);
    this.modalService.open(this.modal);
  }

  ngOnInit(): void {
    this.updateProductQuantityForm = new FormGroup({
      quantity: new FormControl(null, [
        Validators.required,
        Validators.min(0)
      ])
    });
  }

  ngOnDestroy(): void {
    if (this.updateProductQuantitySub) {
      this.updateProductQuantitySub.unsubscribe();
    }
  }

  updateProductQuantity(): void {
    if (this.updateProductQuantityForm.valid && this.product) {
      if (this.product.quantity == this.updateProductQuantityForm.controls.quantity.value) {
        return;
      }
      this.product.quantity = this.updateProductQuantityForm.controls.quantity.value;
      this.updateProductQuantitySub = this.productService.update(this.product).subscribe({
        next: () => {
          this.modalService.dismissAll();
        },
        error: err => console.error(err)
      });
    }
  }
}
