import React, { useEffect, useState } from 'react';
import { storeApi } from '../misc/StoreApi';
import { useNavigate, useParams } from 'react-router-dom';
import { handleLogError } from '../utils/Helpers'
import { Button, Comment, Container, Form, Grid, Header, Icon, Image, List, Rating, Segment, Tab } from 'semantic-ui-react';
import { formatCurrency } from './../utils/formatCurrency';
import { useShoppingCart } from "../context/ShoppingCartContext"
import moment from 'moment';
import { useAuth } from '../context/AuthContext';
import ItemReview from './ItemReview';

const ItemDetail = () => {
    const { getUser, userIsAuthenticated } = useAuth()
    const user = getUser()

    const initialFormState = {
        id: '',
        title: '',
        author: '',
        description: '',
        releaseDate: '',
        pageNum: 0,
        category: '',
        price: 0,
        imgUrl: '',
        reviews: null
    };

    const [book, setBook] = useState(initialFormState);
    const { id } = useParams();
    const [amount, setAmount] = useState(1);
    const { setItemQuantity } = useShoppingCart();
    const [reviewsVal, setReviewsVal] = useState(null);
    const [commentString1, setCommentString1] = useState('');
    const [ratingValue, setRatingValue] = useState(0);
    const [currRating, setCurrRating] = useState(0);
    const [errorReview, setErrorReview] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        storeApi.getBook(id)
            .then(response => {
                setBook(response.data)
                setReviewsVal(response.data.reviews)
                if (response.data.reviews.length !== 0) {
                    const totalRating = response.data.reviews.reduce((acc, review) => acc + review.rating, 0);
                    setCurrRating(totalRating / response.data.reviews.length)
                }
            })
            .catch(error => {
                handleLogError(error)
            })
    }, [id])

    const handleCreateReview = (event) => {
        if (!userIsAuthenticated()) {
            navigate('/login')
            return
        }
        event.preventDefault()
        let commentString2 = commentString1.trim()
        if (!commentString2) {
            setErrorReview(true)
            return
        }
        if (ratingValue === 0) {
            setErrorReview(true)
            return
        }

        const reviewReq = { commentString: commentString2, rating: ratingValue }

        storeApi.createReview(user, reviewReq, book.id)
            .then(response => {
                setCommentString1('')
                setReviewsVal([...reviewsVal, response.data])
            })
            .catch(error => {
                handleLogError(error)
            })
    }

    let reviewList
    if (reviewsVal === null) {
        reviewList = (<></>)
    } else {
        reviewList = reviewsVal.map(review => {
            return <ItemReview {...review}/>
        })
    }

    const panes = [
        { menuItem: 'Mô tả', render: () => <Tab.Pane>{book.description}</Tab.Pane> },
        {
            menuItem: 'Đánh giá',
            render: () =>
                <Tab.Pane>
                    <Comment.Group>
                        <Header as='h5' dividing>{reviewsVal.length} bình luận</Header>
                        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            {reviewList}
                        </div>
                        <Form reply onSubmit={handleCreateReview}>
                            <Form.TextArea
                                name='reviewString'
                                style={{ 'height': '100%', 'width': '75%' }}
                                placeholder='Viết bình luận...'
                                value={commentString1}
                                onChange={(e) => { setCommentString1(e.target.value) }}
                                error={errorReview ? { content: 'Xin hãy đánh giá', pointing: 'left' } : null}
                            />
                            <div>
                                Đánh giá của bạn:
                                <Rating icon='star' maxRating={5} onRate={(e, { rating }) => { setRatingValue(rating) }} />
                            </div>
                            <Button content='Thêm đánh giá' labelPosition='left' icon='edit' primary />
                        </Form>
                    </Comment.Group>
                </Tab.Pane>
        },
    ]

    return (
        <Container>
            <Segment>
                <Grid stackable>
                    <Grid.Column width={6}>
                        <Image src={book.imgUrl} />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Container>
                            <Grid stackable divided='vertically'>
                                <Grid.Row divided>
                                    <Header as='h2'>{book.title.toUpperCase()}</Header>
                                    <Grid.Column width={5}>
                                        <span><Rating icon='star' rating={currRating} maxRating={5} disabled /></span>
                                        <span>{reviewsVal === null ? 0 : reviewsVal.length} đánh giá</span>
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                        Đã bán: 0
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Header color='red'>{formatCurrency(book.price)}</Header>
                                </Grid.Row>
                                <Grid.Row columns={2}>
                                    <Grid.Column width={7}>
                                        <List bulleted>
                                            <List.Item>{'Tác giả: ' + book.author}</List.Item>
                                            <List.Item>{'Thể loại: ' + book.category}</List.Item>
                                            <List.Item>{'Số trang: ' + book.pageNum}</List.Item>
                                            <List.Item>{'Ngày phát hành: ' + moment(book.releaseDate).format('DD/MM/YYYY')}</List.Item>
                                        </List>
                                    </Grid.Column>
                                    <Grid.Column width={9}>
                                        <Grid>
                                            <Grid.Column width={2}>
                                                <span>Số lượng</span>
                                            </Grid.Column>
                                            <Grid.Column width={9}>
                                                {/* <div>
                                                    <Button icon onClick={() => { if (amount > 1) setAmount(amount - 1) }}><Icon name='minus' /></Button>
                                                    <Input type='number' value={amount} style={{ 'width': '60px', 'textAlign': 'center' }} onChange={(e, {value}) => setAmount(value)} />{' '}
                                                    <Button icon onClick={() => setAmount(amount + 1)}><Icon name='plus' /></Button>
                                                </div> */}
                                                <Button.Group>
                                                    <Button icon onClick={() => { if (amount > 1) setAmount(amount - 1) }}><Icon name='minus' /></Button>
                                                    <Button.Or text={amount} />
                                                    <Button icon onClick={() => setAmount(amount + 1)}><Icon name='plus' /></Button>
                                                </Button.Group>
                                            </Grid.Column>
                                        </Grid>
                                        <Button icon labelPosition='right' color='blue' onClick={() => { setItemQuantity(book, amount) }} >
                                            Thêm vào giỏ<Icon name='cart plus' />
                                        </Button>
                                        <Button icon labelPosition='right' color='red'>
                                            Mua ngay<Icon name='box' />
                                        </Button>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Tab panes={panes} />
                                </Grid.Row>
                            </Grid>
                        </Container>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Container>
    )
};

export default ItemDetail;