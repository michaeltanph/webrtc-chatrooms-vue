import axios from "axios";
import { API_URL } from "@/common/config.js";

const http = axios.create({
    baseURL: API_URL,
    withCredentials: false, // This is the default
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    timeout: 10000
})

export default http