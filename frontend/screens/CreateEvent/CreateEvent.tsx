import { View, Image, Text, Pressable, TextInput } from "react-native";
import { styles } from "./CreateEventStyles";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { handleChooseAndUploadImage, pickImage } from "../../util/imageHandler";

enum EventVisibility {
  PUBLIC,
  PRIVATE,
  FREIENDS,
}

export default function CreateEvent() {
  const [eventImage, setEventImage] = useState<any>("./bg.jpeg");

  /*
                          const [eventImage, setEventImage] = useState<string | undefined>(
                            "https://fiverr-res.cloudinary.com/videos/so_0.393778,t_main1,q_auto,f_auto/fq81phuqpbdjsolyu6yd/make-kurzgesagt-style-illustrations.png"
                          );
                          */
  const [eventName, setEventName] = useState<string>("");
  const [startDatetime, setStartDatetime] = useState<string>("");
  const [endDatetime, setEndDatetime] = useState<string>("");
  const [eventVisability, setEventVisability] = useState<EventVisibility>(
    EventVisibility.PUBLIC
  );
  const [eventDetails, setEventDetails] = useState<string>("");

  /*
   * TODO
   * legge til max/min capacity
   *
   * EventVisability trenger dropdown
   * Datetimepicker
   * Upload image func
   * Input validering
   * Required fields
   * Alerts / user feedback
   *
   * START HER
   * Fikse ferdig slik at bilde bare lastes opp når man trykker create event
   * Fikse sånn at man har ett default bilde
   * Legge til token?
   */

  const handleUploadImage = async () => {
    const uri: any = await pickImage();
    setEventImage(uri.assets[0].uri);

    return;
    const responseUrl = await handleChooseAndUploadImage();
    setEventImage(responseUrl);
  };

  const handleLocation = () => {
    // TODO
    console.log("Location modal");
  };

  const handleInvite = () => {
    // TODO
    console.log("Invite modal");
  };

  const handleCreate = () => {
    // TODO
    console.log("Creating event");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Pressable onPress={handleUploadImage} style={styles.uploadContainer}>
          <Feather name="upload" size={20} color="white" />
          <Text style={styles.uploadText}>Last opp</Text>
        </Pressable>
        <Image style={styles.imageContainer} source={{ uri: eventImage }} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(input) => setEventName(input)}
          placeholder="Navn på Event"
          style={styles.inputBox}
        />
        <TextInput
          onChangeText={(input) => setStartDatetime(input)}
          placeholder="Startdato og -tidspunkt"
          style={styles.inputBox}
        />
        <TextInput
          onChangeText={(input) => setEndDatetime(input)}
          placeholder="Sluttdato og -tidspunkt"
          style={styles.inputBox}
        />
        <TextInput placeholder="Hvem kan se Eventet?" style={styles.inputBox} />
        <TextInput
          onChangeText={(input) => setEventDetails(input)}
          multiline
          placeholder="Hva er detaljene?"
          style={styles.inputBoxMultiline}
        />

        <View style={styles.smallButtonContainer}>
          <Pressable onPress={handleLocation} style={styles.smallButton}>
            <Text style={styles.buttonText}>Sted</Text>
          </Pressable>
          <Pressable onPress={handleInvite} style={styles.smallButton}>
            <Text style={styles.buttonText}>Inviter</Text>
          </Pressable>
        </View>
        <Pressable onPress={handleCreate} style={styles.bigButtonStyles}>
          <Text style={styles.bigButtonText}>Opprett Event</Text>
        </Pressable>
      </View>
    </View>
  );
}
