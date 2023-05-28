import React, { useState, useEffect } from 'react';
import { storeApi } from '../misc/StoreApi';
import { Container, Grid } from 'semantic-ui-react';
import { StoreItem } from "./StoreItem"
import { handleLogError } from '../utils/Helpers'

const Store = () => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        storeApi.getBooks()
            .then(response => {
                setBooks(response.data)
                console.log(books)
            })
            .catch(error => {
                handleLogError(error)
            })
    }, [])

    return (
        <Container>
            <Grid doubling columns={5}>
                {books.map(item => (
                    <StoreItem {...item} />
                ))}
            </Grid>
        </Container>
    );
};

export default Store;