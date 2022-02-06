import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { FlatList, ImageBackground, KeyboardAvoidingView } from 'react-native'
import Chat from './Chat'
import videoStyles from '../../styles/VideoStyles'
import { IconButton, TextInput } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { addComment, clearCommentListener, commentListner } from '../../services/posts'

export default function CommentModal(props) {

    const data = useSelector(state => state.initialPost);

    const [comment, setComment] = useState('')
    const [commentList, setCommentList] = useState('')
    const currentUser = useSelector(state => state.auth.currentUser)

    useFocusEffect(
        React.useCallback(() => {
            commentListner(data.postId, setCommentList)
            return () => {
                clearCommentListener();
                setCommentList('')
            }
        }, [data])
    );
    const handleCommentSend = () => {
        if (comment.length == 0) {
            return;
        }
        setComment('')
        addComment(data.postId, currentUser.uid, comment)
    }

    const element = <TextInput.Icon name="send" onPress={() => handleCommentSend()} />
    return (<>
        <ImageBackground
            style={{
                flex: 1
            }}
            source={require('../../../assets/background.png')} resizeMode="cover">
            <KeyboardAvoidingView
                behavior="padding"
                style={videoStyles.commentcontainer}
            >
                <IconButton
                    icon="close"
                    size={30}
                    color='red'
                    style={{ alignSelf: "flex-end", marginTop: 10 }}
                    onPress={() => props.navigation.goBack()}
                />
                <FlatList
                    data={commentList}
                    inverted
                    renderItem={(item) => {
                        return <Chat item={item} />
                    }}
                    keyExtractor={(item, index) => index}
                />
                <TextInput
                    style={{ backgroundColor: 'transparent' }}
                    mode='flat'
                    right={element}
                    value={comment}
                    onChangeText={setComment}
                    placeholder='Write a comment..' />
            </KeyboardAvoidingView>
        </ImageBackground>
    </>
    );
}