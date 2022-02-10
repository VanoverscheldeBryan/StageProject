import { ProductOptionTypeItem, ProductOptionTypeItemJson } from "./product-option-type-item";

export interface ProductOptionTypeJson {
    id: number;
    description: string;
    productOptionTypeItems: ProductOptionTypeItemJson[];
    selectedProductOptionTypeItem: ProductOptionTypeItemJson;
    checkedProductOptionTypeItems: ProductOptionTypeItemJson[];
}

export class ProductOptionType {


    // property used in ProductColLeftComponent (detail product view) that holds the currently selected ProductOptionTypeItem of this ProductOptionType
    private _selectedProductOptionTypeItem!: ProductOptionTypeItem;
    // property used in CollectionLeftSidebarComponent (listview products) that holds the currently checked ProductOptionTypeItems of this ProductOptionType in the filters
    private _checkedProductOptionTypeItems: ProductOptionTypeItem[] = [];

    constructor(
        private _id: number,
        private _description: string,
        private _productOptionTypeItems: ProductOptionTypeItem[] = []
    ) {}

    static fromJSON(json: ProductOptionTypeJson): ProductOptionType {
        const prodOptType = new ProductOptionType(
            json.id,
            json.description,
            json.productOptionTypeItems.map(ProductOptionTypeItem.fromJSON)
        );
        return prodOptType;
    }

    toJSON(): ProductOptionTypeJson {
        return <ProductOptionTypeJson> {
            id: this.id,
            description: this.description,
            productOptionTypeItems: this.productOptionTypeItems?.map(p => p.toJSON()),
            selectedProductOptionTypeItem: this.selectedProductOptionTypeItem ? this.selectedProductOptionTypeItem.toJSON() : null,
            checkedProductOptionTypeItems: this.checkedProductOptionTypeItems.map(p => p.toJSON())
        };
    }

    get id(): number {
        return this._id;
    }

    get description(): string {
        return this._description;
    }

    get productOptionTypeItems(): ProductOptionTypeItem[] {
        return this._productOptionTypeItems;
    }

    get selectedProductOptionTypeItem(): ProductOptionTypeItem {
        return this._selectedProductOptionTypeItem;
    }

    set selectedProductOptionTypeItem(selectedProductOptionTypeItem: ProductOptionTypeItem) {
        this._selectedProductOptionTypeItem = selectedProductOptionTypeItem;
    }

    get checkedProductOptionTypeItems(): ProductOptionTypeItem[] {
        return this._checkedProductOptionTypeItems;
    }

    set checkedProductOptionTypeItems(checkedProductOptionTypeItems: ProductOptionTypeItem[]) {
        this._checkedProductOptionTypeItems = checkedProductOptionTypeItems;
    }
}