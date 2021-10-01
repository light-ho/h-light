import React from 'react'

import { Text } from 'react-native'
import MapView from 'react-native-maps';




export default function LocationFinder() {
    return (
        <>
            <Text>i am map</Text>
            <MapView
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />

        </>
    )
}