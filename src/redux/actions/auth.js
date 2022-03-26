
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { CREATE_TOKEN, USER_STATE_CHANGE } from '../constants'
import { getPostsByUser } from './posts'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserData } from '../../Apis/LaravelApis';


/**
 * Token create and update
 */

export const getToken = () => new Promise((resolve, reject) => {
    AsyncStorage.getItem('tooday_user_token').then(value => {
        resolve(value);
    }).catch(e => {
        reject(e);
    })
})

export const setToken = (token) => new Promise((resolve, reject) => {
    AsyncStorage.setItem('tooday_user_token', token).then(
        resolve(true)
    ).catch(e => {
        reject(e);
    })
})

/**
 * Intializing user data
 */

export const userAuthStateListener = () => dispatch => {
    getToken().then((value) => {
        dispatch({ type: CREATE_TOKEN, token: value })
        if (value != null) {
            dispatch(getUserData()).then(data => {
                if (data.status) {
                    dispatch({
                        type: USER_STATE_CHANGE,
                        currentUser: data?.data[0],
                        loaded: true
                    })
                }
                else {
                    console.log(data.message)
                }
            }).catch(err => {
                console.log(err);
            })
        } else {
            dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true })
        }
    })
}




export const getCurrentUserData = () => dispatch => {
    dispatch()
    firestore()
        .collection('user')
        .doc(auth().currentUser.uid)
        .onSnapshot((res) => {
            if (res.exists) {
                return dispatch({
                    type: USER_STATE_CHANGE,
                    currentUser: res.data(),
                    loaded: true
                })
            }
        })
}

/**
 * Setting user data 
 */

export const setUserData = (user) => dispatch => {
    setToken(user?.data?.token).then(() => {
        return dispatch({
            type: USER_STATE_CHANGE,
            currentUser: user?.data?.user,
            loaded: true
        })
    }).catch((e) => {
        dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true })
    })

}

/**
 * Login with Google
 */

export const login = (googleCredential) => dispatch => new Promise((resolve, reject) => {
    // Sign-in the user with the credential
    auth().signInWithCredential(googleCredential)
        .then((data) => {
            if (!data.additionalUserInfo.isNewUser) {
                let userData = {
                    newUser: data.additionalUserInfo.isNewUser,
                    name: data.user.displayName,
                    email: data.user.email,
                    profile: data.user.photoURL,
                    uid: data.user.uid,
                    city_id: null
                }
                resolve(userData);
            } else {
                let userData = {
                    newUser: data.additionalUserInfo.isNewUser,
                    uid: data.user.uid
                }
                resolve(userData);
            }
        })
        .catch((e) => {
            console.log(e);
            reject(e)
        })
})


/**
 * Logout from Google
 */

export const logOut = () => dispatch => new Promise((resolve, reject) => {
    // Sign-in the user with the credential
    auth().signOut()
        .then(() => {
            resolve(true)
        })
        .catch((e) => {
            reject(e)
        })
})
