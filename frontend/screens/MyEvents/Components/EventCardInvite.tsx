import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./EventCardInviteStyles";
import { Feather } from "@expo/vector-icons";

interface EventCardInviteProps {
  numberOfPeople: string;
  dateTime: string;
  title: string;
  hostName: string;
  bio: string;
  address: string;
  imageSource: any;
  onJoinPress: () => void;
  onDeclinePress: () => void;
}

const EventCardInvite = ({
  numberOfPeople,
  dateTime,
  title,
  hostName,
  bio,
  address,
  imageSource,
  onJoinPress,
  onDeclinePress,
}: EventCardInviteProps) => {
  const MAX_LETTERS_DESCRIPTION = 70;
  const MAX_LETTERS_TITLE = 16;

  const truncateDescription = (text: string, maxLetters: number) => {
    if (text.length > maxLetters && maxLetters != MAX_LETTERS_TITLE) {
      return text.substring(0, maxLetters) + "...";
    }
    return text.substring(0, maxLetters);
  };
  return (
    <View style={styles.card}>
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
            <View style={styles.buttonsContainer}>
              <Pressable style={styles.button} onPress={onJoinPress}>
                <Text style={styles.buttonText}>Godta</Text>
              </Pressable>
              <Pressable style={styles.invertedButton} onPress={onDeclinePress}>
                <Text style={styles.invertedButtonText}>Avslå</Text>
              </Pressable>
            </View>
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
    </View>
  );
};

export default EventCardInvite;
