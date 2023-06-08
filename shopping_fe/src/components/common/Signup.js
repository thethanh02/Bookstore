import React, { useState, useContext, useEffect } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react';
import AuthContext from '../context/AuthContext';
import { storeApi } from '../misc/StoreApi';
import { parseJwt, handleLogError } from '../utils/Helpers';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');

    const Auth = useContext(AuthContext);

    useEffect(() => {
        const checkAuth = () => {
            const isLoggedIn = Auth.userIsAuthenticated();
            setLoggedIn(isLoggedIn);
        };
        checkAuth();
    }, [Auth]);

    const handleInputChange = (e, { name, value }) => {
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'name') {
            setName(value);
        } else if (name === 'email') {
            setEmail(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsError(false);
        setErrorMessage('');
        setUsernameError('');
        setPasswordError('');
        setNameError('');
        setEmailError('');
        const user = { username, password, name, email };
        storeApi
            .signup(user)
            .then((response) => {
                const { accessToken } = response.data;
                const data = parseJwt(accessToken);
                const user = { data, accessToken };

                Auth.userLogin(user);

                setUsername('');
                setPassword('');
                setLoggedIn(true);
            })
            .catch((error) => {
                handleLogError(error);
                if (error.response && error.response.data) {
                    const errorData = error.response;
                    if (errorData.status === 409) {
                        setErrorMessage(errorData.data);
                        setIsError(true);
                    } else if (errorData.status === 400) {
                        if (errorData.data.fieldErrors) {
                            errorData.data.fieldErrors.forEach(fieldError => {
                                if (fieldError.field === 'username') {
                                    setUsernameError(fieldError.message);
                                } else if (fieldError.field === 'password') {
                                    setPasswordError(fieldError.message);
                                } else if (fieldError.field === 'name') {
                                    setNameError(fieldError.message);
                                } else if (fieldError.field === 'email') {
                                    setEmailError(fieldError.message);
                                }
                            })
                        }
                    } else {
                        setErrorMessage('Không hợp lệ');
                        setIsError(true);
                    }
                }
            });
    };

    if (isLoggedIn) {
        return <Navigate to="/" />;
    } else {
        return (
            <Grid textAlign="center">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Form size="large" onSubmit={handleSubmit}>
                        <Segment>
                            <Form.Input
                                fluid
                                autoFocus
                                name="username"
                                icon="user"
                                iconPosition="left"
                                placeholder="Username"
                                value={username}
                                onChange={handleInputChange}
                            />
                            { usernameError && <span style={{ color: 'red', fontSize: '12px' }}>{usernameError}</span> }
                            <Form.Input
                                fluid
                                name="password"
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={handleInputChange}
                            />
                            { passwordError && <span style={{ color: 'red', fontSize: '12px' }}>{passwordError}</span> }
                            <Form.Input
                                fluid
                                name="name"
                                icon="info circle"
                                iconPosition="left"
                                placeholder="Name"
                                value={name}
                                onChange={handleInputChange}
                            />
                            { nameError && <span style={{ color: 'red', fontSize: '12px' }}>{nameError}</span> }
                            <Form.Input
                                fluid
                                name="email"
                                icon="at"
                                iconPosition="left"
                                placeholder="Email"
                                value={email}
                                onChange={handleInputChange}
                            />
                            { emailError && <span style={{ color: 'red', fontSize: '12px' }}>{emailError}</span> }
                            <Button color="red" fluid size="large">
                                Đăng ký
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        Bạn đã có tài khoản?{' '}
                        <NavLink href="/login" color="blue" to="/login" as={NavLink}>
                            Đăng nhập
                        </NavLink>
                    </Message>
                    {isError && <Message negative>{errorMessage}</Message>}
                </Grid.Column>
            </Grid>
        );
    }
};

export default Signup;
