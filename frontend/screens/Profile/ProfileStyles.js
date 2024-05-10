import { StyleSheet } from "react-native";
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
        paddingTop: verticalScale(70),
        paddingTop: verticalScale(70),
    },

    imageContainer: {
        width: horizontalScale(180),
        height: verticalScale(180),
        borderRadius: moderateScale(100),
        marginBottom: verticalScale(20),
    },

    image: {
        borderRadius: moderateScale(100),
        width: horizontalScale(180),
        height: verticalScale(180),
        borderWidth: moderateScale(3),
        borderColor: colors.foreground,
    },

    uploadContainer: {
        position: "absolute",
        right: horizontalScale(7),
        bottom: verticalScale(7),
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
        width: "100%",
        paddingTop: verticalScale(20),
        borderTopEndRadius: moderateScale(25),
        borderTopStartRadius: moderateScale(25),
        justifyContent: "flex-end",
        alignItems: "center",
    },

    smallBoxesContainer: {
        flexDirection: "row",
        marginBottom: verticalScale(15),
        width: "90%",
        justifyContent: "space-between",
        alignItems: "center",
    },

    inputBoxRegular: {
        backgroundColor: colors.foreground,
        borderRadius: moderateScale(15),
        height: verticalScale(35),
        width: "90%",
        marginBottom: verticalScale(15),
        justifyContent: "center",
        paddingLeft: verticalScale(15),
    },

    inputBoxSmall: {
        backgroundColor: colors.foreground,
        borderRadius: moderateScale(15),
        height: verticalScale(35),
        width: horizontalScale(100),
        justifyContent: "center",
        paddingLeft: verticalScale(15),
    },

    inputBoxBig: {
        backgroundColor: colors.foreground,
        borderRadius: moderateScale(15),
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
        fontFamily: "BalooRegular",
        fontSize: moderateScale(18),
    },

    editButton: {
        borderRadius: moderateScale(10),
        backgroundColor: colors.primary,
        justifyContent: "center",
        height: verticalScale(50),
        width: horizontalScale(170),
        marginBottom: verticalScale(20),
    },

    saveButton: {
        borderRadius: moderateScale(10),
        borderColor: colors.primary,
        borderWidth: moderateScale(3),
        backgroundColor: colors.foreground,
        justifyContent: "center",
        height: verticalScale(50),
        width: horizontalScale(170),
        marginBottom: verticalScale(20),
    },

    editButtonText: {
        color: colors.foreground,
        textAlign: "center",
        fontSize: moderateScale(24),
        fontFamily: "BalooBold",
    },

    saveButtonText: {
        color: colors.primary,
        textAlign: "center",
        fontSize: moderateScale(24),
        fontFamily: "BalooBold",
    },

    legendContainer: {
        width: "100%",
        alignItems: "center",
    },
    legendContainerSmallBox: {},
    legendText: {
        fontFamily: "BalooRegular",
        fontSize: moderateScale(12),
        color: colors.thirdary,
        zIndex: 1,
        position: "absolute",
        top: verticalScale(-10),
        left: horizontalScale(36),
    },
    legendTextSmallBox: {
        fontFamily: "BalooRegular",
        fontSize: moderateScale(12),
        color: colors.thirdary,
        zIndex: 1,
        position: "absolute",
        top: verticalScale(-10),
        left: horizontalScale(16),
    },
    scrollView: {
        width: "100%",
        height: "100%",
    },

    validInput: {
        color: colors.green,
    },
    invalidInput: {
        color: colors.red,
    },

    pickerStyle: {
        fontFamily: "BalooRegular",
        fontSize: moderateScale(12),
        color: colors.black,
    },

    relStatusContainer: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: verticalScale(15),
    },

    relButton: {
        backgroundColor: colors.foreground,
        borderRadius: moderateScale(10),
        height: verticalScale(35),
        width: horizontalScale(80),
        justifyContent: "center",
        padding: moderateScale(5),
        justifyItems: "center",
        alignItems: "center",
        borderWidth: 2,
    },
    relButtonText: {},
});
