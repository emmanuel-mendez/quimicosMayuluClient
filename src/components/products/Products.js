import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useAuthState } from '../../context/auth'
import ProductCard from './ProductCard'
import classNames from 'classnames';

const GET_PRODUCTS = gql`
    query{
        getProducts{
            id
            body
            price
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

const CREATE_PRODUCT = gql`
    mutation createProduct(
        $body: String!
        $price: String!
    ) {
        createProduct(
            body: $body
            price: $price
        ) {
            id
            body
            price
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

export default function CreateProduct() {

    const { user } = useAuthState()

    let {
        loading,
        data: products
    } = useQuery(GET_PRODUCTS);

    if (products) {
        products = products.getProducts
    }

    const [variables, setVariables] = useState({
        body: '',
        price: ''
    })

    const [errors, setErrors] = useState({})


    const [createProduct, { loadingProduct }] = useMutation(CREATE_PRODUCT, {
        variables,
        update (proxy, result) {
            const data = proxy.readQuery({
                refetchQueries: [{ query: GET_PRODUCTS }],
                query: GET_PRODUCTS
            })
            proxy.writeQuery({
                query: GET_PRODUCTS,
                data: {
                    getProducts: [result.data.createProduct, ...data.getProducts]
                }
            })},
        onError (err){
            setErrors(err.graphQLErrors[0].extensions.errors)
        },
    })

    const submitProductForm = (e) => {
        e.preventDefault()

        createProduct({ variables })
    }


let recentProducts

    if (loading) {
        recentProducts =
            <section className="products__list">
                <div className="products__loadingListContainer">
                    <h3 className="products__loadingListTitle">Cargando productos...</h3>
                </div>
            </section>
    } else{
        recentProducts =
            <section className="products__list">

                <h3 className="products__listTitle">Lista de productos</h3>

                <div className="products__gridProductsCard">
                    {products && products.map((product) => (
                        <ProductCard product={product} />
                    ))}
                </div>

            </section>
    }

let createAProduct

if (user) {
    if (user.admin === true) {
        createAProduct =
        <section className="products__create">

            <h3 className="products__createTitle"> Publica un producto</h3>

            <form className="products__createForm" onSubmit={submitProductForm}>

            <div className="products__formSection">
                <input
                    type="text"
                    placeholder={errors.body ? (
                        'Nombre del producto requerido'
                    ) : (
                        'Nombre del producto'
                    )}
                    value={variables.body}
                    className={classNames('{errors.body} products__createInput', {
                        'createProductError': errors.body
                    })}
                    onChange={
                        e => setVariables(
                            { ...variables, body: e.target.value }
                        )
                    }
                />
            </div>

            <div className="products__formSection">
                <input
                    type="text"
                    placeholder={errors.price ? (
                        'Precio del producto requerido'
                    ) : (
                        'Precio'
                    )}
                    value={variables.price}
                    className={classNames('{errors.price} products__createInput', {
                        'createProductError': errors.price
                    })}
                    onChange={
                        e => setVariables(
                            { ...variables, price: e.target.value }
                        )
                    }
                />
            </div>

                <button
                    className="products__createButton"
                    disabled={loadingProduct}>

                    {loadingProduct ? 'Cargando...' : 'Crear'}

                </button>
            </form>

            <div
                className={classNames('products__error', {
                    'createProductError': errors.product || errors.priceInvalid,
                    
                })}>
                {errors.product ? (
                    'Este producto ya está publicado'
                    ) : (
                        errors.priceInvalid ?? ('El precio debe ser un número')
                    )}
                
            </div>

        </section>
    }
}


    return (
        <article className="products">
            <div className="products__container">

                {createAProduct}

                {recentProducts}

            </div>
        </article>

    )
}
