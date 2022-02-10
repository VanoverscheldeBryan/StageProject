import { Category } from './category';
import { Location } from './location';
import { ProductOptionItem } from './product-option-item';
import {Timeslot} from './timeslot'

export interface ProductJson {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
  location: Location;
  timeslots: number[];
  productOptionItems: ProductOptionItem[];
}
export class Product {
  private _id!: number;

  constructor(
    private _name: string,
    private _description: string,
    private _price: number,
    private _image: string,
    private _categoryId: number,
    private _location: Location,
    private _timeslots: number[],
    private _productOptionItems: ProductOptionItem[]
  ) {}

  static fromJSON(json: ProductJson): Product {
    const prod = new Product(
      json.name,
      json.description,
      json.price,
      json.image,
      json.categoryId,
      json.location,
      json.timeslots,
      json.productOptionItems
    );
    prod._id = json.id;
    return prod;
  }

  toJSON(): ProductJson {
    return <ProductJson>{
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      image: this.image,
      categoryId: this.categoryId,
      location: this.location,
      timeslots: this.timeslots,
      productOptionItems: this.productOptionItems
    };
  }
  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get description() {
    return this._description;
  }
  get price() {
    return this._price;
  }
  get image() {
    return this._image;
  }
  get categoryId() {
    return this._categoryId;
  }
  get location() {
    return this._location;
  }
  get timeslots() {
    return this._timeslots;
  }
  get productOptionItems(){
    return this._productOptionItems
  }
}
