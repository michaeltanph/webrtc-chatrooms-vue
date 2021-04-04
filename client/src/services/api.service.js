//import Vue from "vue";
import axios from "axios";

const API_URL = "http://localhost:5000/";

// axios.defaults.baseURL = API_URL;
// axios.defaults.withCredentials = false;
// axios.defaults.headers.Accept = 'application/json';
// axios.defaults.headers['Content-Type'] = 'application/json';


const http = axios.create({
    baseURL: API_URL,
    withCredentials: false, // This is the default
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    timeout: 10000
})

// Vue.$http = axios;
// console.log(Vue.$http)

export default http