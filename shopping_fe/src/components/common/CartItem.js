import React, { useState, useEffect } from 'react';
import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utils/formatCurrency"
import { handleLogError } from '../utils/Helpers'
import { storeApi } from '../misc/StoreApi';

export function CartItem({ id, quantity, isDeleteBtnActive }) {
    const [storeItems, setStoreItems] = useState([])

    useEffect(() => {
        storeApi.getBooks()
            .then(response => {
                setStoreItems(response.data)
            })
            .catch(error => {
                handleLogError(error)
            })
    }, [])

    const { removeFromCart } = useShoppingCart()
    const item = storeItems.find(i => i.id === id)
    if (item == null) return null

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img src={item.imgUrl} style={{ height: "120px", objectFit: "cover", borderRadius: "4%" }} alt={item.title} ></img>
            <div className="me-auto">
                <div>
                    {item.title} {" "}
                    {quantity > 1 && 
                        <span className="text-muted" style={{ fontSize: ".68rem"}}>
                            x{quantity}
                        </span>
                    }
                </div>
                <div className="text-muted" style={{ fontSize: ".75rem"}}>
                    {formatCurrency(item.price)}
                </div>
            </div>
            <div> {formatCurrency(item.price * quantity)}</div>
            {isDeleteBtnActive && <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>&times;</Button>}
        </Stack>
    )
}