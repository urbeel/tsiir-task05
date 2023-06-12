import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ICategory} from "../../../models/category";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CategoryService} from "../../../services/category.service";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ErrorService} from "../../../services/error.service";

@Component({
  selector: 'app-update-category-modal',
  templateUrl: './update-category-modal.component.html'
})
export class UpdateCategoryModalComponent implements OnInit, OnDestroy {
  category: ICategory | undefined;
  @ViewChild('modal') modal: TemplateRef<any>;
  protected updateCategoryForm: FormGroup;
  protected updateCategorySub: Subscription;

  constructor(private readonly modalService: NgbModal,
              private readonly categoryService: CategoryService,
              private readonly errorService: ErrorService) {
  }

  openModal(category: ICategory) {
    this.category = category;
    this.updateCategoryForm.controls.categoryName.setValue(category.name);
    this.modalService.open(this.modal);
  }

  ngOnInit(): void {
    this.updateCategoryForm = new FormGroup({
      categoryName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20)
      ])
    });
  }

  ngOnDestroy(): void {
    if (this.updateCategorySub) {
      this.updateCategorySub.unsubscribe();
    }
  }

  updateCategory(): void {
    if (this.updateCategoryForm.valid && this.category) {
      if (this.category.name == this.updateCategoryForm.controls.categoryName.value) {
        return;
      }
      let tempCategory: ICategory = {...this.category};
      tempCategory.name = this.updateCategoryForm.controls.categoryName.value;
      this.updateCategorySub = this.categoryService.update(tempCategory).subscribe({
        next: () => {
          this.modalService.dismissAll();
        },
        error: err => this.errorService.setErrorMessage(err.error.message)
      });
    }
  }

  get categoryName(): AbstractControl {
    return this.updateCategoryForm.controls.categoryName;
  }
}
