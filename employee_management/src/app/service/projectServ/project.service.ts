import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { projectsClass } from '../../model/projectclass';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http : HttpClient) { }

  getAllproj() : Observable<projectsClass[]>{
    return this.http.get<projectsClass[]>(`http://localhost:8080/projs`);
  }

  getprojbyId(project_id : number) : Observable<object>
  {
    return this.http.get(`http://localhost:8080/projs/${project_id}`)
  }

  deleteproj(project_id : number): Observable<Object>
  {
    return this.http.delete(`http://localhost:8080/projs/dele/${project_id}`)
  }

  postproject(project : projectsClass) : Observable<projectsClass>
  {
    return this.http.post<projectsClass>(
      `http://localhost:8080/projs/add_projs`, project
    );
  }

  putProject(project_id : number,project : projectsClass) : Observable<projectsClass>
  {
    return this.http.put<projectsClass>(
      `http://localhost:8080/projs/put_projs/${project_id}`, project
    )
  }
}
