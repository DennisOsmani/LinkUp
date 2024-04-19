import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from "../../styles/genericDimensions";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: colors.primary,
    justifyContent: "flex-end",
  },

  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  icon: {
    fontFamily: "BalooBold",
    fontSize: moderateScale(40),
    color: colors.foreground,
  },

  blockText: {
    fontFamily: "BalooBold",
    fontSize: moderateScale(24),
    color: colors.foreground,
  },

  image: {
    borderRadius: moderateScale(100),
    width: horizontalScale(180),
    height: verticalScale(180),
    borderWidth: moderateScale(3),
    marginBottom: verticalScale(20),
    borderColor: colors.foreground,
  },

  nameContainer: {
    width: "90%",
    alignItems: "center",
    marginBottom: verticalScale(16),
  },
  nameText: {
    fontFamily: "BalooBold",
    fontSize: moderateScale(38),
    color: colors.foreground,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: verticalScale(15),
  },

  stats: {
    flexDirection: "column",
    alignItems: "center",
    width: horizontalScale(120),
  },

  statsText: {
    fontFamily: "BalooBold",
    fontSize: moderateScale(20),
    color: colors.foreground,
    lineHeight: verticalScale(25),
  },

  foregroundCard: {
    backgroundColor: colors.background,
    height: "48%",
    width: "100%",
    borderTopEndRadius: moderateScale(25),
    borderTopStartRadius: moderateScale(25),
    justifyContent: "flex-start",
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
    paddingLeft: horizontalScale(15),
    fontFamily: "BalooRegular",
    fontSize: moderateScale(18),
  },

  inputText: {
    paddingLeft: horizontalScale(15),
    fontFamily: "BalooRegular",
    fontSize: moderateScale(18),
  },

  legendContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: verticalScale(26),
  },
  legendContainerSmallBox: {},
  legendContainerBigBox: {
    width: "100%",
    alignItems: "center",
  },
  legendText: {
    fontFamily: "BalooRegular",
    fontSize: moderateScale(12),
    color: colors.thirdary,
    zIndex: 1,
    position: "absolute",
    top: -10,
    left: 36,
  },
  legendTextSmallBox: {
    fontFamily: "BalooRegular",
    fontSize: moderateScale(12),
    color: colors.thirdary,
    zIndex: 1,
    position: "absolute",
    top: -10,
    left: 16,
  },

  addFriendButton: {},
  addFriendButtonText: {},

  removeFriendButton: {},
  removeFriendButton: {},
});
