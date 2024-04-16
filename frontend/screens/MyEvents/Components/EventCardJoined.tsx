import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./EventCardJoinedStyles";
import { Feather } from "@expo/vector-icons";
import { IEventRelations } from "../../../interfaces/ModelInterfaces";

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
}: EventCardJoinedProps) => {
  const MAX_LETTERS_DESCRIPTION = 90;
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
          <Feather name="users" style={styles.headerText} />
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
              <Feather name="user" style={styles.text} />
              <Text style={styles.text}>{hostName}</Text>
            </View>
            <Text style={styles.text}>
              {truncateDescription(bio, MAX_LETTERS_DESCRIPTION)}
            </Text>
          </View>
          <View style={styles.lowerLeftSide}>
            <Text style={styles.addressText}>{address}</Text>
            <Pressable style={styles.button} onPress={onButtonPress}>
              {host ? (
                <Text style={styles.buttonText}>Rediger</Text>
              ) : (
                <Text style={styles.buttonText}>Forlat Event</Text>
              )}
            </Pressable>
          </View>
        </View>
        <View style={styles.rightSide}>
          <Image
            source={imageSource}
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

export default EventCardJoined;
