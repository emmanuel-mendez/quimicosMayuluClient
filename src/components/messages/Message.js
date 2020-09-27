import React from 'react'
// import { gql, useMutation } from '@apollo/client'
import classNames from 'classnames'
import moment from 'moment';

import { useAuthState } from '../../context/auth'

// const reactions = ['❤️', '😆', '😯', '😢', '😡', '👍', '👎']

// const REACT_TO_MESSAGE = gql`
//     mutation reactToMessage(
//         $messageId: ID!
//         $body: String!
//     ){
//         reactToMessage(
//             messageId: $messageId,
//             body: $body
//         ){
//             reactions{
//                 id
//                 body
//                 username
//                 createdAt
//             }
//         }
//     }
// `

export default function Message({ message }) {

    const { user } = useAuthState()
    const sent = message.to !== user.username
    const received = !sent
    // const reactionsIcons = [...new Set(message.reactions.map((r) => r.body))]

    // const [reactToMessage] = useMutation(REACT_TO_MESSAGE, {
    //     onCompleted: (data) => {
    //         console.log(data);
    //     },
    //     onError: err => {
    //         console.log(err);
    //     }
    // })

    // const react = (reactions) => {
    //     reactToMessage({ variables: { messageId: message.id, body: reactions } })
    // }

    return (
        <div className="messageContainer">


            <div className={classNames('message', {
                'sent': sent,
                'received': received
            })}>

            {sent}

            <div key={message.id} className="messageSentContainer">
                {message.body}
                <br />
                <p className="moment">
                    {moment(message.createdAt).format('MMMM DD, YYYY  h:mm a')}
                </p>

            </div>


            {/* <span className="reactionSelected">

                {message.reactions.length > 0 && (
                    <span className="divReactionsSelected">
                        {reactionsIcons} {message.reactions.length}
                    </span>
                )}

                {message.reactions.length === 0 && (
                    <span className="divReactionsSelected">
                        {reactions.map(reactions => (
                            <span className="reactButton" key={reactions} onClick={() => react(reactions)}>

                                {reactions}

                            </span>
                        ))}
                    </span>
                )}

            </span> */}

            {received}

            </div>
            
        </div>
    )
}
