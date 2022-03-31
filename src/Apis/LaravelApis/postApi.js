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

export const getLikedPosts = (url) => dispatch => new Promise((resolve, reject) => {
    getDataApi(url).then(response => {
        resolve(response);
    }).catch(error => reject(error))
})
