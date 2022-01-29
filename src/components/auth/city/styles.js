import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
        justifyContent: "space-evenly",
        alignItems: "center"
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
        color: 'white'
    }
});

export default styles;