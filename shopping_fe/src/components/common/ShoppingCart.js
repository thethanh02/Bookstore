import React from 'react';
import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "../common/CartItem"
import { formatCurrency } from '../utils/formatCurrency';

export function ShoppingCart({ isOpen }) {
    const { closeCart, cartItems } = useShoppingCart()

    return <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Giỏ hàng</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
                {cartItems.map(item => (
                    <CartItem key={item.book.id} book={item.book} quantity={item.quantity} isDeleteBtnActive={true} />
                ))}
            </Stack>
        </Offcanvas.Body>
        <Offcanvas.Header>
            {cartItems.length > 0 && <Button onClick={() => { window.location.href = '/checkouts'; }}>Thanh toán</Button>}
            <Offcanvas.Title className="ms-auto fw-bold fs-5">
                Tạm tính{": "}
                <span className='text-danger'>
                    {formatCurrency(cartItems.reduce((total, cartItem) => {
                        return total + (cartItem?.book.price || 0) * cartItem.quantity
                    }, 0)
                    )}
                </span>
            </Offcanvas.Title>
        </Offcanvas.Header>
    </Offcanvas>
}