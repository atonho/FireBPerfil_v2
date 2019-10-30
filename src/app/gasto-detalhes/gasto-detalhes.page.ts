import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Gasto } from 'src/model/gasto';

@Component({
  selector: 'app-gasto-detalhes',
  templateUrl: './gasto-detalhes.page.html',
  styleUrls: ['./gasto-detalhes.page.scss'],
})
export class GastoDetalhesPage implements OnInit {

  id : string; // armazena o id para consulta
  formGroup : FormGroup; // dados do formulário
  gasto : Gasto = new Gasto(); // armazena o cliente da consulta

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
      motivo : [],
      data : [],
      meios : [],
      valor : [],
      
    })
  }

  ngOnInit() {
    // Carregar os dados do Contato selecionado
    this.db.collection("gastos") // Seleciona a coleção Contato
    .doc(this.id).get().subscribe(response=>{ // .doc seleciona o Contato com base no id

      // Atribuindo os dados do response para a variável Contato
      this.gasto.id = this.id;  
      this.gasto.motivo= response.data().motivo;
      this.gasto.data = response.data().data;
      this.gasto.meios = response.data().meios;
      this.gasto.valor = response.data().valor;
      
    })
  }

  atualizar(){
    // Atualiza dos dados do cliente
    this.db.collection('gastos') // seleciona a coleção cliente
      .doc(this.gasto.id) // Seleciona pelo ID do cliente
        .set(this.formGroup.value) // Envia o formGroup com os dados selecionados
          .then(() =>{
            this.presentToast(); // Dados atualizados
          }).catch(()=>{
            console.log('Erro ao Atualizar'); // Erro ao atualizar
          })
  }

  excluir(){
    this.db.collection('gastos') // seleciona a coleção cliente
      .doc(this.gasto.id) // Seleciona pelo ID do cliente
        .delete().then(()=>{ // Executa a exclusão

      this.router.navigate(['gasto-cadastro']); // redireciona para home
    })
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: ' Gastos atualizado com sucesso',
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

