import { ReactNode, createContext, useContext } from "react";
import { useState } from "react";

interface ITokenContext {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

const defaultContextValue: ITokenContext = {
  token: "",
  setToken: () => {},
  userId: "",
  setUserId: () => {},
};

const TokenContext = createContext<ITokenContext>(defaultContextValue);

export const useTokenProvider = () => useContext(TokenContext);

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const value = {
    token,
    setToken,
    userId,
    setUserId,
  };

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
};
