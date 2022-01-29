import { StyleSheet, StatusBar, Dimensions, Appearance } from 'react-native';

const MODE = Appearance.getColorScheme();

const styles = StyleSheet.create({
    containerSplash: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    },
    image: {
        width: "20%",
        height: "20%",
        resizeMode: "center"
    },
    darkTextShadow: {
        textShadowColor: MODE == 'dark' ? 'black' : 'white',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    }
});

export default styles;