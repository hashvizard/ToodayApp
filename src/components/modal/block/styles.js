import { StyleSheet,  Dimensions } from 'react-native';


const SCREEN_HEIGHT = Dimensions.get('screen').height;

const blockStyles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 15,
        marginHorizontal:15,
        marginBottom:SCREEN_HEIGHT/7,
        borderRadius:15
    }
})

export default blockStyles