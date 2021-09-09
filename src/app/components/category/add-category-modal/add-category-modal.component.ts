import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CategoryModel } from 'src/app/models/category/category-model';
import { CategoryService } from 'src/app/services/category/category-service';

@Component({
  selector: 'shared-add-category-modal',
  templateUrl: './add-category-modal.component.html'
})
export class AddCategoryModalComponent implements OnInit {
  public model: CategoryModel;

  constructor(public bsModalRef: BsModalRef, private _categoryService: CategoryService) { }

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
    console.log(this.model);

    this._categoryService
      .updateCategory(this.model)
      .subscribe((i) => {
        console.log(i);
      });
  }
}
