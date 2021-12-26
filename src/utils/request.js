import axios from 'axios';
import QS from 'qs';
import Cookies from 'js-cookie';
import { Notify } from 'vant';
import store from '../store/index';

const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    //baseURL: '/api',
    timeout: 10000 // request timeout
});

service.interceptors.request.use(
    config => {
        //请求携带token
        const token = Cookies.get('token');
        if (token != '' && token != undefined) {
            token && (config.headers.Authorization = 'Bearer ' + token);
        }
        return config;
    },
    error => {
        return Promise.error(error);
    }
);
// 响应拦截器
service.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        const { status, data } = response;
        if (status === 200) {
            return Promise.resolve(data);
        } else {
            return Promise.reject(data);
        }
    },
    error => {
        if (error.response.code) {
            switch (error.response.code) {
                case 401:
                    Cookies.remove('token');
                    Cookies.remove('auth');
                    store.state.auth = false;
                    Notify({ type: 'danger', message: error.response.data.message });
                 
                    break;
                case 403:
                
                    Cookies.remove('token');
                    Cookies.remove('auth');
                    Notify({ type: 'danger', message: error.response.data.message });
                
                    break;
                case 404:
                    Notify({ type: 'warning', message: "404" });
                    break;
                default:
                    Notify({ type: 'warning', message: error.response.data.message });
                  
            }
            return Promise.reject(error.response);
        }
    }
);

/**
  * get方法，对应get请求
  * @param {String} url [请求的url地址]
  * @param {Object} params [请求时携带的参数]
  */
 export function get(url, params={}){
    return new Promise((resolve, reject) =>{
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)
    })
});}

/**
  * post方法，对应post请求
  * @param {String} url [请求的url地址]
  * @param {Object} params [请求时携带的参数]
  */
 export function post(url, params) {
    return new Promise((resolve, reject) => {
          axios.post(url, QS.stringify(params))
        .then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}

// /**
//   * delete方法，对应delete请求
//   * @param {String} url [请求的url地址]
//   * @param {Object} params [请求时携带的参数]
//   */
//  export function del(url, params) {
//     return new Promise((resolve, reject) => {
//           axios.delete(url, QS.stringify(params))
//         .then(res => {
//             resolve(res.data);
//         })
//         .catch(err =>{
//             reject(err.data)
//         })
//     });
// }

export default service;