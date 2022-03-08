import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    imageContainer: {
        justifyContent: "center",
        alignSelf: "center",
        margin: 15,
        borderRadius: 150,
        overflow: "hidden"
    },
    loadingIndicator: {
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.4)",
        width: "43%",
        height: "100%",
        zIndex: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"

    },
    icon: {
        position:'absolute',
        bottom:0,
        right:0
    }
});

export default styles;