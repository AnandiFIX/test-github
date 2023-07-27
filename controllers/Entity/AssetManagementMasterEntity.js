var BaseEntity=require('./BaseEntity')
class AssetManagementMasterEntity extends BaseEntity{

    constructor(data){
        super();
        this._masterName=data.masterName;
        this._createdBy=data.createdBy;
        this._id=data.id;
        this._client_id=data.client_id;
        this._user_id=data.user_id;
    }
    get masterName(){
        return this._masterName;
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

module.exports=AssetManagementMasterEntity;

