import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from './../utils/useLocalStorage';
import { ShoppingCart } from '../common/ShoppingCart';

const ShoppingCartContext = createContext({});

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useLocalStorage("shopping-cart", []);

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity, 0);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    function getItemQuantity(id) {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    function increaseItemQuantity(id) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }];
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    }

    function decreaseItemQuantity(id) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id);
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    }

    function removeFromCart(id) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id);
        });
    }

    function setItemQuantity(id, amount) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: amount }];
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        if (item.quantity > 0) {
                            return { ...item, quantity: item.quantity + amount };
                        } else {
                            return { ...item, quantity: amount };
                        }
                    } else {
                        return item;
                    }
                });
            }
        });
    }

    return (
        React.createElement(ShoppingCartContext.Provider, 
            { value: {
                getItemQuantity,
                increaseItemQuantity,
                decreaseItemQuantity,
                removeFromCart,
                openCart,
                closeCart,
                cartItems,
                cartQuantity,
                setItemQuantity
            }},
            children,
            React.createElement(ShoppingCart, { isOpen: isOpen })
        )
    );
}
