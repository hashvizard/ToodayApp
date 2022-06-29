
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { updateUserPhoto } from '../../Apis/LaravelApis'
import { saveMediaToStorage } from '../../services/random'

export const updateProfile = (profileUrl) => dispatch => new Promise((resolve, reject) => {
    let promiseResponse = Promise.all([
        saveMediaToStorage(profileUrl, `profile/${auth().currentUser.uid}`, 'image')
    ])

    promiseResponse
        .then((media) => {
            let data = { profile:media[0] };
            dispatch(updateUserPhoto(data)).then((data)=>{
               if(data.status) {
                    resolve(media[0]);
               }else{
                reject(data.message);
               }
            }).catch((err)=>{
                reject(err);
            })
        })
        .catch((err) => reject(err))
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