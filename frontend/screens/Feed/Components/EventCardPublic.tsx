import React, { useEffect, useState } from "react";
import { Button, Image, Pressable, Text, View } from "react-native";
import { styles } from "./EventCardPublicStyles";

interface EventCardPublicProps {
  numberOfPeople: string;
  dateTime: Date;
  title: string;
  hostName: string;
  bio: string;
  address: string;
  imageSource: any;
  onJoinPress: () => void;
}

const EventCardPublic = ({
  numberOfPeople,
  dateTime,
  title,
  hostName,
  bio,
  address,
  imageSource,
  onJoinPress
}: EventCardPublicProps) => {
  const handleButtonClick = () => {
    onJoinPress();
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{numberOfPeople}</Text>
        <Text style={styles.headerText}>{dateTime.toLocaleString()}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.leftSide}>
          <View style={styles.upperLeftSide}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{hostName}</Text>
            <Text style={styles.text}>{bio}</Text>
          </View>
          <View style={styles.lowerLeftSide}>
            <Text style={styles.addressText}>{address}</Text>
            <Pressable style={styles.button} onPress={handleButtonClick}>
              <Text style={styles.buttonText}>Bli med</Text>
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
              borderRadius: 16
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default EventCardPublic;
