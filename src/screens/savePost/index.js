import { StackActions, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ActivityIndicator, Image, Text, KeyboardAvoidingView, View, TouchableOpacity } from 'react-native'
import styles from './styles'
import Feather from 'react-native-vector-icons/Feather'
import { useDispatch } from 'react-redux'
import { createPost } from '../../redux/actions'
import { ProcessingManager } from 'react-native-video-processing';
import Video from 'react-native-video';
import videoStyles from '../../styles/VideoStyles'
import { IconButton, TextInput, Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { Title, Caption, } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default function SavePostScreen(props) {
    const [description, setDescription] = useState('')
    const [requestRunning, setRequestRunning] = useState(false)
    const [uploaded, setuploaded] = useState(false)
    const [paused, setpaused] = useState(true);
    const navigation = useNavigation()
    const dispatch = useDispatch();

    const handleSavePost = async () => {
        setRequestRunning(true)
        let data = await getData(props.route.params.source)
        dispatch(createPost(description, data.path, data.thumbnail))
            .then(() => setuploaded(true))
            .catch((err) => { setRequestRunning(false); console.log(err) })
    }

    const getData = async (path) => {
        const origin = await ProcessingManager.getVideoInfo(path);
        const result = await ProcessingManager.compress(path, {
            width: origin.size && origin.size.width / 3,
            height: origin.size && origin.size.height / 3,
            bitrateMultiplier: 3,
            removeAudio: false,
            minimumBitrate: 300000
        });
        const thumbnail = await ProcessingManager.getPreviewForSecond(result.source);
        return { path: result.source, thumbnail: thumbnail };
    }

    if (requestRunning) {
        return (<>
            <View style={videoStyles.uploadingconatiner}>
                <View style={videoStyles.animate}>
                    <LottieView
                        source={require('../../../Animations/uploading.json')}
                        colorFilters={[{
                            keypath: "button",
                            color: "black"
                        }, {
                            keypath: "Sending Loader",
                            color: "#F00000"
                        }]}
                        autoPlay={!uploaded}
                        loop={!uploaded}
                    />
                </View>
            </View>
            {!uploaded ?
                <View style={videoStyles.bottomSpace}>
                    <Title style={{ fontSize: 18, fontWeight: "bold", color: "black" }}>Please Wait</Title>
                    <Caption style={{ fontSize: 16, color: "black" }}>Uploading is in progress</Caption>
                </View>
                : <View style={videoStyles.bottomSpace}>
                    <Icon name="check-circle" size={30} style={{ marginBottom: 10 }} color="lightgrey" />
                    <Caption style={{ fontSize: 16, color: "black", marginBottom: 20 }}>Video uploaded Succesfully</Caption>
                    <Button mode="outlined" onPress={() => props.navigation.navigate('feedList')} >
                        Go Back to homeapge
                    </Button>
                </View>
            }

        </>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Video source={{ uri: props.route.params.source }}   // Can be a URL or a local file.
                paused={paused}
                repeat={true}
                resizeMode='cover'
                style={{ height: "100%", width: "100%" }}
            />
            <IconButton
                icon="close"
                size={30}
                color='red'
                style={{ ...videoStyles.statusbarheightheight, alignSelf: "flex-end", position: "absolute", zIndex: 20 }}
                onPress={() => props.navigation.goBack()}
            />
            <TouchableOpacity
                onPress={() => setpaused(!paused)}
                style={{ position: "absolute", height: "100%", justifyContent: "center", alignItems: "center", width: "100%", zIndex: 10 }}>

            </TouchableOpacity>
            <KeyboardAvoidingView
                behavior="padding"
                style={{ ...videoStyles.commentcontainer, position: "absolute", bottom: 0, zIndex: 20 }}
            >
                <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center", width: "100%" }}>
                    <TextInput
                        style={{ backgroundColor: 'transparent', width: "85%" }}
                        mode='flat'
                        textAlignVertical='center'
                        multiline={true}
                        maxLength={95}
                        value={description}
                        onChangeText={setDescription}
                        placeholder='Write a post Description..' />
                    <IconButton
                        icon="check-circle"
                        size={35}
                        onPress={() => handleSavePost()}
                    />
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}