var BaseEntity=require('./BaseEntity')
class UrlCreationEntity extends BaseEntity{

    constructor(data){
        super();
        this._urlKey=data.urlKey;
        this._url=data.url;
        this._urlDesc=data.urlDesc;
        this._moduleId=data.moduleId;
        this._createdBy=data.createdBy;
        this._id=data.id;
        this._clientId=data.clientId;
        this._user_id=data.user_id;
        this._type = data.type;
        this._oldUrl=data.oldUrl;
    }
    get urlKey(){
        return this._urlKey;
    }
    get url(){
        return this._url;
    }
    get urlDesc(){
        return this._urlDesc;
    }
    get moduleId(){
        return this._moduleId;
    }
    get createdBy(){
        return this._createdBy;
    }
    get clientId(){
        return this._clientId;
    }
    get id(){
        return this._id;
    }
    get user_id(){
        return this._user_id;
    }
    get type(){
        return this._type;
    }
    get oldUrl(){
        return this._oldUrl;
    }
}

module.exports=UrlCreationEntity;

