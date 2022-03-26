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
    getDataApi('userinfo').then(response => {
        resolve(response);
    }).catch(error => reject(error))
})

/**
 * Get All Cities
*/

export const getAllCities = () => dispatch => new Promise((resolve, reject) => {
    getDataApi('cities').then(response => {
        resolve(response);
    }).catch(error => reject(error))
})

/**
 * Update user City
*/

export const updateUserCity = (data) => dispatch => new Promise((resolve, reject) => {
    postDataApi('cities',data).then(response => {
        resolve(response);
    }).catch(error => reject(error))
})