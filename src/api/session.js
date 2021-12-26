import request from '../utils/request';
import qs from 'qs'

/**
 * 获取会话列表
 * @returns 
 */
export function GetSessionList() {
    return request({
        url: '/GetSessionList',
        method: 'get'
    });
}
