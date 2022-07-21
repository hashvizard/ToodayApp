import React, { useState, useEffect } from 'react'
import { Image, Text, View, TouchableOpacity } from 'react-native'
import styles from './styles'
import { TextInput, Button } from 'react-native-paper';
import { Title, Caption, } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler'
import * as RootNavigation from '../../../RootNavigation';
import { useDispatch, useSelector } from 'react-redux'
import { uploadingPostData } from '../../redux/actions'
import { ProcessingManager } from 'react-native-video-processing';



export default function SavePostScreen(props) {

    const [description, setDescription] = useState('')
    const [location, setlocation] = useState('');
    const [uploading, setUploading] = useState(false);
    // active button to know status of processing
    const [active, setActive] = useState(false);
    // Error in uploading
    const [error, setError] = useState(false);


    const [data, setdata] = useState(null);
    const locationIcon = <TextInput.Icon name="pound" color="#d9534f" />
    const user = useSelector(state => state.auth.currentUser);
    const dispatch = useDispatch()

    useEffect(() => {
        handleSavePost();
        return () => {
            setActive(false);
        }
    }, [props.route.params.source])


    useEffect(() => {
        updateNow(data)
    }, [data, uploading])


    const updateNow = (data) => {
        console.log("reached herr")
        if (data != null && location != null && uploading && description != null && !error) {
            let videodata = {
                description: description,
                location: location,
                video:data.path,
                thumbnail:data.thumbnail
            };

            dispatch(uploadingPostData(videodata));
            setUploading(false);
            RootNavigation.navigate('home');
        }
    }
    const handleSavePost = async () => await getData() ;


    const getData = async () => {

        let path = props.route.params.source;

        const origin = await ProcessingManager.getVideoInfo(path);

        if (origin?.duration <= 300 && props.route.params.size < 20971520) { // here size is 20 MB
            try {
                const thumbnail = await ProcessingManager.getPreviewForSecond(path);
                setdata({ path: props.route.params.source, thumbnail: thumbnail });
            } catch (error) {
                setUploading(false);
            }
        } else {
            setActive(false)
            setError(true);
            console.log("video is tooo large")
        }
    }

    // const createTwoButtonAlert = () =>
    //     Alert.alert(
    //         "Uploading..",
    //         "Uploading has been started in the background, we will notify you once it's been done",
    //         [
    //             {
    //                 text: "OK", onPress: () => {
                      
    //                 }
    //             }
    //         ]
    //     );

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ ...styles.imgComponent }}>
                <View style={{ width: "60%" }}>
                    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", }}
                        onPress={() => props.navigation.goBack()}>
                        <Icon name='arrow-left' size={35} color="#292b2c" />
                        <Text style={{ marginLeft: 20, fontSize: 18, color: "#292b2c" }}>Go Back</Text>
                    </TouchableOpacity>
                    <Text style={{ color: "#292b2c", marginVertical: 20 }}>This Post will only be visible to  <Title style={{ color: "black" }}> {user.city} </Title> City</Text>
                    <Caption style={{ color: "#d9534f", display: error ? "flex" : "none" }} >Video length should be less than 5 minutes and Size should be less than 20MB</Caption>

                </View>
                <Image
                    resizeMode='cover'
                    style={{ aspectRatio: 9 / 16, width: "30%", borderRadius: 10, resizeMode: "cover", borderWidth: 1, borderColor: "darkgrey" }}
                    source={{ uri: props.route.params.source }}
                />
            </View>{/* 
            <KeyboardAvoidingView
                behavior="padding"
                style={{ ...videoStyles.stylePost }}> */}
            <ScrollView contentContainerStyle={{ backgroundColor: "white" }}>
                <TextInput
                    style={{ margin: 10, backgroundColor: error ? "lightgrey" : "white" }}
                    mode={error ? 'outlined' : "flat"}
                    disabled={error}
                    autoFocus={true}
                    theme={{ colors: { underlineColor: 'transparent', text: 'black' } }}

                    textAlignVertical='center'
                    textContentType="location"
                    left={locationIcon}
                    maxLength={25}
                    value={location}
                    onChangeText={(text) => setlocation(text)}
                    placeholder='Enter the Title' />

                <TextInput
                    style={{ margin: 10, backgroundColor: error ? "lightgrey" : "white" }}
                    mode={error ? 'outlined' : "flat"}
                    disabled={error}
                    theme={{ colors: { underlineColor: 'transparent', text: 'black' } }}

                    multiline={true}
                    returnKeyType="done"
                    // placeholderTextColor="black"
                    // outlineColor='red'
                    textAlignVertical='center'
                    // theme={{ colors: { primary: '#292b2c', underlineColor: 'transparent', text: 'black' } }}
                    maxLength={150}
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    placeholder='Write post Description..' />
                <Button icon="check"
                    loading={uploading}
                    labelStyle={{ color: "white" }}
                    disabled={(location != '' && description != '') && !error ? false : true}
                    mode="contained" style={{ marginTop: 25, margin: 10 }}
                    onPress={() =>
                        setUploading(true)
                    }>
                    Post Now
                </Button>
            </ScrollView>
            {/* </KeyboardAvoidingView> */}
        </View>
    )
}