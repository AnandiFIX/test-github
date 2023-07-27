var BaseEntity=require('./BaseEntity')
class AssetValidationValueEntity extends BaseEntity{

    constructor(data){
        super();
        this._id=data.id;
        this._masterId=data.masterId;
        this._columnId=data.columnId;
        this._validationValue=data.validationValue;
        this._createdBy=data.createdBy;
        this._client_id=data.client_id;
        this._user_id=data.user_id;
    }

    get id(){
        return this._id;
    }
    get masterId(){
        return this._masterId;
    }
    get columnId(){
        return this._columnId;
    }
    get validationValue(){
        return this._validationValue;
    }
    get createdBy(){
        return this._createdBy;
    }
    get client_id(){
        return this._client_id;
    }
   
    get user_id(){
        return this._user_id;
    }
}

module.exports=AssetValidationValueEntity;