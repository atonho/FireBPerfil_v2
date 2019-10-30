import { Gasto } from './../../model/gasto';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-gasto-lista',
  templateUrl: './gasto-lista.page.html',
  styleUrls: ['./gasto-lista.page.scss'],
})
export class GastoListaPage implements OnInit {

  listaGasto : Gasto[] = []; // Variável para armazenar os clientes (Array)
    
  
  constructor(private db: AngularFirestore, // Módulo de banco de dados
    private router : Router) {
      
    
    
  }

  ngOnInit() {
     
    // Solicita os dados da coleção clientes no Firebase
    this.db.collection('gastos').snapshotChanges().subscribe(response=>{ 

      this.listaGasto = []; // limpando a lista

      // response retona um objeto do firebase, precisamos converter em
      // um objeto cliente

      // forEach equivalente ao for, percorre todos os elementos do firebase
      // cada um se chama doc, ou seja, converter um doc em cliente.
      response.forEach(doc=>{ 
      
        let g = new Gasto(); // Cria um novo objeto cliente
        g.setGasto(doc.payload.doc.data(),doc.payload.doc.id); // coloca os dados do doc em clientes

        this.listaGasto.push(g); // adiciona este cliente a lista

      },err=>{ // Em caso de erro, executa esssa linha
        console.log(err);
      })

    });
  }


  goPage(idValue : string){
    // Redirecionando para ClienteDetalhes
    // enviando o id do cliente (idValue)
    this.router.navigate(['gasto-detalhes',{id : idValue}]);
  } 

}