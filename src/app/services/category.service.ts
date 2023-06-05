import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICategory} from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private readonly http: HttpClient) {
  }

  create(category: ICategory): Observable<any> {
    return this.http.post('categories', category);
  }

  readAll(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>('categories')
  }

  update(category: ICategory): Observable<any> {
    return this.http.put(`categories/${category.id}`, category);
  }

  delete(categoryId: number): Observable<any> {
    return this.http.delete(`categories/${categoryId}`);
  }
}
