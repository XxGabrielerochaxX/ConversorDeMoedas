import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';import { MatCardModule } from '@angular/material/card';
import { TabelaComponent } from './tabela/tabela.component';





const routes: Routes = [
  { path: "", redirectTo: 'inicio', pathMatch: 'full' },
  { path: "inicio", component: InicioComponent },
  { path: "tabela", component: TabelaComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
