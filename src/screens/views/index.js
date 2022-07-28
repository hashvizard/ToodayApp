import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { List, Avatar, Title } from 'react-native-paper';
import { postViewUserData } from '../../Apis/LaravelApis/postApi';
import * as RootNavigation from '../../../RootNavigation';

const Views = (props) => {

    const dispatch = useDispatch();
    const [data, setdata] = useState([]);
    const [activity, setactivity] = useState({ id: null, status: false });
    const [loading, setLoading] = useState(false);
    const [nextUrl, setNextUrl] = useState(null)
    const [refreshing, setRefreshing] = React.useState(false);
    const currentuser = useSelector(state => state.auth.currentUser);

    useEffect(() => {
        setLoading(true)
        dispatch(postViewUserData(props.route?.params?.id)).then(val => {
            if (val.status) {
                setdata(val?.data?.data)
                setNextUrl(val?.data?.next_page_url);
            }
            setLoading(false)
        }).catch(err => {
            console.log(err.message)
        })

        return () => {

        }
    }, [])

    const onEnd = () => {
        if (nextUrl != null && !refreshing) {
            setRefreshing(true);
            dispatch(getProfileReviews(nextUrl))
                .then(data => {
                    let dataa = [...reviewList, ...data.data.data];
                    setdata(dataa);
                    setNextUrl(data.data.next_page_url);
                    setRefreshing(false);
                }).catch(err => {
                    console.log(err)
                    setRefreshing(false);
                });
        }
    }

    const renderItem = ({ item, index }) => {
        return (
            <List.Item
                title={item?.name}
                description={item?.profession}
                onPress={() => {
                    currentuser.id == item?.id ? RootNavigation.navigate('settings', { myParam: undefined }) : RootNavigation.navigate('profileOther', { user: item });
                }}
                left={props => <Avatar.Image size={35} style={{ alignSelf: "center", marginRight: 10 }} source={{ uri: item?.profile }} />}
            />
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
            {loading == true || data.length <= 0 ?
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <ActivityIndicator color="black" size="small" style={{ display: loading ? "flex" : "none" }} />
                    <Text style={{ marginTop: 25, display: loading ? "flex" : "none" }}>Loading <Title>List</Title></Text>
                    <Text style={{ display: !loading && data.length <= 0 ? "flex" : "none" }}>Post don't have any <Title>Views</Title></Text>
                </View>
                :
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    ListFooterComponent={() => <ActivityIndicator color='white' size="small" style={{ marginVertical: 10, display: refreshing ? "flex" : "none" }} />}
                    onEndReached={onEnd}
                />
            }
        </View>
    )
}

export default Views

const styles = StyleSheet.create({})