import {
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
  Keyboard,
} from "react-native";
import { styles } from "./LocationModalStyles";
import React from "react";
import { ILocation } from "../../../../interfaces/ModelInterfaces";

interface LocationModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  location: ILocation;
  setLocation: React.Dispatch<React.SetStateAction<ILocation>>;
}

export default function LocationModal({
  visible,
  setVisible,
  location,
  setLocation,
}: LocationModalProps) {
  const handleKeyPress = (e: any) => {
    if (e.nativeEvent.key === "Enter") {
      Keyboard.dismiss();
      e.preventDefault();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(!visible)}
    >
      <View style={styles.container}>
        <View style={styles.modalCard}>
          <View style={styles.xcontainer}>
            <Pressable onPress={() => setVisible(false)}>
              <Text style={styles.x}>x</Text>
            </Pressable>
            <Text style={styles.x}>Sted</Text>
          </View>
          <TextInput
            style={styles.inputBox}
            placeholder={"Adresse"}
            placeholderTextColor={"rgba(128, 128, 128, 0.4)"}
            value={location.address}
            onChangeText={(input) =>
              setLocation((location: ILocation) => ({
                ...location,
                address: input,
              }))
            }
            onKeyPress={handleKeyPress}
          />
          <TextInput
            style={styles.inputBox}
            placeholder={"Postnummer"}
            placeholderTextColor={"rgba(128, 128, 128, 0.4)"}
            value={location.postalcode}
            onChangeText={(input) =>
              setLocation((location: ILocation) => ({
                ...location,
                postalcode: input,
              }))
            }
            onKeyPress={handleKeyPress}
          />
          <TextInput
            style={styles.inputBox}
            placeholder={"By"}
            placeholderTextColor={"rgba(128, 128, 128, 0.4)"}
            value={location.city}
            onChangeText={(input) =>
              setLocation((location: ILocation) => ({
                ...location,
                city: input,
              }))
            }
            onKeyPress={handleKeyPress}
          />
          <TextInput
            style={styles.inputBox}
            placeholder={"Land"}
            placeholderTextColor={"rgba(128, 128, 128, 0.4)"}
            value={location.country}
            onChangeText={(input) =>
              setLocation((location: ILocation) => ({
                ...location,
                country: input,
              }))
            }
            onKeyPress={handleKeyPress}
          />
          <Pressable
            style={styles.saveButton}
            onPress={() => setVisible(!visible)}
          >
            <Text style={styles.saveText}>Lagre</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
