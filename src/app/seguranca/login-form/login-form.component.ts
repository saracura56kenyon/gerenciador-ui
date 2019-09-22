import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
    ) {}

  login(usuario: string,senha: string) {
    this.auth.login(usuario, senha)
    .then(() => {
      this.router.navigate(['/dashboard'])
    })
      .catch(erro => {
        this.errorHandler.handle(erro);
      });
  }

}
