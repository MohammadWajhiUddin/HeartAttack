import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

export default function PredictViaEcgImages({ route }) {
  const { result } = route.params;
  const [result1, setResult] = useState(null);

  useEffect(() => {
    setResult(String(result).trim().toUpperCase());
  }, [result]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View style={{ flex: 0.55 }}>
        <Image
          source={require("../assets/images/ai.png")}
          resizeMode="contain"
          style={{ width: "100%" }}
        />
      </View>

      <View style={{ flex: 0.5 }}>
        {result1 === null ? (
          <Text>Loading...</Text>
        ) : result1 == "F" ? (
          <View
            style={{
              marginHorizontal: "5%",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "300",
                textDecorationLine: "underline",
                color: "red",
              }}
            >
              F Beats :-
            </Text>

            <Text
              style={{ fontSize: 18, fontWeight: "300", marginVertical: 20 }}
            >
              Fusion of ventricular and normal beat
            </Text>

            <Text
              style={{
                fontSize: 30,
                fontWeight: "300",
                textDecorationLine: "underline",
                color: "red",
              }}
            >
              Recommendation :-
            </Text>

            <Text
              style={{ fontSize: 17, fontWeight: "300", marginVertical: 20 }}
            >
              Your heart rhythm seems irregular. It's important to see a doctor
              soon for a check-up.
            </Text>
          </View>
        ) : result1 == "N" ? (
          <View style={{ marginHorizontal: "5%" }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "300",
                textDecorationLine: "underline",
                color: "red",
              }}
            >
              N Beats :-
            </Text>

            <Text
              style={{ fontSize: 18, fontWeight: "300", marginVertical: 20 }}
            >
              Normal beat
            </Text>

            <Text
              style={{
                fontSize: 30,
                fontWeight: "300",
                textDecorationLine: "underline",
                color: "red",
              }}
            >
              Recommendation :-
            </Text>

            <Text
              style={{ fontSize: 17, fontWeight: "300", marginVertical: 20 }}
            >
              Your heart rhythm looks mostly normal. No immediate action needed,
              but regular check-ups are still a good idea.
            </Text>
          </View>
        ) : result1 == "M" ? (
          <View style={{ marginHorizontal: "5%" }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "300",
                textDecorationLine: "underline",
                color: "red",
              }}
            >
              M Beats :-
            </Text>

            <Text
              style={{ fontSize: 18, fontWeight: "300", marginVertical: 20 }}
            >
              Missed beat
            </Text>

            <Text
              style={{
                fontSize: 30,
                fontWeight: "300",
                textDecorationLine: "underline",
                color: "red",
              }}
            >
              Recommendation :-
            </Text>

            <Text
              style={{ fontSize: 17, fontWeight: "300", marginVertical: 20 }}
            >
              Your heart may have skipped a beat or two. This can be normal, but
              if it happens often, it's good to talk to a doctor.{" "}
            </Text>
          </View>
        ) : result1 == "Q" ? (
          <View style={{ marginHorizontal: "5%" }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "300",
                textDecorationLine: "underline",
                color: "red",
              }}
            >
              Q Beats :-
            </Text>

            <Text
              style={{ fontSize: 18, fontWeight: "300", marginVertical: 20 }}
            >
              Unclassifiable beat
            </Text>

            <Text
              style={{
                fontSize: 30,
                fontWeight: "300",
                textDecorationLine: "underline",
                color: "red",
              }}
            >
              Recommendation :-
            </Text>

            <Text
              style={{ fontSize: 17, fontWeight: "300", marginVertical: 20 }}
            >
              Your heart rhythm shows a change that could be important. Please
              see a doctor right away for further tests.
            </Text>
          </View>
        ) : result1 == "S" ? (
          <View style={{ marginHorizontal: "5%" }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "300",
                textDecorationLine: "underline",
                color: "red",
              }}
            >
              S Beats :-
            </Text>

            <Text
              style={{ fontSize: 18, fontWeight: "300", marginVertical: 20 }}
            >
              Supraventricular premature beat
            </Text>

            <Text
              style={{
                fontSize: 30,
                fontWeight: "300",
                textDecorationLine: "underline",
                color: "red",
              }}
            >
              Recommendation :-
            </Text>

            <Text
              style={{ fontSize: 17, fontWeight: "300", marginVertical: 20 }}
            >
              Your heart rhythm looks mostly okay, but there might be some
              slight irregularities. Keep up with regular check-ups with your
              doctor.
            </Text>
          </View>
        ) : result1 == "V" ? (
          <View style={{ marginHorizontal: "5%" }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "300",
                textDecorationLine: "underline",
                color: "red",
              }}
            >
              V Beats :-
            </Text>

            <Text
              style={{ fontSize: 18, fontWeight: "300", marginVertical: 20 }}
            >
              Premature ventricular contraction
            </Text>

            <Text
              style={{
                fontSize: 30,
                fontWeight: "300",
                textDecorationLine: "underline",
                color: "red",
              }}
            >
              Recommendation :-
            </Text>

            <Text
              style={{ fontSize: 17, fontWeight: "300", marginVertical: 20 }}
            >
              Similar to M beats, your heart may have skipped a beat or two.
              This is usually not a concern, but if it happens frequently,
              discuss it with your doctor.
            </Text>
          </View>
        ) : (
          <Text>Unknown result {result1}</Text>
        )}
      </View>
    </View>
  );
}
