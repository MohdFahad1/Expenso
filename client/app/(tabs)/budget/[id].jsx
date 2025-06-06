// app/budget/[id].tsx
import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function BudgetDetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget ID: {id}</Text>
      {/* Here you can fetch and display budget-specific expenses */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#171717",
  },
  title: {
    color: "#fff",
    fontSize: 22,
  },
});
