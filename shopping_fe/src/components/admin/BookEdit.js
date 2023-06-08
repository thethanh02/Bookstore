import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { storeApi } from '../misc/StoreApi';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { handleLogError } from '../utils/Helpers'
import { Button, Confirm, Container, Form, Grid, Header, Image, Label, Message } from 'semantic-ui-react';

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

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [titleError, setTitleError] = useState('');
    const [authorError, setAuthorError] = useState('');
    const [releaseDateError, setReleaseDateError] = useState('');

    const [confirmOpen, setConfirmOpen] = useState(false)

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
        const filePath = document.getElementById('upload').value
        const allowedExtensions = /(\.jpg|\.png)$/i
        if (!allowedExtensions.exec(filePath)) {
            alert('Vui lòng chọn file có định dạng ảnh(.jpg, .png)')
            return
        }
        
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

    const handleOpenConfirm = () => {
        setConfirmOpen(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setConfirmOpen(false)

        setIsError(false);
        setErrorMessage('');
        setTitleError('');
        setAuthorError('');
        setReleaseDateError('');
        let checkError = false
        if (book.id) {
            await storeApi.updateBook(user, book.id, book)
                .catch((error) => {
                    checkError = true
                    handleLogError(error);
                    const errorData = error.response;
                    if (errorData.status === 400) {
                        if (errorData.data.fieldErrors) {
                            errorData.data.fieldErrors.forEach(fieldError => {
                                if (fieldError.field === 'title') {
                                    setTitleError(fieldError.message);
                                } else if (fieldError.field === 'author') {
                                    setAuthorError(fieldError.message);
                                } else if (fieldError.field === 'releaseDate') {
                                    setReleaseDateError(fieldError.message);
                                }
                            })
                        }
                    } else if (errorData.status === 409) {
                        setErrorMessage(errorData.data);
                        setIsError(true);
                    } else {
                        setErrorMessage('Lỗi');
                        setIsError(true);
                    }
                })
        } else {
            await storeApi.createBook(user, book)
                .catch((error) => {
                    checkError = true
                    handleLogError(error);
                    const errorData = error.response;
                    if (errorData.status === 400) {
                        if (errorData.data.fieldErrors) {
                            errorData.data.fieldErrors.forEach(fieldError => {
                                if (fieldError.field === 'title') {
                                    setTitleError(fieldError.message);
                                } else if (fieldError.field === 'author') {
                                    setAuthorError(fieldError.message);
                                } else if (fieldError.field === 'releaseDate') {
                                    setReleaseDateError(fieldError.message);
                                }
                            })
                        }
                    } else if (errorData.status === 409) {
                        setErrorMessage(errorData.data);
                        setIsError(true);
                    } else {
                        setErrorMessage('Lỗi');
                        setIsError(true);
                    }
                })
        }
        if (!checkError)
            navigate('/books')
    }

    return (
        <div>
            <Container>
                <Header as='h2' textAlign='center'>Sách</Header>
                <Form onSubmit={() => handleOpenConfirm(book)}>
                    <Grid stackable>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Form.Group widths='equal'>
                                    <Form.Field>
                                        <Form.Input fluid className='required' label='Tiêu đề' name='title' placeholder='Tiêu đề' value={book.title} onChange={handleChange} readOnly={viewMode} />
                                        { titleError && <span style={{ color: 'red', fontSize: '12px' }}>{titleError}</span> }
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Input fluid className='required' label='Tác giả' name='author' placeholder='Tác giả' value={book.author} onChange={handleChange} readOnly={viewMode} />
                                        { authorError && <span style={{ color: 'red', fontSize: '12px' }}>{authorError}</span> }
                                    </Form.Field>
                                </Form.Group>
                                <Form.TextArea label='Mô tả' name='description' placeholder="Mô tả" value={book.description} onChange={handleChange} readOnly={viewMode} />
                                <Form.Group widths='equal'>
                                    <Form.Field>
                                        <Form.Input fluid className='required' label='Ngày phát hành' name='releaseDate' type='date' value={book.releaseDate} onChange={handleChange} readOnly={viewMode} />
                                        { releaseDateError && <span style={{ color: 'red', fontSize: '12px' }}>{releaseDateError}</span> }
                                    </Form.Field>
                                    <Form.Input fluid label='Số trang' name='pageNum' type='number' value={book.pageNum} onChange={handleChange} readOnly={viewMode} />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Dropdown
                                        selection
                                        label='Thể loại'
                                        name='category'
                                        options={categoryOptions}
                                        placeholder='Thể loại'
                                        value={book.category}
                                        onChange={handleChange}
                                        disabled={viewMode}
                                    />
                                    {/* <Form.Input fluid label='Category' name='category' placeholder='Category' value={book.category} onChange={handleChange} /> */}
                                    <Form.Input fluid label='Giá' labelPosition='right' name='price' type='number' value={book.price} onChange={handleChange} readOnly={viewMode} >
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
                                            content: 'Select image'
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
                            <Grid.Column width={8}>
                                {isError && <Message negative>{errorMessage}</Message>}
                            </Grid.Column>
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
            <Confirm
                open={confirmOpen}
                header='Xác nhận'
                content='Bạn có chắc muốn thêm không?'
                cancelButton='No'
                confirmButton='Yes'
                onCancel={() => { setConfirmOpen(false) }}
                onConfirm={handleSubmit}
                size='mini'
                style={{ 'height': '190px', 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)' }}
            />
        </div>
    )
};

export default BookEdit;