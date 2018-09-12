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
    queryDate_Close:"</_0:queryData>"

}
const SERVICE = {
    createUpdateUser : "wp-createUpdateUser",
    queryUser: "wp-queryUsers",
}
const API = {
    base:"http://alsalehi.no-ip.org:50012/ADInterface/services/ModelADService"
}

export {
    REQUEST, TYPE, SERVICE, API
}