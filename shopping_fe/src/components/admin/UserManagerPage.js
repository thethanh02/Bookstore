import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Button, Container, Form, Input, Table } from 'semantic-ui-react';
import AuthContext from '../context/AuthContext';
import { storeApi } from '../misc/StoreApi';
import { handleLogError } from '../utils/Helpers';

const UserManagerPage = () => {
    const [users, setUsers] = useState([]);
    const [userUsernameSearch, setUserUsernameSearch] = useState('');
    const [isAdmin, setIsAdmin] = useState(true);

    const Auth = useContext(AuthContext);

    useEffect(() => {
        const user = Auth.getUser();
        const isAdmin = user.data.rol[0] === 'ADMIN';
        setIsAdmin(isAdmin);

        handleGetUsers();
    }, [Auth]);

    const handleInputChange = (e, { name, value }) => {
        setUserUsernameSearch(value);
    };

    const handleGetUsers = () => {
        const user = Auth.getUser();

        storeApi
            .getUsers(user)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                handleLogError(error);
            })
            .finally(() => {
            });
    };

    const handleDeleteUser = (username) => {
        const user = Auth.getUser();

        storeApi
            .deleteUser(user, username)
            .then(() => {
                handleGetUsers();
            })
            .catch(error => {
                handleLogError(error);
            });
    };

    const handleSearchUser = () => {
        const user = Auth.getUser();

        storeApi
            .getUsers(user, userUsernameSearch)
            .then(response => {
                const data = response.data;
                const users = data instanceof Array ? data : [data];
                setUsers(users);
            })
            .catch(error => {
                handleLogError(error);
                setUsers([]);
            });
    };

    if (!isAdmin) {
        return <Navigate to="/" />;
    }
    let userList
    if (users.length === 0) {
        userList = (
            <Table.Row key='no-user'>
                <Table.Cell collapsing textAlign='center' colSpan='6'>No user</Table.Cell>
            </Table.Row>
        )
    } else {
        userList = users.map(user => {
            return (
                <Table.Row key={user.id}>
                    <Table.Cell>{user.id}</Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.role}</Table.Cell>
                    <Table.Cell collapsing>
                        <Button
                            circular
                            color='red'
                            size='small'
                            icon='trash'
                            disabled={user.username === 'admin'}
                            onClick={() => handleDeleteUser(user.username)}
                        />
                    </Table.Cell>
                </Table.Row>
            )
        })
    }

    return (
        <Container>
            <Form onSubmit={handleSearchUser}>
                <Input
                    action={{ icon: 'search' }}
                    name='userUsernameSearch'
                    placeholder='Search by Username'
                    value={userUsernameSearch}
                    onChange={handleInputChange}
                />
            </Form>
            <Table compact striped selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1}>ID</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Username</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Name</Table.HeaderCell>
                        <Table.HeaderCell width={5}>Email</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Role</Table.HeaderCell>
                        <Table.HeaderCell width={1} />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {userList}
                </Table.Body>
            </Table>
        </Container>
    );
};

export default UserManagerPage;
