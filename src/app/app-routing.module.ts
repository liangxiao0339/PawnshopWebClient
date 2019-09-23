import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PawnGoodsComponent } from './pages/pawnGoods/pawnGoods.component';
import { FinancialStatementsComponent } from './pages/interestRecords/financialStatements.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGurad } from './auth/auth.gurad';

// const routes: Routes = [
//   { path: '', pathMatch: 'full', redirectTo: '/pawnGoods' },
//   { path: 'pawnGoods', component: PawnGoodsComponent },
//   { path: 'interestRecord', component: FinancialStatementsComponent }
// ];

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: './',
    pathMatch: 'full',
    loadChildren: () => import('./pages/pawn.module').then(mod => mod.PawnModule)
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
