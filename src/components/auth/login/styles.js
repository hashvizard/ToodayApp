import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor:"white"
    },
    image: {
        width: 60,
        height: 60,
        resizeMode: "center"
    },
    headingContainer: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center"
    },
    textStyle: {
        paddingVertical: 15,
        color: '#292b2c'
    }
});

export default styles;