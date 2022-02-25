import { StyleSheet, StatusBar, Dimensions, Appearance } from 'react-native';

const MODE = Appearance.getColorScheme();
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24;
const NAVIGATION_BAR_HEIGHT = SCREEN_HEIGHT - Dimensions.get('window').height;

const videoStyles = StyleSheet.create({
    commentcontainer: {
        marginTop: STATUS_BAR_HEIGHT,
        marginBottom: NAVIGATION_BAR_HEIGHT,
        flex: 1,
        width: "100%",
    },
    statusbarheightheight: {
        marginVertical: STATUS_BAR_HEIGHT + 30,
        borderWidth: 2,
        right: 5,
        borderColor: "lightgrey"
    },
    cropping: {
        flex: 1,
    },
    bottomSpace: {
        bottom: NAVIGATION_BAR_HEIGHT + 40,
        height: "40%",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },
    animate: {
        width: "80%",
        borderRadius: 20,
        height: 250,
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    uploadingconatiner: {
        position: "absolute",
        alignItems: "center",
        justifyContent: 'center',
        width: "100%",
        height: "100%",
        backgroundColor: "#f7f7f7"
    },
    backgroundVideo: {
        position: 'absolute',
        zIndex: 10,
        height: "100%",
        width: "100%",
        top: 0,
        zIndex: -5,
        left: 0,
        bottom: 0,
        right: 0,
    },
    animate: {
        position: 'absolute',
        height: "60%",
        top: 0,
        width: "100%",
        zIndex: -2
    },
    addFirst: {
        bottom: NAVIGATION_BAR_HEIGHT,
        position: "absolute",
        zIndex: 5,
        width: "100%",
        padding: 10
    },
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
    container: {
        flex: 1,
        zIndex: -3,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    },
    actionsContainer: {
        height: "65%",
        width: "33%"
    },
    actions: {
        height: "100%",
        width: "100%",
    },
    contianer: {
        paddingHorizontal: 15,
    },
    header: {
        top: STATUS_BAR_HEIGHT,
        width: "100%",
        position: "absolute",
        zIndex: 100,
    },
    containerContent: {
        paddingHorizontal: 10, borderRadius: 50,

        paddingVertical: 5,
        marginBottom: 8
    },
    darkTextShadow: {
        textShadowColor: MODE == 'dark' ? 'black' : 'white',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    imageShadow: {
        shadowColor: MODE == 'dark' ? 'black' : 'white',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 5,
        width: 30,
        height: 30,
        resizeMode: "center"
    },
    containers: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 0,
        flexDirection: "row"
    },
    playPause: {
        justifyContent: "center",
        alignItems: "center"
    },
    animation: {
        height: "100%",
        width: "100%",
        position: "absolute",
        zIndex: -3,
    },
    like_and_dislike: {
        zIndex: -2,
        height: "100%",
        position: 'absolute',
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    profile_container: {
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    button_container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: -10
    },
    Video_Details_Container: {
        height: SCREEN_HEIGHT,
        paddingTop: STATUS_BAR_HEIGHT,
        paddingBottom: NAVIGATION_BAR_HEIGHT,
        justifyContent:"flex-end"
    },
    Screen_height: {
        height: SCREEN_HEIGHT,
    },
    seek_buttons_container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    seek_button: {
        alignItems: "center",
        flexDirection: "row"
    }
});

export default videoStyles;