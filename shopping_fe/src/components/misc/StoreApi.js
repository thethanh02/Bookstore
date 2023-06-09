import axios from 'axios'
import { config } from '../../Constants'
import { parseJwt } from '../utils/Helpers'

export const storeApi = {
    authenticate,       // auth api
    signup,
    numberOfUsers,
    getUsers,
    deleteUser,
    getUserMe,
    getBooks,           // book api
    deleteBook,
    getBook,
    createBook,
    updateBook,
    createReview,       // review api
    addCartItem,        // cart item api
    deleteCartItem,
    addListCartItem,
    deleteListCartItemsByUser,
    addOrder,           // oder api
    getMyOrders,
    getOrder,
    updateOrderStatus,
    getAllOrders
}

// auth api
function authenticate(username, password) {
    return instance.post('/auth/authenticate', { username, password }, {
        headers: { 'Content-type': 'application/json' }
    })
}

function signup(user) {
    return instance.post('/auth/signup', user, {
        headers: { 'Content-type': 'application/json' }
    })
}

function numberOfUsers() {
    return instance.get('/public/numberOfUsers')
}

function getUsers(user, username) {
    const url = username ? `/api/users/${username}` : '/api/users'
    return instance.get(url, {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

function deleteUser(user, username) {
    return instance.delete(`/api/users/${username}`, {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

function getUserMe(user) {
    return instance.get('/api/users/me', {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

// book api
function getBooks() {
    return instance.get('/api/books')
}

function deleteBook(user, bookId) {
    return instance.delete(`/api/books/${bookId}`, {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

function getBook(bookId) {
    return instance.get(`/api/books/${bookId}`)
}

function createBook(user, book) {
    const url = `/api/books/new`
    return instance.post(url, book, {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

function updateBook(user, bookId, book) {
    const url = `/api/books/${bookId}`
    return instance.put(url, book, {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

// review api
function createReview(user, review, bookId) {
    const url = `/api/reviews/new/${bookId}`
    return instance.post(url, review, {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

// cart item api
function addCartItem(user, cartItem) {
    return instance.post(`/api/cartitem`, cartItem, {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

function deleteCartItem(user, cartItemId) {
    return instance.delete(`/api/cartitem/${cartItemId}`, {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

function addListCartItem(user, cartItems) {
    return instance.post(`/api/cartitem/newlist`, cartItems, {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

function deleteListCartItemsByUser(user) {
    return instance.delete(`/api/cartitem/all`, {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

// order api
function addOrder(user, order) {
    return instance.post(`/api/orders/new`, order, {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

function getMyOrders(user) {
    return instance.get(`/api/orders/me`, {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

function getOrder(user, id) {
    return instance.get(`/api/orders/${id}`, {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

function updateOrderStatus(user, orderStatusReq) {
    return instance.put(`/api/orders`, orderStatusReq, {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

function getAllOrders(user) {
    return instance.get(`/api/orders/all`, {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

// -- Axios

const instance = axios.create({
    baseURL: config.url.API_BASE_URL
})

instance.interceptors.request.use(function (config) {
    // If token is expired, redirect user to login
    if (config.headers.Authorization) {
        const token = config.headers.Authorization.split(' ')[1]
        const data = parseJwt(token)
        if (Date.now() > data.exp * 1000) {
            window.location.href = "/login"
        }
    }
    return config
}, function (error) {
    return Promise.reject(error)
})

// -- Helper functions

function bearerAuth(user) {
    return `Bearer ${user.accessToken}`
}