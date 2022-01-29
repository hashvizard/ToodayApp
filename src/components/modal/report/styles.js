import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 200,
    },
    contentContainer: {
        backgroundColor: "white",
    },
    sectionHeaderContainer: {
        backgroundColor: "white",
        paddingHorizontal: 20,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 0,
    },
    sectionFooterContainer: {
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
    },
    itemContainer: {
        padding: 6,
        margin: 6,
        flexDirection: "row",
        alignItems: "center",
    },
})

export default styles