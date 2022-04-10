import { Platform } from 'react-native';
import uuid from 'uuid-random'
import { postDataApi } from '../Apis/apis';
import { saveMediaToStorage } from '../services/random';



export const UploadVideos = async (taskData) => {

    let storagePostId = uuid()

    if (Platform.OS === 'ios') {
        console.warn(
            'This task will not keep your app alive in the background by itself, use other library like react-native-track-player that use audio,',
            'geolocalization, etc. to keep your app alive in the background while you excute the JS from this library.'
        );
    }
    await new Promise(async (resolve, reject) => {

        let allSavePromises = Promise.all([
            saveMediaToStorage(taskData.path, `post/${taskData.user.uid}/${storagePostId}/video`, 'video'),
            saveMediaToStorage(taskData.thumbnail, `post/${taskData.user.uid}/${storagePostId}/thumbnail`, 'image')
        ])

        allSavePromises
            .then((media) => {
                postDataApi('posts', {
                    user_id: taskData.user.id,
                    city_id: taskData.user.city_id,
                    videoUrl: media[0],
                    photoUrl: media[1],
                    location: taskData.location,
                    description: taskData.postDescription,
                }).then((data) => {
                    resolve(data.data)
                }).catch(err => {
                    console.log(err);
                    reject(data.message)
                })
            })
            .catch((err) => {
                console.log(err);
            });


    });
}
