import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Icon, Menu, Segment } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const { getUser, userIsAuthenticated, userLogout } = useAuth()

    const logout = () => {
        userLogout()
    }

    const enterMenuStyle = () => {
        return userIsAuthenticated() ? { "display": "none" } : { "display": "block" }
    }

    const logoutMenuStyle = () => {
        return userIsAuthenticated() ? { "display": "block" } : { "display": "none" }
    }

    const adminPageStyle = () => {
        const user = getUser()
        return user && user.data.rol[0] === 'ADMIN' ? { "display": "block" } : { "display": "none" }
    }

    const userPageStyle = () => {
        const user = getUser()
        return user && user.data.rol[0] === 'USER' ? { "display": "block" } : { "display": "none" }
    }

    const getUserName = () => {
        const user = getUser()
        return user ? user.data.name : ''
    }

    return (
        <Segment inverted attached size='mini' color='blue' style={{ borderRadius: 0 }}>
            <Menu inverted pointing color='blue'>
                <Container>
                    <Menu.Item header><Icon name='home' /></Menu.Item>
                    <Menu.Item as={Link} exact='true' to="/" name='Home' />
                    <Menu.Item as={Link} to="/adminpage" style={adminPageStyle()} name='AdminPage' />
                    <Menu.Item as={Link} to="/books" style={adminPageStyle()} name='Books' />
                    <Menu.Item as={Link} to="/store" style={adminPageStyle()} name='Store' />
                    {/* <Menu.Item as={Link} to="/userpage" style={userPageStyle()}>UserPage</Menu.Item> */}
                    <Menu.Menu position='right'>
                        <Menu.Item as={Link} to="/login" style={enterMenuStyle()} name='Login' />
                        <Menu.Item as={Link} to="/signup" style={enterMenuStyle()} name='Sign Up' />
                        <Menu.Item header style={logoutMenuStyle()} name={`Hi ${getUserName()}`} />
                        <Menu.Item as={Link} to="/" style={logoutMenuStyle()} onClick={logout} name='Logout' />
                    </Menu.Menu>
                </Container>
            </Menu>
        </Segment>
    )
}

export default Navbar