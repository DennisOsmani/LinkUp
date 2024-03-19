import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./EventCardFeedStyles";
import { Feather } from "@expo/vector-icons";

interface EventCardFeedProps {
  numberOfPeople: string | undefined;
  dateTime: string;
  title: string;
  hostName: string;
  bio: string;
  address: string;
  imageSource: any;
  onJoinPress: (eventId: number) => void;
}

const EventCardFeed = ({
  numberOfPeople,
  dateTime,
  title,
  hostName,
  bio,
  address,
  imageSource,
  onJoinPress,
}: EventCardFeedProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconTextWrapper}>
          <Feather name="users" style={styles.headerText} />
          <Text style={styles.headerText}> {numberOfPeople}</Text>
        </View>
        <Text style={styles.headerText}>{dateTime.toLocaleString()}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.leftSide}>
          <View style={styles.upperLeftSide}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.iconTextWrapper}>
              <Feather name="user" style={styles.text} />
              <Text style={styles.text}>{hostName}</Text>
            </View>
            <Text style={styles.text}>{bio}</Text>
          </View>
          <View style={styles.lowerLeftSide}>
            <Text style={styles.addressText}>{address}</Text>
            <Pressable style={styles.button} onPress={() => onJoinPress}>
              <Text style={styles.buttonText}>Bli med</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.rightSide}>
          <Image
            source={imageSource}
            style={{
              height: "100%",
              width: "100%",
              resizeMode: "cover",
              borderRadius: 16,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default EventCardFeed;
