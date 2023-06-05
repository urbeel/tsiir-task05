import {IItem} from "./item";
import {IUser} from "./user";

export interface IOrder {
  id: number,
  items: IItem[],
  user: IUser,
  status: string,
  orderTime: Date,
  totalPrice: number
}
