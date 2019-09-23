import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class InterestRecordService {
    constructor(private http: HttpClient) { }

    getInterestRecord(queryModel) {
    return this.http.get<any[]>(`http://localhost:5000/api/InterestRecord`, { params: queryModel });
    }

    updateInterestRecord(interestRecord: any) {
        return this.http.post<any>('http://localhost:5000/api/InterestRecord/', interestRecord);
    }
}
