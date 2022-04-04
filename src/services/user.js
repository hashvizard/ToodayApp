import { saveMediaToStorage } from './random'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export const saveUserProfileImage = (image) => new Promise((resolve, reject) => {
    saveMediaToStorage(image, `profileImage/${auth().currentUser.uid}`).then((res) => {
        firestore()
            .collection('user')
            .doc(auth().currentUser.uid)
            .update({
                photoURL: res
            })
            .then(() => resolve())
            .catch(() => reject())
    })
})


export const saveUserField = (field, value) => new Promise((resolve, reject) => {
    let obj = {};
    obj[field] = value
    firestore()
        .collection('user')
        .doc(auth().currentUser.uid)
        .update(obj)
        .then(() => resolve())
        .catch(() => reject())
})

// export const addUserToBlockList = (value) => new Promise((resolve, reject) => {
//     firestore()
//         .collection('user')
//         .doc(auth().currentUser.uid)
//         .update({
//             blocked: firestore.FieldValue.arrayUnion(value)
//         })
//         .then(() => resolve())
//         .catch(() => reject())
// })



export const saveUserCurrentCity = (city) => new Promise((resolve, reject) => {
    let obj = {};
    obj['City'] = city
    firestore()
        .collection('user')
        .doc(auth().currentUser.uid)
        .update(obj)
        .then(() => resolve())
        .catch(() => reject())
})


export const queryUsersByEmail = (email) => new Promise((resolve, reject) => {
    if (email === '') {
        resolve([])
    }

    firestore()
        .collection('user')
        .where('email', '>=', email)
        .where('email', '<=', email + '\uf8ff')
        .get()
        .then((snapshot) => {
            let users = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data }
            })
            resolve(users)
        })
        .catch(() => reject())
})

// /**
//  * fetches the doc corresponding to the id of a user.
//  * 
//  * @param {String} id of the user we want to fetch 
//  * @returns {Promise<Object>} user object if successful.
//  */
export const getUserById = (id) => new Promise((resolve, reject) => {
    firestore()
        .collection('user')
        .doc(id)
        .get()
        .then((snapshot) => {
            resolve(snapshot.exists ? snapshot.data() : null)
        })
        .catch(() => reject())
})