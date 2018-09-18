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
        var data = getBody(userInfo, type, SERVICE.login);
        console.log('data~~~~~~~',data);
    
        return await SuperFetch.post("/", data)
            .then(resp=>resp.text())
            .then((response)=>{
                console.log('response',response);
                return this.credentialConfirm(response);
            });
    }

    

    credentialConfirm = result=>{
        var parser = new DOMParser()
        var doc = parser.parseFromString(result, 'text/xml').documentElement
        listNode = doc.getElementsByTagName("Error")
        if(listNode.length != 0){
            return {
                error:"Your credentials are wrong"
            }
        }
        var listNode = doc.getElementsByTagName("outputFields");
        console.log('listNode',listNode);
        var val = listNode[0].getElementsByTagName("outputField");
        if(val[0].getAttribute('value')=='Y'){
            return {
                success:"Login Success",
            }
        }else{
            return {
                error:'Your credentials are wrong',
            }
        }
    }

}

export default new AuthHelper()