import { REQUEST, TYPE, SERVICE } from '../../settings/general-setting'
import SuperFetch from '../superfetch';
import { getBody } from '../../helpers/utility';
import { constants } from '../../settings/appconfig';

var DOMParser = require('xmldom').DOMParser

class UnitHelper {
    getUnit = async param => {
        const type = {
            open:TYPE.queryData_Open,
            close:TYPE.queryDate_Close
        }
        var data = getBody(param, type, SERVICE.queryReferal);
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
          const recId = val[0].getElementsByTagName('val');
          const actId = val[1].getElementsByTagName('val');
          console.log(recId, actId);
          result[i] = {
            'Record_ID' : recId[0].firstChild.data,
            'C_Activity_ID' : actId[0].firstChild.data
          };
        }
        console.log(result);
        return result;
      }else{
        return [];
      }
      
    }

    getLovUnit = async param => {
      const type = {
        open:TYPE.queryData_Open,
        close:TYPE.queryDate_Close
      }
      const pass = {
        AD_Org_ID : constants.orgId,
        XX_Unit_ID : param.Record_ID
      }
      var data = getBody(pass, type, SERVICE.loveUnit);
      return await SuperFetch.post("/", data)
            .then(resp=>resp.text())
            .then((response)=>{
                console.log('response',response);
                return this.handleLovUnitResponse(response, param);
            });
    }

    handleLovUnitResponse = (response, param) => {
      var parser = new DOMParser()
      var doc = parser.parseFromString(response, 'text/xml').documentElement
      var listNode = doc.getElementsByTagName("field");
      var count = doc.getElementsByTagName("RowCount")[0].firstChild.data;
      if(count!=0){
        result = {
          Record_ID : listNode[0].getElementsByTagName("val")[0].firstChild.data,
          Name : listNode[1].getElementsByTagName('val')[0].firstChild.data,
          prop_block : listNode[2].getElementsByTagName('val')[0].firstChild ? listNode[2].getElementsByTagName('val')[0].firstChild.data : '',
          XX_Property_ID : listNode[3].getElementsByTagName('val')[0].firstChild.data,
          area_gross : listNode[4].getElementsByTagName('val')[0].firstChild.data,
          C_Activity_ID : param.C_Activity_ID
        }
      }else{
        result = param;
      }
      return result;
    }

  getUnitDoc = async param => {
    const type = {
        open:TYPE.queryData_Open,
        close:TYPE.queryDate_Close
    }
    var data = getBody(param, type, SERVICE.queryDoc);
    console.log('data~~~~~~~',data);

    return await SuperFetch.post("/", data)
        .then(resp=>resp.text())
        .then((response)=>{
            console.log('response',response);
            return this.handleDocResponse(response);
        });
  }

  handleDocResponse = (response) => {
    var parser = new DOMParser()
    var doc = parser.parseFromString(response, 'text/xml').documentElement
    var listNode = doc.getElementsByTagName("DataRow");
    var count = doc.getElementsByTagName("RowCount")[0].firstChild.data;
    console.log(count)
    if(count!=0){
      let result=[];
      for (i=0;i<listNode.length;i++){
        val = listNode[i].getElementsByTagName('field');
        const docID = val[0].getElementsByTagName('val');
        const title = val[1].getElementsByTagName('val');
        const BinaryData = val[2].getElementsByTagName('val');
        const msg = val[3].getElementsByTagName('val');
        const category = val[4].getElementsByTagName('val');
        result[i] = {
          'XX_Doc_ID' : docID[0].firstChild.data,
          'Title' : title[0].firstChild.data,
          'BinaryData' : BinaryData[0].firstChild.data,
          'TextMsg' : msg[0].firstChild.data,
          'XX_Lov_Doc_Category_ID' : category[0].firstChild.data
        };
      }
      console.log(result);
      return result;
    }else{
      return [];
    }
  }

  getDocCategory =async param => {
    const type = {
      open:TYPE.queryData_Open,
      close:TYPE.queryDate_Close
    }
    var data = getBody(param, type, SERVICE.lovDocCate);
    console.log('data~~~~~~~',data);

    return await SuperFetch.post("/", data)
        .then(resp=>resp.text())
        .then((response)=>{
            console.log('response',response);
            return this.handleDocCategory(response);
        });
    }
  

    handleDocCategory = (response) => {
    var parser = new DOMParser()
    var doc = parser.parseFromString(response, 'text/xml').documentElement
    var listNode = doc.getElementsByTagName("DataRow");
    var count = doc.getElementsByTagName("RowCount")[0].firstChild.data;
    if(count!=0){
      let result=[];
      for (i=0;i<listNode.length;i++){
        val = listNode[i].getElementsByTagName('field');
        const docID = val[0].getElementsByTagName('val');
        const value = val[1].getElementsByTagName('val');
        const valueLevel = val[2].getElementsByTagName('val');

        result[i] = {
          'XX_Lov_Doc_Category_ID' : docID[0].firstChild.data,
          'Value' : value[0].firstChild.data,
          'value_level01' : valueLevel[0].firstChild.data,
          label: value[0].firstChild.data + " - " + valueLevel[0].firstChild.data,
          value: i
        };
      }
      console.log(result);
      return result;
    }else{
      return [];
    }
  }

  addUnitDoc = async param => {
    const type = {
      open:TYPE.createUpdateData_Open,
      close:TYPE.createUpdateData_Close
    }
    var data = getBody(param, type, SERVICE.createUpdateDoc);
    console.log('data~~~~~~~',data);

    return await SuperFetch.post("/", data)
        .then(resp=>resp.text())
        .then((response)=>{
            console.log('response',response);
            return this.handleDocCategory(response);
        });
  }



}


export default new UnitHelper()