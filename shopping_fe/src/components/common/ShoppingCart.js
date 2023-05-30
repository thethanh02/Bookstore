import React, { useState, useEffect } from 'react';
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "../common/CartItem"
import { formatCurrency } from '../utils/formatCurrency';
import { handleLogError } from '../utils/Helpers'
import { storeApi } from '../misc/StoreApi';

export function ShoppingCart({ isOpen }) {
    const [storeItems, setStoreItems] = useState([])
    const { closeCart, cartItems } = useShoppingCart()

    useEffect(() => {
        storeApi.getBooks()
            .then(response => {
                setStoreItems(response.data)
            })
            .catch(error => {
                handleLogError(error)
            })
    }, [])

    return <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Giỏ hàng</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
                {cartItems.map(item => (
                    <CartItem key={item.id} {...item} />
                ))}
            </Stack>
        </Offcanvas.Body>
        <Offcanvas.Header>
            <Offcanvas.Title className="ms-auto fw-bold fs-5">
                Tạm tính{": "}
                <span className='text-danger'>
                    {formatCurrency(cartItems.reduce((total, cartItem) => {
                        const item = storeItems.find(i => i.id === cartItem.id)
                        return total + (item?.price || 0) * cartItem.quantity
                    }, 0)
                    )}
                </span>
            </Offcanvas.Title>
        </Offcanvas.Header>
    </Offcanvas>
}