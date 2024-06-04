import * as React from "react";
import { StatusBar } from "expo-status-bar";

import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  EnvelopeOpenIcon,
  LockClosedIcon,
  UserIcon,
  PhoneIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

import { registerUser } from "../services/ALLAPIS";

export default function Login() {
  const navigation = useNavigation();

  const [userName, onChangeuserName] = React.useState("");
  const [userEmail, onChangeuserEmail] = React.useState("");
  const [userContactNumber, onChangeuserContactNumber] = React.useState("");
  const [userPassword, onChangeuserPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleRegister = async () => {
    setLoading(true);
    let payload = {
      userName: userName,
      userEmail: userEmail,
      userContactNumber: userContactNumber,
      userPassword: userPassword,
    };

    let response = await registerUser(payload);
    if(response.status == 201)
      {
        setLoading(false);
        Alert.alert("User have been Registered Successfully")

        navigation.navigate('Login')
      }
      else{
        Alert.alert({error})
      }
  };
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar barStyle="dark-content" />

      <View
        style={{
          flex: 0.2,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <View style={{ marginVertical: 30, marginHorizontal: 30 }}>
          <Image
            source={require("../assets/images/login.png")}
            style={{ width: 300, height: 300, resizeMode: "contain" }}
          />
        </View>
      </View>

      <View style={{ flex: 0.8 }}>
        <View
          style={{
            marginVertical: 20,
            marginHorizontal: 20,
            height: 550,
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
              marginTop: 20,
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
              SIGNUP
            </Text>
          </View>

          <View style={{ marginTop: 30, marginHorizontal: 20 }}>
            <View
              style={{
                flexDirection: "row",
                borderBottomColor: "white",
                justifyContent:'flex-start',
                borderBottomWidth: 2,
              }}
            >
              <UserIcon color="white" fill="white" size={26} />

              <TextInput
                onChangeText={onChangeuserName}
                value={userName}
                placeholder="Enter User Name"
                placeholderTextColor={"white"}
                style={{
                  paddingLeft: 10,
                  paddingBottom: 10,
                  fontSize: 18,
                  fontWeight: "500",
                  color: "white",
                  flex:1

                }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                borderBottomColor: "white",
                borderBottomWidth: 2,
                marginTop: 30,
              }}
            >
              <EnvelopeOpenIcon color="white" fill="white" size={26} />

              <TextInput
                onChangeText={onChangeuserEmail}
                value={userEmail}
                placeholder="Enter User Email"
                placeholderTextColor={"white"}
                style={{
                  paddingLeft: 10,
                  paddingBottom: 10,
                  fontSize: 18,
                  fontWeight: "500",
                  color: "white",
                  flex:1
                }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                borderBottomColor: "white",
                borderBottomWidth: 2,
                marginTop: 30,
              }}
            >
              <PhoneIcon color="white" fill="white" size={26} />

              <TextInput
                onChangeText={onChangeuserContactNumber}
                value={userContactNumber}
                placeholder="Enter User Contact Number"
                placeholderTextColor={"white"}
                style={{
                  paddingLeft: 10,
                  paddingBottom: 10,
                  fontSize: 18,
                  fontWeight: "500",
                  color: "white",
                  flex:1
                }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                borderBottomColor: "white",
                borderBottomWidth: 2,
                marginTop: 30,
              }}
            >
              <LockClosedIcon color="white" fill="white" size={26} />

              <TextInput
                onChangeText={onChangeuserPassword}
                value={userPassword}
                placeholder="Enter Your Password"
                placeholderTextColor={"white"}
                secureTextEntry={true}
                style={{
                  paddingLeft: 10,
                  paddingBottom: 10,
                  fontSize: 18,
                  fontWeight: "500",
                  color: "white",
                  flex:1
                }}
              />
            </View>
            {loading == true ? (
              <ActivityIndicator   size="large" color="white" style={{marginTop:'12%'}}/>
            ) : (
              <TouchableOpacity
                style={{
                  marginTop: 50,
                  width: "100%",
                  height: 50,
                  borderWidth: 2,
                  borderColor: "white",
                  borderRadius: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
                onPress={() => handleRegister()}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "white",
                  }}
                >
                  Signup
                </Text>
              </TouchableOpacity>
            )}

            <View
              style={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                marginTop: 80,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "400", color: "white" }}>
                Already have an account ?{" "}
                <Text
                  style={{ fontSize: 16, fontWeight: "800", color: "white" }}
                  onPress={() => navigation.navigate("Login")}
                >
                  {" "}
                  Login
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
