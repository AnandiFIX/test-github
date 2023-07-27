var BaseEntity=require('./BaseEntity')
class AssetReportEntity extends BaseEntity{
    constructor(data){
        super();
        this._filename=data.filename;
        this._reporttype=data.reporttype;
        this._createbyid=data.createbyid;
        this._createdate=data.createdate;
        this._clientId=data.clientId;
        this._deletebyid=data.deletebyid;
        this._deletedate=data.deletedate;
        this._id=data.id;
    }

    get filename(){
        return this._filename;
    }

    get reporttype(){
        return this._reporttype;
    }

    get createbyid(){
        return this._createbyid;
    }

    get createdate(){
        return this._createdate;
    }

    get clientId(){
        return this._clientId;
    }

    get deletebyid(){
        return this._deletebyid;
    }

    get deletedate(){
        return this._deletedate;
    }

}
module.exports=AssetReportEntity;