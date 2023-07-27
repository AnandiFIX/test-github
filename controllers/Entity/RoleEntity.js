var BaseEntity=require('./BaseEntity')
class RoleEntity extends BaseEntity{

    constructor(data){
        super();
        this._name=data.name;
        this._desc=data.desc;
        this._createdBy=data.createdBy;
        this._superadmin=data.superadmin;
        this._user_id=data.user_id;
        this._id=data.id;
        this._client_id=data.client_id;
        this._type=data.type;
    }
    get name(){
        return this._name;
    }
    get desc(){
        return this._desc;
    }
    get createdBy(){
        return this._createdBy;
    }
    get superadmin(){
        return this._superadmin;
    }
    get user_id(){
        return this._user_id;
    }
    get client_id(){
        return this._client_id;
    }
    get id(){
        return this._id;
    }
    get type(){
        return this._type;
    }
}

module.exports=RoleEntity;


