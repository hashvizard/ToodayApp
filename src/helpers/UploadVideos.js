import { Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'uuid-random'
import { postDataApi } from '../Apis/apis';
import { saveMediaToStorage } from '../services/random';
import { ProcessingManager } from 'react-native-video-processing';
import BackgroundService from 'react-native-background-actions';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const UploadVideos = (data) => dispatch => new Promise((resolve, reject) => {

   /*  const upload = useSelector(state => state.upload)
    const dispatch = useDispatch();

    let data = upload;
    dispatch(clearUploadedData()) */
    // updateVideo(data);
    try {
        
  
    // setuploading(true);
   
    // resolve(videoPhotoUrls);
    
    // let token = await AsyncStorage.getItem('tooday_user_token');


    // const options = {
    //     taskName: 'uploadingVideo',
    //     taskTitle: upload.location,
    //     taskDesc: upload.description,
    //     taskIcon: {
    //         name: 'ic_notification',
    //         type: 'mipmap',
    //     },
    //     color: '#ff00ff',
    //     progressBar :{
    //         max:1024,
    //         value:10,
    //         indeterminate:true
    //     },
    //     // linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    //     parameters: {  
    //         data: data,
    //         datas:datas,
    //         token:token
    //     },
    // };
        
    //    await BackgroundService.start(veryIntensiveTask, options);
       
    //     await BackgroundService.updateNotification({taskDesc: 'Uploading...'}); // Only Android, iOS will ignore this call
    

       
            const origin =  ProcessingManager.getVideoInfo(data.video);
            const result =  ProcessingManager.compress(data.video, {
                width: origin.size && origin.size.width / 3,
                height: origin.size && origin.size.height / 3,
                bitrateMultiplier: 3,
                removeAudio: false,
                minimumBitrate: 300000
            });
            const thumbnail =  ProcessingManager.getPreviewForSecond(result.source);
            let videoPhotoUrls =  {path: result.source, thumbnail: thumbnail };
            resolve(videoPhotoUrls);
    

    } catch (error) {
        reject(error);
    }

})


// export const UploadVideos = (taskData) => {

//     const upload = useSelector(state => state.upload)
//     const dispatch = useDispatch();

//     let data = upload;
//     dispatch(clearUploadedData())
//     // updateVideo(data);

//     // setuploading(true);
//     let videoPhotoUrls = await getData(data.video)
//     console.log(videoPhotoUrls);
    
//     // let token = await AsyncStorage.getItem('tooday_user_token');


//     // const options = {
//     //     taskName: 'uploadingVideo',
//     //     taskTitle: upload.location,
//     //     taskDesc: upload.description,
//     //     taskIcon: {
//     //         name: 'ic_notification',
//     //         type: 'mipmap',
//     //     },
//     //     color: '#ff00ff',
//     //     progressBar :{
//     //         max:1024,
//     //         value:10,
//     //         indeterminate:true
//     //     },
//     //     // linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
//     //     parameters: {  
//     //         data: data,
//     //         datas:datas,
//     //         token:token
//     //     },
//     // };
        
//     //    await BackgroundService.start(veryIntensiveTask, options);
       
//     //     await BackgroundService.updateNotification({taskDesc: 'Uploading...'}); // Only Android, iOS will ignore this call
    

//         const getData = async (path) => {
//             const origin = await ProcessingManager.getVideoInfo(path);
//             const result = await ProcessingManager.compress(path, {
//                 width: origin.size && origin.size.width / 3,
//                 height: origin.size && origin.size.height / 3,
//                 bitrateMultiplier: 3,
//                 removeAudio: false,
//                 minimumBitrate: 300000
//             });
//             const thumbnail = await ProcessingManager.getPreviewForSecond(result.source);
    
//             return { path: result.source, thumbnail: thumbnail };
//         }
    







//     // let storagePostId = uuid()

//     // if (Platform.OS === 'ios') {
//     //     console.warn(
//     //         'This task will not keep your app alive in the background by itself, use other library like react-native-track-player that use audio,',
//     //         'geolocalization, etc. to keep your app alive in the background while you excute the JS from this library.'
//     //     );
//     // }
//     // await new Promise(async (resolve, reject) => {

//     //     let allSavePromises = Promise.all([
//     //         saveMediaToStorage(taskData.path, `post/${taskData.user.uid}/${storagePostId}/video`, 'video'),
//     //         saveMediaToStorage(taskData.thumbnail, `post/${taskData.user.uid}/${storagePostId}/thumbnail`, 'image')
//     //     ])

//     //     allSavePromises
//     //         .then((media) => {
//     //             postDataApi('posts', {
//     //                 user_id: taskData.user.id,
//     //                 city_id: taskData.user.city_id,
//     //                 videoUrl: media[0],
//     //                 photoUrl: media[1],
//     //                 location: taskData.location,
//     //                 description: taskData.postDescription,
//     //             }).then((data) => {
//     //                 resolve(data.data)
//     //             }).catch(err => {
//     //                 console.log(err);
//     //                 reject(data.message)
//     //             })
//     //         })
//     //         .catch((err) => {
//     //             console.log(err);
//     //         });


//     // });
// }
