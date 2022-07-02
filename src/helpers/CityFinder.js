import React, { useState, useEffect } from 'react'
import { PermissionsAndroid, View } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { IconButton, Colors, ActivityIndicator, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { getAllCities } from '../Apis/LaravelApis';
const ENV = require('../../credentials');

Geocoder.init(ENV.GOOGLE_MAP_API);

const CityFinder = (props) => {

    const [save, setSave] = useState(false);
    const [CityData, setCities] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCities()).then(cities => {

            if (cities.status) setCities(cities.data);
            else console.log(cities.message);
        }).catch(err => {
            console.log(err.message);
        })
        return () => {
            setCities([]);
        }
    }, [])


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

                    cities = address_clues.filter(element => CityData.includes(element));

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
                cities = values.filter(element => CityData.includes(element));
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
            <View style={{ alignItems: "center", elevation: 5, backgroundColor: "#f0ad4e", borderRadius: 10, height: 45, width: 45, alignSelf: "center", justifyContent: "center" }}>
                <ActivityIndicator
                    size="small"
                    animating={true} color={"white"} />
            </View>
        );
    } else {
        return (

            <View style={{ alignItems: "center", elevation: 5, backgroundColor: "#d9534f", borderRadius: 10, height: 45, width: 45, alignSelf: "center", justifyContent: "center" }}>
                <IconButton
                    icon="map-marker"
                    mode="outlined"
                    color={"white"}
                    style={{}}
                    size={25}
                    onPress={() => { setSave(true); requestLocationPermission() }}
                />
            </View>
        )
    }

}

export default CityFinder;
