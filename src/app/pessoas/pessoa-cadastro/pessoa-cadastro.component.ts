import { MessageService } from 'primeng/components/common/messageservice';
import { FormControl } from '@angular/forms';
import { PessoaService } from 'app/pessoas/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { Pessoa, Contato } from 'app/core/model';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  estados: any[];
  cidades: any[];
  estadoSelecionado: number;


  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
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

    this.carregarEstados();
  }

  carregarEstados(){
    this.pessoaService.listarEstados().then(lista => {
      this.estados = lista.map(uf => ({label: uf.nome, value: uf.codigo}));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCidades(){
    this.pessoaService.pesquisarCidades(this.estadoSelecionado).then(lista => {
      this.cidades = lista.map(c => ({label: c.nome, value: c.codigo}));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando(){
    return Boolean(this.pessoa.codigo);
  }

  carregarPessoa(codigo: number){
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.estadoSelecionado = (this.pessoa.endereco.cidade) ? this.pessoa.endereco.cidade.estado.codigo : null;

        if (this.estadoSelecionado){
          this.carregarCidades();
        }

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
        this.messageService.add({severity: 'success', detail: 'Pesssoa adicionada com sucesso!'});

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

        this.messageService.add({severity: 'success', detail: 'Pessoa alterado com sucesso!'});
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
