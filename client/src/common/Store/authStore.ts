import { createContext, useContext, useState , FC} from "react";
import React from "react";
interface AuthContextType {
  userData: User | null;
  setUserData: (newUserData: User | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface User {
  // Define the properties of your User object here
}

const AuthProvider : FC<{children: React.ReactNode}> = ({ children }) => {
  const [userData, setUserData] = useState<User | null>(null);

  return (
    // <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    // </AuthContext.Provider>
  );
}

// export const useAuth = () => useContext(AuthContext);
