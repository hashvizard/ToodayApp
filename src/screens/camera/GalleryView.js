import React, { useEffect, useState, useCallback } from 'react';
import {
    View, Text,
    Image,
    FlatList,
    PermissionsAndroid, TouchableOpacity,
    Platform,
    ActivityIndicator,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GalleryView = (props) => {

    const [data, setData] = useState([]);

    const [type, setType] = useState('small');

    const [assets, setAssets] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [endCursor, setEndCursor] = useState();


    const getPhotos = useCallback(
        async (after, oldData) => {
            if (!hasNextPage) {
                return;
            }
            try {
                CameraRoll.getPhotos({
                    after,
                    first: 20,
                    assetType: 'Videos',
                    include: ['filename', 'imageSize'],
                })
                    .then((res) => {
                       
                        if (oldData) {
                            let datas = [...oldData, ...res.edges];
                            setData(datas)
                        } else {
                            setData(res.edges)
                        }
                        setHasNextPage(res.page_info.has_next_page);
                        setEndCursor(res.page_info.end_cursor);
                    })
                    .catch((error) => {
                        console.log(error);
                    });


            } catch (err) {
                console.log(err)
                logError(err);
            }
        },
        []
    );
   
    const askPermission = async () => {
        if (Platform.OS === 'android') {
            const result = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Permission Explanation',
                    message: 'ReactNativeForYou would like to access your photos!',
                },
            );
            if (result !== 'granted') {
                console.log('Access to pictures was denied');
                return;
            } else {
                getPhotos();
            }
        } else {
            getPhotos();
        }
    };


    useEffect(() => {
        askPermission();
    }, []);

    const onEndReached = useCallback(() => {
        if (hasNextPage) {
            getPhotos(endCursor, data);
        }
    }, [hasNextPage, endCursor, getPhotos]);

    const Activity = (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="small" color={"black"} />
        <Text style={{ marginTop: 10 }}>Loading</Text>
    </View>)



    return (<>
        {data.length <= 0 ? Activity :
            <FlatList
                data={data}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ ...styles.botom }}
                numColumns={3}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.galleryViewVideos} onPress={() => props.navigation.navigate('savePost', { source: item.node.image.uri })}>
                        <Image
                            style={styles.galleryImages}
                            source={{ uri: item?.node?.image?.uri }}
                        />
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index}
                onEndReached={onEndReached}
            />
        }

    </>);
};

export default GalleryView;