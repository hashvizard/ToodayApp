import { StackActions, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ActivityIndicator, Image, Text, KeyboardAvoidingView, View, TouchableOpacity } from 'react-native'
import styles from './styles'
import Feather from 'react-native-vector-icons/Feather'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../../redux/actions'
import { ProcessingManager } from 'react-native-video-processing';
import Video from 'react-native-video';
import videoStyles from '../../styles/VideoStyles'
import { TextInput, Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { Title, Caption, } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler'
export default function SavePostScreen(props) {
    const [description, setDescription] = useState('')
    const [requestRunning, setRequestRunning] = useState(false)
    const [uploaded, setuploaded] = useState(false)
    const [paused, setpaused] = useState(true);
    const [location, setlocation] = useState('');
    const navigation = useNavigation()
    const dispatch = useDispatch();

    const locationIcon = <TextInput.Icon name="map-marker" color="#f0ad4e" />

    const user = useSelector(state => state.auth.currentUser);
    
    const handleSavePost = async () => {
        setRequestRunning(true)
        let data = await getData(props.route.params.source)
        dispatch(createPost(description, data.path, data.thumbnail, location))
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
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ ...styles.imgComponent }}>
                <View style={{ width: "60%" }}>
                    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", }}
                        onPress={() => props.navigation.goBack()}
                    >
                        <Icon name='arrow-left' size={35} color="#292b2c" />
                        <Text style={{ marginLeft: 20, fontSize: 18, color: "#292b2c" }}>Go Back</Text>
                    </TouchableOpacity>

                    <Text style={{ color: "#292b2c", marginVertical: 20 }}>This Post will only be visible to  <Title style={{ color: "black" }}> {user.city} </Title> City</Text>


                </View>
                <Image
                    resizeMode='cover'
                    style={{ aspectRatio: 9 / 16, width: "30%", borderRadius: 10, resizeMode: "cover", borderWidth: 1, borderColor: "darkgrey" }}
                    source={{ uri: props.route.params.source }}
                />
            </View>
            <KeyboardAvoidingView
                behavior="padding"
                style={{ ...videoStyles.stylePost }}
            >
                <ScrollView contentContainerStyle={{ backgroundColor: "white" }}>
                    <TextInput
                        style={{ margin: 10, backgroundColor: "white" }}
                        mode='flat'
                        multiline={true}
                        autoFocus={true}
                        returnKeyType="done"
                        placeholderTextColor="black"
                        outlineColor='red'
                        textAlignVertical='center'
                        theme={{ colors: { primary: '#292b2c', underlineColor: 'transparent', text: 'black' } }}
                        maxLength={150}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                        placeholder='Write post Description..' />

                    <TextInput
                        style={{ margin: 10, backgroundColor: "white" }}
                        mode='flat'
                        theme={{ colors: { primary: '#292b2c', underlineColor: 'transparent', text: 'black' } }}
                        placeholderTextColor="black"
                        textAlignVertical='center'
                        textContentType="location"
                        right={locationIcon}
                        maxLength={30}
                        value={location}
                        onChangeText={(text) => setlocation(text)}
                        placeholder='Enter the locality' />
                    <Button icon="video-outline" disabled={location != '' && description != ''?false:true}
                        mode="contained" style={{ padding: 5, marginTop: 25, margin: 10, backgroundColor: "#f0ad4e" }}
                        onPress={() => handleSavePost()}>
                        Post Now
                    </Button>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}