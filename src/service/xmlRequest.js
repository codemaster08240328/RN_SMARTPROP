import {REQUEST, TYPE, SERVICE} from '../settings/general-setting'
// class Service{
//     xmlHandle = async (param, service, type) =>{
//         console.log(param)
//         data_row = "<_0:DataRow>";
//         for(var key in param){
//             data_row += "<_0:field column='" + key + "'><_0:val>" + param[key] + "</_0:val></_0:field>";
//         }
//         data_row += "</_0:DataRow>";
//         console.log(data_row);
//         var data = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:_0=\"http://idempiere.org/ADInterface/1_0\">" + 
//                         "<soapenv:Header/>" + 
//                         "<soapenv:Body>" + 
//                             type.open + 
//                                 "<_0:ModelCRUDRequest>" + 
//                                     "<_0:ModelCRUD>" + 
//                                         "<_0:serviceType>" + 
//                                             service + 
//                                         "</_0:serviceType>" + 
//                                         data_row + 
//                                     "</_0:ModelCRUD>" + 
//                                     REQUEST.login + 
//                                 "</_0:ModelCRUDRequest>" + 
//                             type.close + 
//                         "</soapenv:Body>" +
//                     "</soapenv:Envelope>";
//         console.log(data);
//         var xhr = new XMLHttpRequest();
//         xhr.withCredentials = true;

//         xhr.addEventListener("readystatechange", function () {
//         if (this.readyState === 4) {
//             console.log("success",this.responseText);
//             return this.responseText;
//         }
//         });

//         xhr.open("POST", "http://alsalehi.no-ip.org:50012/ADInterface/services/ModelADService");
//         xhr.setRequestHeader("content-type", "text/xml");
//         xhr.setRequestHeader("cache-control", "no-cache");
//         xhr.send(data);
//     }
// }

// export default new Service();

export default function xmlHandle(param, service, type){
    console.log(param)
    data_row = "<_0:DataRow>";
    for(var key in param){
        data_row += "<_0:field column='" + key + "'><_0:val>" + param[key] + "</_0:val></_0:field>";
    }
    data_row += "</_0:DataRow>";
    console.log(data_row);
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
    console.log(data);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        console.log("success",this.responseText);
        return this.responseText;
    }else{
        console.log("error");
    }
    });

    xhr.open("POST", "http://alsalehi.no-ip.org:50012/ADInterface/services/ModelADService");
    xhr.setRequestHeader("content-type", "text/xml");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(data);
}