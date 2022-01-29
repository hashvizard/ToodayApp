import React, { useState } from 'react'
import { View, Image, Text, ImageBackground, ActivityIndicator } from 'react-native'
import styles from './styles';
import { useDispatch } from 'react-redux'
import { login } from '../../../redux/actions';
import { Headline, Caption } from 'react-native-paper'
import { GoogleSigninButton, GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'

const ENV = require('../../../../credentials');

GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/userinfo.profile"],
    webClientId: ENV.GOOGLE_WEB_CLIENT_ID,

});

export default function UserLogin(props) {

    const [signinStatus, setsigninStatus] = useState(false);
    const image = require('../../../../assets/Startpage.jpg');

    const dispatch = useDispatch()

    /**
     * dispatch login action
     */
    const onGoogleButtonPress = async () => {
        setsigninStatus(true);
        const { idToken } = await GoogleSignin.signIn();
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        dispatch(login(googleCredential))
            .then(() => {
                console.log('login successful')
            })
            .catch((e) => {
                console.log('login unsuccessful')
                setsigninStatus(false);
                props.navigation.navigate("Error", { error: "Something went wrong while login" })
            })
    }


    return (
        <ImageBackground source={image} style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.headingContainer}>
                    <Image
                        source={require('../../../../assets/logo.png')} style={styles.image} />
                    <Headline style={styles.textStyle}>Tooday</Headline>
                    <Caption style={{ color: "white" }}>Stay updated about the things, happening in your city.</Caption>
                </View>
                <ActivityIndicator size="large" color="#ffffff" style={{ display: signinStatus ? 'flex' : 'none' }} />
                <View style={{ alignItems: "center" }}>

                    <Text style={styles.textStyle}>Login to Continue</Text>

                    <GoogleSigninButton
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Light}
                        onPress={() => onGoogleButtonPress()}
                        disabled={signinStatus}
                    />
                </View>
            </View>
        </ImageBackground>
    )
}
