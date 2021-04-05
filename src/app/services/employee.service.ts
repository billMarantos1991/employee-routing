import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Employee } from '../models/Employee';

const baseUrl = '/api/employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }


  
    getAll(): Observable<Employee[]> {
      return this.http.get<Employee[]>(baseUrl);
    }
    getLocation(term: string): Observable<any> {
      return this.http.get(
        "https://maps.google.com/maps/api/geocode/json?address=" +
          term +
          "CA&sensor=false&key=youtapi"
      );
    }

    
    getEmployeesWithAttribute(attributeId): Observable<Employee[]> {
      return this.http.get<Employee[]>(`${baseUrl}/connected_attribute/${attributeId}`)
      
      ;
    }
    getEmployeesNotContainingEmployee(emplyeeId): Observable<Employee[]> {
      return this.http.get<Employee[]>(`${baseUrl}/not_contnain_employee/${emplyeeId}`);
    }   
    
    get(id): Observable<Employee> {
      return this.http.get<Employee>(`${baseUrl}/${id}`);
    }

    create(data): Observable<Employee> {
      return this.http.post<Employee>(`${baseUrl}/create_new`, data);
    }
  
    update(data): Observable<Employee> {
      return this.http.put<Employee>(`${baseUrl}/update`, data);
    }
  
    delete(id): Observable<any> {
      return this.http.delete(`${baseUrl}/${id}`);
    }
  
  

}
