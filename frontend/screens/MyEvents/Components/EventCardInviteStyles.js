import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";
import {
  moderateScale,
  horizontalScale,
  verticalScale,
} from "../../../styles/genericDimensions";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.foreground,
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    gap: verticalScale(8),
    width: "100%",
  },
  iconTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(4),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: moderateScale(14),
    fontFamily: "BalooRegular",
    color: colors.grey,
  },
  headerIcon: {
    fontSize: moderateScale(14),
    marginTop: verticalScale(-1),
    color: colors.grey,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: horizontalScale(8),
    maxHeight: verticalScale(200),
  },
  leftSide: {
    flex: "2",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  upperLeftSide: {},
  title: {
    fontSize: moderateScale(24),
    marginTop: verticalScale(-4),
    fontFamily: "BalooBold",
  },
  descriptionWrapper: {
    height: verticalScale(75),
  },
  text: {
    fontSize: moderateScale(16),
    fontFamily: "BalooRegular",
  },
  hostText: {
    fontSize: moderateScale(16),
    fontFamily: "BalooSemiBold",
  },
  hostIcon: {
    fontSize: moderateScale(18),
    marginTop: verticalScale(-2),
  },
  lowerLeftSide: {
    gap: verticalScale(4),
  },
  addressText: {
    marginLeft: horizontalScale(4),
    fontSize: moderateScale(14),
    fontFamily: "BalooRegular",
    color: colors.grey,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 12,
  },
  button: {
    display: "flex",
    justifyContent: "center",
    borderRadius: moderateScale(10),
    backgroundColor: colors.primary,
    height: verticalScale(32),
    width: moderateScale(90),
  },
  buttonText: {
    color: colors.foreground,
    textAlign: "center",
    fontSize: moderateScale(20),
    fontWeight: "bold",
    fontFamily: "BalooBold",
  },
  invertedButton: {
    display: "flex",
    justifyContent: "center",
    borderRadius: moderateScale(10),
    backgroundColor: colors.foreground,
    borderWidth: moderateScale(2.5),
    borderColor: colors.primary,
    height: verticalScale(32),
    width: moderateScale(90),
  },
  invertedButtonText: {
    color: colors.primary,
    textAlign: "center",
    fontSize: moderateScale(20),
    fontWeight: "bold",
    fontFamily: "BalooBold",
  },
  rightSide: {
    flex: 1,
  },
  ///THIS DOES NOT WORK
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: moderateScale(16),
  },
  /////////////////////
});
