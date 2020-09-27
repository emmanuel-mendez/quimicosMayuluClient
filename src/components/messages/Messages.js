import React, { Fragment, useEffect, useState } from 'react'
import { gql, useLazyQuery, useMutation } from '@apollo/client'

import { useMessageDispatch, useMessageState } from '../../context/message'
import Message from './Message'

const SEND_MESSAGE = gql `
    mutation sendMessage (
            $to: String!,
            $body: String!
    ){
        sendMessage(
            to: $to,
            body: $body
        ){
            body
            to
            createdAt
        }
    }
`

const GET_MESSAGES = gql `
    query getMessages($chatWith: String!){
        getMessages(chatWith: $chatWith){
            id
            from
            to
            body
            createdAt
        }
    }
`

export default function Messages() {

    const { users } = useMessageState()
    const dispatch = useMessageDispatch()
    const [body, setBody] = useState('')

    const selectedUser = users?.find(u => u.selected === true)
    const messages = selectedUser?.messages

    const [
        getMessages, { loading: messagesLoading, data : messagesData }] = useLazyQuery(GET_MESSAGES)

    const [sendMessage] = useMutation(SEND_MESSAGE, {
        onError: (err) => console.log(err)
    })

    useEffect(() => {
        if (selectedUser && !selectedUser.messages) {
            getMessages({ variables: { chatWith: selectedUser.username }})
        }
    }, [selectedUser]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (messagesData) {
            dispatch({ 
                type: 'SET_USER_MESSAGES',
                payload: {
                    username: selectedUser.username,
                    messages: messagesData.getMessages
            } })
        }
    }, [messagesData]) // eslint-disable-line react-hooks/exhaustive-deps

    const submitMessage = (e) => {
        e.preventDefault()

        if (body.trim() === '' || !selectedUser) return

        setBody('')

        //Mutation for sending the message
        sendMessage({ variables: { to: selectedUser.username, body } })
    }

    let selectedChatMarkup

    if (!messages && !messagesLoading) {
        selectedChatMarkup = <p>Select an user</p>
    }
    else if(messagesLoading) {
        selectedChatMarkup = <p>Loading...</p>
    }
    else if (messages.length > 0) {
        selectedChatMarkup = messages.map((message, index) => (
            <Fragment>

            <Message key={message.id} message={message}/>
            {index === messages.length -1 && (
                    <br/>
                )}

            </Fragment>
        ))
    }
    else if (messages.length === 0) {
        selectedChatMarkup = <p>Not messages found</p>
    }

    return (
        <section className="chatMessages">

            <div className="chatReverse">
                {selectedChatMarkup}
            </div>

            <div>
                <form className="formSentMessage" onSubmit={submitMessage}>
                    <input
                        type="text"
                        className="messageInput"
                        placeholder="Type a message"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <button onClick={submitMessage}>
                        Send message
                    </button>
                </form>
            </div>

        </section>
    )
}
