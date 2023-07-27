var BaseEntity=require('./BaseEntity')
class ChecklistEntity extends BaseEntity{

    constructor(data){
        super();
        this._description=data.description;
        this._createdBy=data.createdBy;
        this._id=data.id;
        this._client_id=data.clientId;
        this._user_id=data.user_id;
        this._category_id=data.category_id;
        this._tickettype_id=data.tickettype_id;
        this._page_size=data.page_size;
        this._paginationType=data.paginationType;
        this._nextOffset=data.nextOffset;
        this._status=data.status;
        this._status_sequence = data.status_sequence;
        this._fieldType = data.fieldType;
        this._predifinedValue = data.predifinedValue;
    }
    get fieldType(){
        return this._fieldType;
    }
    get predifinedValue(){
        return this._predifinedValue;
    }
    get description(){
        return this._description;
    }
    get status_sequence(){
        return this._status_sequence;
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
    get category_id(){
        return this._category_id;
    }
    get tickettype_id(){
        return this._tickettype_id;
    }
    get page_size(){
        return this._page_size;
    }
    get paginationType(){
        return this._paginationType;
    }
    get nextOffset(){
        return this._nextOffset;
    }
    get status(){
        return this._status;
    }
}

module.exports=ChecklistEntity;

