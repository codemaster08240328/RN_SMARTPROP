import {REQUEST, TYPE, SERVICE} from '../../settings/general-setting'
import SuperFetch from '../superfetch';
import {getBody} from '../../helpers/utility';
var DOMParser = require('xmldom').DOMParser


class AuthHelper {
    authorize = async userInfo => {
        if (!userInfo.EMail || !userInfo.password_text) {
            return { error: "Please fill in all fields" }
        }
        const type = {
            open:TYPE.createUpdateData_Open,
            close:TYPE.createUpdateData_Close
        }
        var data = getBody(userInfo, type, SERVICE.createUpdateUser);
    
        return await SuperFetch.post("/", data)
            .then(resp=>resp.text())
            .then((response)=>{
                return { data: response }
            });
    }
    getUsers = async userInfo => {
        const type = {
            open:TYPE.queryData_Open,
            close:TYPE.queryDate_Close
        }

        var data = getBody(userInfo, type, SERVICE.queryUser);

        return await SuperFetch.post("/", data)
            .then(resp=>resp.text())
            .then((response)=>{
                return this.handleResponse(response);
            })
    }

    handleResponse = result => {
        var parser = new DOMParser()
        var doc = parser.parseFromString(result, "text/xml").documentElement
        var listNode = doc.getElementsByTagName("field");
        var pass_confirm = listNode[12].getElementsByTagName("val");
        console.log('value', pass_confirm[0].firstChild.data);
        if(pass_confirm[0].firstChild.data == 'Y'){
            userId = listNode[0].getElementsByTagName("val")
            name = listNode[1].getElementsByTagName("val")
            pwd = listNode[2].getElementsByTagName("val")
            orgId = listNode[3].getElementsByTagName("val")
            email = listNode[4].getElementsByTagName("val")
            partnerId = listNode[5].getElementsByTagName("val")
            value = listNode[9].getElementsByTagName("val")
            islocked = listNode[10].getElementsByTagName("val")
            imageId = listNode[11].getElementsByTagName("val")
            phoneVerified = listNode[13].getElementsByTagName("val")
            return {
                "AD_User_ID":userId[0].firstChild.data,
                "Name":name[0].firstChild.data,
                "Password":pwd[0].firstChild.data,
                "AD_Org_ID":orgId[0].firstChild.data,
                "EMail":email[0].firstChild.data,
                "C_BPartner":partnerId[0].firstChild.data,
                "Value":value[0].firstChild.data,
                "IsLocked":islocked[0].firstChild.data,
                "AD_Image_ID":imageId[0].firstChild.data,
                "password_text":pass_confirm[0].firstChild.data,
                "phoneverified":phoneVerified[0].firstChild.data
            }
        }else{ 
            return {error:"Your credentials are wrong."}
        }
    }



    
}

export default new AuthHelper()