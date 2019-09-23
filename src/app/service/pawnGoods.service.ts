import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PawnGoodsService {
    constructor(private http: HttpClient) { }

    getPawnGoods(queryModel: any) {
        return this.http.get<any>('http://localhost:5000/api/PawnGoods', { params: queryModel });
    }

    getPawnGoodsReport(queryModel: any) {
        return this.http.get<any[]>('http://localhost:5000/api/PawnGoods/GetPawnGoodsReport/', { params: queryModel });
    }

    savePawnGoods(pawnGoods: any) {
        return this.http.post<any>('http://localhost:5000/api/PawnGoods', pawnGoods);
    }

    removePawnGoods(pawnGoodsId: any) {
        return this.http.post<any>(`http://localhost:5000/api/PawnGoods/DeletePawnGoods`, { pawnGoodsId });
    }

    settlementPawnGoods(pawnGoodsId: any) {
        return this.http.post<any>(`http://localhost:5000/api/PawnGoods/SettlementPawnGoods`, { pawnGoodsId });
    }

    salePawnGoods(pawnGoodsId: any) {
        return this.http.post<any>(`http://localhost:5000/api/PawnGoods/SalePawnGoods`, { pawnGoodsId });
    }

}
