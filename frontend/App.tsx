import { TokenProvider } from "./providers/TokenProvider";
import LoginWallRouter from "./screens/LoginWallRouter/LoginWallRouter";

export default function App() {
  return (
    <TokenProvider>
      <LoginWallRouter />
    </TokenProvider>
  );
}
