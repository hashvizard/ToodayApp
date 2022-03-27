
import { StyleSheet, StatusBar, Dimensions, Appearance } from 'react-native';

const MODE = Appearance.getColorScheme();
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24;
const NAVIGATION_BAR_HEIGHT = SCREEN_HEIGHT - Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"white",
        marginBottom: NAVIGATION_BAR_HEIGHT,
    },
    textInput: {
        margin: 10,
        backgroundColor: 'lightgray',
        padding: 5,
        borderRadius: 4,
    }
});

export default styles;