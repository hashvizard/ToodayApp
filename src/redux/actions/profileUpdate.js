
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { saveMediaToStorage } from '../../services/random'

export const updateProfile = (profileUrl) => dispatch => new Promise((resolve, reject) => {
    let promiseResponse = Promise.all([
        saveMediaToStorage(profileUrl, `profile/${auth().currentUser.uid}`, 'image')
    ])

    promiseResponse
        .then((media) => {
            firestore()
                .collection('user')
                .doc(auth().currentUser.uid)
                .update({
                    photoURL: media[0],
                })
                .then(() => resolve())
                .catch((err) => reject(err))
        })
        .catch(() => reject())
})

export const updateName = (name) => dispatch => new Promise((resolve, reject) => {
    firestore()
        .collection('user')
        .doc(auth().currentUser.uid)
        .update({
            displayName: name
        })
        .then(() => resolve())
        .catch((err) => reject(err))
})


export const updateCity = (city) => dispatch => new Promise((resolve, reject) => {
    firestore()
        .collection('user')
        .doc(auth().currentUser.uid)
        .update({
            City: city
        })
        .then(() => resolve())
        .catch((err) => reject(err))
})