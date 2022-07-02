import React, { useState,useEffect } from 'react'
import { View, Image, Text, ActivityIndicator } from 'react-native'
import styles from './styles';
import { useDispatch } from 'react-redux'
import { login, setUserData } from '../../../redux/actions';
import { Headline, Caption } from 'react-native-paper'
import { GoogleSigninButton, GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'
import { createNewuser } from '../../../Apis/LaravelApis';

const ENV = require('../../../../credentials');

GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/userinfo.profile"],
    webClientId: ENV.GOOGLE_WEB_CLIENT_ID,

});

export default function UserLogin(props) {

    const [signinStatus, setsigninStatus] = useState(false);

    const dispatch = useDispatch();

    /**
     * Closing the loader on return
     */

    useEffect(() => {
      return () => {
        setsigninStatus(false);
      }
    }, [])
    

    /**
     * dispatch login action
     */
    const onGoogleButtonPress = async () => {
       
        const { idToken } = await GoogleSignin.signIn();
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        dispatch(login(googleCredential))
            .then((data) => {
                setsigninStatus(true);
                dispatch(createNewuser(data)).then((newData) => {
                   
                    if(!newData.status){
                        props.navigation.navigate("Error", { error:newData.message });
                    }else{
                        dispatch(setUserData(newData))}
                }).catch((error) => {
                    console.log(error)
                    props.navigation.navigate("Error", { error });
                })
        
            })
            .catch((e) => {
                setsigninStatus(false);
                props.navigation.navigate("Error", { error: "Something went wrong while login" })
            })
    }


    return (
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Image
                    source={require('../../../../assets/logo.png')} style={styles.image} />
                <Headline style={styles.textStyle}>Tooday</Headline>
                <Caption style={{ color: "black" }}>Stay updated about the things, happening in your city.</Caption>
            </View>
            <ActivityIndicator size="small" color="black" style={{ display: signinStatus ? 'flex' : 'none' }} />
            <View style={{ alignItems: "center" }}>
                <Text style={styles.textStyle}>Login to Continue</Text>
                <GoogleSigninButton
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => onGoogleButtonPress()}
                    disabled={signinStatus}
                />
            </View>
        </View>
    )
}
