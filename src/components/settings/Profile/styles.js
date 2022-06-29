import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    imageContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection:"row",
      padding:15
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
        bottom:5,
        right:5
    }
});

export default styles;