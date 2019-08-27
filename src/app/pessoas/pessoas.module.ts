import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule, ButtonModule, DataTableModule, TooltipModule, InputMaskModule } from 'primeng/primeng';

import { SharedModule } from './../shared/shared.module';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    InputMaskModule,

    SharedModule
  ],
  declarations: [PessoasPesquisaComponent, PessoaCadastroComponent],
  exports: [PessoasPesquisaComponent, PessoaCadastroComponent]
})
export class PessoasModule { }
