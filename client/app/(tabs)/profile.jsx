import { View, Text, StyleSheet, Pressable, Image, Alert } from "react-native";
import React, { useContext } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import { AuthContext } from "../../context/AuthContext";
import { Feather, AntDesign } from "@expo/vector-icons";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: logout, style: "destructive" },
    ]);
  };

  const firstLetter = user?.name.slice(0, 1);

  return (
    <ScreenWrapper bg="#171717">
      <View style={styles.container}>
        <View style={styles.profileCard}>
          <View
            style={{
              height: heightPercentageToDP(19),
              width: widthPercentageToDP(40),
              backgroundColor: "#292929",
              justifyContent: "center",
              alignItems: "center",
              borderCurve: "continuous",
              borderRadius: "100%",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: heightPercentageToDP(10),
                color: "#e3e3e3",
              }}
            >
              {firstLetter}
            </Text>
          </View>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <View style={styles.optionsContainer}>
          <OptionItem
            icon={<Feather name="user" size={20} color="#fff" />}
            label="Edit Profile"
          />
          <OptionItem
            icon={<Feather name="settings" size={20} color="#fff" />}
            label="Settings"
          />
          <OptionItem
            icon={<Feather name="lock" size={20} color="#fff" />}
            label="Privacy Policy"
          />
        </View>

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <View style={styles.logoutContent}>
            <AntDesign name="poweroff" size={20} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </View>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
};

const OptionItem = ({ icon, label }) => (
  <Pressable style={styles.optionRow}>
    {icon}
    <Text style={styles.optionText}>{label}</Text>
  </Pressable>
);

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileCard: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  email: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 2,
  },
  optionsContainer: {
    marginVertical: 20,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    gap: 12,
  },
  optionText: {
    fontSize: 16,
    color: "#fff",
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: "#dc143c",
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 8,
  },
  logoutContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
