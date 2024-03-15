import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./EventCardInviteStyles";
import { Feather } from "@expo/vector-icons";

interface EventCardInviteProps {
  numberOfPeople: string;
  dateTime: Date;
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
  onDeclinePress
}: EventCardInviteProps) => {
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
            <Text style={styles.title}>{title}</Text>
            <View style={styles.iconTextWrapper}>
              <Feather name="user" style={styles.text} />
              <Text style={styles.hostText}>{hostName}</Text>
            </View>

            <Text style={styles.text}>{bio}</Text>
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
            source={imageSource}
            style={{
              height: "100%",
              width: "100%",
              resizeMode: "cover",
              borderRadius: 16
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default EventCardInvite;
