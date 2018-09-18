import {REQUEST, TYPE, SERVICE} from '../../settings/general-setting'
import SuperFetch from '../superfetch';
import {getBody} from '../../helpers/utility';
var DOMParser = require('xmldom').DOMParser


class ImageHelper {

    getImage = async payload => {
        const type = {
            open:TYPE.queryData_Open,
            close:TYPE.queryDate_Close
        }
        param = Object.assign({}, payload);
        var data = getBody(param, type, SERVICE.queryImage);
        return await SuperFetch.post("/", data)
            .then(resp=>resp.text())
            .then((response)=>{
                return this.handleImageResponse(response);
            })

    }

    uploadImage = async image =>{
        const type = {
            open:TYPE.createUpdateData_Open,
            close:TYPE.createUpdateData_Close,
        }
        var data = getBody(image, type, SERVICE.updateImage);
        return await SuperFetch.post("/",data)
            .then(resp=>resp.text())
            .then((response)=>{
                console.log("response~~~~~~",response)
                return this.handleImageUpload(response);
            })
    }

    handleImageResponse = result=>{
        var parser = new DOMParser()
        var doc = parser.parseFromString(result, 'text/xml').documentElement
        var listNode = doc.getElementsByTagName("field");
        var data_val = listNode[2].getElementsByTagName("val");
        var name_val = listNode[1].getElementsByTagName("val");
        var id_val = listNode[0].getElementsByTagName("val");
        data = {
            AD_Image_ID : id_val[0].firstChild.data,
            Name:name_val[0].firstChild.data,
            BinaryData:data_val[0].firstChild.data
        }
        return data;
    }

    handleImageUpload = result=>{
        var parser = new DOMParser()
        var doc = parser.parseFromString(result, 'text/xml').documentElement
        var list = doc.getElementsByTagName("outputField")
        console.log("list~~~~~~",list);
        data = {
            AD_Client_ID:list[0].getAttribute("value"),
            AD_Image_ID:list[1].getAttribute('value'),
            AD_Org_ID:list[2].getAttribute('value'),
            Name:list[3].getAttribute('value')
        }

        return data;
    }
    
}

export default new ImageHelper()