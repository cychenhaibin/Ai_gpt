import axios from 'axios'
import {useUserStore} from "@stores/useUserStore.ts";

const request = axios.create({
    // baseURL: 'http://39.100.86.70:8088/',
});

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // let isToken = localStorage.getItem('token');
    // if (isToken) {
    //     // config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    //     config.headers['Authorization'] = isToken
    // }
    let isToken = useUserStore().token
    if (isToken) {
        // config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        config.headers['Authorization'] = isToken
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});



// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

// 封装 get、post
const http = {
    get(url: string, params?:any, config?:any) {
        return new Promise((resolve, reject) => {
            request.get(url,{params,...config}).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            })
        })
    },
    post(url: string, data?:any, config?:any) {
        return new Promise((resolve, reject) => {
            request.post(url,data,config).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            })
        })
    },
}
export default http;
