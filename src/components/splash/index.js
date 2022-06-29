import React from 'react'
import { Animated, Easing, Text } from 'react-native'
import { Headline, Title } from 'react-native-paper';
import styles from './styles';
const SplashScreen = () => {

    let scaleValue = new Animated.Value(0);
    const scale = scaleValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 1.1, 1]
    });
    Animated.loop(
        Animated.timing(
            scaleValue,
            {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true
            }
        )
    ).start();

    return (
        <Animated.View style={styles.containerSplash}>
            <Animated.Image
                source={require('../../../assets/logo.png')} style={{ ...styles.image, transform: [{ scale: scale }], }} />
          
        </Animated.View>
    )
}

export default SplashScreen

