import React, { useState, useEffect } from 'react';
import { Container, Stack } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import { Breadcrumb, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { useAuth } from '../context/AuthContext';
import { CartItem } from './CartItem';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { handleLogError } from '../utils/Helpers';
import { storeApi } from '../misc/StoreApi';

const Checkout = () => {
    const { getUser } = useAuth()
    const user = getUser()
    const isUser = (user.data.rol[0] === 'USER')
    const [storeItems, setStoreItems] = useState([])
    const { cartItems } = useShoppingCart()
    const categoryOptions = [
        { key: 'Giao tận tay', value: 'Giao tận tay', text: 'Giao tận tay' },
    ]
    
    useEffect(() => {
        storeApi.getBooks()
        .then(response => {
            setStoreItems(response.data)
        })
        .catch(error => {
            handleLogError(error)
        })
    }, [])
    
    if (!isUser) {
        return <Navigate to='/' />
    }
    return (
        <Container>
            <Segment style={{ marginTop: '30px' }}>
                <Breadcrumb>
                    <Breadcrumb.Section link as={Link} to='/'>Trang chủ</Breadcrumb.Section>
                    <Breadcrumb.Divider />
                    <Breadcrumb.Section active>Thanh toán</Breadcrumb.Section>
                </Breadcrumb>
                <div>
                    <Container>
                        <Header as='h2' textAlign='center'>Nhà sách uy tín hàng đầu Việt Nam</Header>
                        <Form onSubmit={() => { }}>
                            <Grid stackable>
                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        <Form.Input fluid className='required' label='Họ tên' name='name' placeholder='Họ tên' />
                                        <Form.Group widths='equal'>
                                            <Form.Input fluid className='required' label='Email' name='email' placeholder='Email' />
                                            <Form.Input fluid className='required' label='Điện thoại' name='sdt' placeholder='Điện thoại' />
                                        </Form.Group>
                                        <Form.Input fluid className='required' label='Địa chỉ' name='address' placeholder='Địa chỉ' />
                                        <Form.Select
                                            fluid
                                            label='Phương thức thanh toán'
                                            options={categoryOptions}
                                            placeholder='Phương thức'
                                            required
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={8} style={{ maxHeight: '300px', overflowY: 'auto' }} >
                                        <Stack gap={3}>
                                            {cartItems.map(item => (
                                                <CartItem key={item.id} {...item} isDeleteBtnActive={false} />
                                            ))}
                                        </Stack>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        <Form.Button primary type='submit' floated='right' onClick={() => { }}>Xác nhận</Form.Button>
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        <Header as='h4'>
                                            Tạm tính{": "}
                                            {formatCurrency(cartItems.reduce((total, cartItem) => {
                                                const item = storeItems.find(i => i.id === cartItem.id)
                                                return total + (item?.price || 0) * cartItem.quantity
                                            }, 0)
                                            )}
                                        </Header>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Form>
                    </Container>
                </div>
            </Segment>
        </Container>
    );
};

export default Checkout;