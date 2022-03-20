
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { USER_STATE_CHANGE } from '../constants'
import { getPostsByUser } from './posts'


export const userAuthStateListener = () => dispatch => {
    auth().onAuthStateChanged((user) => {
        if (user) {
            dispatch(getCurrentUserData())
            dispatch(getPostsByUser(auth().currentUser.uid))
        } else {
            dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true })
        }
    })
}

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


export const getCurrentUserData = () => dispatch => {
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

export const login = (googleCredential) => dispatch => new Promise((resolve, reject) => {
    // Sign-in the user with the credential
    auth().signInWithCredential(googleCredential)
        .then(() => {
            resolve()
        })
        .catch((e) => {
            reject(e)
        })
})

