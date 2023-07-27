var BaseEntity=require('./BaseEntity')
class CsatEntity extends BaseEntity{

    constructor(data){
        super();
        this._createdBy=data.createdBy;
        this._id=data.id;
        this._client_id=data.clientId;
        this._user_id=data.user_id;
        this._page_size=data.page_size;
        this._paginationType=data.paginationType;
        this._nextOffset=data.nextOffset;
        this._rating=data.rating;
        this._ratingValue=data.ratingValue;
        this._question=data.question;
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
    get page_size(){
        return this._page_size;
    }
    get paginationType(){
        return this._paginationType;
    }
    get nextOffset(){
        return this._nextOffset;
    }
    get rating(){
        return this._rating;
    }
    get ratingValue(){
        return this._ratingValue;
    }
    get question(){
        return this._question;
    }

}

module.exports=CsatEntity;

