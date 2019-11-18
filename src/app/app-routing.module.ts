import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    ,canActivate: [AuthGuardService]
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilPageModule',canActivate: [AuthGuardService] },
  { path: 'cadastro-usuario', loadChildren: './cadastro-usuario/cadastro-usuario.module#CadastroUsuarioPageModule' },
  { path: 'logoff', loadChildren: './logoff/logoff.module#LogoffPageModule',canActivate: [AuthGuardService] },
  { path: 'recuperar-senha', loadChildren: './recuperar-senha/recuperar-senha.module#RecuperarSenhaPageModule' },
  { path: 'contato', loadChildren: './contato/contato.module#ContatoPageModule' },
  { path: 'contato-detalhes', loadChildren: './contato-detalhes/contato-detalhes.module#ContatoDetalhesPageModule' },
  { path: 'lista', loadChildren: './lista/lista.module#ListaPageModule' },
  { path: 'orcamento-cadastro', loadChildren: './orcamento-cadastro/orcamento-cadastro.module#OrcamentoCadastroPageModule' },
  { path: 'orcamento-detalhes', loadChildren: './orcamento-detalhes/orcamento-detalhes.module#OrcamentoDetalhesPageModule' },
  { path: 'orcamento-lista', loadChildren: './orcamento-lista/orcamento-lista.module#OrcamentoListaPageModule' },
  { path: 'gasto-cadastro', loadChildren: './gasto-cadastro/gasto-cadastro.module#GastoCadastroPageModule' },
  { path: 'gasto-detalhes', loadChildren: './gasto-detalhes/gasto-detalhes.module#GastoDetalhesPageModule' },
  { path: 'gasto-lista', loadChildren: './gasto-lista/gasto-lista.module#GastoListaPageModule' },
  { path: 'location', loadChildren: './location/location.module#LocationPageModule' },
  { path: 'games', loadChildren: './games/games.module#GamesPageModule' }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
