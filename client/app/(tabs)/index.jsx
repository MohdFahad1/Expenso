import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "expo-router";

const Home = () => {
  const { token } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("(auth)/Login");
    }
  }, [token]);

  if (!token) {
    return null;
  }

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
