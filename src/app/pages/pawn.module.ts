import { NgModule } from '@angular/core';
import { PawnGoodsComponent } from './pawnGoods/pawnGoods.component';
import { FinancialStatementsComponent } from './interestRecords/financialStatements.component';
import { CommonModule } from '@angular/common';
import { PawnRoutingModule } from './pawn-routing.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PawnLayoutComponent } from '../layout/pawn-layout.component';
import { PawnGoodsService } from '../service/pawnGoods.service';
import { InterestRecordService } from '../service/interestRecord.service';

@NgModule({
    imports: [
        CommonModule,
        PawnRoutingModule,
        NgZorroAntdModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        CommonModule,
    ],
    declarations: [
        PawnGoodsComponent,
        FinancialStatementsComponent,
        PawnLayoutComponent
    ],
    providers: [PawnGoodsService, InterestRecordService]
})
export class PawnModule {
}
