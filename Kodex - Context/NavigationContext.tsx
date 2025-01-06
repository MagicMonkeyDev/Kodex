import React, { createContext } from 'react';

interface NavigationContextType {
  onNavigate: (page: string) => void;
}

export const NavigationContext = createContext<NavigationContextType>({
  onNavigate: () => {},
});

interface NavigationProviderProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children, onNavigate }) => {
  return (
    <NavigationContext.Provider value={{ onNavigate }}>
      {children}
    </NavigationContext.Provider>
  );
};