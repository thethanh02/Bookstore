import axios from 'axios'
import { config } from '../../Constants'
import { parseJwt } from '../utils/Helpers'

export const storeApi = {
    authenticate,
    signup,
    numberOfUsers,
    getUsers,
    deleteUser,
    getUserMe,
    getBooks,
    deleteBook,
    getBook,
    createBook,
    updateBook,
    createReview,
    addCartItem,
    updateCartItem,
    deleteCartItem
}

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

function createReview(user, review, bookId) {
    const url = `/api/reviews/new/${bookId}`
    return instance.post(url, review, {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

function addCartItem(user, cartItem) {
    return instance.post(`/api/cartitem/new`, cartItem, {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

function updateCartItem(user, cartItem) {
    return instance.put(`/api/cartitem`, cartItem, {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

function deleteCartItem(user, cartItemId) {
    return instance.delete(`/api/cartitem/${cartItemId}`, {
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