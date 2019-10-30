import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-orcamento-cadastro',
  templateUrl: './orcamento-cadastro.page.html',
  styleUrls: ['./orcamento-cadastro.page.scss'],
})
export class OrcamentoCadastroPage implements OnInit {

  // Não esquecer de declarar ReactiveFormsModule em module.ts
  formGroup : FormGroup; // Formulário de cadastro -> Armazena todos os dados

  constructor(private formB : FormBuilder, // Inicializar o formulário (obrigatório para formGroup)
    private db: AngularFirestore, // Inicia o banco de dados do firebase (Firestore)
    private toastCtrl : ToastController) { // Exibir Mensagem

    // Inicializa o Formulário, obrigatório no construtor
    this.formGroup = this.formB.group({
      nome : ['',Validators.required],
      data : ['',Validators.required],
      email : ['',Validators.required],
      addinfo : ['',Validators.required],
      urgencia : ['',Validators.required],
    });
  }

  ngOnInit() {
  }

  cadastrar(){
    this.db.collection('orcamentos') // Seleciono a coleção do firebase
      .add(this.formGroup.value).then(() =>{ // .add realiza o cadastro, os dados do formGroup
        this.presentToast();// Dados cadastrados com sucesso
      }).catch(()=>{ 
        console.log("Erro ao cadastrar!") // Erro
      });
      // then -> Sucesso
      // catch -> Erro
  }

  // template para toastController
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Orcamento enviado com sucesso',
      duration: 2000
    });
    toast.present();
  }

}