import { StyleSheet, TextInput } from "react-native";
import { colors } from "../../styles/colors";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../styles/genericDimensions";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: colors.primary,
    justifyContent: "flex-end",
  },

  imageContainer: {
    width: horizontalScale(150),
    height: verticalScale(150),
    borderRadius: moderateScale(100),
    marginBottom: verticalScale(12),
  },

  uploadContainer: {
    position: "absolute",
    right: horizontalScale(5),
    bottom: verticalScale(5),
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width: horizontalScale(27),
    height: verticalScale(25),
    borderRadius: moderateScale(10),
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: horizontalScale(8),
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: verticalScale(10),
  },

  stats: {
    flexDirection: "column",
    alignItems: "center",
    width: horizontalScale(120),
  },

  statsText: {
    fontFamily: "BalooBold",
    fontSize: moderateScale(18),
    color: colors.foreground,
    lineHeight: verticalScale(20),
  },

  foregroundCard: {
    backgroundColor: colors.background,
    height: "65%",
    width: "100%",
    borderTopEndRadius: moderateScale(25),
    borderTopStartRadius: moderateScale(25),
    justifyContent: "center",
    alignItems: "center",
  },

  smallBoxesContainer: {
    flexDirection: "row",
    marginBottom: verticalScale(15),
    justifyContent: "center",
    width: "90%",
    justifyContent: "space-between",
  },

  inputBoxRegular: {
    backgroundColor: colors.foreground,
    borderRadius: moderateScale(15),
    height: verticalScale(35),
    width: "90%",
    marginBottom: verticalScale(15),
    justifyContent: "center",
  },

  inputBoxSmall: {
    backgroundColor: colors.foreground,
    borderRadius: moderateScale(15),
    height: verticalScale(35),
    width: horizontalScale(100),
    justifyContent: "center",
  },

  inputBoxBig: {
    backgroundColor: colors.foreground,
    borderRadius: moderateScale(15),
    height: verticalScale(135),
    width: "90%",
    marginBottom: verticalScale(15),
  },

  inputTextBig: {
    paddingTop: verticalScale(10),
    paddingLeft: horizontalScale(10),
  },

  inputText: {
    paddingLeft: horizontalScale(10),
  },

  editButton: {
    borderRadius: moderateScale(10),
    backgroundColor: colors.primary,
    justifyContent: "center",
    height: verticalScale(40),
    width: horizontalScale(130),
  },

  editButtonText: {
    color: colors.foreground,
    textAlign: "center",
    fontSize: moderateScale(18),
    fontFamily: "BalooBold",
  },
});
