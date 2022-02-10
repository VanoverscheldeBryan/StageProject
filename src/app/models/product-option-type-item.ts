export interface ProductOptionTypeItemJson {
    id: number;
    description: string;
    productOptionTypeId: number;
    productOptionTypeDescription: string;
}

export class ProductOptionTypeItem {
    private _id!: number;

    constructor(
        private _description: string,
        private _productOptionTypeId: number,
        private _productOptionTypeDescription: string
    ) {
    }

    static fromJSON(json: ProductOptionTypeItemJson): ProductOptionTypeItem {
        const prodOptTypeItem = new ProductOptionTypeItem(
            json.description,
            json.productOptionTypeId,
            json.productOptionTypeDescription
        );
        prodOptTypeItem._id = json.id;
        return prodOptTypeItem;
    }

    toJSON(): ProductOptionTypeItemJson {
        return <ProductOptionTypeItemJson>{
            id: this.id,
            description: this.description,
            productOptionTypeId: this.productOptionTypeId,
            productOptionTypeDescription: this.productOptionTypeDescription
        };
    }

    get id(): number {
        return this._id;
    }

    set id(id: number) {
        this._id = id;
    }

    get description(): string {
        return this._description;
    }

    set description(description: string) {
        this._description = description;
    }

    get productOptionTypeId(): number {
        return this._productOptionTypeId;
    }

    set productOptionTypeId(productOptionTypeId: number) {
        this._productOptionTypeId = productOptionTypeId;
    }

    get productOptionTypeDescription(): string {
        return this._productOptionTypeDescription;
    }
}