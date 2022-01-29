import React, { useEffect, useRef, useState } from 'react'
import { FlatList } from 'react-native'
import PostSingle from '../../components/general/post'
import { getFeed, getPostsByUserId } from '../../services/posts'
import LoadingScreen from '../../components/FeedLoaders/LoadingScreen';
import NoDataFound from '../../components/FeedLoaders/NoDataFound';
import Navbar from '../../components/FeedLoaders/Header/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { reportNull } from '../../redux/actions/report'
import { blockNull, intialPostView } from '../../redux/actions';


/**
 * Component that renders a list of posts meant to be 
 * used for the feed screen.
 * 
 * On start make fetch for posts then use a flatList 
 * to display/control the posts.
 */


export default function FeedScreen({ route }) {
    const user = useSelector(state =>state.auth)
    const { creator, profile } = route.params
    const [posts, setPosts] = useState([])
    const mediaRefs = useRef([])
    const [loading, setloading] = useState(true);
    const dispatch = useDispatch();
    const removePost = useSelector(state => state.report);
    const removeBlockUserPosts = useSelector(state => state.blockedUserPost);

    useEffect(() => {
        if (profile) {
            getPostsByUserId(creator).then(setPosts)
        } else {
            getFeed(user).then(setPosts).then(setloading(false))
        }
    }, [])

    useEffect(() => {
        if (removePost.postId != null) {
            setPosts(posts.filter(item => item.id !== removePost.postId));
            dispatch(reportNull())
        }
    }, [removePost])

    useEffect(() => {
        if (removeBlockUserPosts.userId != null) {
            setPosts(posts.filter(item => item.creator !== removeBlockUserPosts.userId));
            dispatch(blockNull())
        }
    }, [removeBlockUserPosts])

    /**
     * Called any time a new post is shown when a user scrolls
     * the FlatList, when this happens we should start playing 
     * the post that is viewable and stop all the others
     */
    const onViewableItemsChanged = useRef(({ changed }) => {
        changed.forEach(element => {
            const cell = mediaRefs.current[element.key]
            if (cell) {
                if (element.isViewable) {
                    if (!profile) {
                        dispatch(intialPostView(element.item.id,element.item.creator))
                    }
                    cell.play()
                } else {
                    cell.stop()
                }
            }

        });
    })

    /**
     * renders the item shown in the FlatList
     * 
     * @param {Object} item object of the post 
     * @param {Integer} index position of the post in the FlatList 
     * @returns 
     */
    const renderItem = ({ item, index }) => {
        return (<PostSingle
            item={item}
            ref={PostSingleRef => (mediaRefs.current[item.id] = PostSingleRef)}
        />)
    }

    if (loading) {
        return (
            <React.Fragment>
                <Navbar />
                <LoadingScreen />
            </React.Fragment>
        )
    }
    else if (!loading && posts.length == 0) {
        return (
            <React.Fragment>
                <Navbar />
                <NoDataFound />
            </React.Fragment>
        )
    }
    return (
        <React.Fragment>
            <Navbar />
            <FlatList
                data={posts}
                style={{ flex: 1 }}
                windowSize={4}
                initialNumToRender={1}
                maxToRenderPerBatch={2}
                removeClippedSubviews
                viewabilityConfig={{
                    viewAreaCoveragePercentThreshold: 100
                }}
                renderItem={renderItem}
                pagingEnabled
                keyExtractor={item => item.id}
                decelerationRate={'normal'}
                onViewableItemsChanged={onViewableItemsChanged.current}
            />
        </React.Fragment>
    )

}
