import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
/** api url */
const ENV = require('../../credentials');
const BASE_URL = ENV.BACKEND_URL;

/**
 * intercepts request at first and run the middleware function for reference see axios interceptors
 * 
 * @param {*} NA
 * @return
 */
axios.interceptors.request.use(function (config) {
    return config;
});

/**
 * header
 */
const headersOption = async () => {
    let token = await AsyncStorage.getItem('tooday_user_token');
    return {
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${token}`,
            "Accept": 'application/json'
        }
    };
}

/**
 * call API
 * 
 * @param {string} url 
 * @param {object} data 
 * @returns 
 */
export const postDataApi = async (url, data) => {
    try {
        const response = await axios.post(BASE_URL + url, data, await headersOption());
        return response.data;
    } catch (err) {
        return err.response.data;
    }
};

/**
 * call GET API
 * 
 * @param {string} url 
 * @returns 
 */
export const getDataApi = async (url) => {
    try {
        const response = await axios.get(BASE_URL + url, await headersOption());
        return response.data;
    } catch (err) {
        return err.response.data;
    }
};

/**
 * call put API
 * 
 * @param {string} url 
 * @returns 
 */
export const putDataApi = async (url, data) => {
    try {
        const response = await axios.put(BASE_URL + url, data, await headersOption());
        return response.data;
    } catch (err) {
        return err.response.data;
    }
};

/**
 * call delete API
 * 
 * @param {string} url 
 * @returns 
 */
export const delDataApi = async (url) => {
    try {
        const response = await axios.delete(BASE_URL + url, await headersOption());
        return response.data;
    } catch (err) {
        return err.response.data;
    }
};