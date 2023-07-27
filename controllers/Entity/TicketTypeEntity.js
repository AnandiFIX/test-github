var BaseEntity = require('./BaseEntity')

class TicketTypeEntity extends BaseEntity {

    constructor(data) {
        super();
        this._name = data.name;
        this._id = data.id;
        this._clientId = data.clientId;
        this._parentId = data.parentId;
        this._attrId = data.attrId;
        this._attrHeadMstId = data.attrHeadMstId;
        this._attrVal = data.attrVal;
        this._attrDesc = data.attrDesc;
        this._seq = data.seq;
        this._user_id = data.user_id;
        this._description = data.description;
        this._createdBy = data.createdBy;
        this._stopSlaMeter = data.stopSlaMeter;
        this._it_asset_management = data.it_asset_management;
        this._attachClaimNo = data.attachClaimNo;
        this._commandRequired = data.commandRequired;
        this._arrayStatus = data.arrayStatus;
    }

    get id() {
        return this._id;
    }

    get attachClaimNo() {
        return this._attachClaimNo;
    }

    get user_id() {
        return this._user_id;
    }

    get clientId() {
        return this._clientId;
    }

    get parentId() {
        return this._parentId;
    }

    get attrId() {
        return this._attrId;
    }

    get attrHeadMstId() {
        return this._attrHeadMstId;
    }

    get attrVal() {
        return this._attrVal;
    }

    get attrDesc() {
        return this._attrDesc;
    }

    get seq() {
        return this._seq;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get createdBy() {
        return this._createdBy;
    }

    get stopSlaMeter() {
        return this._stopSlaMeter;
    }

    get it_asset_management() {
        return this._it_asset_management;
    }

    get commandRequired() {
        return this._commandRequired;
    }

    get arrayStatus() {
        return this._arrayStatus;
    }


}

module.exports = TicketTypeEntity;

