import {TYPE, SERVICE, VERIFY} from '../../settings/general-setting'
import SuperFetch from '../superfetch';
import {getBody} from '../../helpers/utility';
var DOMParser = require('xmldom').DOMParser


class ProfileHelper {
    updateProfile = async userInfo => {
        const type = {
            open:TYPE.createUpdateData_Open,
            close:TYPE.createUpdateData_Close
        }
        var data = getBody(userInfo, type, SERVICE.createUpdateUser);
        console.log('data~~~~~',data);
        return await SuperFetch.post("/", data)
            .then(resp=>resp.text())
            .then((response)=>{
                console.log('response',response);
                return {success:'success'}
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

    getCode = async payload =>{
        console.log('called');
        const body = new FormData();
        body.append("via", VERIFY.via);
        body.append("local", VERIFY.local);
        body.append('code_length', VERIFY.code_length);
        body.append('country_code', payload.country_code);
        body.append('phone_number', payload.phone_number);
        console.log(body)
        return await SuperFetch.post_('/start',body)
            .then(resp=>resp.json())
            .then((response)=>{
                return response
            })
    }

    verifyCode = async payload => {
        console.log('called');
        data = "phone_number=" + payload.phone_number + "&country_code=" + payload.country_code + "&verification_code=" + payload.verification_code;

        return await SuperFetch.get_('/check?'+data)
            .then(resp=>resp.json())
            .then((response)=>{
                return response
            })
    }

    handleResponse = result => {
        var parser = new DOMParser()
        var doc = parser.parseFromString(result, "text/xml").documentElement
        var listNode = doc.getElementsByTagName("field");
        var pass_confirm = listNode[12].getElementsByTagName("val");
        userId = listNode[0].getElementsByTagName("val")
        name = listNode[1].getElementsByTagName("val")
        pwd = listNode[2].getElementsByTagName("val")
        orgId = listNode[3].getElementsByTagName("val")
        email = listNode[4].getElementsByTagName("val")
        partnerId = listNode[5].getElementsByTagName("val")
        phone2 = listNode[6].getElementsByTagName("val")
        phone1 = listNode[7].getElementsByTagName('val')
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
            "Phone2":phone2[0].firstChild ? phone2[0].firstChild.data:' - ',
            "Phone":phone1[0].firstChild ? phone1[0].firstChild.data:' - ',
            "Value":value[0].firstChild.data,
            "IsLocked":islocked[0].firstChild.data,
            "AD_Image_ID":imageId[0].firstChild ? imageId[0].firstChild.data:'',
            "password_text":pass_confirm[0].firstChild.data,
            "phoneverified":phoneVerified[0].firstChild.data,
        }
        
    }
}

export default new ProfileHelper()