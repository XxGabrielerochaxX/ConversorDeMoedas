import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  imagens = [
    'caminho/para/imagem1.jpg',
    'caminho/para/imagem2.jpg',
    'caminho/para/imagem3.jpg'
  ];

  imagemAtual = this.imagens[0];
  indexImagem = 0;

  trocarImagem() {
    this.indexImagem = (this.indexImagem + 1) % this.imagens.length;
    this.imagemAtual = this.imagens[this.indexImagem];
  }

  resetarImagem() {
    this.imagemAtual = this.imagens[0];
    this.indexImagem = 0;
  }
}
