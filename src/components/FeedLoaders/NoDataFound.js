import React from 'react'
import { Text, View } from 'react-native'
import LottieView from 'lottie-react-native';
import { Button } from 'react-native-paper';
import videoStyles from '../../styles/VideoStyles';

const NoDataFound = ({val}) => {
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
        <View style={{...videoStyles.addFirst}}>
            <Text style={{ textAlign: "center", padding: 10 }}>
                {val?"No Data found for your city, Be the first one to Post":"Looking for trending things, happening in your city"}
                </Text>
            <Button icon={val?"camera":"magnify"} mode="contained" onPress={() =>{}}>
            {val?"Add Video":"Please Wait"}
            </Button>
        </View>
    </>
    )
}

export default NoDataFound

