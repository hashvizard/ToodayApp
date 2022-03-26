import { View, Text, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Caption, Headline, TextInput, Title } from 'react-native-paper'
import CityFinder from '../../../helpers/CityFinder'
import videoStyles from '../../../styles/VideoStyles'
import { updateUserCity } from '../../../Apis/LaravelApis'
import { USER_STATE_CHANGE } from '../../../redux/constants'

const UserInfo = () => {
  const userInfo = useSelector(state => state.auth.currentUser);
  const [city, setCity] = useState('');
  const [updating, setUpdating] = useState(false);
  const dispatch = useDispatch();

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Tooders",
      "Sorry, currently we are not available in your city.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

  const updateCity = () => {
    setUpdating(true);
    dispatch(updateUserCity({ city: city })).then((cityData) => {
      
      let data = userInfo;
      data.city_id = cityData.data[0].city_id;
      data.city = cityData.data[0].city;

      dispatch({ type: USER_STATE_CHANGE, currentUser: data, loaded: true })
      setUpdating(false);
    
    }).catch(err => {
    
      setUpdating(false);
      console.log(err)
    
    })
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ width: "100%", height: 300 }}>
        <Image source={require('../../../../assets/map.png')} style={{ width: "100%", height: "100%", resizeMode: "contain" }} />
      </View>
      <View style={{ ...videoStyles.citySelectorStyle }}>

        <View style={{ flexDirection: "row", alignItems: "center" }} >
          {city == '' ?
            <Caption style={{ flexGrow: 1, flexWrap: "wrap", width: "70%", marginLeft: 10 }} >Click on red map marker icon to get your city..</Caption>
            : <View style={{ flexGrow: 1, flexWrap: "wrap", width: "70%", marginLeft: 10 }}>
              <Text>City</Text>
              <Headline style={{ flexGrow: 1, flexWrap: "wrap", width: "70%", fontWeight: "bold" }}>{city}</Headline>
            </View>}
          <CityFinder
            city={(city) => {
              if (city) {
                setCity(city)
              } else {
                createTwoButtonAlert();
              }
            }}
          />
        </View>
        <Button mode='contained' loading={updating}
          onPress={() => {
            updateCity();
          }}
          contentStyle={{ justifyContent: "space-around" }}
          disabled={city == '' || updating ? true : false} color='#f0ad4e' >
          {updating ? "Updating Data" : "Update City"}
        </Button>
      </View>
    </View>
  )
}

export default UserInfo