import React, { useEffect, useRef, useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, Image,PermissionsAndroid,Platform } from 'react-native'
import { RNCamera } from 'react-native-camera';
import { Audio } from 'react-native-sound'
import * as ImagePicker from 'react-native-image-picker'
import { useIsFocused } from '@react-navigation/core'
import Feather from 'react-native-vector-icons/Feather'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gallery from './Gallery';
/**
 * Function that renders a component responsible showing
 * a view with the camera preview, recording videos, controling the camera and
 * letting the user pick a video from the gallery
 * @returns Functional Component
 */
export default function CameraScreen(props) {
    const [hasCameraPermissions, setHasCameraPermissions] = useState(true)
    const [hasAudioPermissions, setHasAudioPermissions] = useState(true)
    const [hasGalleryPermissions, setHasGalleryPermissions] = useState(true)

    const [cameraRef, setCameraRef] = useState(null)
    const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back)
    const [cameraFlash, setCameraFlash] = useState(RNCamera.Constants.FlashMode.off)
    const [count, setCount] = useState(0);
    const [show, setShow] = useState(false)
    const [isCameraReady, setIsCameraReady] = useState(false)
    const isFocused = useIsFocused()

    const navigation = useNavigation()



    useEffect(() => {
        (async () => {
            const cameraStatus = await RNCamera.requestPermissionsAsync()
            setHasCameraPermissions(cameraStatus.status == 'granted')

            const audioStatus = await Audio.requestPermissionsAsync()
            setHasAudioPermissions(audioStatus.status == 'granted')
            if (Platform.OS === 'android') {
            const galleryStatus = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                  title: 'Permission Explanation',
                  message: 'Tooday would like to access your Gallery',
                },
              );
            setHasGalleryPermissions(galleryStatus.status == 'granted')
            
            }
        })()
    }, [])



    let timer;
    const recording = (val) => {
        if (val) {
            setShow(true)
            timer = setInterval(() => {
                setCount(count => count + 1);
            }, 1000);
        } else {
            setShow(false)
            setCount(0);
            clearInterval(timer);
        }
    }

    const recordVideo = async () => {

        if (cameraRef) {
            try {
                recording(true);
                const options = { maxDuration: 300, quality: RNCamera.Constants.VideoQuality['480'], orientation: "portrait" }
                const videoRecordPromise = cameraRef.recordAsync(options)
                if (videoRecordPromise) {
                    const data = await videoRecordPromise;
                    const source = data.uri
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

    if (!hasCameraPermissions || !hasAudioPermissions || !hasGalleryPermissions) {
        return (
            <View style={{ flex: 1, backgroundColor: "black", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "white" }}>Go to the Settings and enable the permissions</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {isFocused ?
                <RNCamera
                    ref={ref => setCameraRef(ref)}
                    style={styles.camera}
                    captureAudio={true}
                    videoStabilizationMode={'auto'}
                    defaultVideoQuality="480p"
                    ratio={'16:9'}
                    type={cameraType}
                    flashMode={cameraFlash}
                    onCameraReady={() => setIsCameraReady(true)}
                />
                : null}


            <View style={{ ...styles.sideBarContainer, display: show ? "flex" : "none" }}>
                <View style={{ paddingBottom: 50, flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }}>
                    <Icon name="circle" color="white" style={{ marginRight: 10 }} />
                    <Text style={{ color: "white" }}>{count} Sec</Text>
                    <Icon name="circle" color="white" style={{ marginLeft: 10 }} />
                </View>
            </View>


            <View style={styles.bottomBarContainer}>

                {!show ? <Gallery {...props} /> : null}

                <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 25, alignItems: "center" }}>
                    <TouchableOpacity
                        style={styles.sideBarButton}
                        /*  onPress={() => setCameraFlash(cameraFlash === RNCamera.Constants.FlashMode.off ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off)}> */
                        onPress={() => setCameraType(cameraType === RNCamera.Constants.Type.back ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back)}>
                        <Feather name="refresh-ccw" size={25} color={'white'} />

                    </TouchableOpacity>

                    {!show ?
                        <TouchableOpacity
                            disabled={!isCameraReady}
                            onPress={() => recordVideo()}
                            style={styles.recordButton}
                        />
                        :
                        <TouchableOpacity
                            disabled={!isCameraReady}
                            onPress={() => stopVideo()}
                            style={styles.recordButton}
                        >
                            <Feather name="pause-circle" size={50} color={'white'} />
                        </TouchableOpacity>
                    }
                    <TouchableOpacity
                        style={styles.sideBarButton}
                        onPress={() => props.navigation.goBack()}>
                        <Feather name="x" size={25} color={'white'} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
