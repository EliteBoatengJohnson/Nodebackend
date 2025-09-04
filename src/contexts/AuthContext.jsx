import { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'

// defining the context to store jwt token in react runtime
export const AuthContext = createContext({
  token: null,
  setToken: () => {},
})

// the authntication context provider sets the context for jwt secret key
export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null)

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

// creating a custom hook
export function useAuth() {
  const { token, setToken } = useContext(AuthContext)
  return [token, setToken]
}
