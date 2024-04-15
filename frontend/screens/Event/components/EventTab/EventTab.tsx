import { View, Text, Pressable, Image, TextInput } from "react-native";
import { IEvent } from "../../../../interfaces/ModelInterfaces";
import { styles } from "./EventTabStyles";
import { Feather } from "@expo/vector-icons";

interface EventTabProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  event: IEvent | null;
}

export function EventTab({
  modalVisible,
  setModalVisible,
  event,
}: EventTabProps) {
  const convertVisibilityToText = (): string => {
    // TODO
    return "";
  };

  const convertDatetimeToText = (): string => {
    // TODO
    return "";
  };

  const convertLocationToText = (): string => {
    // TODO
    return "";
  };

  const getEnrolledCount = (): string => {
    // TODO
    return "";
  };

  return (
    <View style={styles.eventTabContainer}>
      <Image
        style={styles.imageContainer}
        source={{ uri: event?.frontImage }}
      />

      <View style={styles.firstRowWrapper}>
        <View style={styles.visibility}>
          <Text style={styles.visibilityText}>
            {convertVisibilityToText()}Kun venner
          </Text>
        </View>
        <View style={styles.datetime}>
          <Feather name="clock" size={25} color="black" />
          <Text style={styles.datetimeText}>
            {convertDatetimeToText()}Onsdag 3.Mars - Kl 10.00
          </Text>
        </View>
      </View>

      <View style={styles.secondRowWrapper}>
        <Text style={styles.eventNameText}>{event?.eventName}</Text>
        <View style={styles.locationWrapper}>
          <Feather name="map-pin" size={25} color="black" />
          <Text style={styles.locationText}>
            {convertLocationToText()}Nygårdsgaten 70, Bergen Norge
          </Text>
        </View>
      </View>

      <View style={styles.thirdRowWrapper}>
        <Text style={styles.enrolledText}>Påmeldte</Text>
        <View style={styles.enrolledBarOutline}>
          <View style={styles.enrolledBar} />
          <Text style={styles.enrolledCount}>{getEnrolledCount()}30/40</Text>
        </View>
      </View>

      <View style={styles.fourthRowWrapper}>
        <Text style={styles.descriptionHeader}>Beskrivelse</Text>
        <View style={styles.descriptionBox}>
          <Text style={styles.description}>
            {event?.eventDescription}Lorem ipsum dolores sigmatures engalada
            mote. Sindele infurate motelago konatello finite.
          </Text>
        </View>
      </View>

      <View style={styles.buttonWrapper}>
        <Pressable
          onPress={() => setModalVisible(false)}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Tilbake</Text>
        </Pressable>

        <Pressable style={styles.leaveEventButton}>
          <Text style={styles.leaveEventButtonText}>Forlat Event</Text>
        </Pressable>
      </View>
    </View>
  );
}
