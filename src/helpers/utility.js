import {REQUEST} from '../settings/general-setting';
export function getBody(param, type, service){
    data_row = "<_0:DataRow>";
    for(let key in param){
        data_row += "<_0:field column='" + key + "'><_0:val>" + param[key] + "</_0:val></_0:field>";
    }
    data_row += "</_0:DataRow>";
    const data = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:_0=\"http://idempiere.org/ADInterface/1_0\">" + 
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

export function getBodyForRunProcess(param){
    param_values = '<_0:ParamValues>';
    for(let key in param){
        param_values += "<_0:field column='" + key + "'><_0:val>" + param[key] + "</_0:val></_0:field>";
    }
    param_values += '</_0:ParamValues>'
    const data = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:_0=\"http://idempiere.org/ADInterface/1_0\">" + 
                    "<soapenv:Header/>" + 
                    "<soapenv:Body>" +
                        "<_0:runProcess>" +
                            "<_0:ModelRunProcessRequest>" +
                                '<_0:ModelRunProcess AD_Process_ID="1000010">' +
                                    "<_0:serviceType>" + 'Partner_LedgDet-SC' + "</_0:serviceType>" + 
                                    param_values +
                                "</_0:ModelRunProcess>" +
                                REQUEST.login +
                            "</_0:ModelRunProcessRequest>" +
                        "</_0:runProcess>" +
                    "</soapenv:Body>" +
                "</soapenv:Envelope>";
    return data
}

export function getCurrentTimeStamp() {
    var todayDate = new Date().toISOString().slice(0,19);
    return todayDate.split('T')[0] + " " + todayDate.split('T')[1]
}

export function convertTimeFormat(time){
    let date = time.split(' ')[0];
    let year = date.split('-')[0];
    let month = date.split('-')[1];
    let day = date.split('-')[2];
    return day + '-' + month + '-' + year
}
