var BaseEntity=require('./BaseEntity')
class TicketPropertyEntity extends BaseEntity{

    constructor(data){
        super();
        this._name=data.name;
        this._createdBy=data.createdBy;
    }
    get name(){
        return this._name;
    }
    get createdBy(){
        return this._createdBy;
    }
}

module.exports=TicketPropertyEntity;

