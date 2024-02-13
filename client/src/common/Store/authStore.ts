import { createContext, useContext, useState } from "react";

interface AuthContextType {
  userData: User | null;
  setUserData: (newUserData: User | null) => void;
}

// const AuthContext = createContext<AuthContextType>();

interface User {
  // Define the properties of your User object here
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<User | null>(null);

  return (
    // <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    // </AuthContext.Provider>
  );
}

// export const useAuth = () => useContext(AuthContext);
