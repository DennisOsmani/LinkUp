import { View, Alert } from "react-native";
import { registerUser } from "../../api/AuthAPI";
import { loginUser } from "../../api/AuthAPI";
import { useState } from "react";
import { styles } from "./AuthStyles";
import LoginCard from "./components/Login/LoginCard";
import RegisterCard from "./components/Register/RegisterCard";
import { useTokenProvider } from "../../providers/TokenProvider";
import {
  IRegistrationRequest,
  ILoginRequest,
  IToken,
} from "../../interfaces/ModelInterfaces";

enum State {
  LOGIN,
  REGISTER,
}

interface AuthProps {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Auth({ trigger, setTrigger }: AuthProps) {
  const [view, setView] = useState<State>(State.LOGIN);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [bornDate, setBornDate] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const { setToken, setUserID } = useTokenProvider();

  const handleLogin = async () => {
    try {
      const request: ILoginRequest = {
        email: email,
        password: password,
      };

      const response: IToken | undefined = await loginUser(request);
      setToken(response.token);
      setUserID(response.userID);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Ugyldig Login",
        "Mail addressen eller passord er feil, eller finnes ikke!"
      );
    }
  };

  const handleRegister = async () => {
    try {
      const request: IRegistrationRequest = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        bornDate: bornDate,
        gender: gender,
      };

      const response: IToken | undefined = await registerUser(request);
      setToken(response.token);
      setTrigger(!trigger);
    } catch (error) {
      Alert.alert(
        "Ugyldig Registrering",
        "Mail addressen eller passord er feil, eller finnes ikke!"
      );
    }
  };

  const toggleState = () => {
    setView(view === State.LOGIN ? State.REGISTER : State.LOGIN);
  };

  return (
    <View style={styles.container}>
      {view === State.LOGIN && (
        <LoginCard
          onPressButton={handleLogin}
          onLinkPress={toggleState}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
      )}
      {view === State.REGISTER && (
        <RegisterCard
          onPressButton={handleRegister}
          onLinkPress={toggleState}
          firstname={firstname}
          setFirstname={setFirstname}
          lastname={lastname}
          setLastname={setLastname}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          gender={gender}
          setGender={setGender}
          bornDate={bornDate}
          setBornDate={setBornDate}
        />
      )}
    </View>
  );
}
