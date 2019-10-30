import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrcamentoDetalhesPage } from './orcamento-detalhes.page';

const routes: Routes = [
  {
    path: '',
    component: OrcamentoDetalhesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrcamentoDetalhesPage]
})
export class OrcamentoDetalhesPageModule {}
