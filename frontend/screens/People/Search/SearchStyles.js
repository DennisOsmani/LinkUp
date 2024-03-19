import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";

export default StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 15,
  },
  searchContainer: {
    flexDirection: "row",
  },
  searchBar: {
    borderColor: "red",
    borderWidth: 0,
    paddingLeft: 10,
    marginTop: 20,
    backgroundColor: colors.foreground,
    borderRadius: 15,
    height: 35,
    width: 335,
  },
  icon: {
    fontSize: 25,
    color: colors.grey,
    marginTop: 26,
    marginLeft: 5,
  },
});
