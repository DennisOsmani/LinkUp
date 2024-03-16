import { Dispatch } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import styles from "./RegisterCardStyles";

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
}: RegisterCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={"Firstname"}
          onChangeText={(input) => setFirstname(input)}
          value={firstname}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={"Lastname"}
          onChangeText={(input) => setLastname(input)}
          value={lastname}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={"Email"}
          onChangeText={(input) => setEmail(input)}
          value={email}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={"Password"}
          secureTextEntry={true}
          onChangeText={(input) => setPassword(input)}
          value={password}
        />
      </View>
      <View style={styles.inputContainer}>
        <Pressable style={styles.button} onPress={onPressButton}>
          <Text style={styles.text}>Registrer</Text>
        </Pressable>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.linkContainer}>
          <Text style={styles.question}>Allerede registrert?</Text>
          <TouchableOpacity onPress={onLinkPress}>
            <Text style={styles.link}>Logg inn</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
