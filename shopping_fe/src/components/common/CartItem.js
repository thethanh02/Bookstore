import React from 'react';
import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utils/formatCurrency"
import { getCloudinaryImg } from "../utils/cloudinaryUtils"

export function CartItem({ book, quantity, isDeleteBtnActive }) {

    const { removeFromCart } = useShoppingCart()
    if (book == null) return null

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img src={getCloudinaryImg(book.imgUrl)} style={{ height: "120px", objectFit: "cover", borderRadius: "4%" }} alt={book.title} ></img>
            <div className="me-auto">
                <a href={`/products/${book.id}`}>
                    <div>
                        {book.title} {" "}
                        {quantity > 1 &&
                            <span className="text-muted" style={{ fontSize: ".7rem" }}>
                                x{quantity}
                            </span>
                        }
                    </div>
                </a>
                <div className="text-muted" style={{ fontSize: ".75rem" }}>
                    {formatCurrency(book.price)}
                </div>
            </div>
            <div> {formatCurrency(book.price * quantity)}</div>
            {isDeleteBtnActive && <Button variant="outline-danger" size="sm" onClick={() => { if(isDeleteBtnActive) removeFromCart(book)}}>&times;</Button>}
        </Stack >
    )
}