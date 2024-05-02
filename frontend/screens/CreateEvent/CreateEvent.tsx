import {
  View,
  Image,
  Text,
  Pressable,
  TextInput,
  Keyboard,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { styles } from "./CreateEventStyles";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { pickImage } from "../../util/imageHandler";
import { uploadImage } from "../../api/UploadImageAPI";
import { useTokenProvider } from "../../providers/TokenProvider";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { IEventDTO, ILocation } from "../../interfaces/ModelInterfaces";
import { createEvent, getEventById } from "../../api/EventAPI";
import LocationModal from "./components/LocationModal/LocationModal";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import InviteModal from "./components/InviteModal/InviteModal";
import { colors } from "../../styles/colors";
import { inviteUsersForEvent } from "../../api/EventRelationAPI";
import { useLocation } from "../../providers/LocationProvider";
import { CreatorEventModal } from "../CreatorEventModal/CreatorEventModal";
import { IEvent } from "../../interfaces/ModelInterfaces";

const dateStart = new Date();
const dateEnd = new Date();

export default function CreateEvent() {
  const [selectedVisibility, setSelectedVisibility] = useState({
    public: true,
    private: false,
    friends: false,
  });
  const [locationModalVisible, setLocationModalVisible] =
    useState<boolean>(false);
  const [eventModalVisible, setEventModalVisible] = useState<boolean>(false);
  const [inviteModalVisible, setInviteModalVisible] = useState<boolean>(false);
  const [eventImageUri, setEventImageUri] = useState<string | undefined>(
    "https://fiverr-res.cloudinary.com/videos/so_0.393778,t_main1,q_auto,f_auto/fq81phuqpbdjsolyu6yd/make-kurzgesagt-style-illustrations.png"
  );

  const [createdEvent, setCreatedEvent] = useState<IEvent | undefined>(
    undefined
  );

  const [event, setEvent] = useState<IEventDTO>({
    eventName: "",
    eventDescription: "",
    eventDateTimeStart: dateStart.toISOString(),
    eventDateTimeEnd: dateEnd.toISOString(),
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
  const { address } = useLocation();

  const onChangeStart = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    event;
    setEvent((event: IEventDTO) => ({
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
    setEvent((event: IEventDTO) => ({
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

      const eventToCreate: IEventDTO = {
        ...event,
        eventDateTimeStart: event.eventDateTimeStart.replace("Z", ""),
        eventDateTimeEnd: event.eventDateTimeEnd.replace("Z", ""),
        location: location,
        frontImage: eventImageUrl,
      };

      eventId = await createEvent(eventToCreate, token);

      console.log("EVENT JUST CREATED ID: " + eventId);

      clearAllValues();
      const res: IEvent | undefined = await getEventById(eventId, token);
      setCreatedEvent(res);
      setEventModalVisible(true);
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

  const clearAllValues = () => {
    setEvent({
      eventName: "",
      eventDescription: "",
      eventDateTimeStart: dateStart.toISOString(),
      eventDateTimeEnd: dateEnd.toISOString(),
      visibility: 0,
      inviteURL: "",
      frontImage:
        "https://fiverr-res.cloudinary.com/videos/so_0.393778,t_main1,q_auto,f_auto/fq81phuqpbdjsolyu6yd/make-kurzgesagt-style-illustrations.png",
    });

    setLocation({
      address: undefined,
      postalcode: undefined,
      city: address ? address : "",
      country: "",
    });

    setUsersToInvite(new Set());

    setEventImageUri(
      "https://fiverr-res.cloudinary.com/videos/so_0.393778,t_main1,q_auto,f_auto/fq81phuqpbdjsolyu6yd/make-kurzgesagt-style-illustrations.png"
    );
  };

  return (
    <>
      <CreatorEventModal
        edit={false}
        modalVisible={eventModalVisible}
        setModalVisible={setEventModalVisible}
        event={createdEvent}
      />

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
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleUploadImage}
            style={styles.uploadContainer}
          >
            <Feather name="upload" size={20} color="white" />
            <Text style={styles.uploadText}>Last opp</Text>
          </TouchableOpacity>
          <Image
            style={styles.imageContainer}
            source={{ uri: eventImageUri }}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={"rgba(128, 128, 128, 0.4)"}
            onChangeText={(input) =>
              setEvent((event: IEventDTO) => ({ ...event, eventName: input }))
            }
            placeholder="Navn på Event"
            style={styles.inputBox}
            onKeyPress={handleKeyPress}
            value={event.eventName}
          />

          <View style={styles.datetimepickerBox}>
            <Text style={styles.datetimepickerText}>Event start</Text>
            <RNDateTimePicker
              value={new Date(event.eventDateTimeStart.toString())}
              mode={"datetime"}
              onChange={onChangeStart}
              locale="no-NB"
            />
          </View>
          <View style={styles.datetimepickerBox}>
            <Text style={styles.datetimepickerText}>Event slutt</Text>
            <RNDateTimePicker
              value={new Date(event.eventDateTimeEnd.toString())}
              mode={"datetime"}
              locale="no-NB"
              onChange={onChangeEnd}
              minimumDate={new Date(event.eventDateTimeStart)}
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
                Offentlig
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
                Privat
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
                Venner{" "}
              </Text>
            </Pressable>
          </View>
          <TextInput
            placeholderTextColor={"rgba(128, 128, 128, 0.4)"}
            onChangeText={(input) =>
              setEvent((event: IEventDTO) => ({
                ...event,
                eventDescription: input,
              }))
            }
            multiline
            placeholder="Hva er detaljene?"
            style={styles.inputBoxMultiline}
            onKeyPress={handleKeyPress}
            value={event.eventDescription}
          />

          <View style={styles.smallButtonContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setLocationModalVisible(true)}
              style={styles.smallButton}
            >
              <Text style={styles.buttonText}>Sted</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setInviteModalVisible(true)}
              style={styles.smallButton}
            >
              <Text style={styles.buttonText}>Inviter</Text>
            </TouchableOpacity>
          </View>
          <TouchableHighlight
            onPress={handleCreateEvent}
            style={styles.bigButtonStyles}
          >
            <Text style={styles.bigButtonText}>Opprett Event</Text>
          </TouchableHighlight>
        </View>
      </View>
    </>
  );
}
