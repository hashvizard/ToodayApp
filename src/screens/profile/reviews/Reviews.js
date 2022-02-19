import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-paper';
import { changeDateForamt } from '../../../helpers';
import { useUser } from '../../../hooks/useUser';

const Reviews = ({ item }) => {
    const user = useUser(item.item.creator).data
    return (<View>
        <View style={[{
            overflow: "hidden",
            margin: 10,
            borderRadius: 15,
            flexWrap: "wrap"
        }]}>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                <Avatar.Image size={25} source={{ uri: user?.photoURL }} style={{ marginRight: 10 }} />
                <Text style={styles.Text}>{item.item.comment}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end", width: "100%", marginTop: 5 }}>
                <Text style={styles.TextTime}> {user?.displayName} | {changeDateForamt(item.item.creation?.seconds * 1000)} ago</Text>
            </View>
        </View>
    </View>
    )
}

export default Reviews

const styles = StyleSheet.create({
    Text: {
        color: "#000",
        fontSize: 15,
    },
    TextTime: {
        color: "#00000073",
        fontSize: 11,
        marginRight: 5
    }
})