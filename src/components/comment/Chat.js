import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-paper';
import { changeDateForamt } from '../../helpers';
import {Caption} from 'react-native-paper'

const Chat = ({ item }) => {
  
    return (<View>
        <View style={[{
            overflow: "hidden",
            margin: 10,
            borderRadius: 15,
            flexWrap: "wrap"
        }]}>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                <Avatar.Image size={30} source={{ uri: item?.item?.user?.profile}} style={{ marginRight: 10 }} />
                <Caption   textBreakStrategy='highQuality' style={styles.Text}>{item?.item?.comment}</Caption>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end", width: "100%", marginTop: 5 }}>
                <Text style={styles.TextTime}> { item?.item?.user?.name} | {changeDateForamt(new Date(item.item?.created_at))} ago</Text>
            </View>
        </View>
    </View>
    )
}

export default Chat

const styles = StyleSheet.create({
    Text: {
        color: "white",
    },
    TextTime: {
        color: "grey",
        fontSize: 11,
        marginRight: 5
    }
})