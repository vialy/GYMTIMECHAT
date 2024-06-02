import { getToken, showLoader, hideLoader, createLoader, getEnv } from "../utils/index.js";
import axios from 'axios';

if (process.client) {
  createLoader();
}

export default function ({ $toast, redirect }, inject) {

  class Request {
    constructor() {
      if (!Request._instance) {
        this.spinnerCounter = 0;
        this.baseUrl = "https://gymtime-backend.onrender.com";
        this.chatUrl = '';
        this.uploadUrl = 'http://localhost:6051';

        this.instance = axios.create({
          baseURL: this.baseUrl,
          timeout: 60 * 1000 * 3 // 3 minutes
        });
        
        this.instance.interceptors.request.use(param => {
          if (param && param.data && param.data.isFormData) {
            const postData = new FormData();
            if (param.data) {
              const keys = Object.keys(param.data);
              for (let i = 0; i < keys.length; i++) {
                postData.append(keys[i], param.data[keys[i]]);
              }
            }
            param.data = postData;
          }
          return param;
        });

        Request._instance = this;
      } else {
        this.spinnerCounter = Request._instance.spinnerCounter;
        this.baseUrl = Request._instance.baseUrl;
        this.chatUrl = Request._instance.chatUrl;
        this.uploadUrl = Request._instance.uploadUrl;
        this.instance = Request._instance.instance;
      }
    }

    processResponse(response, extra) {
      try {
        return response.then(res => {
          if (res && res.errorMsg && !extra.hideError) {
            $toast.error(res.errorMsg, { timeout: 10000 });
          }
          if(res && res.erroCode == 4001 || res.erroCode == 4002 || res.erroCode == 4003){
            
          }
        });
      } catch (error) {
        console.log(error);
        return response;
      }
    }

    processRequest(data) {
      if (data && data.isFormData) {
        const postData = new FormData();
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
          postData.append('files', data[keys[i]]);
        }
        data = postData;
      }
      return data;
    }

    setHeader(headers = {}) {
      const token = process.client ? getToken() : '';
      return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        "Accept": "application/json, text/plain, */*",
        ...headers
      };
    }

    handleShowSpinner(hideSpinner = false) {
      if (hideSpinner) return;
      this.spinnerCounter += 1;
      showLoader();
    }

    handleHideSpinner(hideSpinner = false) {
      if (hideSpinner) return;
      this.spinnerCounter -= 1;
      if (this.spinnerCounter <= 1) hideLoader();
    }

    async post(url, data = {}, extra = { headers: {}, hideSpinner: false }) {
      return this.axios(url, data, extra);
    }

    async axios(url = '', data = {}, extra = { headers: {}, hideSpinner: false }) {
      this.handleShowSpinner(extra.hideSpinner);
      const params = this.processRequest(data);
      const response = await this.instance.post(url, params, { headers: this.setHeader(extra.headers) }).catch(e => {
        this.handleHideSpinner(extra.hideSpinner);
        throw new Error(e);
      });
      this.handleHideSpinner(extra.hideSpinner);
      const parsedData = new Promise((resolve, reject) => { resolve(response.data) });
      this.processResponse(parsedData, extra);
      return parsedData;
    }

    async put(url, data = {}, extra = { headers: {}, hideSpinner: false }) {
      this.handleShowSpinner(extra.hideSpinner);
      const params = this.processRequest(data);
      const response = await this.instance.put(url, params, { headers: this.setHeader(extra.headers) }).catch(e => {
        this.handleHideSpinner(extra.hideSpinner);
        throw new Error(e);
      });
      this.handleHideSpinner(extra.hideSpinner);
      const parsedData = new Promise((resolve, reject) => { resolve(response.data) });
      this.processResponse(parsedData, extra);
      return parsedData;
    }

    async chat(url, data = {}, extra = { headers: {}, hideSpinner: false }) {
      return this.axios('/im/v1/room' + url, data, extra);
    }

    async uploadFile(data = {}, extra = { headers: {}, hideSpinner: false }) {
      return this.axios(this.uploadUrl, data, { ...extra, headers: { ...extra.headers, 'Content-Type': 'multipart/form-data; boundary=----' } });
    }

    async get(url, extra = { headers: {}, hideSpinner: false }) {
      this.handleShowSpinner(extra.hideSpinner);
      const response = await this.instance.get(url, { headers: this.setHeader(extra.headers) }).catch(e => {
        this.handleHideSpinner(extra.hideSpinner);
        throw new Error(e);
      });
      this.handleHideSpinner(extra.hideSpinner);
      const parsedData = new Promise((resolve, reject) => { resolve(response.data) });
      this.processResponse(parsedData, extra);
      return parsedData;
    }
  }

  const request = new Request();
  inject('request', request);

  return request;
}
