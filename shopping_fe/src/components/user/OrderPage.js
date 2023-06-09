import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom'
import { storeApi } from '../misc/StoreApi';
import { useAuth } from '../context/AuthContext';
import { Button, Container, List, Table } from 'semantic-ui-react';
import { handleLogError } from '../utils/Helpers'
import { formatCurrency } from '../utils/formatCurrency';
import moment from 'moment';

const OrderPage = () => {
    const { getUser } = useAuth()
    const user = getUser()
    const isUser = (user.data.rol[0] === 'USER')
    const [orders, setOrders] = useState(null)

    useEffect(() => {
        storeApi.getMyOrders(user)
            .then(response => {
                setOrders(response.data)
            })
            .catch(error => {
                handleLogError(error)
            })
    }, [])

    if (!isUser) {
        return <Navigate to='/' />
    }

    const handleCancelOrder = async (event, order) => {
        event.preventDefault();

        if (order.status === 'Đang xác nhận') {
            const orderStatusReq = {id: order.id, status: 'Đã hủy đơn'}
            await storeApi.updateOrderStatus(user, orderStatusReq)

            setOrders(orders => {
                return orders.map(o => o.id !== order.id ? o : {
                    ...order,
                    canceledAt: moment(new Date()).format('HH:mm DD/MM/YYYY'),
                    status: 'Đã hủy đơn'
                } )
            })
        }
    }

    let orderList
    if (orders === null || orders.length === 0) {
        orderList = (
            <Table.Row key='no-order'>
                <Table.Cell collapsing textAlign='center' colSpan='5'>No order</Table.Cell>
            </Table.Row>
        )
    } else {
        orderList = orders.map(order => {
            return (
                <Table.Row key={order.id}>
                    <Table.Cell>{order.id}</Table.Cell>
                    <Table.Cell>
                        <List bulleted>
                            {order.orderItems.map(orderItem => {
                                return(
                                    <List.Item key={orderItem.id}>{orderItem.quantity}&times; {orderItem.book.title}</List.Item>
                                    )
                                })}
                        </List>
                    </Table.Cell>
                    <Table.Cell>
                        {formatCurrency(order.orderItems.reduce((total, orderItem) => {
                            return total + (orderItem?.book.price || 0) * orderItem.quantity
                        }, 0)
                        )}
                    </Table.Cell>
                    <Table.Cell>{order.status}</Table.Cell>
                    <Table.Cell>
                        <List bulleted>
                            {order.createdAt !== null && <List.Item>Đặt lúc: {moment(order.createdAt).format('HH:mm DD/MM/YYYY')}</List.Item>}
                            {order.confirmedAt !== null && <List.Item>Xác nhận lúc: {moment(order.confirmedAt).format('HH:mm DD/MM/YYYY')}</List.Item>}
                            {order.deliveredAt !== null && <List.Item>Đã giao lúc: {moment(order.deliveredAt).format('HH:mm DD/MM/YYYY')}</List.Item>}
                            {order.canceledAt !== null && <List.Item>Hủy lúc: {moment(order.canceledAt).format('HH:mm DD/MM/YYYY')}</List.Item>}
                        </List>
                    </Table.Cell>
                    <Table.Cell>
                            <Button
                                fluid
                                color='green'
                                size='small'
                                as={Link}
                                to={'/orders/' + order.id}
                            >
                                Chi tiết
                            </Button>
                            <Button
                                fluid
                                color='red'
                                size='small'
                                disabled={order.status !== 'Đang xác nhận'}
                                onClick={(event) => handleCancelOrder(event, order)}
                            >
                                Hủy đơn
                            </Button>
                        </Table.Cell>
                </Table.Row>
            )
        })
    }

    return (
        <Container>
            <h2>Đơn hàng</h2>
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                <Table compact striped selectable>
                    <Table.Header style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                        <Table.Row>
                            <Table.HeaderCell width={1}>ID</Table.HeaderCell>
                            <Table.HeaderCell width={4}>Sách</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Tổng tiền</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Trạng thái</Table.HeaderCell>
                            <Table.HeaderCell width={3}>Khung thời gian</Table.HeaderCell>
                            <Table.HeaderCell width={1}></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {orderList}
                    </Table.Body>
                </Table>
            </div>
        </Container>
    )
};

export default OrderPage;