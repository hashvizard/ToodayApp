import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { FlatList, ImageBackground, Text,ActivityIndicator, KeyboardAvoidingView, View, Alert, RefreshControl } from 'react-native'
import Reviews from './Reviews'
import videoStyles from '../../../styles/VideoStyles'
import {  IconButton, TextInput, Title } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { addReviews, clearReviewListener, reviewListner } from '../../../services/posts'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { addProfileReviews, getProfileReviews } from '../../../Apis/LaravelApis/userApi';



export default function ReviewModal(props) {

    const initialUserId = useSelector(state => state.initialPost.userId);
    const ref=useRef();
    const dispatch = useDispatch();
    const [review, setReview] = useState('')
    const [reviewList, setReviewList] = useState([])
    const [nextUrl, setNextUrl] = useState(null)
    const currentUser = useSelector(state => state.auth.currentUser)
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setloading] = React.useState(true)
    const [totalReviews, settotalReviews] = React.useState(0)
 
    useFocusEffect(
        React.useCallback(() => {
            setloading(true);
            if (props.route.params?.id) {
                dispatch(getProfileReviews(`reviews/${props.route.params.id}`))
                    .then(data => {
                        setloading(false);
                        settotalReviews(data.data.total);
                        setReviewList(data.data.data);
                        setNextUrl(data.data.next_page_url);
                    }).catch(err => console.log(err));
            }
            else {
                dispatch(getProfileReviews(`reviews/${initialUserId}`))
                    .then(data => {
                       
                    }).catch(err => console.log(err));
            }
          
            return () => {
             
                setReviewList('')
            }
        }, [initialUserId, props.route.params?.id])
    );
    const handleReviewSend = () => {
        if (review.length == 0) {
            return;
        }
        setReview('')
        if (props.route.params?.id) {
            let data = {
                writer_user_id: props.route.params?.id,
                profile_user_id: props.route.params?.id,
                review: review
            };

            dispatch(addProfileReviews(data)).then(data => {
                if (data.status) {
                    ScrollToBottom();
                    setReviewList([...data.data, ...reviewList]);
                    settotalReviews(totalReviews+1);
                }
            }).catch(err => {
                console.log(err);
            });

        }
        else addReviews(initialUserId, currentUser.uid, review);

    }
    const onEnd = () => {
        if (nextUrl != null && !refreshing) {
            setRefreshing(true);
            dispatch(getProfileReviews(nextUrl))
                .then(data => {
                    let dataa = [...reviewList, ...data.data.data];
                    setReviewList(dataa);
                    setNextUrl(data.data.next_page_url);
                    setRefreshing(false);
                }).catch(err => {
                    console.log(err)
                    setRefreshing(false);
                });
        }
    }

    const ScrollToBottom=()=>{
        if (reviewList.length != 0) {
        flatListRef.scrollToIndex({ animated: true, index: 0 });
        }
    }
    const element = <TextInput.Icon  name="send" onPress={() => handleReviewSend()} />

  
    return (<>
        <ImageBackground
            style={{
                flex: 1
            }}
            source={require('../../../../assets/background.png')} resizeMode="cover">
            <KeyboardAvoidingView
                behavior="padding"
                style={videoStyles.commentcontainer}
            >
                <TouchableOpacity 
                onPress={() => props.navigation.goBack()} 
                style={{ alignItems: "center",justifyContent:"space-between", flexDirection: "row", paddingTop: 10 }}>
                    <View style={{alignItems:"center",flexDirection:"row"}}>
                    <IconButton
                        icon="arrow-left"
                        size={25}
                        color='black'
                        style={{ alignSelf: "flex-start", }}

                    />
                   
                    <Title>Reviews</Title>
                    </View>
                    <Text style={{marginRight:25}}>Total <Title>{totalReviews}</Title></Text>
                
                </TouchableOpacity>

                {loading == true || reviewList.length <= 0 ?
                <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                        <ActivityIndicator color="white" size="small" style={{display:loading?"flex":"none"}} />
                        <Text style={{marginTop:25,display:loading?"flex":"none"}}>Loading <Title>Reviews</Title></Text>
                        <Text style={{display:!loading && reviewList.length <= 0 ?"flex":"none"}}>No <Title>Reviews</Title> Found</Text>
                </View>
                :
                 <FlatList
                   ref={(ref) => { flatListRef = ref; }}
                    data={reviewList}
                    inverted
                    renderItem={(item) => {
                        return <Reviews item={item} id={currentUser.id} {...props} />
                    }}
                    ListFooterComponent={() => <ActivityIndicator color='white' size="small" style={{ marginVertical: 10, display: refreshing ? "flex" : "none" }} />}
                    onEndReached={onEnd}
                    keyExtractor={(item, index) => index}
                /> 
}
                <TextInput
                    style={{ backgroundColor: 'transparent'}}
                    mode='outlined'
                    right={element}
                    onSubmitEditing={()=> handleReviewSend()}
                    value={review}
                    onChangeText={setReview}
                    placeholder='Write a review..' />
            </KeyboardAvoidingView>
        </ImageBackground>
    </>
    );
}