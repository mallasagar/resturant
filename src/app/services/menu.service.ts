import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import{API_ENDPOINTS,API_BASE_URL,API_Headers} from '../api'
import { Observable,map,throwError, catchError} from 'rxjs';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  cartlist:number[] = [];

constructor(private http: HttpClient, private toast: ToastrService) { }

  getMenuitem(): Observable<any>{
    const headers = new HttpHeaders(API_Headers);
    const url = `${API_BASE_URL}/${API_ENDPOINTS.menu}`
    return this.http.get<any>(url, { headers })
  }

  getCategory(): Observable<any>{
    const headers = new HttpHeaders(API_Headers);
     const url = `${API_BASE_URL}/${API_ENDPOINTS.category}`
     return this.http.get<any>(url, {headers})
  }
  getmenuitembycategoryid(id:number){
      const headers = new HttpHeaders(API_Headers);
    const url = `${API_BASE_URL}/${API_ENDPOINTS.menu}`;
    return this.http.get<any[]>(url, { headers }).pipe(
      map((data:any)=>{return data.value.filter((item:any)=>(item.CategoryId===id))})
    )
  }     

  getmenuitembycartid(id:number){
  const headers = new HttpHeaders(API_Headers);
    const url = `${API_BASE_URL}/${API_ENDPOINTS.menu}`;
    return this.http.get<any[]>(url, { headers }).pipe(
      map((data:any)=>{return data.value.find((item:any)=>(item.Id===id))}))
}

  getcartitem(id:number[]){
    console.log(id)
    const headers = new HttpHeaders(API_Headers);
    const url = `${API_BASE_URL}/${API_ENDPOINTS.menu}`;
    return this.http.get<any[]>(url, { headers }).pipe(
      map((data: any) => {
        return data.value.filter((item: any) => id.includes(item.Id));
      })
    );
  }

}
