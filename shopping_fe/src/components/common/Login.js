import React, { useState, useContext, useEffect } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react';
import AuthContext from '../context/AuthContext';
import { storeApi } from '../misc/StoreApi';
import { parseJwt, handleLogError } from '../utils/Helpers';
import { useShoppingCart } from '../context/ShoppingCartContext';

const Login = () => {
    const { userIsAuthenticated, userLogin } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setError] = useState(false);
    const { cartItems, setCartItems } = useShoppingCart();

    useEffect(() => {
        const isLoggedIn = userIsAuthenticated();
        setLoggedIn(isLoggedIn);
    }, [userIsAuthenticated]);

    const handleInputChange = (e, { name, value }) => {
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!(username && password)) {
            setError(true);
            return;
        }

        storeApi
            .authenticate(username, password)
            .then((response) => {
                const { accessToken } = response.data;
                const data = parseJwt(accessToken);
                const user = { data, accessToken };

                userLogin(user);

                storeApi.getUserMe(user)
                    .then(response => {
                        if (response.data.cartItems.length > 0) {
                            setCartItems(response.data.cartItems)
                        } else if (cartItems.length > 0) {
                            storeApi.addListCartItem(user, cartItems)
                                .then(res => {
                                    setCartItems(res.data);
                                })
                                .catch((error) => {
                                    handleLogError(error);
                                })
                        }
                    })

                setUsername('');
                setPassword('');
                setLoggedIn(true);
                setError(false);
            })
            .catch((error) => {
                handleLogError(error);
                setError(true);
            });
    };

    if (isLoggedIn) {
        return <Navigate to={'/'} />;
    } else {
        return (
            <Grid textAlign='center'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Form size='large' onSubmit={handleSubmit}>
                        <Segment>
                            <Form.Input
                                fluid
                                autoFocus
                                name='username'
                                icon='user'
                                iconPosition='left'
                                placeholder='Username'
                                value={username}
                                onChange={handleInputChange}
                            />
                            <Form.Input
                                fluid
                                name='password'
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                value={password}
                                onChange={handleInputChange}
                            />
                            <Button color='red' fluid size='large'>
                                Login
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        {"Don't have already an account? "}
                        <a href='/signup' color='blue' as={NavLink} to='/signup'>
                            Sign Up
                        </a>
                    </Message>
                    {isError && (
                        <Message negative>
                            The username or password provided is incorrect!
                        </Message>
                    )}
                </Grid.Column>
            </Grid>
        );
    }
};

export default Login;
