import { StyleSheet } from "react-native";
import {
    moderateScale,
    verticalScale,
    horizontalScale,
} from "../../../../../../styles/genericDimensions";
import { colors } from "../../../../../../styles/colors";

export const styles = StyleSheet.create({
    modalCard: {
        zIndex: 2,
        marginBottom: verticalScale(40),
        width: "95%",
        height: "70%",
        borderRadius: moderateScale(15),
        alignItems: "center",
        backgroundColor: colors.background,
        shadowOffset: {
            width: horizontalScale(15),
            height: verticalScale(20),
        },
        shadowColor: "black",
        shadowOpacity: 0.3,
        borderColor: colors.thirdary,
        borderWidth: moderateScale(3),
    },

    container: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    firstRow: {
        width: "90%",
        marginTop: verticalScale(8),
        flexDirection: "row",
        columnGap: horizontalScale(20),
        paddingLeft: horizontalScale(5),
    },

    x: {
        fontFamily: "BalooBold",
        color: colors.grey,
        fontSize: moderateScale(33),
    },

    searchBar: {
        columnGap: horizontalScale(10),
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",
        height: moderateScale(45),
        borderRadius: moderateScale(15),
        backgroundColor: colors.foreground,
        color: colors.grey,
        marginBottom: verticalScale(15),
    },

    feather: {
        marginLeft: moderateScale(15),
    },

    searchInput: {
        fontFamily: "BalooRegular",
        fontSize: moderateScale(20),
        color: colors.grey,
        height: "100%",
        width: "85%",
    },

    closeButton: {
        width: horizontalScale(200),
        height: moderateScale(50),
        backgroundColor: "white",
        borderWidth: moderateScale(3.5),
        borderColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: moderateScale(15),
        position: "absolute",
        bottom: verticalScale(15),
    },

    closeButtonText: {
        fontFamily: "BalooBold",
        color: colors.primary,
        fontSize: moderateScale(24),
    },

    cardContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        rowGap: moderateScale(15),
        paddingBottom: verticalScale(80),
    },

    scrollView: {
        width: "100%",
    },
});
