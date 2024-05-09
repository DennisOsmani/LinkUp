import {
  View,
  Image,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Keyboard,
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
import {
  IEvent,
  IEventDTO,
  ILocation,
} from "../../../../../../interfaces/ModelInterfaces";
import { styles } from "./EditModalStyles";
import { updateEvent } from "../../../../../../api/EventAPI";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface EditModalProps {
  eventProp: IEvent | undefined;
  eventId: number;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  eventImage: string;
}

const dateStart = new Date();
const dateEnd = new Date();

export default function EditModal({
  eventProp,
  eventId,
  setEdit,
  eventImage,
}: EditModalProps) {
  const [imageChanged, setImageChanged] = useState<boolean>(false);
  const [selectedVisibility, setSelectedVisibility] = useState({
    public: true,
    private: false,
    friends: false,
  });
  const [locationModalVisible, setLocationModalVisible] =
    useState<boolean>(false);
  const [eventImageUri, setEventImageUri] = useState<string>(eventImage);

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
    address: eventProp?.location.address ? eventProp.location.address : "",
    postalcode: eventProp?.location.postalcode
      ? eventProp.location.postalcode
      : "",
    city: "",
    country: "",
  });

  const { token } = useTokenProvider();

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
    if (e.nativeEvent.key === "Enter") {
      Keyboard.dismiss();
      e.preventDefault();
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
    setImageChanged(true);
  };

  const uploadImageEntry = async () => {
    try {
      return await uploadImage(eventImageUri, token);
    } catch (error) {
      console.log("Error while uploading image " + error);
    }
  };

  const handleUpdateEvent = async () => {
    let imageUrl: string | undefined = undefined;

    if (imageChanged) {
      imageUrl = await uploadImageEntry();
    }
    try {
      const eventToCreate: IEventDTO = {
        ...event,
        eventID: eventId,
        eventDateTimeStart: event.eventDateTimeStart.replace("Z", ""),
        eventDateTimeEnd: event.eventDateTimeEnd.replace("Z", ""),
        eventDescription: event.eventDescription,
        location: location,
        frontImage: imageUrl ? imageUrl : eventProp?.frontImage,
      };

      await updateEvent(eventToCreate, token);
      setEdit(false);
    } catch (error) {
      console.error("Error updating evnet" + error);
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.scrollView}>
      <LocationModal
        visible={locationModalVisible}
        setVisible={setLocationModalVisible}
        location={location}
        setLocation={setLocation}
      />

      <View style={styles.container}>
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

          <View style={styles.minmaxcontainer}>
            <TextInput
              placeholderTextColor={"rgba(128, 128, 128, 0.4)"}
              onChangeText={(input) =>
                setEvent((event: IEventDTO) => ({
                  ...event,
                  minCapacity: input,
                }))
              }
              placeholder="Min"
              style={styles.minmax}
              onKeyPress={handleKeyPress}
              value={event.minCapacity}
            />

            <TextInput
              placeholderTextColor={"rgba(128, 128, 128, 0.4)"}
              onChangeText={(input) =>
                setEvent((event: IEventDTO) => ({
                  ...event,
                  maxCapacity: input,
                }))
              }
              placeholder="Max"
              style={styles.minmax}
              onKeyPress={handleKeyPress}
              value={event.maxCapacity}
            />
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
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleUpdateEvent}
            style={styles.bigButtonStyles}
          >
            <Text style={styles.bigButtonText}>Lagre</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
