var BaseEntity=require('./BaseEntity')
class ModuleEntity extends BaseEntity{

    constructor(data){
        super();
        this._name=data.name;
        this._desc=data.desc;
        this._createdBy=data.createdBy;
        this._user_id=data.user_id;
        this._id=data.id;
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
    get user_id(){
        return this._user_id;
    }
    get id(){
        return this._id;
    }
}

module.exports=ModuleEntity;


