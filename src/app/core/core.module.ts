import { MoneyHttp } from './../seguranca/money.http';
import { MessageService } from 'primeng/components/common/messageservice';
import { RelatoriosService } from './../relatorios/relatorios.service';
import { ErrorHandlerService } from './error-handler.service';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { NavbarComponent } from './navbar/navbar.component';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { LancamentoService } from 'app/lancamentos/lancamento.service';
import { PessoaService } from 'app/pessoas/pessoa.service';
import { RouterModule } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'app/seguranca/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { DashboardService } from './../dashboard/dashboard.service';
import { CategoriaService } from 'app/categorias/categoria.service';
import { GrowlModule } from 'primeng/growl';
import { HttpClientModule } from '@angular/common/http';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    GrowlModule,
    HttpClientModule,

    ConfirmDialogModule
  ],
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent, NaoAutorizadoComponent],
  exports: [NavbarComponent, ConfirmDialogModule, GrowlModule],
  providers: [
    ErrorHandlerService, MoneyHttp,
    LancamentoService, PessoaService, CategoriaService, DashboardService, RelatoriosService, ConfirmationService, MessageService, AuthService, Title, JwtHelperService, { provide: LOCALE_ID , useValue: 'pt'}
  ]
})
export class CoreModule { }
