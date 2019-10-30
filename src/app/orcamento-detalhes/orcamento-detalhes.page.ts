import { Orcamento } from './../../model/orcamento';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-orcamento-detalhes',
  templateUrl: './orcamento-detalhes.page.html',
  styleUrls: ['./orcamento-detalhes.page.scss'],
})
export class OrcamentoDetalhesPage implements OnInit {

  id : string; // armazena o id para consulta
  formGroup : FormGroup; // dados do formulário
  orcamento : Orcamento = new Orcamento(); // armazena o cliente da consulta

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
      data : [],
      email : [],
      addinfo : [],
      urgencia : [],
    })
  }

  ngOnInit() {
    // Carregar os dados do Contato selecionado
    this.db.collection("orcamentos") // Seleciona a coleção Contato
    .doc(this.id).get().subscribe(response=>{ // .doc seleciona o Contato com base no id

      // Atribuindo os dados do response para a variável Contato
      this.orcamento.id = this.id; 
      this.orcamento.nome = response.data().nome;
      this.orcamento.email = response.data().email;
      this.orcamento.data = response.data().data;
      this.orcamento.addinfo = response.data().addinfo;
      this.orcamento.urgencia = response.data().urgencia;
    })
  }

  atualizar(){
    // Atualiza dos dados do cliente
    this.db.collection('orcamentos') // seleciona a coleção cliente
      .doc(this.orcamento.id) // Seleciona pelo ID do cliente
        .set(this.formGroup.value) // Envia o formGroup com os dados selecionados
          .then(() =>{
            this.presentToast(); // Dados atualizados
          }).catch(()=>{
            console.log('Erro ao Atualizar'); // Erro ao atualizar
          })
  }

  excluir(){
    this.db.collection('orcamentos') // seleciona a coleção cliente
      .doc(this.orcamento.id) // Seleciona pelo ID do cliente
        .delete().then(()=>{ // Executa a exclusão

      this.router.navigate(['orcamento-cadastro']); // redireciona para home
    })
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: ' Orcamento atualizado com sucesso',
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

