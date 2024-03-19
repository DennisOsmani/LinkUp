import { StyleSheet } from "react-native";
import {
  moderateScale,
  verticalScale
} from "../../../styles/genericDimensions";

export const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    width: "100%",
    padding: moderateScale(25),
    borderTopEndRadius: moderateScale(25),
    borderTopStartRadius: moderateScale(25)
  }
});
