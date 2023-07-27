var BaseEntity=require('./BaseEntity')
class StatusEntity extends BaseEntity{

    constructor(data){
        super();
        this._clientId=data.clientId;
    }
    get clientId(){
        return this._clientId;
    }
}

module.exports=StatusEntity;


