import React from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native';
import videoStyles from '../../styles/VideoStyles';

const LoadingScreen = () => {
    return (
        <View style={videoStyles.animate}>
            <LottieView
                source={require('../../../Animations/loading.json')}
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

export default LoadingScreen

