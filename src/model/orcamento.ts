export class Orcamento{
    id : string;
    nome : string;
    email : string;
    data : string;
    addinfo : string;
    urgencia : string;
    
    setOrcamento(obj : any, id : any){
        this.id = id;
        this.nome = obj.nome;
        this.email = obj.email;
        this.data = obj.data;
        this.addinfo = obj.addinfo;
        this.urgencia = obj.urgencia;
    }
}