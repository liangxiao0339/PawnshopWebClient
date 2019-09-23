import { Component, OnInit } from '@angular/core';
import * as dateFunction from 'date-fns';
import { PawnGoodsService } from 'src/app/service/pawnGoods.service';

@Component({
    templateUrl: './financialStatements.component.html',
    styleUrls: ['./financialStatements.component.css']
})
export class FinancialStatementsComponent {
    lstPawnGoods: any [];
    totalAmount: 0;
    totalProfit: 0;
    queryDateRange: Date[] = [];
    queryModel = {
        pawnStartDate: '',
        pawnEndDate: ''
    };

    constructor(private pawnGoodsService: PawnGoodsService) {
        const dateNow = new Date();
        if (dateNow.getDate() >= 13) {
            dateNow.setDate(13);
            this.queryDateRange[0] = dateNow;
            this.queryDateRange[1] = dateFunction.addMonths(dateNow, 1);
        } else {
            dateNow.setDate(13);
            this.queryDateRange[0] = dateNow;
            this.queryDateRange[1] = dateFunction.addMonths(dateNow, 1);
        }

        this.queryAll();
    }

    calculationTotal() {
        this.totalAmount = 0;
        this.totalProfit = 0;
        for (const itemPawnGoods of this.lstPawnGoods) {
            this.totalProfit += itemPawnGoods.totalProfit;
        }
    }

    queryAll() {
        console.log(this.queryDateRange);
        this.queryModel.pawnStartDate = this.queryDateRange[0].toDateString();
        this.queryModel.pawnEndDate = this.queryDateRange[1].toDateString();

        this.pawnGoodsService.getPawnGoodsReport(this.queryModel).subscribe(resultData => {
            if (resultData != null) {
                this.lstPawnGoods = resultData;
                console.log(this.lstPawnGoods);
                this.calculationTotal();
            }
        });
    }

}
