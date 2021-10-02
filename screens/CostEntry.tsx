import * as React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/screens";
import { Alert, Text, View, StyleSheet, Button, TextInput } from "react-native";
import { Formik } from "formik";
// import { TextField } from "react-native-material-textfield";
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
    <View>
      <Text>Add costs</Text>
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
                <View style={style.KeyValueStyle}>
                  <Text
                    style={{ flex: 1, fontSize: fontSize }}
                  >{m}{" "}</Text>

                  <TextInput
                    style={{ flex: 1, fontSize: fontSize, backgroundColor: "#FEF" }}
                    // label={m}
                    placeholder={"12"}
                    keyboardType="numeric"
                    onChangeText={formik.handleChange(m)}
                  />
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
    </View>
  );
}

const style = StyleSheet.create({
  KeyValueStyle: {
    flexDirection: "row",
    justifyContent: "space-between",


  },
});
