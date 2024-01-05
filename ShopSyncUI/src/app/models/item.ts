

export class Item {
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }

  changeItemQuantity(addedValue: number) {
    this._quantity += addedValue;
  }

  get stateChecked(): boolean {
    return this._stateChecked;
  }

  set stateChecked(value: boolean) {
    this._stateChecked = value;
  }

  changeItemState() {
    this._stateChecked = !this._stateChecked;
  }

  id: string;
  private _name: string;
  private _quantity: number;
  private _stateChecked: boolean = false;

  constructor(id: string, name: string, quantity: number) {
    this.id = id;
    this._name = name;
    this._quantity = quantity;
  }
}
