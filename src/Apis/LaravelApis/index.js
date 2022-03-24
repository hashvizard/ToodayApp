import { getDataApi, postDataApi } from "../apis"

/**
 * Register or login user to database
*/

export const createNewuser = (data) => dispatch => new Promise((resolve, reject) => {
    postDataApi('register', data).then(response => {
        resolve(response);
    }).catch(error => reject(error))
})

/**
 * Get User data from database
*/

export const getUserData = () => dispatch => new Promise((resolve, reject) => {
    getDataApi('register', data).then(response => {
        resolve(response);
    }).catch(error => reject(error))
})
