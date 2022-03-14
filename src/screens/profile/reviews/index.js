import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { FlatList, ImageBackground, KeyboardAvoidingView } from 'react-native'
import Reviews from './Reviews'
import videoStyles from '../../../styles/VideoStyles'
import { IconButton, TextInput } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { addReviews, clearReviewListener, reviewListner } from '../../../services/posts'


export default function ReviewModal(props) {


    const initialUserId = useSelector(state => state.initialPost.userId);

    const [review, setReview] = useState('')
    const [reviewList, setReviewList] = useState('')
    const currentUser = useSelector(state => state.auth.currentUser)

    useFocusEffect(
        React.useCallback(() => {

            if (props.route.params?.uid) reviewListner(props.route.params.uid, setReviewList);
            else reviewListner(initialUserId, setReviewList);

            return () => {
                clearReviewListener();
                setReviewList('')
            }
        }, [initialUserId, props.route.params?.uid])
    );
    const handleReviewSend = () => {
        if (review.length == 0) {
            return;
        }
        setReview('')
        if (props.route.params?.uid) addReviews(props.route.params.uid, currentUser.uid, review);
        else addReviews(initialUserId, currentUser.uid, review);

    }

    const element = <TextInput.Icon name="send" onPress={() => handleReviewSend()} />
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
                <IconButton
                    icon="arrow-left"
                    size={30}
                    color='black'
                    style={{ alignSelf: "flex-start", marginTop: 20 }}
                    onPress={() => props.navigation.goBack()}
                />
                <FlatList
                    data={reviewList}
                    inverted
                    renderItem={(item) => {
                        return <Reviews item={item} />
                    }}
                    keyExtractor={(item, index) => index}
                />
                <TextInput
                    style={{ backgroundColor: 'transparent' }}
                    mode='flat'
                    right={element}
                    value={review}
                    onChangeText={setReview}
                    placeholder='Write a comment..' />
            </KeyboardAvoidingView>
        </ImageBackground>
    </>
    );
}