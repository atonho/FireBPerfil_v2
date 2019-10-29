import { Contato } from './../../model/contato';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-contato-detalhes',
  templateUrl: './contato-detalhes.page.html',
  styleUrls: ['./contato-detalhes.page.scss'],
})
export class ContatoDetalhesPage implements OnInit {
  id : string; // armazena o id para consulta
  formGroup : FormGroup; // dados do formulário
  contato : Contato = new Contato(); // armazena o cliente da consulta

  constructor(private actRoute : ActivatedRoute, // capturar o ID
    private formB : FormBuilder, // Inicializar o formulário
    private db: AngularFirestore, // Banco de dados do firebase
    private toastCtrl : ToastController, // Exibe uma mensagem
    private router : Router, // Redirecionamento de páginas
    private alertController : AlertController) { // Exibe mensagem de cofirmação
    
    // Capturando o Id do Contato
    this.id = this.actRoute.snapshot.paramMap.get('id');

    // Inicializando o formulário
    this.formGroup = this.formB.group({
      nome : [],
      telefone : [],
      email : [],
      assunto : [],
      mensagem : [],
    })
  }

  ngOnInit() {
    // Carregar os dados do Contato selecionado
    this.db.collection("contatos") // Seleciona a coleção Contato
    .doc(this.id).get().subscribe(response=>{ // .doc seleciona o Contato com base no id

      // Atribuindo os dados do response para a variável Contato
      this.contato.id = this.id; 
      this.contato.nome = response.data().nome;
      this.contato.email = response.data().email;
      this.contato.telefone = response.data().telefone;
      this.contato.assunto = response.data().assunto;
      this.contato.mensagem = response.data().mensagem;
    })
  }

  atualizar(){
    // Atualiza dos dados do cliente
    this.db.collection('contatos') // seleciona a coleção cliente
      .doc(this.contato.id) // Seleciona pelo ID do cliente
        .set(this.formGroup.value) // Envia o formGroup com os dados selecionados
          .then(() =>{
            this.presentToast(); // Dados atualizados
          }).catch(()=>{
            console.log('Erro ao Atualizar'); // Erro ao atualizar
          })
  }

  excluir(){
    this.db.collection('contatos') // seleciona a coleção cliente
      .doc(this.contato.id) // Seleciona pelo ID do cliente
        .delete().then(()=>{ // Executa a exclusão

      this.router.navigate(['home']); // redireciona para home
    })
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: ' Contato atualizado com sucesso',
      duration: 2000
    });
    toast.present();
  }

  async confirm() {
    const alert = await this.alertController.create({
      header: 'Mensagem',
      message: 'Deseja excluir?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.excluir();
          }
        }
      ]
    });

    await alert.present();
  }
}

