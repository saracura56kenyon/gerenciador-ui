import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule, ButtonModule, DataTableModule, TooltipModule, InputTextareaModule, CalendarModule, SelectButtonModule, DropdownModule } from 'primeng/primeng';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    CurrencyMaskModule,

    SharedModule
    ],
  declarations: [LancamentoCadastroComponent, LancamentosPesquisaComponent],
  exports: [LancamentoCadastroComponent, LancamentosPesquisaComponent]
})
export class LancamentosModule { }
