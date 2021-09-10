import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CategoryModel } from 'src/app/models/category/category-model';
import { CategoryService } from 'src/app/services/category/category-service';
import { ToastService } from 'src/app/services/common/toastr-service';

@Component({
  templateUrl: './add-category-modal.component.html',
  providers: [CategoryService]
})
export class AddCategoryModalComponent implements OnInit {
  public model: CategoryModel;

  constructor(public bsModalRef: BsModalRef, private _categoryService: CategoryService, private _toastService: ToastService) { }

  ngOnInit(): void {
    if (!this.model) {
      this.model = new CategoryModel();
    }
  }

  hideModal() {
    if (this.bsModalRef)
      this.bsModalRef.hide();
  }

  save() {
    let toast = this._toastService.continuing("Kategori ekleniyor/güncelleniyor.", "Kategori ekleme/güncelleme tamamlandı.", "Kategori eklenemedi.");
    this._categoryService
      .updateCategory(this.model)
      .subscribe(
        (i) => {
          this.model.Id = i;
          toast.success();
        },
        (err) => {
          console.log(1, err);

          toast.error();
        }
      );
  }
}
