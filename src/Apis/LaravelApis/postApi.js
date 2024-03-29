import { delDataApi, getDataApi, postDataApi, postfileApi, putDataApi } from "../apis"

/**
 * Get User Profile Reviews
*/

export const getUserPosts = (url) => dispatch => new Promise((resolve, reject) => {
    getDataApi(url).then(response => {
        resolve(response);
    }).catch(error => reject(error))
})

/**
 * Get User Profile Reviews
*/

export const getProfilePosts = (url) => dispatch => new Promise((resolve, reject) => {
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
        resolve(response);
    }).catch(error => reject(error))
})

/**
 * Update Views
*/

export const updtaeViews = (data) => dispatch => new Promise((resolve, reject) => {
    postDataApi('view',data).then(response => {
        resolve(response);
    }).catch(error => reject(error))
})

/**
 * Update Views
*/

export const reportVideo = (data) => dispatch => new Promise((resolve, reject) => {
    postDataApi('report',data).then(response => {
        resolve(response);
    }).catch(error => reject(error))
})

/**
 * Get Post Views Data
 */


 export const postViewUserData = (id) => dispatch => new Promise((resolve, reject) => {
    getDataApi(`posts/views/${id}`).then(response => {
        resolve(response);
    }).catch(error => reject(error))
})

/**
 * get Post Coomments
*/

export const getPostComments = (url) => dispatch => new Promise((resolve, reject) => {
    getDataApi(url).then(response => {
        resolve(response);
    }).catch(error => reject(error))
})

/**
 * Add a Review to user Post
*/

export const addComment = (data) => dispatch => new Promise((resolve, reject) => {
    postDataApi('comment',data).then(response => {
        resolve(response);
    }).catch(error => reject(error))
})


/**
 * Remove Post 
*/

export const updatePost = (url,data) => dispatch => new Promise((resolve, reject) => {
    putDataApi(url,data).then(response => {
        resolve(response);
    }).catch(error => reject(error))
})


/**
 * Remove Post 
*/

export const postLive = (url,data) => dispatch => new Promise((resolve, reject) => {
    getDataApi(url).then(response => {
        resolve(response);
    }).catch(error => reject(error))
})



/**
 * Remove Post 
*/

export const removePost = (id) => dispatch => new Promise((resolve, reject) => {
    delDataApi(`posts/${id}`).then(response => {
        resolve(response);
    }).catch(error => reject(error))
})

/**
 * Add Post
*/

export const addPost = (data) => dispatch => new Promise((resolve, reject) => {
    postfileApi('posts',data).then(response => {
        resolve(response);
    }).catch(error => reject(error))
})