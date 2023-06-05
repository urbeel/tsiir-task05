import {ICategory} from "./category";

export interface IProduct {
  id: number,
  name: string,
  description?: string,
  category: ICategory,
  photoUrl: string,
  quantity: number,
  price: number
}
