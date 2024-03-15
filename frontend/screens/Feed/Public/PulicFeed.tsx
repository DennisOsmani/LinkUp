import { View, Text } from "react-native";
import { styles } from "./PublicFeedStyles";
import EventCardFeed from "../Components/EventCardFeed";

const imageSource = require("../../../assets/cbum.jpg");

export default function PublicFeed() {
  const cardProps = {
    numberOfPeople: "4 - 20",
    dateTime: new Date("2022-03-25"),
    title: "Bursdagsfest",
    hostName: "John Doe",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Kongo longo mordi",
    address: "123 Main Street",
    imageSource: imageSource,
    onJoinPress: () => {
      // Define your join press handler here
      console.log("Join pressed");
    }
  };
  return (
    <View style={styles.wrapper}>
      <EventCardFeed {...cardProps} />
      <EventCardFeed {...cardProps} />
      <EventCardFeed {...cardProps} />
    </View>
  );
}
