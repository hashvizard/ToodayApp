import { StyleSheet, StatusBar, Dimensions, Appearance } from 'react-native';

const MODE = Appearance.getColorScheme();
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24;
const NAVIGATION_BAR_HEIGHT = SCREEN_HEIGHT - Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,

    },
    galleryVideos: {
        aspectRatio: 9 / 16,
        resizeMode: "cover",
        marginRight: 8,
        borderRadius: 8,
        width: 70,
    },
    galleryViewVideos: {
        width: "33.3%",
        height: 100,
        borderWidth: 0.5,
        aspectRatio: 9 / 16,
        borderColor: "lightgrey"

    },
    galleryImages: {
        height: "100%",
        resizeMode: "cover",
        width: "100%",
    },
    bottomBarContainer: {
        width: "100%",
        position: 'absolute',
        bottom: NAVIGATION_BAR_HEIGHT,
    },
    botom: {
        paddingBottom: NAVIGATION_BAR_HEIGHT,


    },
    recordButtonContainer: {
        flex: 1,
        marginHorizontal: 30,
    },
    recordButton: {
        borderWidth: 8,
        alignItems: "center",
        justifyContent: "center",
        borderColor: '#ff404087',
        backgroundColor: '#ff4040',
        borderRadius: 100,
        height: 80,
        width: 80,
        alignSelf: 'center'
    },
    galleryButton: {
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        width: 50,
        height: 50,
    },
    galleryButtonImage: {
        width: 50,
        height: 50,
    },
    sideBarContainer: {
        top: STATUS_BAR_HEIGHT + 30,
        right: 0,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        position: 'absolute'
    },
    iconText: {
        color: 'white',
        fontSize: 12,
        marginTop: 5
    },
    sideBarButton: {
        alignItems: 'center',
        padding: 10, borderRadius: 30,
        elevation: 5,
        backgroundColor: "rgba(0,0,0,0.5)"
    }
});

export default styles;