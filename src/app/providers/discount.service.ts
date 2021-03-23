import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPromotion } from '../interface/IPromotion.interface';
import { IProductResumeByBrand } from '../interface/IProduct.interface';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private http: HttpClient) { }

  findByBrandAndAmount(data: IProductResumeByBrand[]): Promise<IPromotion[]>{
    const body = { data }
    try{
      return this.http.post<IPromotion[]>(`${environment.backendService}discounts/findByBrandAndAmount`, body).toPromise()
    }
    catch(ex){
      console.log(ex)
      Promise.resolve([])
    }
  }
}
