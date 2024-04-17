import { ReactNode, createContext, useState } from "react";

const AuthContext = createContext({user: undefined, setUser: () => {}})

const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState(undefined)

  return <AuthContext.Provider value={}>{children}</AuthContext.Provider>

}

export default AuthContextProvider
