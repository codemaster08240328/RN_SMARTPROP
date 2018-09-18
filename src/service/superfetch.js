import {API, VERIFY} from '../settings/general-setting';

const base = (method, path, data) => {
  return fetch(`${API.base}${path}`, {
    method: method,
    body: data ? data : undefined 
  }).catch(error => ({ error: "Server Error" }))
}
const headers = new Headers();
headers.append('X-Authy-API-Key', VERIFY.app_key);

const base_verify = (method, path, data)=>{
  console.log(data, headers);
  return fetch(`${API.verify}${path}`,{
    method:method,
    body:data ? data : undefined,
    headers:headers
  });
}

class SuperFetch {
  get = path => {
    return base("get", path)
  }

  post = (path, data) => {
    return base("post", path, data)
  }
  
  put = (path, data) => {
    return base("put", path, data)
  }
  
  delete = (path) =>{
    return base('delete',path)
  }
  get_ = path => {
    return base_verify("get", path)
  }

  post_ = (path, data) => {
    return base_verify("post", path, data)
  }
  
}

export default new SuperFetch()
