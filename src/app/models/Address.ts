export class Address{
    addressId:number=null;
    street:String='';
    number:number=null;
    city:String='';
    country:String='';
    zipCode:String='';
    langtitude:number=null;
    latitude:number=null;

    public validate():Boolean{

        if(this.street =='')
            return false;
        if(this.number ==null)
            return false; 
        if(this.city == '')
            return false; 
        if(this.country == '')
            return false;     

        return true;       
      }

    public isAddressNumberValid(): boolean {
      return (!isNaN(Number(this.number.toString()) ) );
    }  
}