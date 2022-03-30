import React, { useState, useEffect } from 'react'
import { FlatList, View, ActivityIndicator, Text } from 'react-native'
import videoStyles from '../../styles/VideoStyles';
import { getUserPosts } from '../../Apis/LaravelApis/postApi';
import { useDispatch } from 'react-redux'
import ProfilePostListItem from '../profile/postList/item';
import { Title } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
export default function UserPosts(props) {


    const [userPosts, setUserPosts] = useState([]);
    const [nextpage, setnextpage] = useState(null)
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setloading] = useState(false)

    const dispatch = useDispatch();
    useFocusEffect(
        React.useCallback(() => {
            console.log(props.route.params.id)
            if(props.route.params.id){
            setloading(true);
            dispatch(getUserPosts(`posts/${props.route.params.id}`))
                .then(data => {
                    setloading(false);
                    setUserPosts(data.posts.data);
                    setnextpage(data.posts.next_page_url);
                }).catch(err => console.log("wewe", err));

            }
            return () => {
                setloading(false);
                setUserPosts([]);
                setnextpage(null);
            }
        }, [props.route.params.id])
    );


    const onEnd = () => {
        if (nextpage != null && !refreshing) {
            setRefreshing(true);
            dispatch(getUserPosts(nextpage))
                .then(data => {
                    console.log(data.posts.data)
                    let dataa = [...userPosts, ...data.posts.data];
                    setUserPosts(dataa);
                    setnextpage(data.posts.next_page_url);
                    setRefreshing(false);
                }).catch(err => {
                    console.log(err)
                    setRefreshing(false);
                });
        } else {
            console.log(nextpage)
        }
    }

    return (<View style={{ flex: 1, ...videoStyles.spaceBottom }}>
        {loading == true || userPosts.length <= 0 ?
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator color="black" size="small" style={{ display: loading ? "flex" : "none" }} />
                <Text style={{ marginTop: 25, display: loading ? "flex" : "none" }}>Loading <Title>Posts</Title></Text>
                <Text style={{ display: !loading && userPosts.length <= 0 ? "flex" : "none" }}>You don't have any <Title>Posts</Title></Text>
            </View>
            :
            <FlatList
                numColumns={3}
                removeClippedSubviews={true}
                maxToRenderPerBatch={20}
                updateCellsBatchingPeriod={10}
                initialNumToRender={20}
                data={userPosts}
                ListFooterComponent={() => <ActivityIndicator color='black' size="small" style={{ marginVertical: 10, display: refreshing ? "flex" : "none" }} />}
                onEndReached={onEnd}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (<ProfilePostListItem item={item} />)}
            />
        }
    </View>)
}