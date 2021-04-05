import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attribute } from '../models/Attribute';

const baseUrl = '/api/attributes';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Attribute[]> {
    return this.http.get<Attribute[]>(baseUrl);
  }

  get(id): Observable<Attribute> {
    return this.http.get<Attribute>(`${baseUrl}/${id}`);
  }

  getAttributeNotConnectedToEmployee(id): Observable<Attribute[]> {
    return this.http.get<Attribute[]>(`${baseUrl}/employees/${id}`);
  }

  create(data): Observable<Attribute> {
    return this.http.post<Attribute>(`${baseUrl}/create_new`, data);
  }

  update(data): Observable<Attribute> {
    return this.http.put<Attribute>(`${baseUrl}/update`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }


}
