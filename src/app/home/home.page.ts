import { Contato } from './../../model/contato';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

  export class HomePage implements OnInit {
  
    listaContato : Contato[] = []; // Variável para armazenar os clientes (Array)
   
  
    constructor(private db: AngularFirestore, // Módulo de banco de dados
      private router : Router) {
        
      
      
    }
  
    ngOnInit() {
       
      // Solicita os dados da coleção clientes no Firebase
      this.db.collection('contatos').snapshotChanges().subscribe(response=>{ 
  
        this.listaContato = []; // limpando a lista
  
        // response retona um objeto do firebase, precisamos converter em
        // um objeto cliente
  
        // forEach equivalente ao for, percorre todos os elementos do firebase
        // cada um se chama doc, ou seja, converter um doc em cliente.
        response.forEach(doc=>{ 
        
          let c = new Contato(); // Cria um novo objeto cliente
          c.setCliente(doc.payload.doc.data(),doc.payload.doc.id); // coloca os dados do doc em clientes
  
          this.listaContato.push(c); // adiciona este cliente a lista
  
        },err=>{ // Em caso de erro, executa esssa linha
          console.log(err);
        })
  
      });
    }
  
  
    goPage(idValue : string){
      // Redirecionando para ClienteDetalhes
      // enviando o id do cliente (idValue)
      this.router.navigate(['centato-detalhes',{id : idValue}]);
    } 
  
  }
  