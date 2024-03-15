import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import styles from './RegisterCardStyles';

interface RegisterInfo {
  inputName: string;
  placeholder: string;
}

interface RegisterCardProps {
  registerInfo: RegisterInfo[];
  onPressButton: () => void; //To feed page
  onLinkPress: () => void; // To login page
}

export function RegisterCard({
  registerInfo,
  onPressButton,
  onLinkPress,
}: RegisterCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.inputContainer}>
        {registerInfo.map((info) => (
          <TextInput
            key={info.inputName}
            style={styles.input}
            placeholder={info.placeholder}
            secureTextEntry={info.inputName === 'password'}
          />
        ))}
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

export default RegisterCard;
