import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {IProduct} from "../models/product";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly http: HttpClient) {
  }

  create(product: IProduct, photo: File): Observable<any> {
    const productBlob = new Blob([JSON.stringify(product)], {
      type: 'application/json'
    })
    let formData = new FormData();
    if (photo) {
      formData.append('productPhoto', photo);
    } else {
      formData.append('productPhoto', new Blob());
    }
    formData.append('productDto', productBlob);
    return this.http.post('products', formData)
  }

  readById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`products/${id}`);
  }

  readAllInStock(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>("products/in-stock");
  }

  readAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>("products");
  }

  update(product: IProduct): Observable<any> {
    return this.http.put(`products/${product.id}`, product)
  }

  delete(id: number): Observable<any> {
    console.log(id);
    return this.http.delete(`products/${id}`)
  }
}
