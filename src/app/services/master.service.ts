import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse } from '../models/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  baseURL = "http://localhost:8080/";

  constructor(private http:HttpClient) {

  }

  getAllEmployee():Observable<APIResponse>{
    return this.http.get<APIResponse>(this.baseURL + 'getallemployees');
  }

  getAllParentDepartment():Observable<APIResponse>{
    return this.http.get<APIResponse>(this.baseURL + 'getallparentdepartment');

  }
}
