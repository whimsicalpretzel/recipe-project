import { createContext, useState, useContext, useEffect } from 'react'
import { io } from 'socket.io-client'
import PropTypes from 'prop-types'
import { useAuth } from './AuthContext.jsx'

export const SocketIOContext = createContext({
  socket: null,
  status: 'waiting',
  error: null,
})

export const SocketIOContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [status, setStatus] = useState('waiting')
  const [error, setError] = useState(null)
  const [token] = useAuth()

  useEffect(() => {
    if (!token) {
      if (socket) {
        socket.disconnect()
        setSocket(null)
      }
      setStatus('waiting')
      setError(null)
      return
    }

    if (token) {
      const newSocket = io(import.meta.env.VITE_SOCKET_HOST, {
        auth: { token },
      })
      newSocket.on('connect', () => {
        setStatus('connected')
        setError(null)
      })
      newSocket.on('connect_error', (err) => {
        setStatus('error')
        setError(err)
      })
      newSocket.on('disconnect', () => setStatus('disconnected'))
      setSocket(newSocket)
      return () => {
        newSocket.disconnect()
      }
    }
  }, [token])

  return (
    <SocketIOContext.Provider value={{ socket, status, error }}>
      {children}
    </SocketIOContext.Provider>
  )
}

SocketIOContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export function useSocket() {
  return useContext(SocketIOContext)
}
