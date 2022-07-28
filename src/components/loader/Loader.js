import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import videoStyles from '../../styles/VideoStyles';
import LottieView from 'lottie-react-native';
const Loader = (props) => {

    const [loader,setLoader] = useState(false);

    useEffect(() => {
        setLoader(props.loader)
      return () => {
        setLoader(false)
      }
    }, [props.loader])
    

  return (<>
    {loader ?
    <View style={{...videoStyles.spaceBottom,height:5,position:"absolute",zIndex:200,width:"100%"}}>
    <LottieView
            source={require('../../../Animations/loading1.json')}
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
    :null}
    </>
  )
}

export default Loader