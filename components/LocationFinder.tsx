import React, { useEffect, useState } from "react";

import { Text, StyleSheet, View, Button } from "react-native";
import MapView from "react-native-maps";
import { Marker, Region, LatLng } from "react-native-maps";
import { getCurrentLocation } from "../utils/location";

import { GLOBALVALUES } from "../globalstyle";
import { useGlobalContext } from "../context/homeContext";

const getInintialPosition = () => {
  return {
    latitude: 27.04927786334186,
    latitudeDelta: 12.895187984301408,
    longitude: 30.251849088817835,
    longitudeDelta: 14.525723196566101,
  };
};

export default function LocationFinder() {
  const [region, setRegion] = useState<Region>(getInintialPosition());
  //marker used in the map
  const [markerLocation, setMarkerLocation] = useState<LatLng>(
    getInintialPosition()
  );

  // marked location for global context
  const { setMarkedLocation } = useGlobalContext();
  const setLocationGlobal = async (location: LatLng) => {
    await setMarkedLocation(location);
  };

  const [syncLocation, setSyncLocation] = useState(false);
  const tirggerSyncLocation = () => {
    setSyncLocation((syncLocation) => !syncLocation);
  };
  // sync location on mount or press of button
  useEffect(() => {
    (async () => {
      const location = await getCurrentLocation();
      if (location) {
        setRegion({
          ...location.coords,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        });
        setMarkerLocation(location.coords);
        setLocationGlobal(location.coords);
      }
    })();
  }, [syncLocation]);

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
            setLocationGlobal(e.nativeEvent.coordinate);
          }}
        >
          <Marker title="selected location" coordinate={markerLocation} />
        </MapView>
      </View>
      <View style={styles.actionContainer}>
        <View style={styles.actionButton}>
          <Button
            title="resync current location"
            onPress={tirggerSyncLocation}
            color={GLOBALVALUES.thirdColor}
          />
        </View>

        <View style={styles.actionButton}>
          <Text>{`marker is pointing to ${markerLocation.latitude},${markerLocation.longitude}`}</Text>
        </View>
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
  actionContainer: {
    marginTop: 420,
    marginLeft: 20,
    position: "absolute",
    height: 200,
    alignContent: "space-between",
    flexDirection: "column",
  },
  actionButton: {
    margin: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
