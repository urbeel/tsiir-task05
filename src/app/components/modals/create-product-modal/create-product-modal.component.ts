import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ICategory} from "../../../models/category";
import {CategoryService} from "../../../services/category.service";
import {Subscription} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductService} from "../../../services/product.service";
import {ProductsPageComponent} from "../../../pages/products-page/products-page.component";
import {ErrorService} from "../../../services/error.service";

@Component({
  selector: 'app-create-product-modal',
  templateUrl: './create-product-modal.component.html'
})
export class CreateProductModalComponent implements OnInit, OnDestroy {
  @ViewChild('modal') modal: TemplateRef<any>;
  protected createProductForm: FormGroup;
  protected categories: ICategory[] = [];
  private categoriesSub: Subscription;
  private createProductSub: Subscription;
  private photo: File;

  constructor(private readonly modalService: NgbModal,
              private readonly categoryService: CategoryService,
              private readonly productService: ProductService,
              private readonly parentComponent: ProductsPageComponent,
              private readonly errorService:ErrorService) {
  }

  ngOnInit(): void {
    this.createProductForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required
      ]),
      price: new FormControl(null, [
        Validators.required
      ]),
      quantity: new FormControl(null, [
        Validators.required
      ]),
      category: new FormControl(null, [
        Validators.required
      ]),
      description: new FormControl(null, [
        Validators.maxLength(500)
      ])
    });
    this.categoriesSub = this.categoryService.readAll()
      .subscribe(categories => this.categories = categories);
  }

  ngOnDestroy(): void {
    if (this.categoriesSub) {
      this.categoriesSub.unsubscribe();
    }
    if (this.createProductSub) {
      this.createProductSub.unsubscribe();
    }
  }

  onFileChange(event: Event): void {
    const files: FileList | null = ((event.target) as HTMLInputElement).files;
    if (files && files.length > 0) {
      this.photo = files[0];
    }
  }

  createProduct(): void {
    if (this.createProductForm.valid) {
      this.createProductForm.disable();
      console.log(this.createProductForm.value);
      this.createProductSub = this.productService.create(this.createProductForm.value, this.photo).subscribe({
        next: () => {
          this.modalService.dismissAll();
          this.parentComponent.ngOnInit()
        },
        error: err => this.errorService.setErrorMessage(err.message)
      });
      this.createProductForm.enable();
    }
  }

  openModal(): void {
    this.modalService.open(this.modal);
  }
}
