import {REQUEST} from '../settings/general-setting';
export function getBody(param, type, service){
    data_row = "<_0:DataRow>";
    for(var key in param){
        data_row += "<_0:field column='" + key + "'><_0:val>" + param[key] + "</_0:val></_0:field>";
    }
    data_row += "</_0:DataRow>";
    var data = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:_0=\"http://idempiere.org/ADInterface/1_0\">" + 
                    "<soapenv:Header/>" + 
                    "<soapenv:Body>" + 
                        type.open + 
                            "<_0:ModelCRUDRequest>" + 
                                "<_0:ModelCRUD>" + 
                                    "<_0:serviceType>" + 
                                        service + 
                                    "</_0:serviceType>" + 
                                    data_row + 
                                "</_0:ModelCRUD>" + 
                                REQUEST.login + 
                            "</_0:ModelCRUDRequest>" + 
                        type.close + 
                    "</soapenv:Body>" +
                "</soapenv:Envelope>";
    return data
}

export function getCurrentTimeStamp() {
    var todayDate = new Date().toISOString().slice(0,19);
    return todayDate.split('T')[0] + " " + todayDate.split('T')[1]
}
