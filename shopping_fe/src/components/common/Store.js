import React, { useState, useEffect } from 'react';
import { storeApi } from '../misc/StoreApi';
import { Container, Grid } from 'semantic-ui-react';
import { StoreItem } from "./StoreItem"
import { handleLogError } from '../utils/Helpers'

const Store = () => {
    const [storeItems, setStoreItems] = useState([])

    useEffect(() => {
        storeApi.getBooks()
            .then(response => {
                setStoreItems(response.data)
            })
            .catch(error => {
                handleLogError(error)
            })
    }, [])

    return (
        <Container>
            <Grid doubling stackable columns={5}>
                {storeItems.map(item => (
                    <StoreItem key={item.id} {...item} />
                ))}
            </Grid>
        </Container>
    );
};

export default Store;