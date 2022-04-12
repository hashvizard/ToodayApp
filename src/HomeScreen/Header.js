import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useEffect} from 'react'
import videoStyles from '../styles/VideoStyles'
import { Avatar, IconButton, Title, Button, Menu, Divider, Provider, Paragraph } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { blockAndRemove, openBlockModal, setFeedState } from '../redux/actions'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as RootNavigation from '../../RootNavigation';

const Header = ({user,showBlock,showReport}) => {

    const dispatch=useDispatch();
    const feedState = useSelector(state => state.feedState);
    const currentuser = useSelector(state => state.auth.currentUser);

    const BlockUser = ()=>{
        dispatch(setFeedState(null));
        showBlock()
    }

    const ReportVideo = ()=>{
        dispatch(setFeedState(null));
        showReport()
    }
    

    return (
        <View style={{ ...videoStyles.spaceTop, width: "100%", alignItems: "center", justifyContent: "space-between", position: "absolute", zIndex: 21 }}>
            <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", width: "100%", justifyContent: 'space-between' }}>
                <View style={{ alignItems: "flex-start", justifyContent: "flex-start", alignSelf: "flex-start", width: "55%", padding: 15 }}>
                        <TouchableOpacity onPress={()=> {
                            currentuser.id == user?.id ?RootNavigation.navigate('settings') :RootNavigation.navigate('profileOther',{user:user});
                            
                            }} style={{ flexDirection: "row", alignItems: "center" }}>
                        <Avatar.Image size={30} source={{ uri: user?.profile }} />
                        <Title style={{ marginLeft: 15, flexWrap: "wrap", color: "white" }}>{user?.name}</Title>
                        </TouchableOpacity>
                    <Paragraph style={{ display: feedState.open == "INFO" ? "flex" : "none", alignSelf: "center", color: "white" }}>{user?.profession}</Paragraph>
                </View>
                <View style={{ width: "35%", alignItems: "flex-end",display:currentuser.id == user?.id?"none":"flex" }}>
                    {feedState.open != "INFO" ?
                        <IconButton
                            icon="dots-horizontal"
                            style={{ marginRight: 10 }}
                            color="white"
                            size={35}
                            onPress={() => dispatch(setFeedState('INFO'))}
                        /> :
                        <Provider>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}>
                            </View>
                            <View>
                                <Menu.Item icon={({ size, color }) => (
                                    <Icon name="cancel"  color="white" size={24} />
                                )} titleStyle={{ color: "white" }} 
                                color="white" onPress={() => { BlockUser(user.id)}} title="Block" />
                                <Menu.Item
                                    icon={({ size, color }) => (
                                        <Icon name="help-circle" color="white" size={24} />
                                    )}
                                    titleStyle={{ color: "white" }} color="white" onPress={() => { ReportVideo()}} title="Report" />
                                <Divider />
                                <Menu.Item
                                    icon={({ size, color }) => (
                                        <Icon name="close" color="white" size={24} />
                                    )}
                                    titleStyle={{ color: "white" }} contentStyle={{ color: "red" }} onPress={() => { dispatch(setFeedState(null)) }} title="clsoe" />
                            </View>
                        </Provider>
                    }
                </View>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({})