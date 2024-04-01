import { StyleSheet } from "react-native";
import { moderateScale, verticalScale, horizontalScale } from "../styles/genericDimensions";
import { colors } from "../styles/colors";

export default StyleSheet.create({
    icons: {
        fontSize: moderateScale(25),
        marginTop: verticalScale(7),
    },
    plus: {
        fontSize: moderateScale(33),
        marginTop: verticalScale(7),
    },
});