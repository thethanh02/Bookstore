import React, { useState, useEffect } from 'react';
import { Container, Stack } from 'react-bootstrap';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Breadcrumb, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { useAuth } from '../context/AuthContext';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { handleLogError } from '../utils/Helpers';
import { storeApi } from '../misc/StoreApi';
import { CartItem } from '../common/CartItem';

const OrderDetail = () => {
    const { getUser } = useAuth()
    const user = getUser()
    const isUser = (user.data.rol[0] === 'USER')
    const { cartItems } = useShoppingCart()

    const initialFormState = {
        name: '',
        phoneNum: '',
        address: '',
        paymentMethod: '',
        orderItems: cartItems,
    };
    const [order, setOrder] = useState(initialFormState);
    const { id } = useParams();

    useEffect(() => {
        storeApi.getOrder(user, id)
            .then(response => {
                setOrder(response.data)
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
                    <Breadcrumb.Section active>Đơn hàng</Breadcrumb.Section>
                    <Breadcrumb.Divider />
                    <Breadcrumb.Section active>{id}</Breadcrumb.Section>
                </Breadcrumb>
                <div>
                    <Container>
                        <Header as='h2' textAlign='center'>Nhà sách uy tín hàng đầu Việt Nam</Header>
                        <Form>
                            <Grid stackable>
                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        <Form.Input fluid className='required' label='Họ tên' name='name' value={order.name} readOnly />
                                        <Form.Input fluid className='required' label='Điện thoại' name='phoneNum' value={order.phoneNum} readOnly />
                                        <Form.Input fluid className='required' label='Địa chỉ' name='address'  value={order.address} readOnly />
                                        <Form.Input fluid className='required' label='Phương thức thanh toán' name='address' value={order.paymentMethod} readOnly />
                                    </Grid.Column>
                                    <Grid.Column width={8} style={{ maxHeight: '300px', overflowY: 'auto' }} >
                                        <Stack gap={3}>
                                            {order.orderItems.map(item => (
                                                <CartItem key={item.id} {...item} isDeleteBtnActive={false} />
                                            ))}
                                        </Stack>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={8}>
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        <Header as='h4'>
                                            Tổng tiền{": "}
                                            {formatCurrency(order.orderItems.reduce((total, orderItem) => {
                                                return total + (orderItem?.book.price || 0) * orderItem.quantity
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
}

export default OrderDetail;