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

  thirdRowWrapper: {},

  enrolledText: {
    fontSize: moderateScale(20),
    fontFamily: "BalooRegular",
    color: colors.grey,
  },

  enrolledBarOutline: {
    borderRadius: moderateScale(5),
    backgroundColor: colors.primary,
  },

  enrolledBar: {
    borderRadius: moderateScale(5),
    backgroundColor: colors.secondary,
  },

  enrolledCount: {},

  descriptionHeader: {},

  fourthRowWrapper: {},

  leaveEventButton: {},
});
