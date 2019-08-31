import { PessoaService } from 'app/pessoas/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'app/core/model';
import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoPessoa = this.route.snapshot.params['codigo'];

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }

    this.title.setTitle('Nova Pessoa');
  }

  get editando(){
    return Boolean(this.pessoa.codigo);
  }

  carregarPessoa(codigo: number){
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl){
    if(this.editando){
      this.atualizarPessoa(form);
    }else{
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: FormControl){
    this.pessoaService.adicionar(this.pessoa)
      .then(pessoaAdicionado => {
        this.toasty.success('Pesssoa adicionada com sucesso!');

        //form.reset();
        //this.pessoa = new Pessoa();
        this.router.navigate(['/pessoas', pessoaAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: FormControl){
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.toasty.success('Pessoa alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl){
    form.reset();
    setTimeout(function(){
      this.pessoa = new Pessoa();
    }.bind(this), 1);
    this.router.navigate(['pessoas/novo']);
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`)
  }
}
