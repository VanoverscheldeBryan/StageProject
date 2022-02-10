export interface ProductOptionItemJson {
    id: number;
    description: string;
    productOptionTypeId: number;
    price: number;
    productOptionTypeDescription: string;
    productOptionTypeItemId: number;
    groupId: number;
}

export class ProductOptionItem {

    private _id!: number;

    constructor(
        private _description: string,
        private _productOptionTypeId: number,
        private _price: number,
        private _productOptionTypeDescription: string,
        private _productOptionTypeItemId: number,
        private _groupId?: number,
    ) {
    }

    static fromJSON(json: ProductOptionItemJson): ProductOptionItem {
        const prodOptItem = new ProductOptionItem(
            json.description,
            json.productOptionTypeId,
            json.price,
            json.productOptionTypeDescription,
            json.productOptionTypeItemId,
            json.groupId,
        );
        prodOptItem._id = json.id;
        return prodOptItem;
    }

    toJSON(): ProductOptionItemJson {
        return <ProductOptionItemJson>{
            id: this.id,
            description: this.description,
            productOptionTypeId: this.productOptionTypeId,
            price: this.price,
            productOptionTypeDescription: this.productOptionTypeDescription,
            productOptionTypeItemId: this.productOptionTypeItemId,
            groupId: this.groupId
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

    get price(): number {
        return this._price;
    }

    set price(price: number) {
        this._price = price;
    }

    get productOptionTypeDescription(): string {
        return this._productOptionTypeDescription;
    }

    set productOptionTypeDescription(optionTypeDescription: string) {
        this._productOptionTypeDescription = optionTypeDescription;
    }

    get productOptionTypeItemId(): number {
        return this._productOptionTypeItemId;
    }

    get groupId(): number | undefined {
        return this._groupId;
    }
}