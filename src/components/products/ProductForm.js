import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const CREATE_PRODUCT = gql`
    mutation createProduct(
        $body: String!
    ) {
        createProduct(
            body: $body
        ) {
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
`;

export default function ProductForm() {


    const [variables, setVariables] = useState({
        body: ''
    })

    const [errors, setErrors] = useState({})

    const [createProduct, { loading }] = useMutation(CREATE_PRODUCT, {
        update (_, __) {
            console.log('Created');
        },
        onError (err){
            setErrors(err.graphQLErrors[0].extensions.errors)
        },
    })

    const submitProductForm = (e) => {
        e.preventDefault()

        createProduct({ variables })
    }

    return (
        <div>
            <h2>Create a post:</h2>

            <form onSubmit={submitProductForm}>

                <label className={errors.body}>
                    {errors.body ?? 'Body'}
                </label>
                <input
                    type="text"
                    placeholder="Hi World!"
                    value={variables.body}
                    className={errors.body}
                    onChange={
                        e => setVariables(
                            { ...variables, body: e.target.value }
                        )
                    }
                />

                <label className={errors.product}>
                    {errors.product ?? 'New product'}
                </label>

                <button
                variant="success"
                type="submit"
                disabled={loading}>

                    { loading ? 'Loading...' : 'Create'}

                </button>
            </form>
        </div>
    )
}
