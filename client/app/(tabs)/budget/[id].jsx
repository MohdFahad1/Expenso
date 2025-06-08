import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import BackButton from "../../components/BackButton";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function BudgetDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { user } = useContext(AuthContext);

  return (
    <ScreenWrapper bg="#171717">
      <View style={styles.container}>
        <BackButton />
        <Text>My Expenses</Text>
        <View>
          <Text style={styles.modalTitle}>Add New Expense</Text>
          <View>
            <Text style={styles.inputBudgetName}>Expense Name</Text>
            <TextInput
              placeholder="e.g. Home Decor"
              placeholderTextColor={"#666666"}
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputBudgetName}>Expense Amount</Text>
            <TextInput
              placeholder="e.g. $5000"
              placeholderTextColor={"#666666"}
              style={styles.input}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.btn}>
            <Pressable
              style={styles.modalCloseBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseBtnText}>Cancel</Text>
            </Pressable>

            <Pressable style={styles.modalAddBtn}>
              <Text style={styles.modalAddBtnText}>Add</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View>
        <Text>Latest EXpenses</Text>
        
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: "#171717",
  },
  title: {
    color: "#fff",
    fontSize: 22,
  },
});
