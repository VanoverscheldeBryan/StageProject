import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.sass'],
})
export class CategoryFilterComponent implements OnInit {
  @Input() allCategories!: Category[];
  @Input() checkedCategories: Category[] = [];
  @Input() availableCategories: Category[] = [];
  @Output() categoryFilter: EventEmitter<any> = new EventEmitter<any>();
  public term!: string;
  public showFullWidth = false;

  constructor(
    private _route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
  }

  public checkedCategory(category: Category, e: any) {
    if (e.target.checked) {
      this.checkedCategories.push(category);
    } else {
      let index = this.checkedCategories.findIndex(
        (checkedCategory) => checkedCategory.id == category.id
      );
      this.checkedCategories.splice(index, 1);
    }
    let checkedCategoriessUrlObject = this.checkedCategories.length
      ? {
          categories: this.checkedCategories
            .map((checkedCategory) => checkedCategory.id)
            .join(','),
        }
      : { categories: null };
    this.categoryFilter.emit(checkedCategoriessUrlObject);
  }

  public isChecked(id: any): boolean {
    let index = this.checkedCategories.findIndex(
      (checkedCategory) => checkedCategory.id == id
    );
    return index != -1;
  }

  public disable(id: any): boolean {
    let index = this.availableCategories.findIndex(
      (checkedCategoryItem) => checkedCategoryItem.id == id
    );
    return index == -1;
  }
}
