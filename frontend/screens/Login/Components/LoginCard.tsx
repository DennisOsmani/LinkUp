import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import styles from "./LoginCardStyles";

interface LoginInfo {
  inputName: string;
  placeholder: string;
}

interface LoginCardProps {
  loginInfo: LoginInfo[];
  onPressButton: () => void; // To feed page
  onLinkPress: () => void; // To register page
}

export function LoginCard({
  loginInfo,
  onPressButton,
  onLinkPress,
}: LoginCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.inputContainer}>
        {loginInfo.map((info) => (
          <TextInput
            key={info.inputName}
            style={styles.input}
            placeholder={info.placeholder}
            secureTextEntry={info.inputName === "password"}
          />
        ))}
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
  );
}
