import * as React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/screens";
import {
  Alert,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  TextInput,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useGlobalContext } from "../context/homeContext";

type Props = NativeStackScreenProps<RootStackParamList, "CostEntryScreen">;

const fontSize = 20;

export function CostEntryScreen({ navigation }: Props) {
  const [costs, setCosts] = React.useState<any>({});
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const { setMonthlyBills } = useGlobalContext();
  const onsubmit = (values: any) => {
    setMonthlyBills(Object.values(values));
    navigation.navigate("Home");
  };
  return (
    <ScrollView>
      <Formik
        initialValues={{
          January: "",
          February: "",
          March: "",
          April: "",
          May: "",
          June: "",
          July: "",
          August: "",
          September: "",
          October: "",
          November: "",
          December: "",
        }}
        onSubmit={onsubmit}
        validationSchema={Yup.object({
          January: Yup.number().required(),
          February: Yup.number().required(),
          March: Yup.number().required(),
          April: Yup.number().required(),
          May: Yup.number().required(),
          June: Yup.number().required(),
          July: Yup.number().required(),
          August: Yup.number().required(),
          September: Yup.number().required(),
          October: Yup.number().required(),
          November: Yup.number().required(),
          December: Yup.number().required(),
        })}
      >
        {(formik) => {
          return (
            <>
              {months.map((m) => (
                <View key={m}>
                  <View style={style.KeyValueStyle}>
                    <Text style={{ flex: 1, fontSize: fontSize }}>{m} </Text>
                    <TextInput
                      onChangeText={formik.handleChange(m)}
                      keyboardType="numeric"
                      onBlur={() => {
                        formik.setFieldTouched(m);
                      }}
                      // @ts-ignore
                      value={formik.values[m]}
                      style={{
                        flex: 2,
                        borderColor: "#acacac",
                        borderWidth: 1,
                        borderStyle: "solid",
                        padding: 12,
                        margin: 8,
                      }}
                    />
                  </View>
                  {
                    //@ts-ignore
                    formik.errors[m] && formik.touched[m] && (
                      <Text style={style.error}>
                        {
                          //@ts-ignore
                          formik.errors[m]
                        }
                      </Text>
                    )
                  }
                </View>
              ))}
              <Button
                onPress={() => {
                  formik.submitForm();
                }}
                title="submit"
              />
            </>
          );
        }}
      </Formik>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  KeyValueStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  error: {
    color: "#ea2314",
  },
});
