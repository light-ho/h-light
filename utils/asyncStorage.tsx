import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGEKEYS = {
  location: "location",

  solarCost: "solarCost",
  MonthlyBills: "MonthlyBills",
};

const storeData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // saving error
    console.error("key cannot be stored");
  }
};

const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.error("key not found");
  }
};

export { storeData, getData, STORAGEKEYS };
