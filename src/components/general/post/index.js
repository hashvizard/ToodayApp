import Video from 'react-native-video'
import React, { forwardRef, useState, useEffect, useImperativeHandle, useRef } from 'react'
import { View, Text } from 'react-native'
import { useUser } from '../../../hooks/useUser'
import styles from './styles'
import PostSingleOverlay from './overlay'

/**
 * This component is responsible for displaying a post and play the 
 * media associated with it.
 * 
 * The ref is forwarded to this component so that the parent component
 * can manage the play status of the video.
 */
export const PostSingle = forwardRef(({ item }, parentRef) => {
    const ref = useRef(null);
    const user = useUser(item.creator).data
    const [paused, setpaused] = useState(true);

    useImperativeHandle(parentRef, () => ({
        play,
        unload,
        stop
    }))

    useEffect(() => {
        return () => unload();
    }, [])


    /**
     * Plays the video in the component if the ref
     * of the video is not null.
     * 
     * @returns {void} 
     */
    const play = async () => {
        if (ref.current == null) {
            return;
        }
        try {
            await ref.current.seek(0);
            setpaused(false);
        } catch (e) {
            console.log(e)
        }
    }


    /**
     * Stops the video in the component if the ref
     * of the video is not null.
     * 
     * @returns {void} 
     */
    const stop = async () => {
        if (ref.current == null)
        return;
    try {
        setpaused(true)
    } catch (e) {
        console.log(e)
    }
    }


    /**
     * Unloads the video in the component if the ref
     * of the video is not null.
     * 
     * This will make sure unnecessary video instances are
     * not in memory at all times 
     * 
     * @returns {void} 
     */
    const unload = async () => {
        if (ref.current == null)
        return;
    try {
        ref.current.seek(0);
    } catch (e) {
        console.log(e)
    }
    }

    return (
        <>
           
                <PostSingleOverlay user={user} post={item} />
           
            <View style={{flex:1}}>
                <Text>asd</Text>
            </View>
        </>
    )
})

export default PostSingle