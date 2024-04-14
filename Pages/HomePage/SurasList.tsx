import React, { useEffect } from "react";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
// Components
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ScrollBarView from "../Components/ScrollBar";
// Helpers
import { englishToArabicNumber, colorize } from "../../helpers";
// State
import { useDispatch, useSelector } from "react-redux";
import {
  CurrentSurahInd,
  SetCurrentSurahInd,
  JustEnteredNewSurah,
  SetJustEnteredNewSurah,
  SetInHomePage,
} from "../../Redux/slices/app";

interface Props {
  suras: any[];
}

const SurasList: React.FC<Props> = ({ suras }) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const wrapDispatch = (setter: any) => (arg: any) => dispatch(setter(arg));
  const isWeb = Platform.OS === "web";

  // Get index of current surah
  const [currentSurahInd, setCurrentSurahInd] = [
    useSelector(CurrentSurahInd),
    wrapDispatch(SetCurrentSurahInd),
  ];
  // Get whether the user just entered a new surah (both used to synchornize audio)
  const [justEnteredNewSurah, setJustEnteredSurah] = [
    useSelector(JustEnteredNewSurah),
    wrapDispatch(SetJustEnteredNewSurah),
  ];

  // Set in HomePage as false once the user navigates out
  const setInHomePage = wrapDispatch(SetInHomePage);

  return (
    <>
      <ScrollBarView styles={styles}>
        <View style={styles.container}>
          {suras.map((surah: any, index: number) => (
            <TouchableOpacity
              style={styles.itemWrapper}
              key={index.toString()}
              onPress={() => {
                if (index !== currentSurahInd) {
                  // to detect in audio player and go back to 1st Auya
                  setJustEnteredSurah(!justEnteredNewSurah);
                }
                setInHomePage(false);
                setCurrentSurahInd(index);
                navigation.navigate("SurahPage");
              }}
            >
              <View style={styles.item}>
                {/* contains khatim containing number then Surah Name */}
                <View style={styles.surahAndNumberContainer}>
                  <Text style={styles.khatim}>{"\ue901"}</Text>
                  <View
                    style={{
                      position: "absolute",
                      left: index < 10 ? 19 : 15,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: "UthmanBold",
                        fontSize: 17,
                        color: "white",
                      }}
                    >
                      {englishToArabicNumber(index + 1)}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.title}>{"سُورَةُ " + surah.name}</Text>
                  </View>
                </View>
                {/* contains the string with number of Ayas */}
                <View style={{ position: "absolute", right: 90 }}>
                  <Text
                    style={[
                      styles.title,
                      { fontFamily: "UthmanRegular", fontSize: 20 },
                    ]}
                  >
                    {englishToArabicNumber(surah.numAyas)}
                    {surah.numAyas > 10 ? " آية" : " آيات"}
                  </Text>
                </View>
                {/* contains whether surah is makeya or madaneya */}
                <View>
                  <Text style={styles.locIcon}>
                    {surah.locType == 1 ? "\ue905" : "\ue902"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollBarView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "space-around",
  },
  containerStyle: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,

    backgroundColor: colorize(-0.3, "#009193"),
    padding: 6,
  },
  scrollViewWrapper: {
    width: "100%",
    borderColor: "000",
  },
  scrollStyle: {
    opacity: 1.0,
    backgroundColor: "#fff",
  },
  surahAndNumberContainer: {
    flexDirection: "row",
    gap: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  itemWrapper: {
    padding: 10,
    marginVertical: 4,
    borderRadius: 30,
    width: "100%",
    borderBottomColor: "#009193",
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
  },
  khatim: {
    fontFamily: "Khatim",
    color: colorize(0.2, "#009193"),
    fontSize: 48,
  },
  title: {
    fontSize: 23,
    fontFamily: "UthmanBold",
    color: "white",
    letterSpacing: 4,
  },
  locIcon: {
    fontFamily: "Khatim",
    color: colorize(0.8, "#009193"),
    fontSize: 40,
  },
});

export default SurasList;
