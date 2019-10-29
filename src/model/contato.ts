export class Contato{
    id : string;
    nome : string;
    email : string;
    telefone : string;
    assunto : string;
    mensagem : string;
    
    setCliente(obj : any, id : any){
        this.id = id;
        this.nome = obj.nome;
        this.email = obj.email;
        this.telefone = obj.telefone;
        this.assunto = obj.assunto;
        this.mensagem = obj.mensagem;
    }
}