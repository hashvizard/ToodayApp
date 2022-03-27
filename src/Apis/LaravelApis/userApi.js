import { getDataApi, postDataApi } from "../apis"

/**
 * Get User Profile Reviews
*/

export const getProfileReviews = (url) => dispatch => new Promise((resolve, reject) => {
    console.log(url)
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
