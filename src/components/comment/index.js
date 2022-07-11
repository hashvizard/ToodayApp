import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { FlatList, ImageBackground, KeyboardAvoidingView, Text, ActivityIndicator, TouchableOpacity, View, Keyboard } from 'react-native'
import Chat from './Chat'
import videoStyles from '../../styles/VideoStyles'
import { IconButton, TextInput, Title } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { addComment, getPostComments } from '../../Apis/LaravelApis/postApi';

export default function CommentModal(props) {
    
    const dispatch = useDispatch();
    const [comment, setComment] = useState('')
    const [commentList, setCommentList] = useState([])
    const currentUser = useSelector(state => state.auth.currentUser)
    const [loading, setloading] = React.useState(true)
    const [totalComments, settotalComments] = React.useState(0)
    const [nextUrl, setNextUrl] = useState(null)
    const [refreshing, setRefreshing] = React.useState(false);
    const user = useSelector(state=>state.auth.currentUser)
    const feedState = useSelector(state => state.feedState.active);
    const [focused,setFocused] = useState(true);
    const TextInputRef = useRef();

    useFocusEffect(
        React.useCallback(() => {
            setloading(true);
            TextInputRef.current.focus();
            if (props.route.params?.id) {
                dispatch(getPostComments(`comment/${props.route.params.id}`))
                    .then(data => {
                        setloading(false);
                        settotalComments(data.data.total);
                        setCommentList(data.data.data);
                        setNextUrl(data.data.next_page_url);
                    }).catch(err => console.log(err));
            }
       
            return () => {
                TextInputRef.current.blur();
                setCommentList([]);
                setComment('')
            }
        }, [])
    );
    const ScrollToBottom = () => {
        if (commentList.length != 0) {
            flatListRef.scrollToIndex({ animated: true, index: 0 });
        }
    }

    const handleCommentSend = () => {
        if (comment != '') {
            let data = {
                user_id: currentUser?.id,
                post_id: props.route.params?.id,
                comment: comment
            };

            dispatch(addComment(data)).then(data => {
                if (data.status) {
                    ScrollToBottom();
                    setCommentList([...data.data, ...commentList]);
                    settotalComments(totalComments + 1);
                    setComment('');
                    Keyboard.dismiss();
                }
            }).catch(err => {
                console.log("er", err);
            });
        }
    }



    const onEnd = () => {
        if (nextUrl != null && !refreshing) {
            setRefreshing(true);
            dispatch(getPostComments(nextUrl))
                .then(data => {
                    let dataa = [...commentList, ...data.data.data];
                    setCommentList(dataa);
                    setNextUrl(data.data.next_page_url);
                    setRefreshing(false);
                }).catch(err => {
                    console.log(err)
                    setRefreshing(false);
                });
        }
    }


    const NavigateBack = () => {

        switch (feedState) {
            case 'profile':
                props.navigation.navigate('profileFeed', { totalComments: totalComments })
                break;
            case 'View':
                props.navigation.navigate('ViewedFeed', { totalComments: totalComments })
                break;
                case 'UserPosts':
                    props.navigation.navigate('UserFeeds', { totalComments: totalComments })
                    break;
            default:
                props.navigation.navigate('home', { totalComments: totalComments });
                break;
        }

    }
    return (<>
        <ImageBackground
            style={{
                flex: 1
            }}
            source={require('../../../assets/background.jpg')} resizeMode="cover">
            <KeyboardAvoidingView
                behavior="padding"
                style={videoStyles.commentcontainer}
            >
                <TouchableOpacity
                    onPress={() => NavigateBack()}
                    style={{ alignItems: "center", justifyContent: "space-between", flexDirection: "row", paddingTop: 30 }}>
                    <View style={{ alignItems: "center", flexDirection: "row" }}>
                        <IconButton
                            icon="arrow-left"
                            size={25}
                            color='white'
                            style={{ alignSelf: "flex-start", }}

                        />

                        <Title style={{color:"white"}} >Comments </Title>
                    </View>
                    <Text style={{ marginRight: 25,color:"white" }}>Total <Title style={{color:"white"}}>{totalComments}</Title></Text>

                </TouchableOpacity>

                {loading == true || commentList.length <= 0 ?
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <ActivityIndicator color="white" size="small" style={{ display: loading ? "flex" : "none" }} />
                        <Text style={{ marginTop: 25, display: loading ? "flex" : "none",color:"white" }}>Loading <Title style={{color:"white"}}>Comments</Title></Text>
                        <Text style={{ display: !loading && commentList.length == 0 ? "flex" : "none",color:"white" }}>Post don't have any <Title style={{color:"white"}}>Comments</Title></Text>
                    </View>
                    :
                    <FlatList
                        ref={(ref) => { flatListRef = ref; }}
                        data={commentList}
                        inverted
                        renderItem={(item) => {
                            return <Chat item={item} />
                        }}
                        keyExtractor={(item, index) => index}
                        ListFooterComponent={() => <ActivityIndicator color='white' size="small" style={{ marginVertical: 10, display: refreshing ? "flex" : "none" }} />}
                        onEndReached={onEnd}
                    />
                }
                <TextInput
                    style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                    mode='flat'
                    ref={TextInputRef}
                    onFocus={()=> setFocused(true)}
                    onBlur={()=>setFocused(false)}
                    
                    // theme={{ colors: { text: "white" } }}
                    label={focused?user?.name:'Write a comment..'}
                    theme={{
                        colors: {
                          primary:'#5bc0de',
                          
                        }
                      }}
                    underlineColor="black"
                    blurOnSubmit={false}
                    onSubmitEditing={() => handleCommentSend()}
                    value={comment}
                    placeholderTextColor={"lightgrey"}
                    labelTextColor="#292b2c"
                    onChangeText={setComment}
                    placeholder='Write a comment..' />
            </KeyboardAvoidingView>
        </ImageBackground>
    </>
    );
}