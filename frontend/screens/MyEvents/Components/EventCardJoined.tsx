import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, View, TouchableOpacity } from "react-native";
import { styles } from "./EventCardJoinedStyles";
import { Feather } from "@expo/vector-icons";
import { CreatorEventModal } from "../../CreatorEventModal/CreatorEventModal";
import { EventModal } from "../../EventModal/EventModal";
import { IEvent } from "../../../interfaces/ModelInterfaces";

interface EventCardJoinedProps {
  numberOfPeople: string;
  dateTime: string;
  title: string;
  hostName: string;
  bio: string;
  address: string;
  imageSource: any;
  onButtonPress: () => void;
  host: boolean;
  event: IEvent;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  edit: boolean;
}

const EventCardJoined = ({
  numberOfPeople,
  dateTime,
  title,
  hostName,
  bio,
  address,
  imageSource,
  onButtonPress,
  host,
  event,
  edit,
  setEdit,
}: EventCardJoinedProps) => {
  const MAX_LETTERS_DESCRIPTION = 70;
  const MAX_LETTERS_TITLE = 16;

  const [creatorEventModalVisible, setCreatorEventModalVisible] =
    useState<boolean>(false);
  const [eventModalVisible, setEventModalVisible] = useState<boolean>(false);

  const truncateDescription = (text: string, maxLetters: number) => {
    if (text.length > maxLetters && maxLetters != MAX_LETTERS_TITLE) {
      return text.substring(0, maxLetters) + "...";
    }
    return text.substring(0, maxLetters);
  };
  const handleCardPress = () => {
    if (host) {
      setEdit(false);
      setCreatorEventModalVisible(true);
      return;
    }

    setEdit(false);
    setEventModalVisible(true);
  };

  const handleEditPress = () => {
    setEdit(true);
    setCreatorEventModalVisible(true);
  };

  return (
    <>
      <CreatorEventModal
        modalVisible={creatorEventModalVisible}
        setModalVisible={setCreatorEventModalVisible}
        event={event}
        edit={edit}
        setEdit={setEdit}
      />
      <EventModal
        modalVisible={eventModalVisible}
        setModalVisible={setEventModalVisible}
        event={event}
      />

      <Pressable style={styles.card} onPress={handleCardPress}>
        <View style={styles.header}>
          <View style={styles.iconTextWrapper}>
            <Feather name="users" style={styles.headerIcon} />
            <Text style={styles.headerText}> {numberOfPeople}</Text>
          </View>
          <Text style={styles.headerText}>{dateTime.toLocaleString()}</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.leftSide}>
            <View style={styles.upperLeftSide}>
              <Text style={styles.title}>
                {truncateDescription(title, MAX_LETTERS_TITLE)}
              </Text>
              <View style={styles.iconTextWrapper}>
                <Feather name="user" style={styles.hostIcon} />
                <Text style={styles.hostText}>{hostName}</Text>
              </View>
              <Text style={styles.text}>
                {truncateDescription(bio, MAX_LETTERS_DESCRIPTION)}
              </Text>
            </View>
            <View style={styles.lowerLeftSide}>
              <Text style={styles.addressText}>{address}</Text>

              {host ? (
                <TouchableOpacity
                  activeOpacity={0.3}
                  style={styles.button}
                  onPress={onButtonPress}
                >
                  <Text onPress={handleEditPress} style={styles.buttonText}>
                    Rediger
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.3}
                  style={styles.leaveButton}
                  onPress={onButtonPress}
                >
                  <Text style={styles.leaveButtonText}>Forlat event</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.rightSide}>
            <Image
              source={{ uri: imageSource }}
              style={{
                height: "100%",
                width: "100%",
                resizeMode: "cover",
                borderRadius: 16,
              }}
            />
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default EventCardJoined;
