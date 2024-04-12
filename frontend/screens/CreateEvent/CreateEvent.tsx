import {
  View,
  Image,
  Text,
  Pressable,
  TextInput,
  Keyboard,
  Alert,
} from "react-native";
import { styles } from "./CreateEventStyles";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { pickImage } from "../../util/imageHandler";
import { uploadImage } from "../../api/UploadImageAPI";
import { useTokenProvider } from "../../providers/TokenProvider";
import DateTimePicker from "@react-native-community/datetimepicker";
import { IEvent, ILocation } from "../../interfaces/ModelInterfaces";
import { createEvent } from "../../api/EventAPI";
import LocationModal from "./components/LocationModal/LocationModal";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import InviteModal from "./components/InviteModal/InviteModal";
import { colors } from "../../styles/colors";
import { inviteUsersForEvent } from "../../api/EventRelationAPI";

const date = new Date();

export default function CreateEvent() {
  const [selectedVisibility, setSelectedVisibility] = useState({
    public: true,
    private: false,
    friends: false,
  });
  const [locationModalVisible, setLocationModalVisible] =
    useState<boolean>(false);
  const [inviteModalVisible, setInviteModalVisible] = useState<boolean>(false);
  const [eventImageUri, setEventImageUri] = useState<string | undefined>(
    "https://fiverr-res.cloudinary.com/videos/so_0.393778,t_main1,q_auto,f_auto/fq81phuqpbdjsolyu6yd/make-kurzgesagt-style-illustrations.png"
  );

  const [event, setEvent] = useState<IEvent>({
    eventName: "",
    eventDescription: "",
    eventDateTimeStart: date.toISOString(),
    eventDateTimeEnd: date.toISOString(),
    visibility: 0,
    inviteURL: "",
    frontImage:
      "https://fiverr-res.cloudinary.com/videos/so_0.393778,t_main1,q_auto,f_auto/fq81phuqpbdjsolyu6yd/make-kurzgesagt-style-illustrations.png",
  });

  const [location, setLocation] = useState<ILocation>({
    address: undefined,
    postalcode: undefined,
    city: "",
    country: "",
  });

  const [usersToInvite, setUsersToInvite] = useState<Set<string>>(new Set());

  const { token } = useTokenProvider();

  const onChangeStart = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    event;
    setEvent((event: IEvent) => ({
      ...event,
      eventDateTimeStart: selectedDate
        ? selectedDate.toISOString()
        : event.eventDateTimeStart,
    }));
  };

  const onChangeEnd = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    event;
    setEvent((event: IEvent) => ({
      ...event,
      eventDateTimeEnd: selectedDate
        ? selectedDate.toISOString()
        : event.eventDateTimeEnd,
    }));
  };

  const handleKeyPress = (e: any) => {
    // Check if 'Enter' was pressed
    if (e.nativeEvent.key === "Enter") {
      Keyboard.dismiss();
      e.preventDefault(); // This line might not be needed in React Native, just an illustration
    }
  };

  const handleVisibilityButtonPressed = (value: number) => {
    setSelectedVisibility({
      public: value === 0 ? true : false,
      private: value === 1 ? true : false,
      friends: value === 2 ? true : false,
    });

    setEvent((event) => ({ ...event, visibility: value }));
  };

  const handleUploadImage = async () => {
    const uri: any = await pickImage();
    if (uri === "EXIT") return;

    setEventImageUri(uri);
  };

  const handleCreateEvent = async () => {
    if (event.eventName === "") {
      Alert.alert("Manglende informasjon", "Eventet må ha ett navn!");
      return;
    }

    if (location.city === "" || location.postalcode === "") {
      Alert.alert(
        "Manglende informasjon",
        'By og postnummer under "Sted" må fylles ut!'
      );
      return;
    }

    if (event.eventName.length > 16) {
      Alert.alert(
        "Ugyldig Input!",
        "Navnet til eventet er for langt, max 16 tegn."
      );
    }

    let eventId: number = -1;

    try {
      // Upload to azure
      let eventImageUrl: string | undefined;
      if (eventImageUri) {
        eventImageUrl = await uploadImage(eventImageUri, token);
      }

      const eventToCreate: IEvent = {
        ...event,
        location: location,
      };

      eventId = await createEvent(eventToCreate, token);

      console.log("EVENT JUST CREATED ID: " + eventId);
    } catch (error) {
      Alert.alert("Noe gikk galt", "Prøv igjen senere.");
      console.error(error);
      return;
    }

    if (eventId == -1) {
      Alert.alert("Noe gikk galt", "Prøv å opprette event igjen");
      return;
    }

    try {
      const userIds = Array.from(usersToInvite);

      if (userIds.length === 0) return;

      await inviteUsersForEvent(eventId, userIds, token);
    } catch (error) {
      Alert.alert("Noe gikk galt", "Dine venneforespørseler ble ikke sendt!");
      throw new Error("Error while sending invites!" + error);
    }
  };

  return (
    <>
      <LocationModal
        visible={locationModalVisible}
        setVisible={setLocationModalVisible}
        location={location}
        setLocation={setLocation}
      />

      <InviteModal
        usersToInvite={usersToInvite}
        setUsersToInvite={setUsersToInvite}
        inviteVisible={inviteModalVisible}
        setInviteVisible={setInviteModalVisible}
      />

      <View
        style={{
          ...styles.container,
          opacity: locationModalVisible || inviteModalVisible ? 0.4 : 1,
        }}
      >
        <View style={styles.imageContainer}>
          <Pressable onPress={handleUploadImage} style={styles.uploadContainer}>
            <Feather name="upload" size={20} color="white" />
            <Text style={styles.uploadText}>Last opp</Text>
          </Pressable>
          <Image
            style={styles.imageContainer}
            source={{ uri: eventImageUri }}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={"rgba(128, 128, 128, 0.4)"}
            onChangeText={(input) =>
              setEvent((event: IEvent) => ({ ...event, eventName: input }))
            }
            placeholder="Navn på Event"
            style={styles.inputBox}
            onKeyPress={handleKeyPress}
          />

          <View style={styles.datetimepickerBox}>
            <Text style={styles.datetimepickerText}>Event start</Text>
            <DateTimePicker
              value={date}
              mode={"datetime"}
              onChange={onChangeStart}
            />
          </View>
          <View style={styles.datetimepickerBox}>
            <Text style={styles.datetimepickerText}>Event slutt</Text>
            <DateTimePicker
              value={date}
              mode={"datetime"}
              onChange={onChangeEnd}
            />
          </View>
          <View style={styles.visibilityContainer}>
            <Pressable
              onPress={() => handleVisibilityButtonPressed(0)}
              style={{
                ...styles.visibilityBox,
                borderColor: selectedVisibility.public
                  ? colors.primary
                  : "white",
              }}
            >
              <Text
                style={{
                  ...styles.visibilityText,
                  color: selectedVisibility.public
                    ? colors.primary
                    : "rgba(128, 128, 128, 0.4)",
                }}
              >
                Public
              </Text>
            </Pressable>
            <Pressable
              onPress={() => handleVisibilityButtonPressed(1)}
              style={{
                ...styles.visibilityBox,
                borderColor: selectedVisibility.private
                  ? colors.primary
                  : "white",
              }}
            >
              <Text
                style={{
                  ...styles.visibilityText,
                  color: selectedVisibility.private
                    ? colors.primary
                    : "rgba(128, 128, 128, 0.4)",
                }}
              >
                Private
              </Text>
            </Pressable>
            <Pressable
              onPress={() => handleVisibilityButtonPressed(2)}
              style={{
                ...styles.visibilityBox,
                borderColor: selectedVisibility.friends
                  ? colors.primary
                  : "white",
              }}
            >
              <Text
                style={{
                  ...styles.visibilityText,
                  color: selectedVisibility.friends
                    ? colors.primary
                    : "rgba(128, 128, 128, 0.4)",
                }}
              >
                Friends
              </Text>
            </Pressable>
          </View>
          <TextInput
            placeholderTextColor={"rgba(128, 128, 128, 0.4)"}
            onChangeText={(input) =>
              setEvent((event: IEvent) => ({
                ...event,
                eventDescription: input,
              }))
            }
            multiline
            placeholder="Hva er detaljene?"
            style={styles.inputBoxMultiline}
            onKeyPress={handleKeyPress}
          />

          <View style={styles.smallButtonContainer}>
            <Pressable
              onPress={() => setLocationModalVisible(true)}
              style={styles.smallButton}
            >
              <Text style={styles.buttonText}>Sted</Text>
            </Pressable>
            <Pressable
              onPress={() => setInviteModalVisible(true)}
              style={styles.smallButton}
            >
              <Text style={styles.buttonText}>Inviter</Text>
            </Pressable>
          </View>
          <Pressable onPress={handleCreateEvent} style={styles.bigButtonStyles}>
            <Text style={styles.bigButtonText}>Opprett Event</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
