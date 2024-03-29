import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom'
import { Grid, Button, Table, Container, Icon, Image, Checkbox, Confirm } from 'semantic-ui-react'
import { storeApi } from '../misc/StoreApi';
import { handleLogError } from '../utils/Helpers'
import { formatCurrency } from '../utils/formatCurrency'
import moment from 'moment';

const BookPage = () => {
    const { getUser } = useAuth()
    const user = getUser()
    const isAdmin = (user?.data.rol[0] === 'ADMIN')
    const [books, setBooks] = useState([])
    const [viewTable, setViewTable] = useState(false)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [deleteItemId, setDeleteItemId] = useState(null);

    useEffect(() => {
        storeApi.getBooks()
            .then(response => {
                setBooks(response.data)
            })
            .catch(error => {
                handleLogError(error)
            })
    }, [])

    const handleOpenConfirm = (itemId) => {
        setConfirmOpen(true);
        setDeleteItemId(itemId);
    };

    const handleDeleteBook = () => {
        storeApi.deleteBook(user, deleteItemId)
            .then(() => {
                let updatedBooks = [...books].filter(i => i.id !== deleteItemId);
                setBooks(updatedBooks);
            })
            .catch(error => {
                handleLogError(error)
            })
        setConfirmOpen(false)
        setDeleteItemId(null)
    }

    const onChangeViewTable = (e) => {
        const { checked } = e.target
        setViewTable(checked)
    }

    if (!viewTable) {
        let bookList
        if (books.length === 0) {
            bookList = (
                <Table.Row key='no-book'>
                    <Table.Cell collapsing textAlign='center' colSpan='9'>No book</Table.Cell>
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
                        <Table.Cell>{moment(book.releaseDate).format('DD/MM/YYYY')}</Table.Cell>
                        <Table.Cell>{book.pageNum}</Table.Cell>
                        <Table.Cell>{book.category}</Table.Cell>
                        <Table.Cell>{book.sold}</Table.Cell>
                        <Table.Cell>{book.imgUrl !== '' && <Image src={book.imgUrl} size="tiny" rounded />}</Table.Cell>
                        {isAdmin && <Table.Cell collapsing>
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
                                onClick={() => handleOpenConfirm(book.id)}
                            />
                        </Table.Cell>}
                    </Table.Row>
                )
            })
        }

        return (
            <Container>
                <h2>Books</h2>
                {isAdmin && <Button primary icon labelPosition='right' as={Link} to={'/books/new'}>
                    Tạo mới<Icon name='add' />
                </Button>}
                <Checkbox label='Other view' name='viewTable' id='viewTable' check={viewTable} onChange={onChangeViewTable} autoComplete='viewTable' />
                <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    <Table compact striped selectable>
                        <Table.Header style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                            <Table.Row>
                                <Table.HeaderCell width={1}>ID</Table.HeaderCell>
                                <Table.HeaderCell width={2}>Tiêu đề</Table.HeaderCell>
                                <Table.HeaderCell width={2}>Tác giả</Table.HeaderCell>
                                <Table.HeaderCell width={4}>Mô tả</Table.HeaderCell>
                                <Table.HeaderCell width={2}>Ngày phát hành</Table.HeaderCell>
                                <Table.HeaderCell width={1}>Số trang</Table.HeaderCell>
                                <Table.HeaderCell width={1}>Thể loại</Table.HeaderCell>
                                <Table.HeaderCell width={1}>Đã bán</Table.HeaderCell>
                                <Table.HeaderCell width={1}>Bìa</Table.HeaderCell>
                                {isAdmin && <Table.HeaderCell width={1} />}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {bookList}
                        </Table.Body>
                    </Table>
                </div>
                <Confirm
                    open={confirmOpen}
                    header='Xác nhận'
                    content='Bạn có chắc muốn xóa không?'
                    cancelButton='No'
                    confirmButton='Yes'
                    onCancel={() => { setConfirmOpen(false); setDeleteItemId(null) }}
                    onConfirm={handleDeleteBook}
                    size='mini'
                    style={{ 'height': '190px', 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)' }}
                />
            </Container>
        )
    } else {
        let bookList
        if (books.length === 0) {
            bookList = (
                <Table.Row key='no-book'>
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
                            {isAdmin && <Table.Cell rowSpan='3' collapsing>
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
                                    onClick={() => handleOpenConfirm(book.id)}
                                />
                            </Table.Cell>}
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
                {isAdmin && <Button primary icon labelPosition='right' as={Link} to={'/books/new'}>
                    Create<Icon name='add' />
                </Button>}
                <Checkbox label='Other view' name='viewTable' id='viewTable' check={viewTable} onChange={onChangeViewTable} autoComplete='viewTable' />

                <Grid stackable divided>
                    <Grid.Row columns='2'>
                        <Grid.Column width='5'>
                        </Grid.Column>
                        <Grid.Column>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Table compact>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell rowSpan='3' width={1}>ID</Table.HeaderCell>
                            <Table.HeaderCell rowSpan='3' width={1}>Book cover</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Title</Table.HeaderCell>
                            <Table.HeaderCell rowSpan='3' width={4}>Description</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Release Date</Table.HeaderCell>
                            {isAdmin && <Table.HeaderCell rowSpan='3' width={1} />}
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
                <Confirm
                    open={confirmOpen}
                    header='Xác nhận'
                    content='Bạn có chắc muốn xóa không?'
                    cancelButton='No'
                    confirmButton='Yes'
                    onCancel={() => { setConfirmOpen(false); setDeleteItemId(null) }}
                    onConfirm={handleDeleteBook}
                    size='mini'
                    style={{ 'height': '190px', 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)' }}
                />
            </Container>
        )
    }
};

export default BookPage;