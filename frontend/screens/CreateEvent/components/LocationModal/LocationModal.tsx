import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { styles } from "./LocationModalStyles";
import React from "react";
import { ILocation } from "../../../../interfaces/ModelInterfaces";
import { Feather } from "@expo/vector-icons";

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
            value={location.address}
            onChangeText={(input) =>
              setLocation((location: ILocation) => ({
                ...location,
                address: input,
              }))
            }
          />
          <TextInput
            style={styles.inputBox}
            placeholder={"Postnummer"}
            value={location.postalcode}
            onChangeText={(input) =>
              setLocation((location: ILocation) => ({
                ...location,
                postalcode: input,
              }))
            }
          />
          <TextInput
            style={styles.inputBox}
            placeholder={"By"}
            value={location.city}
            onChangeText={(input) =>
              setLocation((location: ILocation) => ({
                ...location,
                city: input,
              }))
            }
          />
          <TextInput
            style={styles.inputBox}
            placeholder={"Land"}
            value={location.country}
            onChangeText={(input) =>
              setLocation((location: ILocation) => ({
                ...location,
                country: input,
              }))
            }
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
