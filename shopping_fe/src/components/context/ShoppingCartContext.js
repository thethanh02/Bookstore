import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from './../utils/useLocalStorage';
import { ShoppingCart } from '../common/ShoppingCart';
import { useAuth } from './AuthContext';
import { storeApi } from '../misc/StoreApi';

const ShoppingCartContext = createContext({});

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useLocalStorage("shopping-cart", []);
    const { userIsAuthenticated, getUser } = useAuth()

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity, 0);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    function getItemQuantity(book) {
        return cartItems.find(item => item.book.id === book.id)?.quantity || 0;
    }

    function removeFromCart(book) {
        if (userIsAuthenticated()) {
            let itemNeedRemove = cartItems.filter(item => item.book.id === book.id)[0];
            storeApi.deleteCartItem(getUser(), itemNeedRemove.id)
        }
        let items = cartItems.filter(item => item.book.id !== book.id);
        setCartItems(items);
    }

    function removeAllFromCart() {
        setCartItems([]);
    }

    function setItemQuantity(book, amount) {
        let items
        if (cartItems.find(item => item.book.id === book.id) == null) {
            items = [...cartItems, { book, quantity: amount }];
            if (userIsAuthenticated()) {
                storeApi.addCartItem(getUser(), { book, quantity: amount })
            }
        } else {
            items = cartItems.map(item => {
                if (item.book.id === book.id) {
                    if (item.quantity > 0) {
                        if (userIsAuthenticated()) {
                            storeApi.updateCartItem(getUser(), { ...item, quantity: item.quantity + amount })
                        }
                        return { ...item, quantity: item.quantity + amount };
                    } else {
                        return { ...item, quantity: amount };
                    }
                } else {
                    return item;
                }
            });
        }
        setCartItems(items);
    }

    return (
        <ShoppingCartContext.Provider value={{
            getItemQuantity,
            removeFromCart,
            removeAllFromCart,
            setItemQuantity,
            openCart,
            closeCart,
            cartItems,
            cartQuantity,
            setCartItems
        }}>
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    );
}
