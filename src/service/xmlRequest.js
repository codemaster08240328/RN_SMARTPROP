export default function xmlHandle(){
    alert("called");
    var data = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:_0=\"http://idempiere.org/ADInterface/1_0\">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <_0:createUpdateData>\r\n         <_0:ModelCRUDRequest>\r\n            <_0:ModelCRUD>\r\n               <_0:serviceType>wp-createUpdateUser</_0:serviceType>\r\n               <_0:DataRow>\r\n                  <_0:field column=\"EMail\">\r\n                     <_0:val>habib.salhi@yandex.com</_0:val>\r\n                  </_0:field>\r\n                  <_0:field column=\"password_text\">\r\n                     <_0:val>MasterAdmin</_0:val>\r\n                  </_0:field>                        \r\n               </_0:DataRow>\r\n            </_0:ModelCRUD>\r\n            <_0:ADLoginRequest>\r\n               <_0:user>webservicesuser@alsalehi.net</_0:user>\r\n               <_0:pass>54312sd_h55_345b</_0:pass>\r\n               <_0:RoleID>1000007</_0:RoleID>\r\n               <_0:lang>128</_0:lang>\r\n               <_0:ClientID>1000000</_0:ClientID>\r\n               <_0:OrgID>0</_0:OrgID>\r\n               <_0:WarehouseID>0</_0:WarehouseID>\r\n               <_0:stage>0</_0:stage>\r\n            </_0:ADLoginRequest>\r\n         </_0:ModelCRUDRequest>\r\n   </soapenv:Body>\r\n   </soapenv:Envelope>\r\n";
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        console.log("success",this.responseText);
    }
    });

    xhr.open("POST", "http://alsalehi.no-ip.org:50012/ADInterface/services/ModelADService");
    xhr.setRequestHeader("content-type", "text/xml");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(data);
}