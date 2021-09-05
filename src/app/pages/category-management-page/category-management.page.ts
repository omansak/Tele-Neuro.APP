import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddCategoryModalComponent } from 'src/app/components/category/add-category-modal/add-category-modal.component';

@Component({
  templateUrl: './category-management.page.html'
})
export class CategoryManagementPage {

  public items = [1, 2, 3, 4, 5]
  public value = undefined;

  constructor(private _modalService: BsModalService) { }

  showAddCategoryModal(model: any = null) {
    const state = {
      model: model,
    };
    this._modalService.show(AddCategoryModalComponent, {
      initialState: state,
      class: "modal-dialog-centered",
      ignoreBackdropClick: true,
      keyboard: false
    });
  }
}
