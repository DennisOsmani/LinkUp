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
    backgroundColor: colors.foreground,
    width: "90%",
    paddingHorizontal: horizontalScale(16),
    borderRadius: moderateScale(25),
    height: verticalScale(60),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1000,
  },
  topLeftSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropdownContainer: {
    height: verticalScale(100),
    minHeight: verticalScale(200),
    backgroundColor: colors.green,
  },
  dropdownStyle: {
    width: horizontalScale(120),
  },
  dropdownText: {
    fontSize: moderateScale(14),
  },
  dropdownLabel: {
    fontSize: moderateScale(20),
  },
  topSectionText: {
    fontSize: moderateScale(20),
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
