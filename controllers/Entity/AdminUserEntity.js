var BaseEntity=require('./BaseEntity')
class AdminUserEntity extends BaseEntity{

    constructor(data){
        super();
        this._name=data.name;
        this._createdBy=data.createdBy;
        this._id=data.id;
        this._clientId=data.clientId;
        // this._userId=data.user_id;
        this._userId=data.user_id;
        this._email=data.email;
        this._mobile=data.mobile;
        this._address=data.address;
        this._password=data.password;
        this._selectedColumn=data.selectedColumn;
    }
    get name(){
        return this._name;
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
        return this._userId;
    }
    get email(){
        return this._email;
    }
    get mobile(){
        return this._mobile;
    }
    get address(){
        return this._address;
    }
    get password(){
        return this._password;
    }
    get selectedColumn(){
        return this._selectedColumn;
    }
}

module.exports=AdminUserEntity;

