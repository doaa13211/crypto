import { createContext, useContext, useState, ReactNode } from 'react';

interface RSAContextType {
  // Keys from Key Generation
  p: number;
  q: number;
  n: number;
  phi: number;
  e: number;
  d: number;
  setKeys: (keys: { p: number; q: number; n: number; phi: number; e: number; d: number }) => void;
  
  // Message and ciphertext
  message: string;
  ciphertext: number[];
  setEncryptedMessage: (message: string, ciphertext: number[]) => void;
}

const RSAContext = createContext<RSAContextType | undefined>(undefined);

export function RSAProvider({ children }: { children: ReactNode }) {
  // Default values
  const [p, setP] = useState(61);
  const [q, setQ] = useState(53);
  const [n, setN] = useState(3233);
  const [phi, setPhi] = useState(3120);
  const [e, setE] = useState(17);
  const [d, setD] = useState(2753);
  
  const [message, setMessage] = useState("HI");
  const [ciphertext, setCiphertext] = useState<number[]>([2341, 2410]);

  const setKeys = (keys: { p: number; q: number; n: number; phi: number; e: number; d: number }) => {
    setP(keys.p);
    setQ(keys.q);
    setN(keys.n);
    setPhi(keys.phi);
    setE(keys.e);
    setD(keys.d);
  };

  const setEncryptedMessage = (msg: string, cipher: number[]) => {
    setMessage(msg);
    setCiphertext(cipher);
  };

  return (
    <RSAContext.Provider
      value={{
        p,
        q,
        n,
        phi,
        e,
        d,
        setKeys,
        message,
        ciphertext,
        setEncryptedMessage,
      }}
    >
      {children}
    </RSAContext.Provider>
  );
}

export function useRSA() {
  const context = useContext(RSAContext);
  if (context === undefined) {
    throw new Error('useRSA must be used within an RSAProvider');
  }
  return context;
}
