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

        if (!(username && password && name && email)) {
            setIsError(true);
            setErrorMessage('Please, inform all fields!');
            return;
        }

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
                setIsError(false);
                setErrorMessage('');
            })
            .catch((error) => {
                handleLogError(error);
                if (error.response && error.response.data) {
                    const errorData = error.response.data;
                    let errorMessage = 'Invalid fields';
                    if (errorData.status === 409) {
                        errorMessage = errorData.message;
                    } else if (errorData.status === 400) {
                        errorMessage = errorData.errors[0].defaultMessage;
                    }
                    setIsError(true);
                    setErrorMessage(errorMessage);
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
                            <Form.Input
                                fluid
                                name="name"
                                icon="info circle"
                                iconPosition="left"
                                placeholder="Name"
                                value={name}
                                onChange={handleInputChange}
                            />
                            <Form.Input
                                fluid
                                name="email"
                                icon="at"
                                iconPosition="left"
                                placeholder="Email"
                                value={email}
                                onChange={handleInputChange}
                            />
                            <Button color="red" fluid size="large">
                                Signup
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        Already have an account?{' '}
                        <NavLink href="/login" color="blue" to="/login" as={NavLink}>
                            Login
                        </NavLink>
                    </Message>
                    {isError && <Message negative>{errorMessage}</Message>}
                </Grid.Column>
            </Grid>
        );
    }
};

export default Signup;
