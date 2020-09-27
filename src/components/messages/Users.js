import React from 'react'
import { gql, useQuery } from '@apollo/client'
import classNames from 'classnames'

import { useMessageDispatch, useMessageState } from '../../context/message'

const GET_ALLUSERSMESSAGES = gql`
    query getAllUsersMessages {
        getAllUsersMessages {
            username
            latestMessage{
                body
                from
                to
            }
        }
    }
`

export default function Users() {

    const dispatch = useMessageDispatch()
    const { users } = useMessageState()
    const selectedUser = users?.find(u => u.selected === true)?.username

    const { loading } = useQuery(GET_ALLUSERSMESSAGES, {
        onCompleted: data => dispatch({ type: 'SET_USERS', payload: data.getAllUsersMessages }),
        onError: err => console.log(err)
    })

    let usersMarkup
    if (!users || loading) {
        usersMarkup = <p>Loading...</p>
    }
    
    else if(users.length === 0) {
        usersMarkup = <p>No users have joined yet</p>
    }

    else if(users.length > 0) {
        usersMarkup = users.map((user) => {

            const selected = selectedUser === user.username

            return (

                <div key={user.username} className={classNames('chatLeft', { 'chatLeftSelected': selected })} onClick={() => dispatch({ type: 'SET_SELECTED_USER', payload: user.username })}>

                <p>{user.username}</p>

                <p>
                    {user.latestMessage ? user.latestMessage.body : 'You are now connected'}
                </p>

            </div>

            )
        })
    }

    return (
        <section className="chatUsers">
            {usersMarkup}
        </section>
    )
}
