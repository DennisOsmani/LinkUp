import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/colors";
import { moderateScale } from "../../../../styles/genericDimensions";

export default StyleSheet.create({
  card: {
    paddingVertical: 50,
    paddingHorizontal: 30,
    marginTop: 40,
    backgroundColor: colors.background,
    borderRadius: 30,
  },

  inputContainer: {
    borderColor: colors.red,
    borderWidth: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    backgroundColor: colors.foreground,
    height: 50,
    borderRadius: 15,
    marginBottom: 30,
    width: 300,
    paddingLeft: 12,
    fontFamily: "BalooRegular",
    fontSize: 20,
  },

  button: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    width: 230,
    height: 55,
    marginBottom: 20,
    fontFamily: "BalooBold",
  },

  text: {
    color: colors.background,
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "BalooBold",
  },

  linkContainer: {
    flexDirection: "row",
  },

  question: {
    color: colors.grey,
    marginRight: 5,
  },

  link: {
    color: "blue",
  },

  wrapper: {
    justifyContent: "center",
    alignItems: "center",
  },

  compHeader: {
    textAlign: "center",
    fontFamily: "BalooBold",
    fontSize: moderateScale(50),
    color: "white",
  },
});
