import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CategoryModel } from 'src/app/models/model-types';

@Component({
  selector: 'shared-add-category-modal',
  templateUrl: './add-category-modal.component.html'
})
export class AddCategoryModalComponent implements OnInit {
  public model !: CategoryModel;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    if (!this.model) {
      this.model = new CategoryModel();
    }
  }

  hideModal() {
    if (this.bsModalRef)
      this.bsModalRef.hide();
  }
  foo(e: any) {
    console.log(111,e);

  }
}
