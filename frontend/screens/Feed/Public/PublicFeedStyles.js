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
    gap: 20,
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
