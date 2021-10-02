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
import { OutlinedTextField } from "rn-material-ui-textfield";
import * as Yup from "yup";

type Props = NativeStackScreenProps<RootStackParamList, "CostEntryScreen">;

const fontSize = 20;

export function CostEntryScreen({ navigation }: Props) {
  const months = [
    "January ",
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
        onSubmit={(values) => Alert.alert(JSON.stringify(values))}
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
                <View style={{ flex: 1 }}>
                  <ScrollView key={m}>
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
                  </ScrollView>
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