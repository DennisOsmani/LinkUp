import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import styles from "./LoginCardStyles";
import { Dispatch } from "react";

interface LoginCardProps {
  onPressButton: () => Promise<void>;
  onLinkPress: () => void;
  email: string;
  setEmail: Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<React.SetStateAction<string>>;
}

export default function LoginCard({
  onPressButton,
  onLinkPress,
  email,
  setEmail,
  setPassword,
}: LoginCardProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.compHeader}>LOGIN</Text>
      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={"Email"}
            onChangeText={(input) => setEmail(input.toLocaleLowerCase())}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder={"Password"}
            secureTextEntry={true}
            onChangeText={(input) => setPassword(input)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Pressable style={styles.button} onPress={onPressButton}>
            <Text style={styles.text}>Logg inn</Text>
          </Pressable>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.linkContainer}>
            <Text style={styles.question}>Har du ikke en bruker?</Text>
            <TouchableOpacity onPress={onLinkPress}>
              <Text style={styles.link}>Registrer deg</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
