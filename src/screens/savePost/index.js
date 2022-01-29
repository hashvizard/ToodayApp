import { StackActions, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import Feather from 'react-native-vector-icons/Feather'
import { useDispatch } from 'react-redux'
import { createPost } from '../../redux/actions'
import { ProcessingManager } from 'react-native-video-processing';

export default function SavePostScreen(props) {
    const [description, setDescription] = useState('')
    const [requestRunning, setRequestRunning] = useState(false)
    const navigation = useNavigation()
    const dispatch = useDispatch();

    const handleSavePost = async () => {
        setRequestRunning(true)

        let data = await getData(props.route.params.source)

        dispatch(createPost(description, data.path, data.thumbnail))
            .then(() => navigation.dispatch(StackActions.popToTop()))
            .catch((err) => { setRequestRunning(false); console.log(err) })
    }

    const getData = async (path) => {
        const origin = await ProcessingManager.getVideoInfo(path);
        const result = await ProcessingManager.compress(path, {
            width: origin.size && origin.size.width / 3,
            height: origin.size && origin.size.height / 3,
            bitrateMultiplier: 3,
            minimumBitrate: 300000
        });
        const thumbnail = await ProcessingManager.getPreviewForSecond(result.source);
        return { path: result.source, thumbnail: thumbnail };
    }

    if (requestRunning) {
        return (
            <View style={styles.uploadingContainer}>
                <ActivityIndicator color='red' size='large' />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.inputText}
                    maxLength={150}
                    multiline
                    onChangeText={(text) => setDescription(text)}
                    placeholder="Describe your video"
                />
                <Image
                    style={styles.mediaPreview}
                    source={{ uri: props.route.params.source }}
                />
            </View>
            <View style={styles.spacer} />
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.cancelButton}>
                    <Feather name="x" size={24} color="black" />
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => handleSavePost()}
                    style={styles.postButton}>
                    <Feather name="corner-left-up" size={24} color="white" />
                    <Text style={styles.postButtonText}>Post</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
