import {
  View,
  Image,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Keyboard,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { pickImage } from "../../../../../../util/imageHandler";
import { uploadImage } from "../../../../../../api/UploadImageAPI";
import { useTokenProvider } from "../../../../../../providers/TokenProvider";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import LocationModal from "../../../../../CreateEvent/components/LocationModal/LocationModal";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { colors } from "../../../../../../styles/colors";
import { useLocation } from "../../../../../../providers/LocationProvider";
import {
  IEvent,
  IEventDTO,
  ILocation,
} from "../../../../../../interfaces/ModelInterfaces";
import { styles } from "./EditModalStyles";
import { updateEvent } from "../../../../../../api/EventAPI";

interface EditModalProps {
  eventProp: IEvent | undefined;
}

const dateStart = new Date();
const dateEnd = new Date();

export default function EditModal({ eventProp }: EditModalProps) {
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

  const [createdEvent, setCreatedEvent] = useState<IEvent | undefined>(
    undefined
  );

  const [event, setEvent] = useState<IEventDTO>({
    eventName: eventProp?.eventName ? eventProp.eventName : "",
    eventDescription: eventProp?.eventDescription
      ? eventProp.eventDescription
      : "",
    eventDateTimeStart: eventProp?.eventDateTimeStart
      ? eventProp.eventDateTimeStart
      : dateStart.toISOString(),
    eventDateTimeEnd: eventProp?.eventDateTimeEnd
      ? eventProp.eventDateTimeEnd
      : dateEnd.toISOString(),
    visibility: eventProp?.visibility ? eventProp.visibility : 0,
    inviteURL: "",
    frontImage: eventProp?.frontImage
      ? eventProp.frontImage
      : "https://fiverr-res.cloudinary.com/videos/so_0.393778,t_main1,q_auto,f_auto/fq81phuqpbdjsolyu6yd/make-kurzgesagt-style-illustrations.png",
  });

  const [location, setLocation] = useState<ILocation>({
    address: undefined,
    postalcode: undefined,
    city: "",
    country: "",
  });

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
      Event;
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

  const handleUpdateEvent = async () => {
    try {
      await updateEvent(event, token);
    } catch (error) {
      console.error("Error updating evnet" + error);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <LocationModal
        visible={locationModalVisible}
        setVisible={setLocationModalVisible}
        location={location}
        setLocation={setLocation}
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
          </View>
          <TouchableHighlight
            onPress={handleUpdateEvent}
            style={styles.bigButtonStyles}
          >
            <Text style={styles.bigButtonText}>Lagre</Text>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  );
}
