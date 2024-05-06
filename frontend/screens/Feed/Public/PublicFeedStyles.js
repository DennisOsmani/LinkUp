import { ScrollView, StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";
import {
  moderateScale,
  horizontalScale,
  verticalScale,
} from "../../../styles/genericDimensions";

export const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    width: "100%",
    //padding: moderateScale(20),
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(20),
    borderTopEndRadius: moderateScale(25),
    borderTopStartRadius: moderateScale(25),
    alignItems: "center",
    gap: 20,
  },
  topSection: {
    backgroundColor: colors.background,
    width: "100%",
    paddingHorizontal: horizontalScale(10),
    borderRadius: moderateScale(25),
    height: verticalScale(40),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1000,
  },
  topLeftSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "50%",
  },
  searchBar: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "50%",
    height: moderateScale(40),
    borderRadius: moderateScale(15),
    backgroundColor: colors.foreground,
    color: colors.grey,
  },
  searchInput: {
    fontFamily: "BalooRegular",
    fontSize: moderateScale(20),
    color: colors.black,
    height: "80%",
    width: "75%",
    marginLeft: horizontalScale(5),
  },
  mapFeather: {},
  searchFeather: {
    marginLeft: horizontalScale(10),
  },
  topSectionText: {
    fontSize: moderateScale(20),
    marginLeft: horizontalScale(0),
    fontFamily: "BalooBold",
  },
  midscreenMessages: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(200),
  },
  midscreenMessagesText: {
    fontSize: moderateScale(20),
    fontFamily: "BalooSemiBold",
    marginTop: moderateScale(20),
  },
  scrollView: {
    borderTopEndRadius: moderateScale(25),
    borderTopStartRadius: moderateScale(25),
  },
});
