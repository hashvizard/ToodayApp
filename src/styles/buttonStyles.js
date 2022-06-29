import { StyleSheet } from "react-native";
const buttonStyles = StyleSheet.create({
    grayOutlinedButton: {
        borderColor: 'lightgray',
        borderWidth: 1,
        alignItems:'center',
    
        flexDirection:"row",
        justifyContent:"space-around",
        backgroundColor:"#5bc0de",
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 30,
        width:"100%"
    },
});

export default buttonStyles;