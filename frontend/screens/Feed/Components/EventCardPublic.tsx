import React, { useEffect, useState } from 'react'
import { Button, Image, Pressable, Text, View } from 'react-native'
import {styles} from './EventCardPublicStyles'

interface EventCardPublicProps {
    numberOfPeople: string,
    dateTime: Date;
    title: string;
    hostName:string;
    bio: string;
    address: string;
    imageSource: any;
    onJoinPress: () => void;
}

const EventCardPublic = ({ numberOfPeople, dateTime, title, hostName, bio, address, imageSource, onJoinPress }: EventCardPublicProps) => {
  const [singleButton, setSingleButton] = useState(true);

  useEffect(() => {
    if (1 == 1 /*If backend data says so*/) {
      setSingleButton(true)
    } else {
      setSingleButton(false)
    } 
      
  },[singleButton /*backenddata*/])

const handleSingleButtonClick = () => {
  // Logic for single button functionality
};

const handleOption1Click = () => {
  // Logic for option 1 functionality
};

const handleOption2Click = () => {
  // Logic for option 2 functionality
};

    return (
        <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.smallText}>{numberOfPeople}</Text>
          <Text style={styles.smallText}>{dateTime.toLocaleString()}</Text>
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
              {singleButton ? (
                <Pressable style={styles.largeButton} onPress={handleSingleButtonClick} >
                    <Text style={styles.largeButtonText}>Bli med</Text>
                </Pressable>
              ) : (
                <>
                  <Button title="Option 1" onPress={handleOption1Click} />
                  <Button title="Option 2" onPress={handleOption2Click} />
                </>
              )}
            </View>
            </View>
          <View style={styles.rightSide}>
            <Image source={imageSource} style={styles.image}/>
          </View>
        </View>
      </View>
    );
  };

export default EventCardPublic
