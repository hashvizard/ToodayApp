import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding:15,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
    },
    counterContainer: {
        paddingTop: 20,
        paddingBottom:10,
        flexDirection: 'row',
    },
    counterItemContainer: {
        flex: 1,
        alignItems: 'center'
    },
    emailText: {
        padding: 20,
    },
    counterNumberText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    counterLabelText: {
        color: 'gray',
        fontSize: 11
    }
});

export default styles;