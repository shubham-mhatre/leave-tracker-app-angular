import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse, Employee } from '../models/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  baseURL = "http://localhost:8080/";

  constructor(private http:HttpClient) {

  }

  getAllEmployee():Observable<APIResponse>{
    return this.http.get<APIResponse>(this.baseURL + 'employee');
  }

  getAllParentDepartment():Observable<APIResponse>{
    return this.http.get<APIResponse>(this.baseURL + 'getallparentdepartment');
  }

  getChildDepartmentByParentId(id:number):Observable<APIResponse>{
    return this.http.get<APIResponse>(this.baseURL + 'child-department/'+id);
  }

  createEmployee(obj:Employee):Observable<APIResponse>{
    return this.http.post<APIResponse>(`${this.baseURL}employee`,obj);
  }
}
