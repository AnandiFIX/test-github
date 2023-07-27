var BaseEntity=require('./BaseEntity')
class AssetManagementColumnEntity extends BaseEntity{

    constructor(data){
        super();
        this._masterId=data.masterId;
        this._columnId=data.columnId;
        this._descriptionId=data.descriptionId;
        this._assetValue=data.assetValue;
        this._createdBy=data.createdBy;
        this._id=data.id;
        this._client_id=data.client_id;
        this._user_id=data.user_id;
        this._ticketId=data.ticketId;
    }
    get ticketId(){
        return this._ticketId;
    }
    get masterId(){
        return this._masterId;
    }
    get columnId(){
        return this._columnId;
    }
    get descriptionId(){
        return this._descriptionId;
    }
    get assetValue(){
        return this._assetValue;
    }
    get createdBy(){
        return this._createdBy;
    }
    get client_id(){
        return this._client_id;
    }
    get id(){
        return this._id;
    }
    get user_id(){
        return this._user_id;
    }
}

module.exports=AssetManagementColumnEntity;



