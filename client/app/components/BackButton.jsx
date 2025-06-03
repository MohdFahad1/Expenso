import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const BackButton = () => {
  const router = useRouter();

  return (
    <Pressable style={styles.container} onPress={() => router.back()}>
      <Ionicons name="chevron-back" size={24} color="#e1e1e1" />
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#525252",
    width: 35,
    height: 35,
    borderCurve: "continuous",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp(4.5),
  },
});
