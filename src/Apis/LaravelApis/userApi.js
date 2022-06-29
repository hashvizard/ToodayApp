import { delDataApi, getDataApi, postDataApi } from "../apis"

/**
 * Get User Profile Reviews
*/

export const getProfileReviews = (url) => dispatch => new Promise((resolve, reject) => {
    getDataApi(url).then(response => {
        resolve(response);
    }).catch(error => reject(error))
})

/**
 * Add a Review on user profile
*/

export const addProfileReviews = (data) => dispatch => new Promise((resolve, reject) => {
    postDataApi('reviews',data).then(response => {
        resolve(response);
    }).catch(error => reject(error))
})

/**
 * Get Blocked users
*/

export const getBlockedUsers = () => dispatch => new Promise((resolve, reject) => {
    getDataApi('blocked').then(response => {
        resolve(response);
    }).catch(error => reject(error))
})

/**
 * Remove Blocked users
*/

export const removeBlockedUsers = (id) => dispatch => new Promise((resolve, reject) => {
    delDataApi(`blocked/${id}`).then(response => {
        resolve(response);
    }).catch(error => reject(error))
})


/**
 * Add Blocked users
*/

export const addBlockedUsers = (data) => dispatch => new Promise((resolve, reject) => {
    postDataApi('blocked',data).then(response => {
        resolve(response);
    }).catch(error => reject(error))
})