import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    marginVertical: verticalScale(10),
    width: "100%",
  },
  iconTextWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: verticalScale(4),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(10),
  },
  headerText: {
    fontSize: moderateScale(14),
    fontFamily: "BalooRegular",
    color: "gray",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(10),
  },
  leftSide: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-between",
    marginRight: moderateScale(10),
  },
  upperLeftSide: {
    marginVertical: verticalScale(6),
  },
  title: {
    fontSize: moderateScale(22),
    fontWeight: "bold",
    fontFamily: "BalooBold",
  },
  text: {
    fontSize: moderateScale(16),
    fontFamily: "BalooRegular",
  },
  lowerLeftSide: {
    marginVertical: verticalScale(8),
  },
  addressText: {
    marginLeft: moderateScale(3),
    fontSize: moderateScale(14),
    fontFamily: "BalooRegular",
    color: "gray",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(12),
    backgroundColor: "#474AEE",
    height: verticalScale(40),
    width: moderateScale(150),
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: moderateScale(18),
    fontWeight: "bold",
    fontFamily: "BalooRBold",
  },
  rightSide: {
    flex: 1,
  },
  image: {
    height: verticalScale(120),
    width: "100%",
    resizeMode: "cover",
    borderRadius: moderateScale(16),
  },
});
