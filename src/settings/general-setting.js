const auth_user_name = "webservicesuser@alsalehi.net";
const auth_user_pass = "54312sd_h55_345b";
const REQUEST = {
    login:"<_0:ADLoginRequest><_0:user>" + auth_user_name +
        "</_0:user><_0:pass>" + auth_user_pass +
        "</_0:pass><_0:RoleID>1000007</_0:RoleID><_0:lang>128</_0:lang><_0:ClientID>1000000</_0:ClientID><_0:OrgID>0</_0:OrgID><_0:WarehouseID>0</_0:WarehouseID><_0:stage>0</_0:stage></_0:ADLoginRequest>"
}
const TYPE = {
    createUpdateData_Open:"<_0:createUpdateData>",
    createUpdateData_Close:"</_0:createUpdateData>",
    queryData_Open:"<_0:queryData>",
    queryDate_Close:"</_0:queryData>",


}
const SERVICE = {
    createUpdateUser : "wp-createUpdateUser",
    queryUser : "wp-queryUsers",
    queryImage : "queryImage",
    login : 'UserLogin-plainText',
    updateImage : 'createUpdateImage',
    queryReferal : 'queryReferal',
    queryRequests : 'queryRequests',
    loveUnit : 'wp-lov-unit',
    queryDoc: 'queryDoc',
    queryList: 'wp-queryLandlordListing',
    requestType: 'lov-RequestType',
    reqStatus: 'lov-RequestStatus',
    lovActivity: 'lov-Activity',
    updateRequest: 'createUpdateRequest',
    lovDocCate: 'lov-DocCategory',
    createUpdateDoc: 'createUpdateDoc'
    
}

const VERIFY = {
    local:'en',
    via:'sms',
    code_length:4,
    app_key:"FSkYO6gbC1B2IhV3sq6naK0kDune97Gh"
}

const API = {
    // base:"http://18.224.19.140:8080/ADInterface/services/ModelADService",
    base: 'http://alsalehi.no-ip.org:50012/ADInterface/services/ModelADService',
    verify:"https://api.authy.com/protected/json/phones/verification"
}

export {
    REQUEST, TYPE, SERVICE, API, VERIFY
}