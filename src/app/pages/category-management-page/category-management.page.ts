import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { FileType } from 'src/app/components/shared/o-ng-file-input/o-ng-file-input.component';
import { CardLoaderDirective } from 'src/app/directives/card-loader.directive';
import { CategoryModel } from 'src/app/models/category/category-model';
import { CategoryService } from 'src/app/services/category/category-service';
import { ToastService } from 'src/app/services/common/toastr-service';

@Component({
  templateUrl: './category-management.page.html',
  providers: [CategoryService, ToastService]
})
export class CategoryManagementPage implements AfterViewInit {
  //Publics
  public categories: Array<CategoryModel>
  public showStatusAddCategoryModal: boolean = false;
  public forEditCategory: CategoryModel | undefined;
  @ViewChild(CardLoaderDirective)
  public cardLoaderDirective: CardLoaderDirective;
  constructor(private _categoryService: CategoryService, private _toastService: ToastService) { }

  ngAfterViewInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.cardLoaderDirective.start();
    this._categoryService
      .listCategories()
      .pipe(finalize(() => this.cardLoaderDirective.stop()))
      .subscribe(
        (i) => {
          if (i && i.length > 0) {
            this.categories = i;
          }
        });
  }

  toggleCategoryStatus(id: number) {
    let toast = this._toastService.continuing("Kategori durumu güncelleniyor.", "Kategori durumu değiştirildi.", "Kategori güncellenemedi.");
    this.cardLoaderDirective.start();
    this._categoryService
      .toggleCategoryStatus(id)
      .pipe(finalize(() => this.cardLoaderDirective.stop()))
      .subscribe(
        (i) => {
          if (i) {
            let category = this.categories.find(i => i.Id == id);
            if (category) {
              category.IsActive = !category.IsActive;
              toast.success();
            }
            else {
              toast.error("Kategori bulunamadı");
            }
          }
        });
  }

  showAddCategoryModal(e?: CategoryModel) {
    if (e?.Document) {
      e.Image = { Url: e.Document.HostFullPath, IsChanged: false, Type: FileType.Image };
      this.forEditCategory = e;
      this.showStatusAddCategoryModal = true;
    }
    else {
      this.forEditCategory = e;
      this.showStatusAddCategoryModal = true;
    }
  }

  onCategoryUpdated(val: any) {
    if (val) {
      let categoryIndex = this.categories.findIndex(i => i.Id == val.Id)
      if (categoryIndex >= 0) {
        this.categories[categoryIndex] = val;
      }
      else {
        this.categories.unshift(val);
      }
    }
  }
}
