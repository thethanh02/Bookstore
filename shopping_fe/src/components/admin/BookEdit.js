import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { storeApi } from '../misc/StoreApi';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { handleLogError } from '../utils/Helpers'
import { Button, Container, Form, Grid, Header, Image, Label } from 'semantic-ui-react';

const BookEdit = () => {
    const { getUser } = useAuth()
    const user = getUser()
    const [isAdmin, setIsAdmin] = useState(true)

    const initialFormState = {
        id: '',
        title: '',
        author: '',
        description: '',
        releaseDate: '',
        pageNum: 0,
        category: '',
        price: 0,
        imgUrl: ''
    };

    const [book, setBook] = useState(initialFormState);
    const [viewMode, setViewMode] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();
    const categoryOptions = [
        { key: 'Lịch sử', value: 'Lịch sử', text: 'Lịch sử' },
        { key: 'Khoa học', value: 'Khoa học', text: 'Khoa học' },
        { key: 'Văn học Việt Nam', value: 'Văn học Việt Nam', text: 'Văn học Việt Nam' },
    ]
    useEffect(() => {
        setIsAdmin(user.data.rol[0] === 'ADMIN')
        if (id !== 'new') {
            storeApi.getBook(id)
                .then(response => {
                    setBook(response.data)
                })
                .catch(error => {
                    handleLogError(error)
                })
        } else {
            setViewMode(false)
        }
    }, [])

    if (!isAdmin) {
        return <Navigate to='/' />
    }

    const handleChange = (event, { name, value }) => {
        setBook({ ...book, [name]: value })
    }

    const onChangeImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = handleReaderLoaded;
            reader.readAsBinaryString(file);
        }
    }

    const handleReaderLoaded = (e) => {
        const binaryString = e.target.result;
        setBook({ ...book, imgUrl: btoa(binaryString) })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (book.id) {
            await storeApi.updateBook(user, book.id, book)
        } else {
            await storeApi.createBook(user, book)
        }
        navigate('/books');
    }

    return (
        <div>
            <Container>
                <Header as='h2' textAlign='center'>Book</Header>
                <Form onSubmit={handleSubmit}>
                    <Grid stackable>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid className='required' label='Title' name='title' placeholder='Title' value={book.title} onChange={handleChange} readOnly={viewMode} />
                                    <Form.Input fluid className='required' label='Author' name='author' placeholder='Author' value={book.author} onChange={handleChange} readOnly={viewMode} />
                                </Form.Group>
                                <Form.TextArea label='Description' name='description' placeholder="Description" value={book.description} onChange={handleChange} readOnly={viewMode} />
                                <Form.Group widths='equal'>
                                    <Form.Input fluid className='required' label='Release Date' name='releaseDate' type='date' value={book.releaseDate} onChange={handleChange} readOnly={viewMode} />
                                    <Form.Input fluid label='Page Number' name='pageNum' type='number' value={book.pageNum} onChange={handleChange} readOnly={viewMode} />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Dropdown
                                        selection
                                        label='Category'
                                        name='category'
                                        options={categoryOptions}
                                        placeholder='Thể loại'
                                        value={book.category}
                                        onChange={handleChange}
                                        disabled={viewMode}
                                    />
                                    {/* <Form.Input fluid label='Category' name='category' placeholder='Category' value={book.category} onChange={handleChange} /> */}
                                    <Form.Input fluid label='Price' labelPosition='right' name='price' type='number' value={book.price} onChange={handleChange} readOnly={viewMode} >
                                        <input />
                                        <Label>VNĐ</Label>
                                    </Form.Input>
                                </Form.Group>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Label as="label" basic htmlFor="upload" >
                                    <Button
                                        icon="upload"
                                        label={{
                                            basic: true,
                                            content: 'Select file(s)'
                                        }}
                                        labelPosition="right"
                                        type='button'
                                    />
                                    <input
                                        hidden
                                        type="file"
                                        id="upload"
                                        accept="image/*"
                                        onChange={e => onChangeImage(e)}
                                        disabled={viewMode}
                                    />
                                </Label>
                                {book.imgUrl !== '' &&
                                    (book.imgUrl.startsWith('/imgs/') ?
                                        <Image src={book.imgUrl} size="small" rounded /> :
                                        <Image src={`data:image/jpeg;base64,${book.imgUrl}`} size="small" rounded />
                                    )
                                }
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8} />
                            <Grid.Column width={6}>
                                {viewMode ?
                                    <Form.Button primary type='button' floated='right' onClick={(e) => { e.preventDefault(); setViewMode(false); }}>Edit</Form.Button> :
                                    <Form.Button primary type='submit' floated='right'>{book.id ? 'Save' : 'Add'}</Form.Button>
                                }
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Container>
        </div>
    )
};

export default BookEdit;