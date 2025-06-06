import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { logout } = useContext(AuthContext);

  return (
    <ScreenWrapper>
      <Pressable onPress={logout}>
        <Text>Logout</Text>
      </Pressable>
      <Text>Profile</Text>
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({});
