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

  /*
   * TODO
   * Required fields
   *
   * Ha en lsite for venner og en for "inviterte venner"
   * Når man trykker legg til venn så byttes de til listen "inviterte venner"
   * Legg til en prop til inviteUserCard som sier om det skal rendres fjern eller legg til knapp
   * I InviteFriends map til InviteUserCard to ganger, først for inviterte vcenner så for resten
   * Legg til funksjonalitet for å fjerne / legge til
   *
   * Fiks createEvent med location inni, eller del opp til to api kall, en til event og en til location
   * Fiks å sende ut invitasjoner til alle som er i invitert listen, kanskje Promise.all?
   *
   */

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
    setEventImageUri(uri);
  };

  const handleCreateEvent = async () => {
    if (event.eventName.length > 16) {
      Alert.alert(
        "Ugyldig Input!",
        "Navnet til eventet er for langt, max 16 tegn."
      );
    }

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

      const eventResponse = await createEvent(eventToCreate, token);
      console.log("Created event, response: " + eventResponse);
    } catch (error) {
      // setToken("");
      console.log("Error creating a event, and uploading" + error);
    }

    // Send invites
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
              <Text style={styles.visibilityText}>Public</Text>
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
              <Text style={styles.visibilityText}>Private</Text>
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
              <Text style={styles.visibilityText}>Friends</Text>
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
