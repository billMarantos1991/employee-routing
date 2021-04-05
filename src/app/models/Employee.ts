import { Address } from "./Address";
import { Attribute } from "./Attribute";

export class Employee{
    employeeId:number=null;
    attributes:Attribute[];
    firstName:String='';
    lastName:String='';
    dateOfBirthday:string;
    address:Address=new Address();
    hasVehicle:boolean=false;

    public validate():Boolean{
    
        if(this.firstName =='')
            return false;
        if(this.lastName =='')
            return false; 
        if(this.dateOfBirthday == '' )
            return false; 
        if( !this.address.validate() )
            return false;    
                         
        return true;       
      }
}