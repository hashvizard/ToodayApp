import React from 'react'
import { Text, View } from 'react-native'
import LottieView from 'lottie-react-native';
import { Button } from 'react-native-paper';
import videoStyles from '../../styles/VideoStyles';

const NoDataFound = () => {
    return (<>
        <View style={{...videoStyles.animate,height:"100%"}}>
            <LottieView
                source={require('../../../Animations/noData.json')}
                colorFilters={[{
                    keypath: "button",
                    color: "black"
                }, {
                    keypath: "Sending Loader",
                    color: "#F00000"
                }]}
                autoPlay={true}
                loop={true}
            />
        </View>
        <View style={videoStyles.addFirst}>
            <Text style={{ textAlign: "center", padding: 10 }}>No Data found for your city, Be the first one to Post</Text>
            <Button icon="camera" mode="contained" onPress={() =>{}}>
                Add Video
            </Button>
        </View>
    </>
    )
}

export default NoDataFound

