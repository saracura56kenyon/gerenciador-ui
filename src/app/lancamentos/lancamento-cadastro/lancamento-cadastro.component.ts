import { MessageService } from 'primeng/components/common/messageservice';
import { Title } from '@angular/platform-browser';
import { LancamentoService } from './../lancamento.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PessoaService } from 'app/pessoas/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'app/categorias/categoria.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { Lancamento } from 'app/core/model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa',value: 'DESPESA'},
  ];

  categorias = [];
  pessoas = [];
  //lancamento = new Lancamento();
  formulario: FormGroup;
  uploadEmAndamento = false;

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuild: FormBuilder
  ) { }

  ngOnInit() {
    this.configurarFormulario();
    this.carregarCategorias();
    this.carregarPessoas();
    const codigoLancamento = this.route.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.title.setTitle('Novo lançamento');
  }

  antesUploadAnexo(event){
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));

    this.uploadEmAndamento = true;
  }

  aoTerminarUploadAnexo(event){
    const anexo = JSON.parse(event.xhr.response);

    this.formulario.patchValue({
      anexo: anexo.nome,
      urlAnexo: anexo.url
    });

    this.uploadEmAndamento = false;
  }

  erroUpload(event){
    this.messageService.add({severity: 'error', detail: 'Erro ao tentar enviar anexo!'});

    this.uploadEmAndamento = false;
  }

  removerAnexo(){
    this.formulario.patchValue({
      anexo: null,
      urlAnexo: null
    });
  }

  get nomeAnexo(){
    const nome = this.formulario.get('anexo').value

    if(nome){
      return nome.substring(nome.indexOf('_') + 1, nome.legth);
    }

    return '';
  }

  get urlUploadAnexo() {
    return this.lancamentoService.urlUploadAnexo();
  }

  configurarFormulario(){
    this.formulario = this.formBuild.group({
      codigo: [],
      tipo: ['RECEITA', Validators.required ],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao: [null, [ this.validarObrigatoriedade, this.validarTamanhoMinimo(5) ]],
      valor: [null, Validators.required],
      pessoa: this.formBuild.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      categoria: this.formBuild.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      observacao: [],
      anexo: [],
      urlAnexo: []
    });

  }

  validarObrigatoriedade(input: FormControl){
    return (input.value ? null : { obrigatoriedade: true });
  }

  validarTamanhoMinimo(valor: number){
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor }}
    };
  }

  get editando(){
    return Boolean(this.formulario.get('codigo').value);
  }

  carregarLancamento(codigo: number){
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        this.formulario.patchValue(lancamento);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(){
    if(this.editando){
      this.atualizarLancamento();
    }else{
      this.adicionarLancamento();
    }
  }

  adicionarLancamento(){
    this.lancamentoService.adicionar(this.formulario.value)
      .then(lancamentoAdicionado => {
        this.messageService.add({severity: 'success', detail: 'Lançamento adicionado com sucesso'});

        //form.reset();
        //this.lancamento = new Lancamento();
        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento(){
    this.lancamentoService.atualizar(this.formulario.value)
      .then(lancamento => {
       //this.lancamento = lancamento;
        this.formulario.patchValue(lancamento);

        this.messageService.add({severity: 'success', detail: 'Lançamento alterado com sucesso!'});
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias(){
    return this.categoriaService.listarTodas()
      .then(categorias => {
         this.categorias = categorias.map(c => {
           return { label: c.nome, value: c.codigo };
          });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas(){
    return this.pessoaService.listarTodos()
      .then(pessoas => {
         this.pessoas = pessoas.map(c => {
           return { label: c.nome, value: c.codigo };
          });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(){
    this.formulario.reset();
    setTimeout(function(){
      this.lancamento = new Lancamento();
    }.bind(this), 1);
    this.router.navigate(['lancamentos/novo']);
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao').value}`);
  }
}
