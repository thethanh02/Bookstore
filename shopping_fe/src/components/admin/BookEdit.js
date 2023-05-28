import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { storeApi } from '../misc/StoreApi';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { handleLogError } from '../misc/Helpers'
import { Button, Container, Form, Grid, Header, Image, Label } from 'semantic-ui-react';

function BookEdit() {
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
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setIsAdmin(user.data.rol[0] === 'ADMIN')
        if (id !== 'new') {
            storeApi.getBook(user, id)
                .then(response => {
                    setBook(response.data)
                })
                .catch(error => {
                    handleLogError(error)
                })
        }
       
    }, [])
    
    if (!isAdmin) {
        return <Navigate to='/' />
    }

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target

        setBook({ ...book, [name]: type === 'checkbox' ? checked : value })
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
            storeApi.updateBook(user, book.id, book)
        } else {
            storeApi.createBook(user, book)
        }
        navigate('/books');
    }
    
    return (
        <div>
            <Container>
                <Header as='h2' textAlign='center'>Book</Header>
                <Form onSubmit={handleSubmit}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid className='required' label='Title' name='title' placeholder='Title' value={book.title} onChange={handleChange} />
                                    <Form.Input fluid className='required' label='Author' name='author' placeholder='Author' value={book.author} onChange={handleChange} />
                                </Form.Group>
                                <Form.TextArea label='Description' name='description' placeholder="Description" value={book.description} onChange={handleChange} />
                                <Form.Group widths='equal'>
                                    <Form.Input fluid className='required' label='Release Date' name='releaseDate' type='date' value={book.releaseDate} onChange={handleChange} />
                                    <Form.Input fluid label='Page Number' name='pageNum' type='number' value={book.pageNum} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='Category' name='category' placeholder='Category' value={book.category} onChange={handleChange} />
                                    <Form.Input fluid label='Price' labelPosition='right' name='price' type='number' value={book.price} onChange={handleChange}>
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
                                <Form.Button primary type='submit' floated='right'>{book.id ? 'Save' : 'Add'}</Form.Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Container>
        </div>
    )
};

export default BookEdit;