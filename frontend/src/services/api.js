import axios from 'axios';

// 创建API实例
const api = axios.create({
    baseURL: '/api', // 基础URL，可根据需要配置
    timeout: 10000, // 超时时间
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * API配置函数 - 设置基础URL
 * @param {string} baseUrl - API基础URL
 */
export const configureApi = (baseUrl) => {
    api.defaults.baseURL = baseUrl;
    localStorage.setItem('apiBaseUrl', baseUrl);
};

/**
 * 发送API请求
 * @param {string} method - HTTP方法 (get, post, put, delete)
 * @param {string} url - 请求URL
 * @param {object} data - 请求数据
 * @returns {Promise} - API响应
 */
export const callApi = async (method, url, data = null) => {
    try {
        const response = await api({
            method,
            url,
            data
        });
        return response.data;
    } catch (error) {
        console.error('API请求错误:', error);
        throw error;
    }
};

// 初始化时加载保存的API配置
const savedApiUrl = localStorage.getItem('apiBaseUrl');
if (savedApiUrl) {
    configureApi(savedApiUrl);
}