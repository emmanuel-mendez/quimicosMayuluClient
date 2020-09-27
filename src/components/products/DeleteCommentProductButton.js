import React from 'react'
import {gql, useMutation} from '@apollo/client'

const DELETE_COMMENT = gql `
    mutation deleteComment(
        $productId: ID!,
        $commentId: ID!
    ){
        deleteComment(
            productId: $productId,
            commentId: $commentId
        ){
            id
            comments{
                id
                body
                username
                createdAt
            }
            commentCount
        }
    }
`


export default function DeleteCommentProductButton({ commentId, productId }) {


    const [deleteComment, { loading }] = useMutation(DELETE_COMMENT, {
        variables: {
            productId,
            commentId
        }
    })

    return (
        <button
        className="product__commentDelete"
            onClick={deleteComment}>
            { loading ? 'Cargando...' : <i class="fas fa-trash"></i>}
        </button>
    )
}
