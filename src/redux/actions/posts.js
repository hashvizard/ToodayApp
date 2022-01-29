
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { saveMediaToStorage } from '../../services/random'
import uuid from 'uuid-random'
import { CURRENT_USER_POSTS_UPDATE } from '../constants'

export const createPost = (description, video ,thumbnail) => dispatch => new Promise((resolve, reject) => {
    let storagePostId = uuid()
    let allSavePromises = Promise.all([
        saveMediaToStorage(video, `post/${auth().currentUser.uid}/${storagePostId}/video`,'video'),
        saveMediaToStorage(thumbnail, `post/${auth().currentUser.uid}/${storagePostId}/thumbnail`,'image')
    ])

    allSavePromises
        .then((media) => {
            firestore()
                .collection('post')
                .add({
                    creator: auth().currentUser.uid,
                    media,
                    description,
                    likesCount: 0,
                    reportCount: 0,
                    commentsCount: 0,
                    creation: firestore.FieldValue.serverTimestamp()
                })
                .then(() => resolve())
                .catch((err) => reject(err))
        })
        .catch(() => reject())
})

export const getPostsByUser = (uid = auth().currentUser.uid) => dispatch => new Promise((resolve, reject) => {
    firestore()
        .collection('post')
        .where('creator', '==', uid)
        .onSnapshot((snapshot) => {
            let posts = snapshot.docs.map(doc => {
                const data = doc.data()
                const id = doc.id
                return { id, ...data }
            })
       
            dispatch({ type: CURRENT_USER_POSTS_UPDATE, currentUserPosts: posts })
        })
})
