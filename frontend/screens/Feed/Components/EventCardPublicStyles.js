import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    maxHeight: 240,
    width: "100%"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  title: {
    fontSize: 22,
    marginBottom: 5,
    fontWeight: "bold"
  },
  smallText: {
    fontSize: 12,
    color: "gray"
  },
  addressText: {
    fontSize: 12,
    color: "gray",
    marginBottom: 8
  },
  content: {
    flexDirection: "row",
    marginBottom: 10
  },
  leftSide: {
    flex: 1,
    flexGrow: 2,
    justifyContent: "space-between",
    flexDirection: "column"
  },
  upperLeftSide: {
    alignItems: "flex-start",
    marginBottom: "auto"
  },
  lowerLeftSide: {
    justifyContent: "flex-end",
    marginBottom: "auto"
  },
  text: {
    fontSize: 16,
    marginBottom: 5
  },
  rightSide: {
    flex: 1,
    flexGrow: 1,
    justifyContent: "flex-end"
  },
  image: {
    width: "100%",
    height: 160, // Adjust height as needed
    resizeMode: "cover",
    borderRadius: 8
  },
  largeButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#474AEE",
    height: "40%",
    width: "70%"
  },
  largeButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: ""
  },
  smallButton: {
    borderRadius: 10
  }
});

export { styles };
