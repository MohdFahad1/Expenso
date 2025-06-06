import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
  Modal,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Feather from "@expo/vector-icons/Feather";

const Budget = () => {
  const { user } = useContext(AuthContext);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState(0);
  const [selectedEmoji, setSelectedEmoji] = useState("💰");

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
          emoji: selectedEmoji,
          name: budgetName,
          amount: budgetAmount,
          userId: user?.id,
        }
      );

      setBudgets((prevBudgets) => [...prevBudgets, res.data.newBudget]);

      fetchBudgets();

      setModalVisible(false);
      setBudgetName("");
      setBudgetAmount(0);
      setSelectedEmoji("💰");

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

  const renderItem = ({ item }) => (
    <View style={styles.budgetCard}>
      <View style={styles.budgetDetails}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={styles.emojiBox}>
            <Text style={styles.budgetEmoji}>{item.emoji}</Text>
          </View>
          <View>
            <Text style={styles.budgetTitle}>{item.name}</Text>
            <Text style={{ color: "#9CA3AF" }}>3 items</Text>
          </View>
        </View>
        <Text style={styles.budgetAmount}>${item.amount}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 15,
        }}
      >
        <Text style={{ color: "#6B7280" }}>$1020 Spent</Text>
        <Text style={{ color: "#6B7280" }}>$2020 Remaining</Text>
      </View>
      <View style={styles.line}>
        <View style={styles.innerLine}></View>
      </View>
    </View>
  );

  return (
    <ScreenWrapper bg="#171717">
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
            <Feather name="plus" size={24} color="#e1e1e1" />
          </Pressable>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#A3E535" />
        ) : (
          <FlatList
            data={budgets}
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
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>Add New Budget</Text>

              <View style={styles.emojiSelectBox}>
                <TextInput
                  style={styles.emoji}
                  value={selectedEmoji}
                  onChangeText={(text) => {
                    const match = text.match(/\p{Emoji}/u);
                    if (match) {
                      setSelectedEmoji(match[0]);
                    } else {
                      setSelectedEmoji("");
                    }
                  }}
                  keyboardType="default"
                  maxLength={2}
                />
              </View>

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
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
};

export default Budget;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
  },
  mainText: {
    color: "#e1e1e1",
    fontSize: hp(4),
    fontWeight: "bold",
    marginBottom: hp(2),
  },
  addBtnBox: {
    backgroundColor: "#3a3a3a",
    width: wp(13),
    height: hp(4),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
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
  budgetCard: {
    backgroundColor: "#262626",
    padding: 16,
    borderRadius: 10,
  },
  budgetDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  budgetTitle: {
    color: "#e1e1e1",
    fontSize: hp(2.5),
    fontWeight: "600",
    textTransform: "capitalize",
  },
  budgetAmount: {
    color: "#A3E535",
    fontSize: hp(2.8),
    fontWeight: "bold",
  },
  emojiBox: {
    backgroundColor: "#3a3a3a",
    borderRadius: 100,
    height: hp(6.5),
    width: wp(14),
    justifyContent: "center",
    alignItems: "center",
  },
  budgetEmoji: {
    fontSize: hp(2.8),
  },
  line: {
    width: wp(81.5),
    height: hp(1),
    backgroundColor: "#CBD5E1",
    borderRadius: 50,
    marginTop: 8,
  },
  innerLine: {
    width: wp(40),
    height: hp(1),
    backgroundColor: "#A3E535",
    borderRadius: 50,
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
