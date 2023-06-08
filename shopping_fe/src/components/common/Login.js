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
    const { cartItems, setCartItems } = useShoppingCart();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

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

        setIsError(false);
        setErrorMessage('');
        setUsernameError('');
        setPasswordError('');
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
            })
            .catch((error) => {
                handleLogError(error);
                const errorData = error.response;
                if (errorData.status === 400) {
                    if (errorData.data.fieldErrors) {
                        errorData.data.fieldErrors.forEach(fieldError => {
                            if (fieldError.field === 'username') {
                                setUsernameError(fieldError.message);
                            } else if (fieldError.field === 'password') {
                                setPasswordError(fieldError.message);
                            }
                        })
                    }
                } else {
                    setErrorMessage('Tài khoản hoặc mật khẩu không chính xác');
                    setIsError(true);
                }
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
                        { usernameError && <span style={{ color: 'red', fontSize: '12px' }}>{usernameError}</span> }
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
                        { passwordError && <span style={{ color: 'red', fontSize: '12px' }}>{passwordError}</span> }
                        <Button color='red' fluid size='large'>
                            Đăng nhập
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    {"Bạn chưa có tài khoản? "}
                    <a href='/signup' color='blue' as={NavLink} to='/signup'>
                        Đăng ký
                    </a>
                </Message>
                {isError && <Message negative>{errorMessage}</Message>}
            </Grid.Column>
        </Grid>
    );
}
};

export default Login;
