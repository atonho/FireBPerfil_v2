import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrcamentoCadastroPage } from './orcamento-cadastro.page';

const routes: Routes = [
  {
    path: '',
    component: OrcamentoCadastroPage
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
  declarations: [OrcamentoCadastroPage]
})
export class OrcamentoCadastroPageModule {}
