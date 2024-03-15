import { View, Text } from 'react-native';
import { registerUser } from '../../api/AuthAPI';
import { loginUser } from '../../api/AuthAPI';
import { useState } from 'react';
import { styles } from './AuthStyles';
import { LoginCard } from './Components/Login/LoginCard';
import { IRegistrationRequest, ILoginRequest } from '../../api/AuthAPI';

enum State {
  LOGIN,
  REGISTER,
}

export default function Auth() {
  const [view, setView] = useState<State>(State.LOGIN);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');

  const handleLogin = async () => {
    try {
      const request: ILoginRequest = {
        email: email,
        password: password,
      };

      await loginUser(request);
    } catch (error) {
      // Handle this error!
      console.error(error);
    }
  };

  const handleReqister = async () => {
    try {
      const request: IRegistrationRequest = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      };

      await registerUser(request);
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
          setEmail={setEmail}
          setPassword={setPassword}
        />
      )}
    </View>
  );
}
