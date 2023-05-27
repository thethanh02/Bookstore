import React from 'react'
import { Tab } from 'semantic-ui-react'
import UserTable from './UserTable'

function AdminTab(props) {
    const { handleInputChange } = props
    const { isUsersLoading, users, userUsernameSearch, handleDeleteUser, handleSearchUser } = props

    const panes = [
        {
            menuItem: { key: 'users', icon: 'users', content: 'Users' },
            render: () => (
                <Tab.Pane loading={isUsersLoading}>
                    <UserTable
                        users={users}
                        userUsernameSearch={userUsernameSearch}
                        handleInputChange={handleInputChange}
                        handleDeleteUser={handleDeleteUser}
                        handleSearchUser={handleSearchUser}
                    />
                </Tab.Pane>
            )
        }
    ]

    return (
        <Tab menu={{ attached: 'top' }} panes={panes} />
    )
}

export default AdminTab