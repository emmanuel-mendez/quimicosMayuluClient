
import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { gql, useSubscription } from '@apollo/client'

import { useAuthState } from '../../context/auth'
import { useMessageDispatch } from '../../context/message'

import Users from './Users'
import Messages from './Messages'

const NEW_MESSAGE = gql`
    subscription newMessage {
        newMessage {
            id
            from
            to
            body
            createdAt
        }
    }
`

// const NEW_REACTION = gql`
//     subscription newReaction {
//         newReaction {
//             id
//             from
//             to
//             body
//             reactions{
//                 id
//                 body
//             }
//         }
//     }
// `

export default function Index() {

    const messageDispatch = useMessageDispatch()

    const { user } = useAuthState()

    const { data: messageData, error: messageError } = useSubscription(
        NEW_MESSAGE
    )

    // const { data: reactionsData, error: reactionsError } = useSubscription(
    //     NEW_REACTION
    // )

    useEffect(() => {
        if (messageError) console.log(messageError)

        if (messageData) {
            const message = messageData.newMessage
            const otherUser = user.username === message.to ? message.from : message.to

            messageDispatch({
                type: 'ADD_MESSAGE',
                payload: {
                    username: otherUser,
                    message,
                },
            })
        }
    }, [messageError, messageData]) // eslint-disable-line react-hooks/exhaustive-deps

    // useEffect(() => {
    //     if (reactionsError) console.log(reactionsError)

    //     if (reactionsData) {
    //         const reactions = reactionsData.newReaction
    //         const otherUser = user.username === reactions.to ? reactions.from : reactions.to

    //         messageDispatch({
    //             type: 'ADD_REACTION',
    //             payload: {
    //                 username: otherUser,
    //                 reactions
    //             }
    //         })
    //     }
    // }, [reactionsError, reactionsData]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <article>

            <h2>Messages page</h2>

            <div className="chat">

            <Users/>

            <Messages/>

            </div>

        </article>
    )
}
