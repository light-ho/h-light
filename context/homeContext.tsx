import { createContext, useContext, useEffect, useState } from "react";
import * as React from "react";
import { LatLng } from "react-native-maps";
import { getData, STORAGEKEYS, storeData } from "../utils/asyncStorage";

/**
 * create a context with setter and getter
 * use async storage in context setter
 * supply the value from the context factory
 */

const GlobalContext = createContext<{
  markedLocation: LatLng;
  setMarkedLocation: (val: LatLng) => void;
  solarCost: string;
  setSolarCost: (val: string) => void;
  monthlyBills: number[];
  setMonthlyBills: (val: number[]) => void;
}>(undefined!);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalContextProvider = ({ children }: any) => {
  const [markedLocation, setMarkedLocation] = useState<LatLng>(undefined!);
  const [solarCost, setSolarCost] = useState<string>(undefined!);
  const [monthlyBills, setMonthlyBills] = useState<number[]>(undefined!);

  useEffect(() => {
    Object.values(STORAGEKEYS).forEach(async (store_val: string) => {
      getData(store_val).then((value) => {
        if (value) {
          switch (store_val) {
            case STORAGEKEYS.MARKEDLOCATION:
              setMarkedLocation(JSON.parse(value));
              break;
            case STORAGEKEYS.SOLARCOST:
              setSolarCost(JSON.parse(value));
              break;
            case STORAGEKEYS.MONTHLYBILLS:
              setMonthlyBills(JSON.parse(value));
              break;
            default:
              break;
          }
        }
      });
    });
  }, []);

  // update the marked location when it changes
  useEffect(() => {
    if (markedLocation) {
      storeData(STORAGEKEYS.MARKEDLOCATION, markedLocation);
    }
  }, [markedLocation]);

  // update the solar cost when it changes
  useEffect(() => {
    if (solarCost) {
      storeData(STORAGEKEYS.SOLARCOST, solarCost);
    }
  }, [solarCost]);

  // update the monthly bills when it changes
  useEffect(() => {
    if (monthlyBills) {
      storeData(STORAGEKEYS.MONTHLYBILLS, monthlyBills);
    }
  }, [monthlyBills]);

  return (
    <GlobalContext.Provider
      value={{
        markedLocation,
        setMarkedLocation,
        solarCost,
        setSolarCost,
        monthlyBills,
        setMonthlyBills,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
