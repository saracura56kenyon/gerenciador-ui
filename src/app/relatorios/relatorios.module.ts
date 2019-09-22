import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatorioLancamentoComponent } from './relatorio-lancamento/relatorio-lancamento.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    SharedModule,
    RelatoriosRoutingModule
  ],
  declarations: [RelatorioLancamentoComponent]
})
export class RelatoriosModule { }
