import React, { useState } from 'react'
import { PermissionsAndroid } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import AllCities from '../../cities';
import { IconButton, Colors, ActivityIndicator } from 'react-native-paper';
const ENV = require('../../credentials');

Geocoder.init(ENV.GOOGLE_MAP_API);

const CityFinder = (props) => {

    const [save, setSave] = useState(false);

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Access Required',
                    message: 'This App needs to Access your location',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // Check, If Permission is granted
                getOneTimeLocation();
            } else {
                setSave(false);
                props.city(null)
            }
        } catch (err) {
            setSave(false);
            props.city(null)
        }
    };



    const getOneTimeLocation = async () => {
        await Geolocation.getCurrentPosition(
            (position) => {
                let currentLatitude = JSON.stringify(position.coords.latitude);
                let currentLongitude = JSON.stringify(position.coords.longitude);
                // Send longitude and latitude to google map API and get user city
                GetCity(currentLatitude, currentLongitude);
            },
            (error) => {
                setSave(false);
                props.city(null);
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 1000
            },
        );

    };

    // Capitilize first word of a sentence and return the string

    const CapitilizeWords = (str) => {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    const GetCity = async (lat, long) => {
        try {
            await Geocoder.from(lat, long)
                .then(json => {
                    let cities = [];
                    let address_clues = [];

                    json.results[0].address_components.map((item) => {
                        var City_clue = CapitilizeWords(item.long_name);
                        address_clues = [...address_clues, City_clue];
                    });

                    cities = address_clues.filter(element => AllCities.includes(element));

                    if (cities.length != 0) {
                        setSave(false);
                        props.city(cities[0])
                    } else {
                        getCityByPincode(address_clues)
                    }

                }).catch(error => {
                    setSave(false);
                    props.city(null)
                });
        } catch (error) {
            setSave(false);
            props.city(null)
        }
    }

    const getCityByPincode = (address_clues) => {
        let cities = [];
        let postalcode = '';
        let postal_code_regex = /^[1-9][0-9]{5}$/;
        address_clues.map((item) => {
            if (postal_code_regex.test(item)) {
                postalcode = item;
                return null;
            }
        });

        fetch(`https://api.postalpincode.in/pincode/${postalcode}`)
            .then((res) => res.json())
            .then((json) => {
                var values = Object.keys(json[0].PostOffice[0]).map(function (key) { return json[0].PostOffice[0][key]; });
                cities = values.filter(element => AllCities.includes(element));
            });
        if (cities.length != 0) {
            setSave(false);
            props.city(cities[0])
        } else {
            setSave(false);
            props.city(null);
        }
    }

    if (save) {
        return (
            <ActivityIndicator 
            style={{ marginRight: 30 }}
            size="small"
            animating={true} color={Colors.red800} />
        );
    } else {
        return (
            <IconButton
                icon="map-marker"
                color={Colors.red500}
                style={{ marginRight: 15 }}
                size={35}
                onPress={() => { setSave(true); requestLocationPermission() }}
            />
        )
    }

}

export default CityFinder;