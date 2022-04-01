import { View, Text } from 'react-native'
import React from 'react'
import videoStyles from '../styles/VideoStyles'
import { IconButton, Paragraph, Subheading } from 'react-native-paper'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FAB, Portal, Provider, Avatar } from 'react-native-paper';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
const Footer = () => {

    const [state, setState] = React.useState({ open: false });
    const [visible, setvisible] = React.useState(false);

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;

    return (<View style={{ ...videoStyles.spaceBottom, borderColor: "red", width: "100%", position: "absolute", zIndex: 21 }}>

        <View style={{ alignItems: "flex-end", flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", padding: 15, alignItems: "center", flexWrap: "wrap", zIndex: 0, width: "75%", }}>
                <FontAwesome name='map-marker' size={24} />
                <Subheading style={{ marginLeft: 15 }}>Ghanta Ghar</Subheading>
                <Paragraph style={{ marginTop: 15, paddingTop: 0 }}>Traveling is not just my hobbie its a passion for life time acheviment</Paragraph>
            </View>
            <View style={{ width: "25%", alignItems: "center" }}>
                <IconButton
                    style={{ display: visible ? "none" : "flex" }}
                    icon="rotate-left"
                    animated={true}
                    size={45}
                    onPress={() => setvisible(true)}
                />
                <IconButton
                    icon="cog"
                    size={40}
                    animated={true}
                    style={{ display: visible ? "flex" : "none" }}
                    onPress={() => console.log('Pressed')}
                />

                <IconButton
                    style={{ display: visible ? "flex" : "none" }}
                    icon="plus-circle"
                    animated={true}
                    size={40}
                    onPress={() => console.log('Pressed')}
                />
                <IconButton
                    style={{ display: visible ? "flex" : "none" }}
                    icon="bell-circle"
                    animated={true}
                    size={40}
                    onPress={() => console.log('Pressed')}
                />
            </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flexDirection: "row", paddingHorizontal: 10, alignItems: "center", justifyContent: "space-between", width: "75%" }}>
                <IconButton
                    style={{ display: visible ? "flex" : "none" }}
                    icon="thumb-up"
                    animated={true}
                    size={34}
                    onPress={() => console.log('Pressed')}
                />
                <Text style={{ display: visible ? "flex" : "none" }}>10</Text>
                <IconButton
                    style={{ display: visible ? "flex" : "none" }}
                    icon="comment"
                    animated={true}
                    size={34}
                    onPress={() => console.log('Pressed')}
                />
                <Text style={{ display: visible ? "flex" : "none" }}>10</Text>
            </View>
            <View style={{ width: "25%", alignItems: "center" }}>
                <IconButton
                    style={{ display: visible ? "flex" : "none" }}
                    icon="rotate-right"
                    animated={true}
                    size={40}
                    onPress={() => setvisible(false)}
                />
            </View>
        </View>
    </View>
    )
}

export default Footer