import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './components/context/AuthContext'
import PrivateRoute from './components/misc/PrivateRoute'
import Navbar from './components/misc/Navbar'
import Store from './components/common/Store'
import Login from './components/common/Login'
import Signup from './components/common/Signup'
import BookPage from './components/admin/BookPage'
import BookEdit from './components/admin/BookEdit'
import ItemDetail from './components/common/ItemDetail'
import { ShoppingCartProvider } from './components/context/ShoppingCartContext'
import Checkout from './components/common/Checkout'
import OrderPage from './components/user/OrderPage'
import OrderDetail from './components/user/OrderDetail'
import OrderManagerPage from './components/admin/OrderManagerPage'
import UserManagerPage from './components/admin/UserManagerPage'

function App() {
    return (
        <AuthProvider>
            <ShoppingCartProvider>
                <Router>
                    <Routes>
                        <Route path='/' element={<Navbar />}>
                            <Route index element={<Store />} />
                            <Route path='/products/:id' element={<ItemDetail />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/signup' element={<Signup />} />
                            <Route path="/admin/users" element={<PrivateRoute><UserManagerPage /></PrivateRoute>} />
                            <Route path="/admin/orders" element={<PrivateRoute><OrderManagerPage /></PrivateRoute>} />
                            <Route path="/orders/me" element={<PrivateRoute><OrderPage /></PrivateRoute>} />
                            <Route path="/orders/:id" element={<PrivateRoute><OrderDetail /></PrivateRoute>} />
                            <Route path="/admin/books" element={<PrivateRoute><BookPage /></PrivateRoute>} />
                            <Route path="/books/:id" element={<PrivateRoute><BookEdit /></PrivateRoute>} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Route>
                        <Route path="/checkouts" element={<PrivateRoute><Checkout /></PrivateRoute>} />
                    </Routes>
                </Router>
            </ShoppingCartProvider>
        </AuthProvider>
    )
}

export default App