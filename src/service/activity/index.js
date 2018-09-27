import { REQUEST, TYPE, SERVICE } from '../../settings/general-setting'
import SuperFetch from '../superfetch';
import { getBody } from '../../helpers/utility';
var DOMParser = require('xmldom').DOMParser

class ActHelper {
    getActivity = async param => {
        const type = {
            open:TYPE.queryData_Open,
            close:TYPE.queryDate_Close
        }
        var data = getBody(param, type, SERVICE.lovActivity);
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
          const name = val[0].getElementsByTagName('val');
          const value = val[1].getElementsByTagName('val');
          const sales_id = val[2].getElementsByTagName('val');
          
          result[i] = {
            'Name' :name[0].firstChild ? name[0].firstChild.data : "",
            'Value' : value[0].firstChild ? value[0].firstChild.data : "",
            'SalesRep_ID' : sales_id[0].firstChild ? sales_id[0].firstChild.data : "",
          };
        }
        console.log(result);
        return result;
      }else{
        return [];
      }
      
    }
  }

  export default new ActHelper()