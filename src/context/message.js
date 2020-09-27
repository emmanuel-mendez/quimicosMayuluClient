import React, { createContext, useReducer, useContext } from 'react'

const MessageStateContext = createContext()
const MessageDispatchContext = createContext()

const messageReducer = (state, action) => {
    let usersCopy, userIndex
    const { username, message, messages, /* reactions */ } = action.payload
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: action.payload,
            }
        case 'SET_USER_MESSAGES':
            usersCopy = [...state.users]

            userIndex = usersCopy.findIndex((u) => u.username === username)

            usersCopy[userIndex] = { ...usersCopy[userIndex], messages }

            return {
                ...state,
                users: usersCopy,
            }
        case 'SET_SELECTED_USER':
            usersCopy = state.users.map((user) => ({
                ...user,
                selected: user.username === action.payload,
            }))

            return {
                ...state,
                users: usersCopy,
            }
        case 'ADD_MESSAGE':
            usersCopy = [...state.users]

            userIndex = usersCopy.findIndex((u) => u.username === username)

            message.reactions = []

            let newUser = {
                ...usersCopy[userIndex],
                messages: usersCopy[userIndex].messages
                    ? [message, ...usersCopy[userIndex].messages]
                    : null,
                latestMessage: message,
            }

            usersCopy[userIndex] = newUser

            return {
                ...state,
                users: usersCopy,
            }

        // case 'ADD_REACTION':

        //     usersCopy = [...state.users]
        //     console.log(usersCopy);


        //     userIndex = usersCopy.findIndex((u) => u.username === username)
        //     console.log(userIndex);


        //     let userCopy = { ...usersCopy[userIndex]}
        //     console.log(userCopy);


        //     const messageIndex = userCopy.messages?.findIndex(m => m.id === reactions.id)
        //     console.log(messageIndex);


        //     if (messageIndex > -1) {
        //         let messagesCopy = [ ...userCopy.messages ]
        //         console.log(messagesCopy);


        //         let reactionsCopy = [ ...messagesCopy[messageIndex].reactions ]
        //         console.log(reactionsCopy);


        //         const reactionsIndex = reactionsCopy.findIndex(r => r.id === reactions.reactions)
        //         console.log(reactions.reactions);
        //         console.log(reactionsIndex);


        //         if (reactionsIndex > -1) {
        //             reactionsCopy[reactionsIndex] = reactions
        //         }
        //         console.log(reactions);


        //         messagesCopy[messageIndex] = {
        //             ...messagesCopy[messageIndex],
        //             reactions: reactionsCopy
        //         }
        //         console.log(messagesCopy[messageIndex]);


        //         userCopy = {...userCopy, messages: messagesCopy}
        //         console.log(userCopy);


        //         usersCopy[userIndex] = userCopy
        //         console.log(userCopy);
        //     }

        //     return{
        //         ...state,
        //         users: usersCopy,
        //         reactions
        //     }

        default:
            throw new Error(`Unknown action type: ${action.type}`)
    }
}

export const MessageProvider = ({ children }) => {
    const [state, dispatch] = useReducer(messageReducer, { users: null })

    return (
        <MessageDispatchContext.Provider value={dispatch}>
            <MessageStateContext.Provider value={state}>
                {children}
            </MessageStateContext.Provider>
        </MessageDispatchContext.Provider>
    )
}

export const useMessageState = () => useContext(MessageStateContext)
export const useMessageDispatch = () => useContext(MessageDispatchContext)