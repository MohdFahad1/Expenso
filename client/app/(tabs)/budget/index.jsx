import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
  Modal,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import Feather from "@expo/vector-icons/Feather";
import BudgetCard from "../../components/BudgetCard";
import EmojiPicker from "../../components/EmojiPicker";

const Budget = () => {
  const { user } = useContext(AuthContext);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState(0);
  const [emoji, setEmoji] = useState("💰");

  const fetchBudgets = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://192.168.1.19:5001/api/budget/all?userId=${user?.id}`
      );
      setBudgets(res?.data?.budgets || []);
    } catch (error) {
      console.log("Error fetching budgets: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const addBudget = async () => {
    try {
      const res = await axios.post(
        `http://192.168.1.19:5001/api/budget/create`,
        {
          emoji,
          name: budgetName,
          amount: budgetAmount,
          userId: user?.id,
        }
      );

      fetchBudgets();

      setModalVisible(false);
      setBudgetName("");
      setBudgetAmount(0);
      setEmoji("💰");

      Alert.alert("Success", "Budget added successfully");
    } catch (error) {
      console.log("Error fetching budgets: ", error);
      Alert.alert(
        "Error",
        "There was an error adding your budget. Try again later."
      );
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchBudgets();
    }
  }, [user]);

  const totalBudgetAmount = budgets.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const renderItem = ({ item }) => <BudgetCard budget={item} />;

  return (
    <ScreenWrapper bg="#000000">
      <View style={styles.totalBudget}>
        <Text style={styles.totalBudgetAmount}>+ ${totalBudgetAmount}</Text>
        <Text style={styles.balance}>Total balance</Text>
      </View>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.mainText}>My Budgets</Text>
          <Pressable
            style={styles.addBtnBox}
            onPress={() => setModalVisible(true)}
          >
            <Feather name="plus" size={22} color="#171717" />
          </Pressable>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#A3E535" />
        ) : (
          <FlatList
            data={budgets}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={
              budgets.length === 0 ? styles.emptyContainer : styles.list
            }
            ListEmptyComponent={
              <Text style={styles.emptyText}>No budgets found.</Text>
            }
          />
        )}
      </View>

      {/* MODAL FORM */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <KeyboardAvoidingView>
              <Text style={styles.modalTitle}>Add New Budget</Text>

              <EmojiPicker emoji={emoji} setEmoji={setEmoji} />

              <View>
                <Text style={styles.inputBudgetName}>Budget Name</Text>
                <TextInput
                  placeholder="e.g. Home Decor"
                  placeholderTextColor={"#666666"}
                  style={styles.input}
                  value={budgetName}
                  onChangeText={setBudgetName}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputBudgetName}>Budget Amount</Text>
                <TextInput
                  placeholder="e.g. $5000"
                  placeholderTextColor={"#666666"}
                  style={styles.input}
                  keyboardType="numeric"
                  value={budgetAmount}
                  onChangeText={setBudgetAmount}
                />
              </View>

              <View style={styles.btn}>
                <Pressable
                  style={styles.modalCloseBtn}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalCloseBtnText}>Cancel</Text>
                </Pressable>

                <Pressable style={styles.modalAddBtn} onPress={addBudget}>
                  <Text style={styles.modalAddBtnText}>Add</Text>
                </Pressable>
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
};

export default Budget;

const styles = StyleSheet.create({
  totalBudget: {
    height: hp(30),
    width: wp(100),
    backgroundColor: "#000000",
    position: "absolute",
    top: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  totalBudgetAmount: {
    zIndex: 10,
    color: "#A3E535",
    fontSize: hp(8),
    marginTop: 20,
  },
  balance: {
    color: "#e1e1e1",
    fontSize: hp(2.3),
  },
  container: {
    height: hp(67),
    paddingHorizontal: wp(6),
    paddingTop: hp(3),
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    zIndex: 10,
    marginTop: hp(25),
    backgroundColor: "#1f1f1f",
    overflow: "hidden",
    position: "relative",
  },
  mainText: {
    color: "#e1e1e1",
    fontSize: hp(3.5),
    fontWeight: "400",
    marginBottom: hp(2),
  },
  addBtnBox: {
    backgroundColor: "#9BE731",
    width: wp(8.5),
    height: hp(4),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  list: {
    paddingBottom: hp(2),
    gap: 12,
    marginTop: 10,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#888",
    fontSize: hp(2),
    marginTop: 20,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#262626",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: hp(85),
  },
  modalTitle: {
    fontSize: hp(2.5),
    color: "#e1e1e1",
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalCloseBtn: {
    marginTop: 20,
    backgroundColor: "#3a3a3a",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
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
  inputBudgetName: {
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
    justifyContent: "flex-end",
    width: wp(88),
    marginTop: 20,
  },

  modalCloseBtn: {
    backgroundColor: "#3a3a3a",
    paddingVertical: hp(2),
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
  },

  modalCloseBtnText: {
    color: "#e1e1e1",
    fontSize: hp(2.2),
    fontWeight: "500",
  },

  modalAddBtn: {
    fontSize: hp(2.2),
    backgroundColor: "#A3E535",
    paddingVertical: hp(2),
    borderRadius: 10,
    marginLeft: 10,
    flex: 1,
    alignItems: "center",
  },
  modalAddBtnText: {
    color: "#313131",
    borderRadius: 10,
    fontSize: hp(2.2),
    fontWeight: "500",
  },
});
