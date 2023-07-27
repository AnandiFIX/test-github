var BaseEntity=require('./BaseEntity')
class EscalatePrcessConfigEntity extends BaseEntity{

    constructor(data){
        super();
        this._createdBy=data.createdBy;
        this._id=data.id;
        this._client_id=data.clientId;
        this._user_id=data.user_id;
        this._category_id=data.category_id;
        this._ticketTypeId=data.ticketTypeId;
        this._page_size=data.page_size;
        this._paginationType=data.paginationType;
        this._nextOffset=data.nextOffset;
        this._resolverGroup=data.resolverGroup;
        this._resolverUser=data.resolverUser;
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
    get ticketTypeId(){
        return this._ticketTypeId;
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
    get resolverGroup(){
        return this._resolverGroup();
    }
    get resolverUser(){
        return this._resolverUser();
    }
}

module.exports=EscalatePrcessConfigEntity;

