import { delDataApi, getDataApi, postDataApi } from "../apis"

/**
 * Get User Profile Reviews
*/

export const getUserPosts = (url) => dispatch => new Promise((resolve, reject) => {
    getDataApi(url).then(response => {
        resolve(response);
    }).catch(error => reject(error))
})

/**
 * Get User Liked Posts
*/

export const getViewedPosts = (url) => dispatch => new Promise((resolve, reject) => {
    getDataApi(url).then(response => {
        resolve(response);
    }).catch(error => reject(error))
})

/**
 * Get All Posts
*/

export const getAllPosts = (url) => dispatch => new Promise((resolve, reject) => {
    getDataApi(url).then(response => {
        console.log(response);
        resolve(response);
    }).catch(error => reject(error))
})

/**
 * Update Views
*/

export const updtaeViews = (data) => dispatch => new Promise((resolve, reject) => {
    postDataApi('view',data).then(response => {
        console.log(response);
        resolve(response);
    }).catch(error => reject(error))
})

