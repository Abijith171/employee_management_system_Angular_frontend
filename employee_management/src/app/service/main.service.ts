import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  IEmployee } from '../model/interface/mainServ';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  // private baseUrl='http://localhost:8080/emps';

  constructor(private http :HttpClient) { }

  getAllemps() : Observable<IEmployee[]>{
    return this.http.get<IEmployee[]>(`http://localhost:8080/emps`);
  }


  getempbyId(employee_id : number): Observable<Object>
  {
    return this.http.get(`http://localhost:8080/emps/${employee_id}`);
  }


  deleteemployee(employee_id: number): Observable<Object> {
    return this.http.delete(`http://localhost:8080/${employee_id}`);
  }

  postemployee(employee: IEmployee): Observable<IEmployee> {
    return this.http.post<IEmployee>(
      `http://localhost:8080/emps/add_emps`,
      employee 
    );

  }

  updateEmployee(employee_id: number, employee: IEmployee): Observable<IEmployee> {
    return this.http.put<IEmployee>(`http://localhost:8080/emps/put_emps/${employee_id}`, employee);
  }

  employeeCount() : Observable<number>
  {
    return this.http.get<number>(`http://localhost:8080/count`);
  }
  
}
