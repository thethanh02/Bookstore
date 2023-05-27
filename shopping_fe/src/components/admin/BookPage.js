import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Grid, Button, Table, Container, Icon, Image } from 'semantic-ui-react'
import { storeApi } from '../misc/StoreApi';
import { handleLogError } from '../misc/Helpers'

const BookPage = () => {
    const { getUser } = useAuth()
    const [isAdmin, setIsAdmin] = useState(true)
    const [books, setBooks] = useState([])

    useEffect(() => {
        const user = getUser()

        setIsAdmin(user.data.rol[0] === 'ADMIN')

        storeApi.getBooks(user)
            .then(response => {
                setBooks(response.data)
            })
            .catch(error => {
                handleLogError(error)
            })
    }, [getUser])

    if (!isAdmin) {
        return <Navigate to='/' />
    }

    const handleDeleteBook = (id) => {
        const user = getUser()

        storeApi.deleteBook(user, id)
            .then(() => {
                let updatedBooks = [...books].filter(i => i.id !== id);
                setBooks(updatedBooks);
            })
            .catch(error => {
                handleLogError(error)
            })
    }

    let bookList
    if (books.length === 0) {
        bookList = (
            <Table.Row key='no-order'>
                <Table.Cell collapsing textAlign='center' colSpan='5'>No book</Table.Cell>
            </Table.Row>
        )
    } else {
        bookList = books.map(book => {
            return (
                <Table.Row key={book.id}>
                    <Table.Cell>{book.id}</Table.Cell>
                    <Table.Cell>{book.title}</Table.Cell>
                    <Table.Cell>{book.author}</Table.Cell>
                    <Table.Cell>{book.description}</Table.Cell>
                    <Table.Cell>{book.releaseDate}</Table.Cell>
                    <Table.Cell>{book.pageNum}</Table.Cell>
                    <Table.Cell>{book.category}</Table.Cell>
                    <Table.Cell>{book.imgUrl !== '' && <Image src={book.imgUrl} size="mini" rounded /> }</Table.Cell>
                    <Table.Cell collapsing>
                        <Button
                            circular
                            color='green'
                            size='small'
                            icon='edit'
                            as={Link}
                            to={'/books/' + book.id}
                        />
                        <Button
                            circular
                            color='red'
                            size='small'
                            icon='trash'
                            onClick={() => handleDeleteBook(book.id)}
                        />
                    </Table.Cell>
                </Table.Row>
            )
        })
    }

    return (
        <Container>
            <h2>Books</h2>
            <Button primary icon labelPosition='right' as={Link} to={'/books/new'}>
                Create<Icon name='add' />
            </Button>
            <Grid stackable divided>
                <Grid.Row columns='2'>
                    <Grid.Column width='5'>
                    </Grid.Column>
                    <Grid.Column>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Table compact striped selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1}>ID</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Title</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Author</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Description</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Release Date</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Page Number</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Category</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Image</Table.HeaderCell>
                        <Table.HeaderCell width={1} />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {bookList}
                </Table.Body>
            </Table>
        </Container>
    )
};

export default BookPage;