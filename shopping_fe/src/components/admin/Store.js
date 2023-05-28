import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom'
import { storeApi } from '../misc/StoreApi';
import { Card, Container } from 'semantic-ui-react';
import { StoreItem } from "../misc/StoreItem"
import { handleLogError } from '../misc/Helpers'

const Store = () => {
    const { getUser } = useAuth()
    const user = getUser()
    const [isAdmin, setIsAdmin] = useState(true)
    const [books, setBooks] = useState([])

    useEffect(() => {
        setIsAdmin(user.data.rol[0] === 'ADMIN')

        storeApi.getBooks(user)
            .then(response => {
                setBooks(response.data)
                console.log(books)
            })
            .catch(error => {
                handleLogError(error)
            })
    }, [])

    if (!isAdmin) {
        return <Navigate to='/' />
    }

    return (
        <Container>
            <Card.Group itemsPerRow={5}>
                {books.map(item => (
                    <StoreItem {...item} />
                ))}
            </Card.Group>
        </Container>
    );
};

export default Store;