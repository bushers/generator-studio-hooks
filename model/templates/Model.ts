import { Model } from "./Model";

export interface i<%= uCamelCName %>{
    id:number;
}

export class <%= uCamelCName %> extends Model{

    constructor(){
        super("<%= lowerCName %>"); 
    }

}