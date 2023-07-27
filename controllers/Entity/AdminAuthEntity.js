var BaseEntity=require('./BaseEntity')
class AdminAuthEntity extends BaseEntity{

    constructor(data){
        super();
        this._name=data.name;
        this._userId=data.user_id;
        this._id=data.id;
        this._addChecked=data.addChecked;
        this._editChecked=data.editChecked;
        this._deleteChecked=data.deleteChecked;
        this._viewChecked=data.viewChecked;
        this._createdBy=data.createdBy;
        this._checked=data.checked;
        this._refer_user_id=data.refer_user_id;
    }

    get user_id(){
        return this._userId;
    }
    get id(){
        return this._id;
    }
    get addChecked(){
        return this._addChecked;
    }
    get editChecked(){
        return this._editChecked;
    }
    get deleteChecked(){
        return this._deleteChecked;
    }
    get viewChecked(){
        return this._viewChecked;
    }
    get createdBy(){
        return this._createdBy;
    }
    get name(){
        return this._name;
    }
    get checked(){
        return this._checked;
    }

    get refer_user_id(){
        return this._refer_user_id;
    }
}

module.exports=AdminAuthEntity;

