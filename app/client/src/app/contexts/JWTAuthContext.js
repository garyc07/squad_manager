import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios.js'
import { MatxLoading } from 'app/components'
import localStorageService from '../services/localStorageService'

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null
}


const setSession = (accessToken) => {
  if(accessToken) {
    localStorageService.setAccessToken(accessToken)
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  } else {
    localStorageService.removeAccessToken()
    delete axios.defaults.headers.common.Authorization
  }
}


const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user } = action.payload
      return { ...state, isAuthenticated, isInitialised: true, user }
    }
    case 'LOGIN': {
      const { user } = action.payload
      return { ...state, isAuthenticated: true, user }
    }
    case 'LOGOUT': {
      return { ...state, isAuthenticated: false, user: null }
    }
    case 'REGISTER': {
      const { user } = action.payload
      return { ...state, isAuthenticated: true, user }
    }
    default: {
      return { ...state }
    }
  }
}

const AuthContext = createContext({
  ...initialState,
  method: 'JWT',
  login: () => Promise.resolve(),
  logout: () => { },
  register: () => Promise.resolve()
})

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const login = async (username, password) => {
    const response = await axios.post('/user/login', { username, password })
    const { token } = response.data
    setSession(token)
    const user = localStorageService.getCurrentUser()

    dispatch({ type: 'LOGIN', payload: { user } })
  }

    // TODO
    const register = async (email, username, password) => {
        const response = await axios.post('/api/auth/register', {
            email,
            username,
            password,
        })

        const { accessToken, user } = response.data

        setSession(accessToken)

        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        })
    }

  const logout = () => {
    setSession(null)
    dispatch({ type: 'LOGOUT' })
  }


  useEffect(() => {
    const accessToken = localStorageService.getValidAccessToken() // window.localStorage.getItem('accessToken')
    if(accessToken) {
      setSession(accessToken)
      const user = localStorageService.getCurrentUser()
      dispatch({
        type: 'INIT',
        payload: { isAuthenticated: true, user }
      })
    } else {
      dispatch({
        type: 'INIT',
        payload: { isAuthenticated: false, user: null }
      })
    }
  }, [])


  if (!state.isInitialised) return <MatxLoading />


  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'JWT',
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
