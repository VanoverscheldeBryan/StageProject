interface CategoryJson {
  id: number;
  name: string;
}

export class Category {
  private _id!: number;

  constructor(private _name: string) {}

  static fromJSON(json: CategoryJson): Category {
    const cat = new Category(json.name);
    cat._id = json.id;
    return cat;
  }

  toJSON(): CategoryJson {
    return <CategoryJson>{
      name: this.name,
    };
  }
  get id(): number {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
}
