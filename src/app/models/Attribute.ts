export class Attribute{
    attributeId:number=null;
    description:String='';
    value:String='';

    public validate():Boolean{
    
        if(this.description =='')
            return false;
        if(this.value =='')
            return false; 
       
        return true;       
      }
}