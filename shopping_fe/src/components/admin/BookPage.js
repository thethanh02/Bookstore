import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Grid, Button, Table, Container, Icon, Image, Checkbox } from 'semantic-ui-react'
import { storeApi } from '../misc/StoreApi';
import { handleLogError } from '../misc/Helpers'
import { formatCurrency } from "../utils/formatCurrency"

const BookPage = () => {
    const { getUser } = useAuth()
    const user = getUser()
    const [isAdmin, setIsAdmin] = useState(true)
    const [books, setBooks] = useState([])
    const [viewTable, setViewTable] = useState(false)

    useEffect(() => {
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
        storeApi.deleteBook(user, id)
            .then(() => {
                let updatedBooks = [...books].filter(i => i.id !== id);
                setBooks(updatedBooks);
            })
            .catch(error => {
                handleLogError(error)
            })
    }

    const onChangeViewTable = (e) => {
        const { checked } = e.target
        setViewTable(checked)
    }
    if (!viewTable) {
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
                        <Table.Cell>{book.description.length > 100 ? book.description.substr(0, 100) + '...' : book.description}</Table.Cell>
                        <Table.Cell>{book.releaseDate}</Table.Cell>
                        <Table.Cell>{book.pageNum}</Table.Cell>
                        <Table.Cell>{book.category}</Table.Cell>
                        <Table.Cell>{book.imgUrl !== '' && <Image src={book.imgUrl} size="mini" rounded />}</Table.Cell>
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
                <Checkbox label='Other view' name='viewTable' id='viewTable' check={viewTable} onChange={onChangeViewTable} autoComplete='viewTable' />

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
    } else {
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
                    <Table.Body>
                        <Table.Row key={book.id}>
                            <Table.Cell rowSpan='3'>{book.id}</Table.Cell>
                            <Table.Cell rowSpan='3'>{book.imgUrl !== '' && <Image src={book.imgUrl} size="small" rounded />}</Table.Cell>
                            <Table.Cell>{book.title}</Table.Cell>
                            <Table.Cell rowSpan='3'>{book.description}</Table.Cell>
                            <Table.Cell>{book.releaseDate}</Table.Cell>
                            <Table.Cell rowSpan='3' collapsing>
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
                        <Table.Row key={book.id}>
                            <Table.Cell>{book.author}</Table.Cell>
                            <Table.Cell>{book.pageNum}</Table.Cell>
                        </Table.Row>
                        <Table.Row key={book.id}>
                            <Table.Cell>{book.category}</Table.Cell>
                            <Table.Cell>{formatCurrency(book.price)}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                )
            })
        }

        return (
            <Container>
                <h2>Books</h2>
                <Button primary icon labelPosition='right' as={Link} to={'/books/new'}>
                    Create<Icon name='add' />
                </Button>
                <Checkbox label='Other view' name='viewTable' id='viewTable' check={viewTable} onChange={onChangeViewTable} autoComplete='viewTable' />

                <Grid stackable divided>
                    <Grid.Row columns='2'>
                        <Grid.Column width='5'>
                        </Grid.Column>
                        <Grid.Column>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Table compact color='teal'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell rowSpan='3' width={1}>ID</Table.HeaderCell>
                            <Table.HeaderCell rowSpan='3' width={1}>Book cover</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Title</Table.HeaderCell>
                            <Table.HeaderCell rowSpan='3' width={4}>Description</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Release Date</Table.HeaderCell>
                            <Table.HeaderCell rowSpan='3' width={1} />
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>Author</Table.HeaderCell>
                            <Table.HeaderCell>Page Number</Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>Category</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {bookList}
                </Table>
            </Container>
        )
    }
};

export default BookPage;