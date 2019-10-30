export class Gasto{
    id : string;
    motivo : string;
    data : string;
    meios : string;
    valor : string;
    
    
    setGasto(obj : any, id : any){
        this.id = id;
        this.motivo = obj.motivo;
        this.data = obj.data;
        this.meios = obj.meiotransp;
        this.valor = obj.valor;
        
    }
}