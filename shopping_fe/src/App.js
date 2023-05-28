import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './components/context/AuthContext'
import PrivateRoute from './components/misc/PrivateRoute'
import Navbar from './components/misc/Navbar'
import Store from './components/common/Store'
import Login from './components/common/Login'
import Signup from './components/common/Signup'
import AdminPage from './components/admin/AdminPage'
import BookPage from './components/admin/BookPage'
import BookEdit from './components/admin/BookEdit'

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Store />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path="/adminpage" element={<PrivateRoute><AdminPage /></PrivateRoute>} />
                    <Route path="/books" element={<PrivateRoute><BookPage /></PrivateRoute>} />
                    <Route path="/books/:id" element={<PrivateRoute><BookEdit /></PrivateRoute>} />
                    {/* <Route path="/userpage" element={<PrivateRoute><UserPage /></PrivateRoute>} /> */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App