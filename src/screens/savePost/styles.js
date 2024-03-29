import { StyleSheet, StatusBar, Dimensions, Appearance } from 'react-native';

const MODE = Appearance.getColorScheme();
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24;
const NAVIGATION_BAR_HEIGHT = 0;

const styles = StyleSheet.create({
  
    container: {
        marginTop: STATUS_BAR_HEIGHT,
        marginBottom: NAVIGATION_BAR_HEIGHT,
        flex: 1,
        width: "100%",
        backgroundColor: 'white'
    },
    imgComponent:{
        paddingTop: STATUS_BAR_HEIGHT + 20,
        padding: 20,backgroundColor:"white", flexDirection: "row", alignItems: "center", justifyContent: "space-between" 
    },
    uploadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    spacer: {
        flex: 1
    },
    formContainer: {
        margin: 20,
        flexDirection: 'row'
    },
    buttonsContainer: {
        flexDirection: 'row',
        margin: 20,
    },
    inputText: {
        paddingVertical: 10,
        marginRight: 20,
        flex: 1
    },
    mediaPreview: {
        aspectRatio: 9 / 16,
        backgroundColor: 'black',
        width: 60
    },
    cancelButton: {
        alignItems: 'center',
        flex: 1,
        borderColor: 'lightgray',
        borderWidth: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 4,
        marginRight: 10
    },
    postButton: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#ff4040',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 4,
        marginRight: 10
    },
    cancelButtonText: {
        marginLeft: 5,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16
    },
    postButtonText: {
        marginLeft: 5,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default styles;