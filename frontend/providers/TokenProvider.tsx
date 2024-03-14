import { ReactNode, createContext, useContext } from 'react';
import { useState } from 'react';

interface ITokenContext {
  token: string;
}

const defaultContextValue: ITokenContext = {
  token: '',
};

const TokenContext = createContext<ITokenContext>(defaultContextValue);

export const useTokenProvider = () => useContext(TokenContext);

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string>('');

  const value = {
    token,
    setToken,
  };

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
};
