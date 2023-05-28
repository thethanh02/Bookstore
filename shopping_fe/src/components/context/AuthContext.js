import React, { useContext, useEffect, useState } from 'react'

const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const user = localStorage.getItem('user')
        setUser(user)
    }, [])

    const getUser = () => {
        return JSON.parse(localStorage.getItem('user'))
    }

    const userIsAuthenticated = () => {
        let user = localStorage.getItem('user')
        if (!user) {
            return false
        }
        user = JSON.parse(user)

        // if user has token expired, logout user
        if (Date.now() > user.data.exp * 1000) {
            userLogout()
            return false
        }
        return true
    }

    const userLogin = user => {
        localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }

    const userLogout = () => {
        localStorage.removeItem('user')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, getUser, userIsAuthenticated, userLogin, userLogout, }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext

export function useAuth() {
    return useContext(AuthContext)
}

export { AuthProvider }