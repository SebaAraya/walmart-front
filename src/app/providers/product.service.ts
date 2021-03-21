import { Injectable } from '@angular/core';
import { IProduct } from '../interface/IProduct.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll(): Promise<IProduct[]>{
    return this.http.get<IProduct[]>(`${environment.backendService}products`).toPromise()
  }
}
