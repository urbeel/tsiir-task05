import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ICategory} from "../../models/category";
import {CategoryService} from "../../services/category.service";
import {Subscription} from "rxjs";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {
  UpdateCategoryModalComponent
} from "../../components/modals/update-category-modal/update-category-modal.component";
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit, OnDestroy {
  protected categories: ICategory[] = [];
  protected newCategoryForm: FormGroup;
  private categoriesSub: Subscription;
  private createCategorySub: Subscription;
  private deleteCategorySub: Subscription;
  @ViewChild(UpdateCategoryModalComponent)
  modalComponent: UpdateCategoryModalComponent

  constructor(private readonly categoryService: CategoryService,
              private readonly errorService: ErrorService) {
  }

  ngOnInit(): void {
    this.categoriesSub = this.categoryService.readAll().subscribe({
      next: categories => this.categories = categories,
      error: err => console.error(err)
    });
    this.newCategoryForm = new FormGroup({
        categoryName: new FormControl(null, [
          Validators.required,
          Validators.maxLength(20)
        ])
      }
    )
  }

  ngOnDestroy(): void {
    if (this.categoriesSub) {
      this.categoriesSub.unsubscribe();
    }
    if (this.createCategorySub) {
      this.createCategorySub.unsubscribe();
    }
    if (this.deleteCategorySub) {
      this.deleteCategorySub.unsubscribe();
    }
  }

  get categoryName(): AbstractControl {
    return this.newCategoryForm.controls.categoryName;
  }

  createCategory(): void {
    if (this.newCategoryForm.valid) {
      this.newCategoryForm.disable();
      const category = {
        name: this.categoryName.value
      } as ICategory;
      this.createCategorySub = this.categoryService.create(category).subscribe({
        next: () => this.ngOnInit(),
        error: err => {
          this.errorService.setErrorMessage(err.error.message);
          this.newCategoryForm.enable();
        }
      });
    }
  }

  deleteCategory(categoryId: number): void {
    this.deleteCategorySub = this.categoryService.delete(categoryId).subscribe({
      next: () => this.ngOnInit(),
      error: err => {
        this.errorService.setErrorMessage(err.error.message);
      }
    });
  }

  openUpdateCategoryModal(category: ICategory): void {
    this.modalComponent.openModal(category);
  }


}

