import React, { useEffect, useRef, useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { RNCamera } from 'react-native-camera';
import { Audio } from 'react-native-sound'
import * as ImagePicker from 'react-native-image-picker'
import * as MediaLibrary from '@pontusab/react-native-media-library'
import { useIsFocused } from '@react-navigation/core'
import Feather from 'react-native-vector-icons/Feather'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
    const [count, setCount] = useState(0)
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


    let timer;
    const recording = (val) => {
        if (val) {
            timer = setInterval(() => {
                console.log('asd')
                setCount(count => count + 1);
            }, 1000);
        } else {
            setCount(0)
            clearInterval(timer);
        }
    }

    const recordVideo = async () => {
        if (cameraRef) {
            try {
                recording(true);
                const options = { maxDuration: 300, quality: RNCamera.Constants.VideoQuality['480'] }
                const videoRecordPromise = cameraRef.recordAsync(options)
                if (videoRecordPromise) {
                    const data = await videoRecordPromise;
                    console.log(data)
                    const source = data.uri
                    console.log(count);
                    recording(false)
                    navigation.navigate('savePost', { source })
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

        let result = await ImagePicker.launchImageLibrary({
            mediaType: 'video',
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1
        })
        if (result.cancelled) {
            navigation.navigate('savePost', { source: result.uri })
        }
    }

    if (!hasCameraPermissions || !hasAudioPermissions || !hasGalleryPermissions) {
        return (
            <View>
                <Text>sorry you don't have permission to access camera</Text>
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
                    onCameraReady={() => setIsCameraReady(true)}
                />
                : null}

            <View style={styles.sideBarContainer}>
                <View style={{ paddingBottom: 50, flexDirection: "row", alignItems: "center" }}>
                    <Icon name="circle" color="#ff404087" style={{ marginRight: 10 }} />
                    <Text style={{color:"white"}}>{count} Sec</Text>
                </View>
                <View>
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
            </View>


            <View style={styles.bottomBarContainer}>

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


                <TouchableOpacity
                    disabled={!isCameraReady}
                    onLongPress={() => recordVideo()}
                    onPressOut={() => stopVideo()}
                    style={styles.recordButton}
                />

            </View>
        </View>
    )
}
