import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReflectionApiService {
  private apiUrl = 'http://localhost:5248/api/reflection/importers';

  constructor(private http: HttpClient) {}

  getImporterDlls(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }
}

