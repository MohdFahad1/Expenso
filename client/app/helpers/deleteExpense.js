import axios from "axios";
import { Alert } from "react-native";

export const deleteExpense = async (expenseId) => {
  try {
    await axios.delete(
      `http://192.168.1.19:5001/api/expense?expenseId=${expenseId}`
    );
    return {
      success: true,
    };
  } catch (error) {
    console.log("Error deleting expense: ", error.message);
    Alert.alert("Error", "Error deleting expense, Please try again later");
    return false;
  }
};
