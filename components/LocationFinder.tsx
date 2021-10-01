import React, { useState } from "react";

import { Text, StyleSheet, View, Button } from "react-native";
import MapView from "react-native-maps";
import { Marker, Region, LatLng } from 'react-native-maps';


const getInintialPosition = () => {
  return {
    latitude: 27.04927786334186,
    latitudeDelta: 12.895187984301408,
    longitude: 30.251849088817835,
    longitudeDelta: 14.525723196566101,
  };
};




export default function LocationFinder() {

  const [region, setRegion] = useState(getInintialPosition());
  const [markerLocation, setMarkerLocation] = useState<LatLng>(getInintialPosition());

  console.log(region);

  return (
    <>
      <Text>i am map</Text>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={(region) => setRegion(region)}
          onPress={(e) => {
            setMarkerLocation(e.nativeEvent.coordinate);
          }}
        >
          <Marker
            title="selected location"
            coordinate={markerLocation}
          />


        </MapView>
      </View>
      <View style={styles.debugContainer}>
        <Text>{`current region is \n lat:${region.latitude} \n long:${region.longitude}`}</Text>

        <Button
          title="Go to map page"
          onPress={() => console.log(`go to ${markerLocation.latitude} and ${markerLocation.longitude}`)}
        />
      </View>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  debugContainer: {
    marginTop: 400,
    marginLeft: 20,
    position: 'absolute',
    height: 100,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
