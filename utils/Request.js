import { getToken, showLoader, hideLoader, getEnv, showToast } from "./index.js";
const env = process.env.NODE_ENV;
import axios from 'axios'

class Request{
  constructor(){
    if(!Request._instance) {
      this.spinnerCounter = 0;
      // $onboarding has 'uc' in front, $api has 'cs' in front, $chat has 'im' in front, $files are going to tz staging/prod
      this.baseUrl = 'http://ocalhost:6050';
      this.chatUrl = '';
      this.uploadUrl ='http://ocalhost:6051';


      this.instance = axios.create({
        baseURL: this.baseUrl,
        timeout: 60 * 1000 * 3 // 3 minutes
      })
      this.instance.interceptors.request.use(param => {
        if (param && param.data && param.data.isFormData) {
          const postData = new FormData()
          if (param.data) {
            const keys = Object.keys(param.data)
            for (let i = 0; i < keys.length; i++) {
              postData.append(keys[i], param.data[keys[i]])
            }
          }
          param.data = postData
        }
        return param
      })
      Request._instance = this;
    }else{
      /**
       * Making sure my counter's value continues from where the previous call left it. This is an implementation of singleton
       */
      this.spinnerCounter = Request._instance.spinnerCounter
      this.baseUrl = Request._instance.baseUrl
      this.chatUrl = Request._instance.chatUrl
      this.uploadUrl = Request._instance.uploadUrl
      this.instance = Request._instance.instance
    }
  }

  processResponse(response, extra) {
    try{
      return response.then(res=>{
        if(res && res.errorMsg && !extra.hideError){
          showToast(extra.Toast, res.errorMsg);
        }
      })
    }catch(error){
      console.log(error)
      return response;
    }
  }

  processRequest(data){
    if (data && data.isFormData) {
      const postData = new FormData()
      const keys = Object.keys(data)
      for (let i = 0; i < keys.length; i++) {
        postData.append('files', data[keys[i]])
      }
      data = postData
    }
    return data;
  }

  setHeader(headers = {}){
    this.token = getToken();
    return  {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json',
      "Accept": "application/json, text/plain, */*",
      ...headers
    }
  }

  handleShowSpinner(hideSpinner = false){
    if(hideSpinner) return
    this.spinnerCounter+=1;
    showLoader();
  }

  handleHideSpinner(hideSpinner = false){
    if(hideSpinner) return
    this.spinnerCounter-=1;
    if(this.spinnerCounter <= 1) return hideLoader();
  }
  async post(url, data = {}, extra = {headers:{}, hideSpinner:false}) {
    return this.axios(url, data, extra);
  }
  async axios(url = '', data = {}, extra = {headers:{}, hideSpinner:false}) {
    this.handleShowSpinner(extra.hideSpinner)
    const params = this.processRequest(data);
    const response = await this.instance.post(url, params, {headers: this.setHeader(extra.headers)}).catch(e => {
      this.handleHideSpinner(extra.hideSpinner)
      throw new Error(e);
    })
    this.handleHideSpinner(extra.hideSpinner)
    const parsedData = new Promise((resolve, reject) => { resolve(response.data)})
    this.processResponse(parsedData, extra)
    return parsedData
  }
  async put(url, data = {}, extra = {headers:{}, hideSpinner:false}) {
    this.handleShowSpinner(extra.hideSpinner)
    const params = this.processRequest(data);
    const response = await this.instance.put(url, params, {headers: this.setHeader(extra.headers)}).catch(e => {
      this.handleHideSpinner(extra.hideSpinner)
      throw new Error(e);
    })
    this.handleHideSpinner(extra.hideSpinner)
    const parsedData = new Promise((resolve, reject) => { resolve(response.data)})
    this.processResponse(parsedData, extra)
    return parsedData
  }
  async chat(url, data = {}, extra = {headers:{}, hideSpinner:false}) {
    return this.axios('/im/v1/room'+url, data, extra);
  }
  async uploadFile(data = {}, extra = { headers: {}, hideSpinner:false}) {
   return this.axios(this.uploadUrl, data, {...extra, headers: {...extra.headers, 'Content-Type': 'multipart/form-data; boundary=----'}});
  }
  async get(url, extra = {headers:{}, hideSpinner:false}) {
    this.handleShowSpinner(extra.hideSpinner)
    const response = await this.instance.get(url, {headers: this.setHeader(extra.headers)}).catch(e => {
      this.handleHideSpinner(extra.hideSpinner)
      throw new Error(e);
    })
    this.handleHideSpinner(extra.hideSpinner)
    const parsedData = new Promise((resolve, reject) => { resolve(response.data)})
    this.processResponse(parsedData, extra)
    return parsedData
  }
}

export default new Request();
