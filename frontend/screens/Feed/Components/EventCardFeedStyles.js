import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    gap: 10,
    width: "100%"
  },
  iconTextWrapper: {
    flexDirection: "row",
    gap: 4
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headerText: {
    fontSize: 14,
    color: "gray"
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    height: 200,
    display: "flex"
  },
  leftSide: {
    flex: "2",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  upperLeftSide: {
    gap: 6
  },
  title: {
    fontSize: 22,
    fontWeight: "bold"
  },
  text: {
    fontSize: 16
  },
  lowerLeftSide: {
    gap: 8
  },
  addressText: {
    marginLeft: 3,
    fontSize: 14,
    color: "gray"
  },
  button: {
    display: "flex",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#474AEE",
    height: 40,
    width: 150
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: ""
  },
  rightSide: {
    flex: 1
  },
  ///THIS DOES NOT WORK
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: 16
  },
  /////////////////////
  smallButton: {
    borderRadius: 10
  }
});
