import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import videoStyles from '../styles/VideoStyles'
import { Avatar, IconButton, Title, Button, Menu, Divider, Provider, Paragraph } from 'react-native-paper'

const Header = () => {
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);
    return (
        <View style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
            {/* Top */}
            <View style={{ ...videoStyles.spaceTop, width: "100%", marginTop: 15, alignItems: "center", justifyContent: "space-between", position: "absolute", zIndex: 21 }}>
                <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", width: "100%", justifyContent: 'space-between' }}>
                    <View style={{ alignItems: "flex-start",justifyContent:"flex-start",alignSelf:"flex-start", width: "55%", padding: 15 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Avatar.Image size={30} source={{ uri: "https://picsum.photos/200" }} />
                            <Title style={{ marginLeft: 15, flexWrap: "wrap", }}>Vikas Semwal</Title>
                        </View>
                        <Paragraph style={{ display: visible ? "flex" : "none", alignSelf: "center" }}>Enginear</Paragraph>
                    </View>
                    <View style={{ width: "35%", alignItems: "flex-end" }}>
                        {!visible ?
                            <IconButton
                                icon="dots-horizontal"
                                style={{ marginRight: 25 }}
                                color="black"
                                size={35}
                                onPress={() => setVisible(true)}
                            /> :
                            <Provider>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}>
                                </View>
                                <View>
                                    <Menu.Item icon="cancel" onPress={() => { }} title="Block" />
                                    <Menu.Item icon="help-circle" onPress={() => { }} title="Report" />
                                    <Divider />
                                    <Menu.Item icon="close" onPress={() => { setVisible(false) }} title="clsoe" />
                                </View>
                            </Provider>
                        }
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({})