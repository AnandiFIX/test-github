var BaseEntity=require('./BaseEntity')
class FaqEntity extends BaseEntity{

    constructor(data){
        super();
        this._masterCategoryId=data.masterCategoryId;
        this._createdBy=data.createdBy;
        this._id=data.id;
        this._clientId=data.clientId;
        this._user_id=data.user_id;
        this._searchKeyword=data.searchKeyword;
        this._questions=data.questions;
        this._answers=data.answers;
        this._categoryId=data.categoryId;
        this._sequenceNo=data.sequenceNo;
        this._categoryName=data.categoryName;
        this._faqDetails=data.faqDetails;
    }
    get masterCategoryId(){
        return this._masterCategoryId;
    }
    get searchKeyword(){
        return this._searchKeyword;
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
    get questions(){
        return this._questions;
    }
    get answers(){
        return this._answers;
    }
    get categoryId(){
        return this._categoryId;
    }
    get sequenceNo(){
        return this._sequenceNo;
    }
    get categoryName(){
        return this._categoryName;
    }
    get faqDetails(){
        return this._faqDetails;

    }
}

module.exports=FaqEntity;

