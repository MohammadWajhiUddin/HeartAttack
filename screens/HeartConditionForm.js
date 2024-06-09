import * as React from "react";
import { StatusBar } from "expo-status-bar";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
export default function HeartConditionForm() {
  const navigation = useNavigation();

  const [age, onChangeAge] = React.useState("");
  const [Sex, onChangeSex] = React.useState("");
  const [sysBp, onChangeSysBp] = React.useState("");
  const [diaBp, onChangeDiaBp] = React.useState("");
  const [heartRate, onChangeHeartRate] = React.useState("");
  const [Weight, onChangeWeight] = React.useState("");
  const [heightInCm, onChangeHeightinCm] = React.useState("");
  const [BMI, onChangeBMI] = React.useState("");
  const [loading, setLoading] = React.useState(false);


  const handleForm = async () => {
    setLoading(true);

    let sex = null;
    if (Sex == "Male" || Sex == "male") {
      sex = 1;
    } else {
      sex = 0;
    }
    let convertedHeight = heightInCm * 30;

    try {
      const response = await fetch(
        "https://flaskapi-fqgv.onrender.com/predictHeartDisease",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            age: parseInt(age),
            sex: sex,
            SysBP: sysBp,
            DiaBP: diaBp,
            HR: heartRate,
            weightKg: Weight,
            heightCm: convertedHeight,
            BMI: BMI,
          }),
        }
      );
      if (!response.ok) { // Check for HTTP errors
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if(data.results == 1|| data.results == 0){
        setLoading(false)
        navigation.navigate('PredictViaHeartForm',{dataresponse:data.results,
          age: age,
          Sex: Sex,
          SysBP: sysBp,
          DiaBP: diaBp,
          HR: heartRate,
          weightKg: Weight,
          heightInCm: heightInCm,
          BMI: BMI
        })
      }else{      
         setLoading(false)
         Alert.alert("There might be some issue, kindly fill the form correctly")
      }
     // Alert.alert(data.prediction_class)

     //navigation.navigate('PredictViaHeartForm',{dataresponse:data.prediction_class})
    } catch (error) {
      console.error("API Error:",error);
      Alert.alert("Error", "There was a problem with the request. Please try again.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />

      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            marginVertical: "5%",
            marginHorizontal: "5%",
            height: "96%",
            width: "90%",
            backgroundColor: "#AA0000",
            borderRadius: 30,
            shadowColor: "red",
            shadowOffset: { width: 30, height: 10 },
            shadowOpacity: 0.9,
            shadowRadius: 4,
            elevation: 10,
          }}
        >
          <View
            style={{
              marginTop: 15,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                textDecorationLine: "underline",
                color: "white",
              }}
            >
              Heart Condition Form
            </Text>
          </View>

          <View style={{ marginTop: "8%", marginHorizontal: "4%" }}>
            <View
              style={{
                borderBottomColor: "white",
                borderBottomWidth: 2,
              }}
            >
              <TextInput
                onChangeText={onChangeAge}
                value={age}
                placeholder="Enter User Age"
                placeholderTextColor={"white"}
                inputMode={"numeric"}
                style={{
                  paddingLeft: 10,
                  paddingBottom: 10,
                  fontSize: 18,
                  fontWeight: "500",
                  color: "white",
                }}
              />
            </View>

            <View
              style={{
                borderBottomColor: "white",
                borderBottomWidth: 2,
                marginTop: 30,
              }}
            >
              <TextInput
                onChangeText={onChangeSex}
                value={Sex}
                placeholder="Enter User Sex"
                placeholderTextColor={"white"}
                style={{
                  paddingLeft: 10,
                  paddingBottom: 10,
                  fontSize: 18,
                  fontWeight: "500",
                  color: "white",
                }}
              />
            </View>

            <View
              style={{
                borderBottomColor: "white",
                borderBottomWidth: 2,
                marginTop: 30,
              }}
            >
              <TextInput
                onChangeText={onChangeSysBp}
                value={sysBp}
                placeholder="Enter User SysBp"
                placeholderTextColor={"white"}
                inputMode={"numeric"}
                style={{
                  paddingLeft: 10,
                  paddingBottom: 10,
                  fontSize: 18,
                  fontWeight: "500",
                  color: "white",
                }}
              />
            </View>

            <View
              style={{
                borderBottomColor: "white",
                borderBottomWidth: 2,
                marginTop: 30,
              }}
            >
              <TextInput
                onChangeText={onChangeDiaBp}
                value={diaBp}
                placeholder="Enter Your DiaBp"
                placeholderTextColor={"white"}
                inputMode={"numeric"}
                style={{
                  paddingLeft: 10,
                  paddingBottom: 10,
                  fontSize: 18,
                  fontWeight: "500",
                  color: "white",
                }}
              />
            </View>

            <View
              style={{
                borderBottomColor: "white",
                borderBottomWidth: 2,
                marginTop: 30,
              }}
            >
              <TextInput
                onChangeText={onChangeHeartRate}
                value={heartRate}
                placeholder="Enter Your Heart Rate"
                placeholderTextColor={"white"}
                inputMode={"numeric"}
                style={{
                  paddingLeft: 10,
                  paddingBottom: 10,
                  fontSize: 18,
                  fontWeight: "500",
                  color: "white",
                }}
              />
            </View>

            <View
              style={{
                borderBottomColor: "white",
                borderBottomWidth: 2,
                marginTop: 30,
              }}
            >
              <TextInput
                onChangeText={onChangeWeight}
                value={Weight}
                placeholder="Enter Your Weight"
                placeholderTextColor={"white"}
                inputMode={"numeric"}
                style={{
                  paddingLeft: 10,
                  paddingBottom: 10,
                  fontSize: 18,
                  fontWeight: "500",
                  color: "white",
                }}
              />
            </View>

            <View
              style={{
                borderBottomColor: "white",
                borderBottomWidth: 2,
                marginTop: 30,
              }}
            >
              <TextInput
                onChangeText={onChangeHeightinCm}
                value={heightInCm}
                placeholder="Enter Your Height"
                inputMode={"numeric"}
                placeholderTextColor={"white"}
                style={{
                  paddingLeft: 10,
                  paddingBottom: 10,
                  fontSize: 18,
                  fontWeight: "500",
                  color: "white",
                }}
              />
            </View>

            <View
              style={{
                borderBottomColor: "white",
                borderBottomWidth: 2,
                marginTop: 30,
              }}
            >
              <TextInput
                onChangeText={onChangeBMI}
                value={BMI}
                placeholder="Enter Your BMI"
                placeholderTextColor={"white"}
                inputMode={"numeric"}
                style={{
                  paddingLeft: 10,
                  paddingBottom: 10,
                  fontSize: 18,
                  fontWeight: "500",
                  color: "white",
                }}
              />
            </View>
            {loading == true ? (
              <ActivityIndicator
                size="large"
                color="white"
                style={{ marginTop: "12%" }}
              />
            ) : (
            <TouchableOpacity
              style={{
                marginTop: "15%",
                marginBottom: "6%",
                width: "100%",
                height: 50,
                borderWidth: 2,
                borderColor: "white",
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
              onPress={() => handleForm()}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                }}
              >
                Submit Form
              </Text>
            </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
