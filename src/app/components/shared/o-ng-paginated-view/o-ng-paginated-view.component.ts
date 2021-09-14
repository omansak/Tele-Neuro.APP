import { Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";
import { PageInfo } from "src/app/models/base-model";


@Component({
    selector: 'o-ng-paginated-view',
    templateUrl: './o-ng-paginated-view.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ONgPaginatedViewComponent {
    @Input()
    public pageInfo: PageInfo;
    @Output()
    public pageInfoChanged = new EventEmitter<PageInfo>();

    constructor() {
        if (!this.pageInfo) {
            this.pageInfo = new PageInfo(1, 5);
        }
    }

    emitPageInfoChange() {
        this.pageInfoChanged.emit(this.pageInfo)
    }

    onPageSizeChanged(pageSize: number) {
        this.pageInfo.PageSize = pageSize;
        this.emitPageInfoChange();
    }

    onPageChanged(page: number) {
        this.pageInfo.Page = page;
        this.emitPageInfoChange();
    }
}