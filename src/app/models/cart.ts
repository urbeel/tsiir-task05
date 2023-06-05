import {IItem} from "./item";

export interface ICart {
  id: number,
  totalPrice: number,
  items: IItem[]
}
