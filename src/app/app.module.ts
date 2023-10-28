import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { TopoComponent } from './topo/topo.component';
import { RodapeComponent } from './rodape/rodape.component';
import { InicioComponent } from './inicio/inicio.component';
import { MatCardModule } from '@angular/material/card';
import { TabelaComponent } from './tabela/tabela.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { InformacoesComponent } from './informacoes/informacoes.component';
import { ConversorComponent } from './conversor/conversor.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';







@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    RodapeComponent,
    InicioComponent,
    TabelaComponent,
    InformacoesComponent,
    ConversorComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
   MatButtonModule,
   MatMenuModule,
   MatCardModule,
   MatTableModule,
   MatPaginatorModule,
   MatFormFieldModule,
   MatSortModule,
   MatInputModule,
   HttpClientModule,
   FormsModule

  



   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
