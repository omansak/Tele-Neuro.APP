import { AfterViewInit, Component, OnInit } from "@angular/core";
import { CategoryInfo } from "src/app/models/category/category-info";
import { CategoryService } from "src/app/services/category/category-service";

@Component({
    templateUrl: './categories.page.html',
    providers: [CategoryService]
})
export class CategoriesPage implements OnInit {
    // Publics
    public categories: Array<CategoryInfo>;
    constructor(private _categoryService: CategoryService) { }
    ngOnInit(): void {
        this.getCategories();
    }

    private getCategories() {
        this._categoryService
            .listAllActiveCategories()
            .subscribe(
                (i) => {
                    if (i && i.length > 0) {
                        this.categories = i;
                    }
                });
    }
}