import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { AuthContext } from "../../../context/AuthContext";
import ExpenseList from "../../components/ExpenseList";
import BackButton from "../../components/BackButton";
import ScreenWrapper from "../../components/ScreenWrapper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const BudgetDetailsScreen = () => {
  const { id, name } = useLocalSearchParams();
  const { user } = useContext(AuthContext);

  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(
        `http://192.168.1.19:5001/api/expense?budgetId=${id}`
      );
      setExpenses(res?.data?.expenses || []);
    } catch (error) {
      if (error.response?.status === 404) {
        console.log("No expenses found for this budget.");
        setExpenses([]);
      } else {
        console.log("Error fetching expenses:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [id]);

  const addExpense = async () => {
    if (!expenseName || !amount) {
      Alert.alert("Validation Error", "Please enter all fields.");
      return;
    }

    try {
      const res = await axios.post(
        "http://192.168.1.19:5001/api/expense/create",
        {
          userId: user?.id,
          budgetId: id,
          name: expenseName,
          amount: Number(amount),
        }
      );

      console.log("SUCCESS:", res.data);
      Alert.alert("Success", "Expense added successfully!");

      await fetchExpenses();
      setExpenseName("");
      setAmount("");
    } catch (error) {
      console.log("Error in creating expense:", error.message);
      Alert.alert("Error", "Please try again later.");
    }
  };

  const handleDelete = async (id) => {
    const res = await deleteExpense(id);
    if (res.success) {
      Alert.alert("Success", "Expense deleted successfully.");
      fetchExpenses();
    } else {
      Alert.alert("Error", "Failed to delete expense. Please try again.");
    }
  };

  return (
    <ScreenWrapper bg="#171717">
      <View style={styles.container}>
        <BackButton title={name} />
        <View>
          <Text style={styles.mainTitle}>Add New Expense</Text>

          <View>
            <Text style={styles.inputLabel}>Expense Name</Text>
            <TextInput
              placeholder="e.g. Home Decor"
              placeholderTextColor="#666"
              style={styles.input}
              value={expenseName}
              onChangeText={setExpenseName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Expense Amount</Text>
            <TextInput
              placeholder="e.g. 5000"
              placeholderTextColor="#666"
              style={styles.input}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <View style={styles.btn}>
            <Pressable style={styles.addBtn} onPress={addExpense}>
              <Text style={styles.addBtnText}>Add</Text>
            </Pressable>
          </View>
        </View>

        <View>
          <Text style={styles.expenseTitle}>Latest Expenses</Text>
          {expenses.length === 0 ? (
            <View style={styles.noExpenseContainer}>
              <Text style={styles.noExpense}>No expenses yet</Text>
            </View>
          ) : (
            <ExpenseList expenses={expenses} onDeleteExpense={handleDelete} />
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default BudgetDetailsScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: "#171717",
  },
  title: {
    color: "#fff",
    fontSize: hp(2.5),
  },
  mainTitle: {
    fontSize: hp(2.5),
    color: "#e1e1e1",
    fontWeight: "bold",
    marginBottom: 20,
  },
  emojiSelectBox: {
    backgroundColor: "#3a3a3a",
    borderRadius: 10,
    height: hp(7),
    width: wp(14.5),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  emoji: {
    fontSize: hp(3.5),
  },
  inputLabel: {
    fontSize: hp(2.6),
    fontWeight: "500",
    marginBottom: 10,
    color: "#e3e3e3",
  },

  input: {
    borderWidth: 1,
    borderColor: "#666666",
    color: "#e1e1e1",
    borderRadius: 7,
    paddingHorizontal: 10,
  },

  inputContainer: {
    marginTop: 18,
  },
  btn: {
    flexDirection: "row",
    marginTop: 20,
  },

  addBtn: {
    fontSize: hp(2.2),
    backgroundColor: "#A3E535",
    paddingVertical: hp(2),
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
  },

  addBtnText: {
    color: "#313131",
    borderRadius: 10,
    fontSize: hp(2.2),
    fontWeight: "500",
  },

  expenseTitle: {
    fontSize: hp(2.5),
    color: "#e1e1e1",
    fontWeight: "bold",
    marginTop: 20,
  },
  noExpense: {
    fontSize: hp(3),
    fontWeight: "600",
    color: "#e1e1e1",
  },
});
