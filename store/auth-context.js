import { createContext, useState } from 'react'

const AuthContext = createContext({
  auth: null,
  setAuth: function () { },
})


export function AuthContextProvider(props) {
  const [activeAuth, setActiveAuth] = useState(false)

  function setAuthHandler() {
    setActiveAuth(!activeAuth)
  }

  const context = {
    auth: activeAuth,
    setAuth: setAuthHandler,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  )
}



export default AuthContext