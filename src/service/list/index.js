import { REQUEST, TYPE, SERVICE } from '../../settings/general-setting'
import SuperFetch from '../superfetch';
import { getBody } from '../../helpers/utility';
var DOMParser = require('xmldom').DOMParser

class ListHelper {
    listRequest = async param => {
        const type = {
            open:TYPE.queryData_Open,
            close:TYPE.queryDate_Close
        }
        var data = getBody(param, type, SERVICE.queryList);
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
          const created = val[0].getElementsByTagName('val');
          const name = val[1].getElementsByTagName('val');
          const lovFS_id = val[2].getElementsByTagName('val');
          const lovLT_id = val[3].getElementsByTagName('val');
          const lovLS_id = val[4].getElementsByTagName('val');
          const lovUS_id = val[5].getElementsByTagName('val');
          const date_a = val[6].getElementsByTagName('val');
          const price = val[7].getElementsByTagName('val');
          const unit = val[8].getElementsByTagName('val');
          const property = val[9].getElementsByTagName('val');
          const lovLP_id = val[10].getElementsByTagName('val');
          
          result[i] = {
            'Created' :created[0].firstChild ? created[0].firstChild.data : "",
            'Name' : name[0].firstChild ? name[0].firstChild.data : "",
            'XX_Lov_FurnitureStatus_ID' : lovFS_id[0].firstChild ? lovFS_id[0].firstChild.data : "",
            'XX_Lov_ListingType_ID' : lovLT_id[0].firstChild ? lovLT_id[0].firstChild.data : "",
            'XX_Lov_ListingStatus_ID' : lovLS_id[0].firstChild ? lovLS_id[0].firstChild.data : "",
            'XX_Lov_UnitStatus_ID' : lovUS_id[0].firstChild ? lovUS_id[0].firstChild.data : "",
            'date_available' : date_a[0].firstChild ? date_a[0].firstChild.data : "",
            'price_asking' : price[0].firstChild ? price[0].firstChild.data : "",
            'XX_Unit_ID' : unit[0].firstChild ? unit[0].firstChild.data : "",
            'XX_Property_ID' : property[0].firstChild ? property[0].firstChild.data : "",
            'XX_Lov_ListingPrivacy_ID' : lovLP_id[0].firstChild ? lovLP_id[0].firstChild.data : ""
          };
        }
        console.log(result);
        return result;
      }else{
        return [];
      }
      
    }

    addList = async payload => {
      const type = {
        open: TYPE.createUpdateData_Open,
        close: TYPE.createUpdateData_Close
      }
      var data = getBody(payload, type, SERVICE.addList);
      console.log('data~~~~',data);
      return await SuperFetch.post('/', data)
          .then(resp=>resp.text())
          .then((response)=>{
            console.log('response', response);
            return this.handleListResponse(response);
          });
    }

    handleListResponse = response => {
      var parser = new DOMParser()
      var doc = parser.parseFromString(response, 'text/xml').documentElement
      var error = doc.getElementsByTagName("Error");
      
      if (error.length==0) {
        alert('success')
        return {
          success: 'success'
        }
      } else {
        alert('wrong Input')
        return {
          error: 'Wrong Input'
        }
      }
    }

}

export default new ListHelper()