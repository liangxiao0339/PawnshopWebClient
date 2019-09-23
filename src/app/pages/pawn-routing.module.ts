import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PawnGoodsComponent } from './pawnGoods/pawnGoods.component';
import { FinancialStatementsComponent } from './interestRecords/financialStatements.component';
import { PawnLayoutComponent } from '../layout/pawn-layout.component';
import { AuthGurad } from '../auth/auth.gurad';

const pawnRoutes: Routes = [
    {
        path: '',
        component: PawnLayoutComponent,
        canActivate: [AuthGurad],
        children: [
            {
                path: '',
                canActivateChild: [AuthGurad],
                children: [
                    { path: 'pawnGoods', component: PawnGoodsComponent },
                    { path: 'interest', component: FinancialStatementsComponent }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(pawnRoutes) ],
    exports: [ RouterModule ],
    declarations: []
})
export class PawnRoutingModule {
}
