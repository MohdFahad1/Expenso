import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useContext, useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ExpenseList from "../components/ExpenseList";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import { deleteExpense } from "../helpers/deleteExpense";

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(
        `http://192.168.1.19:5001/api/expense/all?userId=${user?.id}`
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

  const totalExpenseAmount = expenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  useFocusEffect(
    useCallback(() => {
      fetchExpenses();
    }, [])
  );

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
    <View style={styles.container}>
      <View style={styles.totalExpense}>
        <Text style={styles.expense}>- ${totalExpenseAmount}</Text>
        <Text style={styles.expenseText}>Total Expense</Text>
      </View>

      <View style={styles.tableWrapper}>
        <View style={styles.table}>
          <Text style={styles.heading}>My Expenses</Text>
          <ExpenseList
            expenses={expenses}
            height={hp(58)}
            onDeleteExpense={handleDelete}
          />
        </View>
      </View>
    </View>
  );
};

export default Expense;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flex: 1,
  },
  totalExpense: {
    backgroundColor: "#000000",
    height: hp(28),
    justifyContent: "center",
    alignItems: "center",
  },
  expense: {
    color: "#d3d3d3",
    fontSize: hp(8),
    marginTop: 20,
    color: "#ED2939",
  },
  expenseText: {
    color: "#d3d3d3",
    fontSize: hp(2.3),
    fontWeight: "400",
  },
  tableWrapper: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    overflow: "hidden",
    backgroundColor: "#171717",
    flex: 1,
  },
  table: {
    backgroundColor: "#171717",
    padding: 15,
    flex: 1,
  },
  heading: {
    fontSize: hp(3.5),
    fontWeight: "600",
    color: "#d3d3d3",
    marginBottom: hp(2),
  },
});
