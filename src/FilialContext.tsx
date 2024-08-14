// FilialContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FilialContextProps {
  filial: string;
  setFilial: (filial: string) => void;
}

const FilialContext = createContext<FilialContextProps | undefined>(undefined);

export const FilialProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filial, setFilial] = useState<string>('1');

  return (
    <FilialContext.Provider value={{ filial, setFilial }}>
      {children}
    </FilialContext.Provider>
  );
};

export const useFilial = (): FilialContextProps => {
  const context = useContext(FilialContext);
  if (!context) {
    throw new Error('useFilial must be used within a FilialProvider');
  }
  return context;
};
