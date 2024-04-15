import { StyleSheet } from "react-native";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../../styles/genericDimensions";
import { colors } from "../../../../styles/colors";

export const styles = StyleSheet.create({
  eventTabContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    borderTopEndRadius: moderateScale(25),
    borderTopStartRadius: moderateScale(25),
    backgroundColor: colors.background,
    rowGap: verticalScale(10),
  },

  imageContainer: {
    borderTopEndRadius: moderateScale(25),
    borderTopStartRadius: moderateScale(25),
    width: "100%",
    height: moderateScale(200),
  },

  firstRowWrapper: {
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

  visibility: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(20),
    borderWidth: moderateScale(3),
    borderColor: colors.primary,
  },

  visibilityText: {
    fontSize: moderateScale(16),
    fontFamily: "BalooBold",
    color: colors.primary,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: horizontalScale(10),
  },

  datetime: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    columnGap: horizontalScale(5),
  },

  datetimeText: {
    fontSize: moderateScale(20),
    fontFamily: "BalooRegular",
    color: "black",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  secondRowWrapper: {
    width: "90%",
    alignItems: "flex-start",
  },

  eventNameText: {
    fontSize: moderateScale(35),
    fontFamily: "BalooBold",
    color: "black",
    height: 50,
  },

  locationWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: horizontalScale(7),
  },

  locationText: {
    fontSize: moderateScale(20),
    fontFamily: "BalooRegular",
    color: "black",
  },

  thirdRowWrapper: {
    width: "90%",
  },

  enrolledText: {
    fontSize: moderateScale(22),
    fontFamily: "BalooRegular",
    color: colors.grey,
  },

  enrolledBarOutline: {
    width: "100%",
    height: verticalScale(50),
    borderRadius: moderateScale(15),
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

  enrolledBar: {
    borderRadius: moderateScale(15),
    width: "100%",
    height: "100%",
    backgroundColor: colors.primary,
  },

  enrolledCount: {
    position: "absolute",
    fontSize: moderateScale(23),
    fontFamily: "BalooBold",
    color: "black",
    right: horizontalScale(15),
  },

  fourthRowWrapper: {
    width: "90%",
  },

  descriptionHeader: {
    fontSize: moderateScale(22),
    fontFamily: "BalooRegular",
    color: colors.grey,
  },

  descriptionBox: {
    backgroundColor: "white",
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(15),
  },

  description: {
    fontSize: moderateScale(20),
    fontFamily: "BalooRegular",
    color: "black",
    lineHeight: moderateScale(24),
  },

  buttonWrapper: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  backButton: {
    backgroundColor: colors.primary,
    borderRadius: moderateScale(10),
    width: horizontalScale(160),
    height: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
  },

  backButtonText: {
    fontFamily: "BalooBold",
    color: "white",
    fontSize: moderateScale(24),
  },

  leaveEventButton: {
    backgroundColor: colors.foreground,
    borderColor: colors.primary,
    borderWidth: moderateScale(3.5),
    borderRadius: moderateScale(10),
    width: horizontalScale(160),
    height: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
  },

  leaveEventButtonText: {
    fontFamily: "BalooBold",
    fontSize: moderateScale(24),
    color: colors.primary,
  },
});
