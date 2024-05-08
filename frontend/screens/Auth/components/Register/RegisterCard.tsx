import { Dispatch, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import styles from "./RegisterCardStyles";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { colors } from "../../../../styles/colors";
import { Ionicons } from "@expo/vector-icons";

interface RegisterCardProps {
  onPressButton: () => Promise<void>;
  onLinkPress: () => void;
  firstname: string;
  setFirstname: Dispatch<React.SetStateAction<string>>;
  lastname: string;
  setLastname: Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<React.SetStateAction<string>>;
  bornDate: string;
  setBornDate: Dispatch<React.SetStateAction<string>>;
  gender: string;
  setGender: Dispatch<React.SetStateAction<string>>;
}

export default function RegisterCard({
  onPressButton,
  onLinkPress,
  firstname,
  setFirstname,
  lastname,
  setLastname,
  email,
  setEmail,
  password,
  setPassword,
  bornDate,
  setBornDate,
  gender,
  setGender,
}: RegisterCardProps) {
  const [selectedGender, setSelectedGender] = useState({
    male: true,
    female: false,
    other: false,
  });

  useState(() => {
    setGender("M");
  });

  const handleGenderButtonPressed = (value: number) => {
    setSelectedGender({
      male: value === 0 ? true : false,
      female: value === 1 ? true : false,
      other: value === 2 ? true : false,
    });
    setGender(value === 0 ? "M" : value === 1 ? "F" : "O");
  };

  const onChangeDate = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    event;
    setBornDate(
      selectedDate ? selectedDate.toISOString() : new Date().toISOString()
    );
  };
  return (
    <View style={styles.wrapper}>
      <Text style={styles.compHeader}>REGISTRER DEG</Text>
      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={"Fornavn"}
            onChangeText={(input) => setFirstname(input)}
            value={firstname}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={"Etternavn"}
            onChangeText={(input) => setLastname(input)}
            value={lastname}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={"Mail"}
            onChangeText={(input) => setEmail(input)}
            value={email}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={"Passord"}
            secureTextEntry={true}
            onChangeText={(input) => setPassword(input)}
            value={password}
          />
        </View>

        <View style={styles.lastLineWrapper}>
          <View style={styles.tagAndInput}>
            <Text style={styles.inputLabel}>Fødselsdato</Text>
            <View style={styles.datetimepickerBox}>
              <View style={styles.pickerBox}>
                <DateTimePicker
                  value={bornDate ? new Date(bornDate) : new Date()}
                  onChange={onChangeDate}
                />
              </View>
            </View>
          </View>
          <View style={styles.tagAndInput}>
            <Text style={styles.inputLabel}>Kjønn</Text>
            <View style={styles.genderContainer}>
              <Pressable
                onPress={() => handleGenderButtonPressed(0)}
                style={{
                  ...styles.genderBox,
                  borderColor: selectedGender.male ? colors.primary : "white",
                }}
              >
                <Text
                  style={{
                    ...styles.genderText,
                    color: selectedGender.male
                      ? colors.primary
                      : "rgba(128, 128, 128, 0.4)",
                  }}
                >
                  <Ionicons
                    name="male"
                    style={{
                      ...styles.genderText,
                      color: selectedGender.male
                        ? colors.primary
                        : "rgba(128, 128, 128, 0.4)",
                    }}
                  />
                </Text>
              </Pressable>
              <Pressable
                onPress={() => handleGenderButtonPressed(1)}
                style={{
                  ...styles.genderBox,
                  borderColor: selectedGender.female ? colors.primary : "white",
                }}
              >
                <Ionicons
                  name="female"
                  style={{
                    ...styles.genderText,
                    color: selectedGender.female
                      ? colors.primary
                      : "rgba(128, 128, 128, 0.4)",
                  }}
                />
              </Pressable>
              <Pressable
                onPress={() => handleGenderButtonPressed(2)}
                style={{
                  ...styles.genderBox,
                  borderColor: selectedGender.other ? colors.primary : "white",
                }}
              >
                <Ionicons
                  name="ellipse-outline"
                  style={{
                    ...styles.genderText,
                    color: selectedGender.other
                      ? colors.primary
                      : "rgba(128, 128, 128, 0.4)",
                  }}
                />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.button}
            onPress={onPressButton}
          >
            <Text style={styles.text}>Registrer</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.linkContainer}>
            <Text style={styles.question}>Allerede registrert?</Text>
            <TouchableOpacity activeOpacity={0.5} onPress={onLinkPress}>
              <Text style={styles.link}>Logg inn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
