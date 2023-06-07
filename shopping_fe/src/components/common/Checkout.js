import React, { useState } from 'react';
import { Container, Stack } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Breadcrumb, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { useAuth } from '../context/AuthContext';
import { CartItem } from './CartItem';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { storeApi } from '../misc/StoreApi';

const Checkout = () => {
    const { getUser } = useAuth()
    const user = getUser()
    const isUser = (user.data.rol[0] === 'USER')
    const { cartItems, removeAllFromCart } = useShoppingCart()
    const categoryOptions = [
        { key: 'Thanh toán tiền mặt', value: 'Thanh toán tiền mặt', text: 'Thanh toán tiền mặt' },
    ]

    const initialFormState = {
        name: '',
        phoneNum: '',
        address: '',
        paymentMethod: '',
        cartItems: cartItems,
    };
    const [order, setOrder] = useState(initialFormState);
    const navigate = useNavigate();

    const handleChange = (event, { name, value }) => {
        setOrder({ ...order, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await storeApi.addOrder(user, order)
        removeAllFromCart()
        await storeApi.deleteListCartItemsByUser(user)
        navigate('/orders/me');
    }
    
    if (!isUser || cartItems === null || cartItems.length < 1) {
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
                        <Form onSubmit={handleSubmit}>
                            <Grid stackable>
                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        <Form.Input fluid className='required' label='Họ tên' name='name' placeholder='Họ tên' value={order.name} onChange={handleChange} />
                                        <Form.Input fluid className='required' label='Điện thoại' name='phoneNum' placeholder='Điện thoại' value={order.phoneNum} onChange={handleChange} />
                                        <Form.Input fluid className='required' label='Địa chỉ' name='address' placeholder='Địa chỉ' value={order.address} onChange={handleChange} />
                                        <Form.Select
                                            fluid
                                            name='paymentMethod'
                                            label='Phương thức thanh toán'
                                            options={categoryOptions}
                                            placeholder='Phương thức'
                                            value={order.paymentMethod} 
                                            onChange={handleChange}
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
                                                return total + (cartItem?.book.price || 0) * cartItem.quantity
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