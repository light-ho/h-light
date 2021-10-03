import * as Location from "expo-location";
import { LocationObject } from "expo-location";

export async function getCurrentLocation(): Promise<
  LocationObject | undefined
> {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.error("Location permission not granted");
    return;
  }
  // TODO add required acuracy
  let location = await Location.getCurrentPositionAsync({});
  return location;
}
