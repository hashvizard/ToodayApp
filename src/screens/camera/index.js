import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { RNCamera } from 'react-native-camera';
import { Audio } from 'react-native-sound'
import * as ImagePicker from 'react-native-image-picker'
import * as MediaLibrary from '@pontusab/react-native-media-library'
import { useIsFocused } from '@react-navigation/core'
import  Feather  from 'react-native-vector-icons/Feather'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'


/**
 * Function that renders a component responsible showing
 * a view with the camera preview, recording videos, controling the camera and
 * letting the user pick a video from the gallery
 * @returns Functional Component
 */
export default function CameraScreen() {
    const [hasCameraPermissions, setHasCameraPermissions] = useState(true)
    const [hasAudioPermissions, setHasAudioPermissions] = useState(true)
    const [hasGalleryPermissions, setHasGalleryPermissions] = useState(true) 

    const [galleryItems, setGalleryItems] = useState([])

    const [cameraRef, setCameraRef] = useState(null)
    const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back)
    const [cameraFlash, setCameraFlash] = useState(RNCamera.Constants.FlashMode.off)

     const [isCameraReady, setIsCameraReady] = useState(false)
     const isFocused = useIsFocused()

     const navigation = useNavigation() 
    useEffect(() => {
        (async () => {
            const cameraStatus = await RNCamera.requestPermissionsAsync()
            setHasCameraPermissions(cameraStatus.status == 'granted')

            const audioStatus = await Audio.requestPermissionsAsync()
            setHasAudioPermissions(audioStatus.status == 'granted')

            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
            setHasGalleryPermissions(galleryStatus.status == 'granted')
 
            if (galleryStatus.status == 'granted') {
                const userGalleryMedia = await MediaLibrary.getAssetsAsync({ sortBy: ['creationTime'], mediaType: ['video'] })
                setGalleryItems(userGalleryMedia.assets)
            } 
        })()
    }, [])


    const recordVideo = async () => {
        if (cameraRef) {
            try {
                const options = { maxDuration: 60, quality: RNCamera.Constants.VideoQuality['480'] }
                const videoRecordPromise = cameraRef.recordAsync(options)
                if (videoRecordPromise) {
                    const data = await videoRecordPromise;
                    const source = data.uri
                    
                    let sourceThumb = await generateThumbnail(source)
                    console.log(sourceThumb);
                    navigation.navigate('savePost', { source, sourceThumb })
                }
            } catch (error) {
                console.warn(error)
            }
        }
    }

    const stopVideo = async () => {
        if (cameraRef) {
            cameraRef.stopRecording()
        }
    }

    const pickFromGallery = async () => {

        let result = await  ImagePicker.launchImageLibrary({
            mediaType: 'video',
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1
        })
        if (!result.cancelled) {
            let sourceThumb = await generateThumbnail(result.uri);
            console.log(sourceThumb);
            navigation.navigate('savePost', { source: result.uri, sourceThumb })
        }
    }

    //Add code to generate thumbnail
     const generateThumbnail = async (source) => {
         try {
             return "abc.png";
         } catch (e) {
             console.warn(e);
         }
     };

     if (!hasCameraPermissions || !hasAudioPermissions || !hasGalleryPermissions) {
         return (
             <View>
                 <Text>ssddsd</Text>
                 </View>
         )
     }

    return (
        <View style={styles.container}>
            {isFocused ?
                <RNCamera
                ref={ref => setCameraRef(ref)}
                    style={styles.camera}
                    ratio={'16:9'}
                    type={cameraType}
                    flashMode={cameraFlash}
                    onCameraReady={() =>setIsCameraReady(true)}
                />
                : null}
    <View style={styles.sideBarContainer}>
                <TouchableOpacity
                    style={styles.sideBarButton}
                    onPress={() => setCameraType(cameraType === RNCamera.Constants.Type.back ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back)}>

                    <Feather name="refresh-ccw" size={24} color={'white'} />
                    <Text style={styles.iconText}>Flip</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.sideBarButton}
                    onPress={() => setCameraFlash(cameraFlash === RNCamera.Constants.FlashMode.off ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off)}>

                    <Feather name="zap" size={24} color={'white'} />
                    <Text style={styles.iconText}>Flash</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.bottomBarContainer}>
                <View style={{ flex: 1 }}></View>
                <View style={styles.recordButtonContainer}>
                    <TouchableOpacity
                        disabled={!isCameraReady}
                        onLongPress={() => recordVideo()}
                        onPressOut={() => stopVideo()}
                        style={styles.recordButton}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        onPress={() => pickFromGallery()}
                        style={styles.galleryButton}>
                        {galleryItems[0] == undefined ?
                            <></>
                            :
                            <Image
                                style={styles.galleryButtonImage}
                                source={{ uri: galleryItems[0].uri }}
                            />}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
