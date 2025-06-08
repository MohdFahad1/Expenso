import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { EMOJI_LIST } from "../../data/emoji";
import Animated, { withTiming, Easing } from "react-native-reanimated";

const FadeInScale = () => {
  "worklet";
  return {
    initialValues: {
      opacity: 0,
      transform: [{ scale: 0 }],
    },
    animations: {
      opacity: withTiming(1, { duration: 200 }),
      transform: [
        {
          scale: withTiming(1, {
            duration: 200,
            easing: Easing.out(Easing.exp),
          }),
        },
      ],
    },
  };
};

const FadeOutScale = () => {
  "worklet";
  return {
    initialValues: {
      opacity: 1,
      transform: [{ scale: 1 }],
    },
    animations: {
      opacity: withTiming(0, { duration: 200 }),
      transform: [
        {
          scale: withTiming(0, {
            duration: 200,
            easing: Easing.in(Easing.exp),
          }),
        },
      ],
    },
  };
};

const EmojiPicker = ({ emoji, setEmoji }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const allEmojis = EMOJI_LIST.flatMap((category) => category.emojis);

  const filteredEmojis = allEmojis.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View>
      <View style={styles.emojiSelectBox}>
        <Pressable onPress={() => setOpen(!open)}>
          <Text style={styles.emoji}>{emoji}</Text>
        </Pressable>
      </View>

      {open && (
        <Animated.View
          entering={FadeInScale}
          exiting={FadeOutScale}
          style={styles.emojiPickerBox}
        >
          <TextInput
            style={styles.searchInput}
            placeholder="Search emoji..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />

          {search === "" ? (
            <FlatList
              key={"categories"}
              data={EMOJI_LIST}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item: category }) => (
                <View style={{ marginBottom: 20 }}>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <FlatList
                    data={category.emojis}
                    numColumns={6}
                    keyExtractor={(item, index) => item.emoji + index}
                    scrollEnabled={false}
                    contentContainerStyle={styles.emojiList}
                    renderItem={({ item }) => (
                      <Pressable
                        onPress={() => {
                          setEmoji(item.emoji);
                          setOpen(false);
                          setSearch("");
                        }}
                        style={{ margin: 5 }}
                      >
                        <Text style={styles.emojiIcon}>{item.emoji}</Text>
                      </Pressable>
                    )}
                  />
                </View>
              )}
            />
          ) : (
            <FlatList
              key={"filtered"}
              data={filteredEmojis}
              numColumns={6}
              keyExtractor={(item, index) => item.emoji + index}
              contentContainerStyle={styles.emojiList}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    setEmoji(item.emoji);
                    setOpen(false);
                    setSearch("");
                  }}
                  style={{ margin: 5 }}
                >
                  <Text style={styles.emojiIcon}>{item.emoji}</Text>
                </Pressable>
              )}
            />
          )}
        </Animated.View>
      )}
    </View>
  );
};

export default EmojiPicker;

const styles = StyleSheet.create({
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
  emojiPickerBox: {
    height: hp(25.5),
    width: wp(80),
    borderWidth: 1,
    borderColor: "#e1e1e1",
    backgroundColor: "#212121",
    borderRadius: 10,
    position: "absolute",
    top: hp(8),
    zIndex: 10,
    elevation: 5,
    padding: 10,
  },
  emojiList: {
    paddingVertical: hp(1),
  },
  emojiIcon: {
    fontSize: hp(3.5),
    marginVertical: hp(0.5),
  },
  searchInput: {
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: "#fff",
    fontSize: hp(1.9),
    marginBottom: 5,
    borderColor: "#e1e1e1",
    borderWidth: 1,
  },
  categoryTitle: {
    fontSize: hp(2),
    fontWeight: "500",
    color: "#dee2e6",
    marginTop: 5,
  },
});
