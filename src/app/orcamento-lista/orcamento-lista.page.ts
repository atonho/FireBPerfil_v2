import { Orcamento } from './../../model/orcamento';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-orcamento-lista',
  templateUrl: './orcamento-lista.page.html',
  styleUrls: ['./orcamento-lista.page.scss'],
})
export class OrcamentoListaPage implements OnInit {

  
    listaOrcamento : Orcamento[] = []; // Variável para armazenar os clientes (Array)
    
  
    constructor(private db: AngularFirestore, // Módulo de banco de dados
      private router : Router) {
        
      
      
    }
  
    ngOnInit() {
       
      // Solicita os dados da coleção clientes no Firebase
      this.db.collection('orcamentos').snapshotChanges().subscribe(response=>{ 
  
        this.listaOrcamento = []; // limpando a lista
  
        // response retona um objeto do firebase, precisamos converter em
        // um objeto cliente
  
        // forEach equivalente ao for, percorre todos os elementos do firebase
        // cada um se chama doc, ou seja, converter um doc em cliente.
        response.forEach(doc=>{ 
        
          let o = new Orcamento(); // Cria um novo objeto cliente
          o.setOrcamento(doc.payload.doc.data(),doc.payload.doc.id); // coloca os dados do doc em clientes
  
          this.listaOrcamento.push(o); // adiciona este cliente a lista
  
        },err=>{ // Em caso de erro, executa esssa linha
          console.log(err);
        })
  
      });
    }
  
  
    goPage(idValue : string){
      // Redirecionando para ClienteDetalhes
      // enviando o id do cliente (idValue)
      this.router.navigate(['orcamento-detalhes',{id : idValue}]);
    } 
  
  }