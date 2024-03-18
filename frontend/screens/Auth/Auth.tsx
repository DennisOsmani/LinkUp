import { View, Alert } from "react-native";
import { IToken, registerUser } from "../../api/AuthAPI";
import { loginUser } from "../../api/AuthAPI";
import { useState } from "react";
import { styles } from "./AuthStyles";
import { IRegistrationRequest, ILoginRequest } from "../../api/AuthAPI";
import LoginCard from "./components/Login/LoginCard";
import RegisterCard from "./components/Register/RegisterCard";
import { useTokenProvider } from "../../providers/TokenProvider";

enum State {
  LOGIN,
  REGISTER,
}

const { token, setToken } = useTokenProvider();

export default function Auth() {
  const [view, setView] = useState<State>(State.LOGIN);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");

  const handleLogin = async () => {
    console.log("PREV TOKEN " + token);

    try {
      const request: ILoginRequest = {
        email: email,
        password: password,
      };

      const response: IToken | undefined = await loginUser(request);
      setToken(response.token);
      console.log("Login token : " + response.token);
    } catch (error) {
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
      };

      const response: IToken | undefined = await registerUser(request);
      setToken(response.token);
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
        />
      )}
    </View>
  );
}
