import request from '../utils/request';
import qs from 'qs'

/**
 * 获取用户信息
 * @param {*} query 
 * @returns 
 */
export function me(query) {
    return request({
        url: '/me',
        method: 'get',
        params: query
    });
}

/**
 * 用户登录接口
 * @param {*} query 
 * @returns 
 */
export function login(params) {
    console.log('请求',params)
    return request({
        url: '/login',
        method: 'post',
        data:qs.stringify(params)
    });
}




