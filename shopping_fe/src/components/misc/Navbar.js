import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Icon, Menu } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext'
import { useShoppingCart } from '../context/ShoppingCartContext'

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

    // const userPageStyle = () => {
    //     const user = getUser()
    //     return user && user.data.rol[0] === 'USER' ? { "display": "block" } : { "display": "none" }
    // }

    const getUserName = () => {
        const user = getUser()
        return user ? user.data.name : ''
    }

    const path = "Home";
    const [activeItem, setActiveItem] = useState(path);
    const handleItemClick = (e, { name }) => setActiveItem(name);

    const { openCart, cartQuantity } = useShoppingCart()

    return (
        <Menu pointing secondary size="massive" color="red">
            <Container>
                <Menu.Item header as={Link} exact='true' to="/" name='Home' active={activeItem === 'Home'} onClick={handleItemClick}>
                    <img
                        src="/favicon1.svg"
                        width="20"
                        height="20"
                        className="d-inline-block align-top"
                        alt="Bookstore Logo"
                    />
                </Menu.Item>
                <Menu.Item as={Link} to="/adminpage" style={adminPageStyle()} name='AdminPage' active={activeItem === 'AdminPage'} onClick={handleItemClick} />
                <Menu.Item as={Link} to="/books" style={adminPageStyle()} name='Books' active={activeItem === 'Books'} onClick={handleItemClick} />
                {/* <Menu.Item as={Link} to="/userpage" style={userPageStyle()}>UserPage</Menu.Item> */}
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Button icon circular onClick={openCart} style={{ 'padding': '0' }} >
                            <Icon name='shopping cart' circular />
                            {cartQuantity > 0 && (
                            <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                                style={{
                                    color: "white",
                                    width: "1.4rem",
                                    height: "1.4rem",
                                    position: "absolute",
                                    bottom: 0,
                                    right: 0,
                                    transform: "translate(25%, 25%)",
                                }}
                            >
                                {cartQuantity}    
                            </div>
                            )}
                        </Button>
                    </Menu.Item>
                    <Menu.Item as={Link} to="/login" style={enterMenuStyle()} name='Login' active={activeItem === 'Login'} onClick={handleItemClick} />
                    <Menu.Item as={Link} to="/signup" style={enterMenuStyle()} name='Sign Up' active={activeItem === 'Sign Up'} onClick={handleItemClick} />
                    <Menu.Item header style={logoutMenuStyle()} name={`Hi ${getUserName()}`} />
                    <Menu.Item as={Link} to="/" style={logoutMenuStyle()} name='Logout' onClick={logout} />
                </Menu.Menu>
            </Container>
        </Menu>
    )
}

export default Navbar