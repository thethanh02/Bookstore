import React, { useEffect, useState } from 'react';
import { storeApi } from '../misc/StoreApi';
import { useParams } from 'react-router-dom';
import { handleLogError } from '../utils/Helpers'
import { Button, Comment, Container, Form, Grid, Header, Icon, Image, List, Rating, Segment, Tab } from 'semantic-ui-react';
import { formatCurrency } from './../utils/formatCurrency';
import { useShoppingCart } from "../context/ShoppingCartContext"

const ItemDetail = () => {
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
    const { id } = useParams();
    const [amount, setAmount] = useState(1);

    useEffect(() => {
        storeApi.getBook(id)
            .then(response => {
                setBook(response.data)
            })
            .catch(error => {
                handleLogError(error)
            })

    }, [])

    const { setItemQuantity } = useShoppingCart()

    const panes = [
        { menuItem: 'Mô tả', render: () => <Tab.Pane>{book.description}</Tab.Pane> },
        {
            menuItem: 'Đánh giá',
            render: () =>
                <Tab.Pane>
                    <Comment.Group>
                        <Comment>
                            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                            <Comment.Content>
                                <Comment.Author as='a'>Matt</Comment.Author>
                                <Comment.Metadata>
                                    <div>Today at 5:42PM</div>
                                </Comment.Metadata>
                                <Comment.Text>Tuyệt vời!</Comment.Text>
                            </Comment.Content>
                        </Comment>

                        <Comment>
                            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                            <Comment.Content>
                                <Comment.Author as='a'>Joe Henderson</Comment.Author>
                                <Comment.Metadata>
                                    <div>5 days ago</div>
                                </Comment.Metadata>
                                <Comment.Text>Tuyệt vờii!</Comment.Text>
                            </Comment.Content>
                        </Comment>

                        <Form reply>
                            <Form.TextArea />
                            <Button content='Thêm bình luận' labelPosition='left' icon='edit' primary />
                        </Form>
                    </Comment.Group>
                </Tab.Pane>
        },
    ]

    return (
        <Container>
            <Segment>
                <Grid>
                    <Grid.Column width={6}>
                        <Image src={book.imgUrl} />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Container>
                            <Grid divided='vertically'>
                                <Grid.Row divided>
                                    <Header as='h2'>{book.title.toUpperCase()}</Header>
                                    <Grid.Column width={5}>
                                        <span><Rating icon='star' defaultRating={3} maxRating={5} disabled /></span>
                                        <span>0 đánh giá</span>
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
                                            <List.Item>{'Ngày phát hành: ' + book.releaseDate}</List.Item>
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
                                        <Button icon labelPosition='right' color='blue' onClick={() => {setItemQuantity(book.id, amount)}} >
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