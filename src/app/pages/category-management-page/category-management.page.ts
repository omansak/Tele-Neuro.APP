import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { FileType } from 'src/app/consts/enums';
import { CardLoaderDirective } from 'src/app/directives/card-loader.directive';
import { CategoryInfo } from 'src/app/models/category/category-info';
import { CategoryService } from 'src/app/services/category/category-service';
import { ToastService } from 'src/app/services/common/toastr-service';

@Component({
  templateUrl: './category-management.page.html',
  providers: [CategoryService, ToastService]
})
export class CategoryManagementPage implements AfterViewInit {
  //Publics
  public categories: Array<CategoryInfo>
  public showStatusAddCategoryModal: boolean = false;
  public forEditCategory: CategoryInfo | undefined;
  @ViewChild(CardLoaderDirective)
  public cardLoaderDirective: CardLoaderDirective;
  public get totalProgramCount(): number {
    return this.categories?.reduce((result, current) => result + current.ProgramCount, 0) ?? 0;
  };
  public get totalCategoryCount(): number {
    return this.categories?.filter(i => i.Category.IsActive).length ?? 0;
  };

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
          console.log(i);

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
            let category = this.categories.find(i => i.Category.Id == id);
            if (category) {
              category.Category.IsActive = !category.Category.IsActive;
              toast.success();
            }
            else {
              toast.error("Kategori bulunamadı");
            }
          }
        });
  }

  showAddCategoryModal(e?: CategoryInfo) {
    if (e?.Document) {
      e.Category.Image = { Url: e.Document.HostFullPath, IsChanged: false, Type: FileType.Image };
      this.forEditCategory = e;
      this.showStatusAddCategoryModal = true;
    }
    else {
      this.forEditCategory = e;
      this.showStatusAddCategoryModal = true;
    }
  }

  onCategoryUpdated(val: any) {
    if (val && val instanceof CategoryInfo) {
      let categoryIndex = this.categories.findIndex(i => i.Category.Id == val.Category.Id)
      if (categoryIndex >= 0) {
        this.categories[categoryIndex] = val;
      }
      else {
        this.categories.unshift(val);
      }
    }
  }
}
