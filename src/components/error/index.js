import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LottieView from 'lottie-react-native';
import { Button, Caption } from 'react-native-paper';
const Error = (props) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ position: "absolute", alignItems: "center", width: "100%", height: "100%", flex: 1, justifyContent: "space-around" }}>
                <View style={{ alignItems: "center" }}>
                    <Text>Error</Text>
                    <Caption>{props.route.params.error}</Caption>
                </View>
                <Button style={{ zIndex: 50 }} mode="outlined" onPress={() => props.navigation.goBack()}>
                    Give one more try
                </Button>
            </View>
            <LottieView
                source={require('../../../Animations/error.json')}
                colorFilters={[{
                    keypath: "button",
                    color: "black"
                }, {
                    keypath: "Sending Loader",
                    color: "#F00000"
                }]}
                autoPlay={true}
                loop={true}
            />
        </View>
    )
}

export default Error

const styles = StyleSheet.create({})
