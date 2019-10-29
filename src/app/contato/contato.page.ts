import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.page.scss'],
})
export class ContatoPage implements OnInit {

   // Não esquecer de declarar ReactiveFormsModule em module.ts
   formGroup : FormGroup; // Formulário de cadastro -> Armazena todos os dados

   constructor(private formB : FormBuilder, // Inicializar o formulário (obrigatório para formGroup)
     private db: AngularFirestore, // Inicia o banco de dados do firebase (Firestore)
     private toastCtrl : ToastController) { // Exibir Mensagem
 
     // Inicializa o Formulário, obrigatório no construtor
     this.formGroup = this.formB.group({
       nome : ['',Validators.required],
       telefone : ['',Validators.required],
       email : ['',Validators.required],
       assunto : ['',Validators.required],
       mensagem : ['',Validators.required],
     });
   }
 
   ngOnInit() {
   }
 
   cadastrar(){
     this.db.collection('contatos') // Seleciono a coleção do firebase
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
       message: 'Contato enviado com sucesso',
       duration: 2000
     });
     toast.present();
   }
 
 }