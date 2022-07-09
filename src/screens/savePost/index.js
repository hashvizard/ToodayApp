import { StackActions, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ActivityIndicator, Image, Text,Alert, KeyboardAvoidingView, View, TouchableOpacity } from 'react-native'
import styles from './styles'
import videoStyles from '../../styles/VideoStyles'
import { TextInput, Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { Title, Caption, } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler'
import * as RootNavigation from '../../../RootNavigation';
import { useSelector } from 'react-redux'

export default function SavePostScreen(props) {

    const [description, setDescription] = useState('')
    const [location, setlocation] = useState('');
    const locationIcon = <TextInput.Icon name="pound" color="#d9534f" />
    const user = useSelector(state => state.auth.currentUser);

    const handleSavePost = async () => {
        let videodata = { video: props.route.params.source, description: description, location: location };
        RootNavigation.navigate('home', { data: videodata });
    }

const createTwoButtonAlert = () =>
    Alert.alert(
      "Uploading..",
      "Sorry, Currently you can't share content with your city",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () =>  RootNavigation.navigate('home')}
      ]
    );

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
                        style={{ margin: 10, backgroundColor: "white" }}
                        mode='flat'
                        theme={{ colors: { primary: '#292b2c', underlineColor: 'transparent', text: 'black' } }}
                        placeholderTextColor="black"
                        textAlignVertical='center'
                        textContentType="location"
                        left={locationIcon}
                        maxLength={25}
                        value={location}
                        onChangeText={(text) => setlocation(text)}
                        placeholder='Enter the Title' />

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
                    <Button icon="video-outline" 
                         labelStyle={{color:"white"}}
                    disabled={location != '' && description != '' ? false : true}
                        mode="outlined" style={{ marginTop: 25, margin: 10, backgroundColor: "#5bc0de" }}
                        onPress={() => createTwoButtonAlert()}>
                        Post Now
                    </Button>
                </ScrollView>
            {/* </KeyboardAvoidingView> */}
        </View>
    )
}