import { REQUEST, TYPE, SERVICE } from '../../settings/general-setting'
import SuperFetch from '../superfetch';
import { getBody } from '../../helpers/utility';
var DOMParser = require('xmldom').DOMParser

class ReqHelper {
    getRequest = async param => {
        const type = {
            open:TYPE.queryData_Open,
            close:TYPE.queryDate_Close
        }
        var data = getBody(param, type, SERVICE.queryRequests);
        console.log('data~~~~~~~',data);
    
        return await SuperFetch.post("/", data)
            .then(resp=>resp.text())
            .then((response)=>{
                console.log('response',response);
                return this.handleResponse(response);
            });
    }

    handleResponse = response => {
      var parser = new DOMParser()
      var doc = parser.parseFromString(response, 'text/xml').documentElement
      var listNode = doc.getElementsByTagName("DataRow");
      var count = doc.getElementsByTagName("RowCount")[0].firstChild.data;
      console.log(count)
      if(count!=0){
        let result=[];
        for (i=0;i<listNode.length;i++){
          val = listNode[i].getElementsByTagName('field');
          const docNum = val[2].getElementsByTagName('val');
          const summaryId = val[3].getElementsByTagName('val');
          const l_re = val[4].getElementsByTagName('val');
          const partner = val[5].getElementsByTagName('val');
          const user = val[6].getElementsByTagName('val');
          const date = val[7].getElementsByTagName('val');
          const reqType = val[8].getElementsByTagName('val');
          const cate = val[9].getElementsByTagName('val');
          const status = val[10].getElementsByTagName('val');
          const act = val[11].getElementsByTagName('val');
          const unit = val[12].getElementsByTagName('val');
          
          result[i] = {
            'DocumentNo' :docNum[0].firstChild ? docNum[0].firstChild.data : "",
            'Summary' : summaryId[0].firstChild ? summaryId[0].firstChild.data : "",
            'LastResult' : l_re[0].firstChild ? l_re[0].firstChild.data : "",
            'C_BPartner_ID' : partner[0].firstChild ? partner[0].firstChild.data : "",
            'AD_User_ID' : user[0].firstChild ? user[0].firstChild.data : "",
            'DateNextAction' : date[0].firstChild ? date[0].firstChild.data : "",
            'R_RequestType_ID' : reqType[0].firstChild ? reqType[0].firstChild.data : "",
            'R_Category_ID' : cate[0].firstChild ? cate[0].firstChild.data : "",
            'R_Status_ID' : status[0].firstChild ? status[0].firstChild.data : "",
            'C_Activity_ID' : act[0].firstChild ? act[0].firstChild.data : "",
            'XX_Unit_ID' : unit[0].firstChild ? unit[0].firstChild.data : ""
          };
        }
        console.log(result);
        return result;
      }else{
        return [];
      }
      
    }
    getReqType = async param =>{
      const type = {
        open:TYPE.queryData_Open,
        close:TYPE.queryDate_Close
      }
      var data = getBody(param, type, SERVICE.requestType);
      console.log('data~~~~~~~',data);

      return await SuperFetch.post("/", data)
          .then(resp=>resp.text())
          .then((response)=>{
              console.log('response',response);
              return this.handleTypeResponse(response);
          });
    }

    handleTypeResponse = response => {
      var parser = new DOMParser()
      var doc = parser.parseFromString(response, 'text/xml').documentElement
      var listNode = doc.getElementsByTagName("DataRow");
      var count = doc.getElementsByTagName("RowCount")[0].firstChild.data;
      console.log(count)
      if(count!=0){
        let result=[];
        for (i=0;i<listNode.length;i++){
          val = listNode[i].getElementsByTagName('field');
          const name = val[1].getElementsByTagName('val');
          const reqTypeId = val[0].getElementsByTagName('val');     
          const cateId = val[3].getElementsByTagName('val');     
          result[i] = {
            R_RequestType_ID :reqTypeId[0].firstChild ? reqTypeId[0].firstChild.data : "",
            label : name[0].firstChild ? name[0].firstChild.data : "",
            R_StatusCategory_ID: cateId[0].firstChild ? cateId[0].firstChild.data : "",
            value : i
          };
        }
        console.log(result);
        return result;
      }else{
        return [];
      }
    }

    getReqSTID = async param => {
      const type = {
        open:TYPE.queryData_Open,
        close:TYPE.queryDate_Close
      }
      var data = getBody(param, type, SERVICE.reqStatus);
      console.log('data~~~~~~~',data);

      return await SuperFetch.post("/", data)
          .then(resp=>resp.text())
          .then((response)=>{
              console.log('response',response);
              return this.handleReqSTID(response);
          });
    }

    handleReqSTID = response => {
      var parser = new DOMParser()
      var doc = parser.parseFromString(response, 'text/xml').documentElement
      var listNode = doc.getElementsByTagName("DataRow");
      var count = doc.getElementsByTagName("RowCount")[0].firstChild.data;
      console.log(count)
      if(count!=0){
        let result=[];
        for (i=0;i<listNode.length;i++){
          val = listNode[i].getElementsByTagName('field');
          console.log(val)
          const id = val[0].getElementsByTagName('val');
          result[i] = {
            R_Status_ID :id[0].firstChild ? id[0].firstChild.data : "",
          };
        }
        console.log(result);
        return result;
      }else{
        return [];
      }
    }

    addReq = async param => {
      const type = {
        open: TYPE.createUpdateData_Open,
        close: TYPE.createUpdateData_Close
      }
      var data = getBody(param, type, SERVICE.updateRequest);
      console.log('data~~~~~~~',data);

      return await SuperFetch.post("/", data)
          .then(resp=>resp.text())
          .then((response)=>{
              console.log('response',response);
              return this.responseHandle(response);
          });

    }

    responseHandle = response => {
      var parser = new DOMParser()
      var doc = parser.parseFromString(response, 'text/xml').documentElement
      var listNode = doc.getElementsByTagName("outField");
      var error = doc.getElementsByTagName("Error");
      
      if(error.length>0) {
        alert('failed')
        return {error: "failed"}  
      }else{
        alert('success')
        return {success: "success"}
      }
      

    }




}

export default new ReqHelper()