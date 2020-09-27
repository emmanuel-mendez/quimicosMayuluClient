import React from 'react'
import {gql, useMutation} from '@apollo/client'

const GET_PRODUCTS = gql`
    query{
        getProducts{
            id
            body
            username
            comments{
                id
                username
                body
                createdAt
            }
            commentCount
            likes{
                id
                username
                createdAt
            }
            likeCount
            createdAt
        }
    }
`

const DELETE_PRODUCT = gql`
    mutation deleteProduct($productId: ID!) {
        deleteProduct(productId: $productId)
    }
`;


export default function DeleteProductButton({ productId, callback }) {

    const [deleteProduct] = useMutation(DELETE_PRODUCT, {
        update(proxy) {
            const data = proxy.readQuery({
                query: GET_PRODUCTS
            });
            data.getProducts.filter((p) => p.id !== productId);
            proxy.writeQuery({ query: GET_PRODUCTS, data });
            if (callback) callback();
        },
        variables: {
            productId
        }
    });

    return (
        <button
        className="product__deleteButton"
            onClick={deleteProduct}>
            <i class="fas fa-trash"></i>
        </button>
    )
}
