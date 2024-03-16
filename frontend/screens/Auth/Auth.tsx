import { View, Text } from "react-native";
import { registerUser } from "../../api/AuthAPI";
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

/*
 * TODO
 * error handling for failed login, show user a message!
 * error handling for register, show user a message!
 *
 * test that you have to login to use the app
 * check that the token is stored correct and can be used for later by printing it from provider!
 */

export default function Auth() {
  const [view, setView] = useState<State>(State.LOGIN);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");

  const { token, setToken } = useTokenProvider();

  const handleLogin = async () => {
    try {
      const request: ILoginRequest = {
        email: email,
        password: password,
      };

      const response = await loginUser(request);
      // For debugging
      console.log("TOKEN RESPONSE (LOGIN) " + response);
      setToken(response);
    } catch (error) {
      // Handle this error!
      console.error(error);
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

      await registerUser(request);
      const response = await loginUser(request);
      // For debugging
      console.log("TOKEN RESPONSE (REGISTER) " + response);
      setToken(response);
    } catch (error) {
      // Handle this error!
      console.error(error);
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
