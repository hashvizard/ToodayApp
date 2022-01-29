import React from 'react'
import { PermissionsAndroid } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import SplashScreen from '../../splash';
import Geocoder from 'react-native-geocoding';
import AllCities from '../../../../cities';
import { useFocusEffect } from '@react-navigation/native';
import { saveUserCurrentCity } from '../../../services/user'
const ENV = require('../../../../credentials');

Geocoder.init(ENV.GOOGLE_MAP_API);

const UserCity = (props) => {

    useFocusEffect(
        React.useCallback(() => {
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
                        let error = "Not got Location Permission";
                        props.navigation.navigate("Error", { error: error })
                    }
                } catch (err) {
                    let error = "Error while asking for location permission";
                    props.navigation.navigate("Error", { error: error });
                }
            };
            requestLocationPermission();
        }, [])
    );


    const getOneTimeLocation = async () => {
        await Geolocation.getCurrentPosition(
            (position) => {
                let currentLatitude = JSON.stringify(position.coords.latitude);
                let currentLongitude = JSON.stringify(position.coords.longitude);
                // Send longitude and latitude to google map API and get user city
                GetCity(currentLatitude, currentLongitude);
            },
            (error) => {
                let errors = "Not got your Location coordinates";
                props.navigation.navigate("Error", { error: errors });
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

                    cities.length != 0 ? SaveData(cities[0]) : getCityByPincode(address_clues);

                }).catch(error => {
                    let errors = "Error while fetching your city from Google Maps";
                    props.navigation.navigate("Error", { error: errors });
                });
        } catch (error) {
            let errors = "Error while fetching your city from Google Maps";
            props.navigation.navigate("Error", { error: errors });
            return null;
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

        cities.length != 0 ? SaveData(cities[0]) : props.navigation.navigate("Error", { error: "No City Found according to user location" });
    }

    // A Check Before saving Data in Database
    const SaveData = (myCity) => {
        saveUserCurrentCity(myCity)
    }

    return (
        <SplashScreen />
    )
}

export default UserCity;
