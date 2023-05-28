import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import AuthContext from '../context/AuthContext'
import { storeApi } from '../misc/StoreApi'
import AdminTab from './AdminTab'
import { handleLogError } from '../utils/Helpers'

class AdminPage extends Component {
    static contextType = AuthContext

    state = {
        users: [],
        books: [],
        userUsernameSearch: '',
        isAdmin: true,
        isUsersLoading: false,
        isBooksLoading: false
    }

    componentDidMount() {
        const Auth = this.context
        const user = Auth.getUser()
        const isAdmin = user.data.rol[0] === 'ADMIN'
        this.setState({ isAdmin })

        this.handleGetUsers()
        this.handleGetBooks()
    }

    handleInputChange = (e, { name, value }) => {
        this.setState({ [name]: value })
    }

    handleGetUsers = () => {
        const Auth = this.context
        const user = Auth.getUser()

        this.setState({ isUsersLoading: true })
        storeApi.getUsers(user)
            .then(response => {
                this.setState({ users: response.data })
            })
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
                this.setState({ isUsersLoading: false })
            })
    }

    handleDeleteUser = (username) => {
        const Auth = this.context
        const user = Auth.getUser()

        storeApi.deleteUser(user, username)
            .then(() => {
                this.handleGetUsers()
            })
            .catch(error => {
                handleLogError(error)
            })
    }

    handleSearchUser = () => {
        const Auth = this.context
        const user = Auth.getUser()

        const username = this.state.userUsernameSearch
        storeApi.getUsers(user, username)
            .then(response => {
                const data = response.data
                const users = data instanceof Array ? data : [data]
                this.setState({ users })
            })
            .catch(error => {
                handleLogError(error)
                this.setState({ users: [] })
            })
    }

    handleGetBooks = () => {
        const Auth = this.context
        const user = Auth.getUser()

        this.setState({ isBooksLoading: true })
        storeApi.getBooks(user)
            .then(response => {
                this.setState({ books: response.data })
            })
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
                this.setState({ isBooksLoading: false })
            })
    }

    handleDeleteBook = (isbn) => {
        const Auth = this.context
        const user = Auth.getUser()

        storeApi.deleteBook(user, isbn)
            .then(() => {
                this.handleGetBooks()
            })
            .catch(error => {
                handleLogError(error)
            })
    }

    render() {
        if (!this.state.isAdmin) {
            return <Navigate to='/' />
        } else {
            const { isUsersLoading, users, userUsernameSearch, books, isBooksLoading } = this.state
            return (
                <Container>
                    <AdminTab
                        isUsersLoading={isUsersLoading}
                        users={users}
                        userUsernameSearch={userUsernameSearch}
                        handleDeleteUser={this.handleDeleteUser}
                        handleSearchUser={this.handleSearchUser}
                        handleInputChange={this.handleInputChange}
                        books={books}
                        handleDeleteBook={this.handleDeleteBook}
                        isBooksLoading={isBooksLoading}
                    />
                </Container>
            )
        }
    }
}

export default AdminPage