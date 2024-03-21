import {
  View,
  Image,
  Text,
  Pressable,
  TextInput,
  Keyboard,
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

const date = new Date();

export default function CreateEvent() {
  const [locationModalVisible, setLocationModalVisible] =
    useState<boolean>(false);
  const [inviteModalVisible, setInviteModalVisible] = useState<boolean>(false);
  const [eventImageUri, setEventImageUri] = useState<string | undefined>(
    "https://fiverr-res.cloudinary.com/videos/so_0.393778,t_main1,q_auto,f_auto/fq81phuqpbdjsolyu6yd/make-kurzgesagt-style-illustrations.png"
  );

  const [event, setEvent] = useState<IEvent>({
    eventName: "",
    eventDescription: "",
    eventDateTimeStart: "",
    eventDateTimeEnd: "",
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
      // Dismiss the keyboard
      Keyboard.dismiss();
      // Prevent 'Enter' from being added to the text
      e.preventDefault(); // This line might not be needed in React Native, just an illustration
    }
  };

  /*
   * TODO
   * legge til max/min capacity
   *
   * EventVisability trenger dropdown
   * Input validering -> Max 16 characters på event navn
   * Required fields
   * Alerts / user feedback
   */

  const handleUploadImage = async () => {
    const uri: any = await pickImage();
    setEventImageUri(uri);
  };

  const handleCreateEvent = async () => {
    console.log(location);
    return;

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
      console.log("Error creating a event, and uploading", error);
    }
  };

  return (
    <>
      {/* Modals */}
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

          <TextInput
            placeholderTextColor={"rgba(128, 128, 128, 0.4)"}
            placeholder="Hvem kan se Eventet?"
            style={styles.inputBox}
            onKeyPress={handleKeyPress}
          />
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
