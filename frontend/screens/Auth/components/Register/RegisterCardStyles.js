import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/colors";
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from "../../../../styles/genericDimensions";

export default StyleSheet.create({
  card: {
    marginTop: verticalScale(25),
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(30),
    paddingTop: verticalScale(35),
    paddingBottom: verticalScale(45),
    backgroundColor: colors.background,
    borderRadius: moderateScale(30),
  },

  inputContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    backgroundColor: colors.foreground,
    height: verticalScale(50),
    borderRadius: moderateScale(15),
    marginBottom: verticalScale(30),
    width: horizontalScale(300),
    paddingLeft: horizontalScale(12),
    fontSize: moderateScale(20),
    fontFamily: "BalooRegular",
  },

  button: {
    backgroundColor: colors.primary,
    borderRadius: moderateScale(15),
    alignItems: "center",
    justifyContent: "center",
    width: horizontalScale(230),
    height: verticalScale(55),
    marginBottom: verticalScale(20),
    fontFamily: "BalooBold",
  },

  text: {
    color: colors.background,
    fontSize: moderateScale(26),
    fontFamily: "BalooBold",
  },

  linkContainer: {
    flexDirection: "row",
  },

  question: {
    color: colors.grey,
    marginRight: horizontalScale(5),
    fontSize: moderateScale(16),
  },

  link: {
    color: "blue",
    fontSize: moderateScale(16),
    fontWeight: "500",
  },

  wrapper: {
    justifyContent: "center",
    alignItems: "center",
  },

  compHeader: {
    textAlign: "center",
    fontFamily: "BalooBold",
    fontSize: moderateScale(40),
    color: "white",
  },

  lastLineWrapper: {
    width: horizontalScale(300),
    marginTop: horizontalScale(-10),
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  tagAndInput: {
    flexDirection: "column",
    rowGap: verticalScale(0),
  },
  inputLabel: {
    fontFamily: "BalooRegular",
    fontSize: moderateScale(14),
    marginLeft: horizontalScale(3),
  },
  datetimepickerBox: {
    backgroundColor: colors.foreground,
    height: verticalScale(50),
    borderRadius: moderateScale(15),
    marginBottom: verticalScale(30),
    width: horizontalScale(142),
    alignItems: "center",
    justifyContent: "center",
  },
  pickerBox: {
    marginRight: verticalScale(10),
  },
  genderContainer: {
    height: verticalScale(50),
    borderRadius: moderateScale(15),
    marginBottom: verticalScale(30),
    width: horizontalScale(142),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  genderText: {
    fontFamily: "BalooRegular",
    fontSize: moderateScale(22),
    color: "rgba(128, 128, 128, 0.4)",
  },
  genderBox: {
    backgroundColor: colors.foreground,
    height: verticalScale(50),
    width: "30%",
    borderRadius: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
  },
});
