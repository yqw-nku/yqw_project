import { callApi } from './api';

/**
 * 用户登录
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @returns {Promise} - 登录结果
 */
export const login = async (username, password) => {
    try {
        // 调用登录API
        const response = await callApi('post', '/auth/login', {
            username,
            password
        });

        return response;
    } catch (error) {
        console.error('登录失败:', error);
        throw error;
    }
};

/**
 * 验证用户令牌
 * @param {string} token - 用户令牌
 * @returns {Promise} - 验证结果
 */
export const verifyToken = async (token) => {
    try {
        // 调用令牌验证API
        const response = await callApi('post', '/auth/verify', {
            token
        });

        return response;
    } catch (error) {
        console.error('令牌验证失败:', error);
        throw error;
    }
};

/**
 * 保存用户认证信息
 * @param {string} token - 用户令牌
 * @param {boolean} remember - 是否长期保存
 */
export const saveAuth = (token, remember) => {
    if (remember) {
        localStorage.setItem('authToken', token);
    } else {
        sessionStorage.setItem('authToken', token);
    }
};

/**
 * 清除用户认证信息
 */
export const clearAuth = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
};

/**
 * 获取用户令牌
 * @returns {string|null} - 用户令牌
 */
export const getAuthToken = () => {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
};