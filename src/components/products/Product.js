import React, { useState, useRef } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { useAuthState } from '../../context/auth'
import LikeButton from './LikeButton'
import DeleteProductButton from './DeleteProductButton'
import DeleteCommentProductButton from './DeleteCommentProductButton'
import PaypalCheckoutButton from '../paypal/PaypalCheckoutButton'


const GET_PRODUCT = gql`
    query($productId: ID!) {
        getProduct(productId: $productId) {
        id
        body
        price
        createdAt
        username
        likeCount
        likes {
            username
        }
        commentCount
        comments {
            id
            username
            createdAt
            body
        }
        }
    }
`;

const CREATE_COMMENT = gql`
    mutation createComment(
        $productId: String!,
        $body: String!
    ){
        createComment(
            productId: $productId,
            body: $body
        ){
            id
            body
            price
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

export default function Product(props) {

	const { user } = useAuthState()

	const productId = props.match.params.productId

	const [comment, setComment] = useState('')

	const commentInputRef = useRef(null)

	const { loading, data } = useQuery(GET_PRODUCT, {
		variables: {
			productId
		}
	})

	const [createComment, { loadingComment }] = useMutation(CREATE_COMMENT, {
		update() {
			setComment('')
			commentInputRef.current.blur()
		}, variables: {
			productId,
			body: comment
		}
	})

	function deleteProductCallback() {
		window.location.href = '/products'
	}

	let productMarkup
	if (loading) {

		productMarkup =
			<article className="product">
				<div className="product__loadingContainer">
					<h3 className="product__loadingTitle">Cargando productos...</h3>
				</div>
			</article>
	} else {

		const { id, body, price, username, comments, commentCount, likes, likeCount, createdAt } = data.getProduct

		const order = {
			total: `${price}.00`,
			items: [
				{
					sku: id,
					name: body,
					price: `${price}.00`,
					quantity: 1,
					currency: 'USD'
				}
			]
		}

		let paypalCheckoutButton
		if (user) {
			paypalCheckoutButton =
				<PaypalCheckoutButton order={order} />
		} else if (user && user.admin === true) {
			paypalCheckoutButton = <span></span>
		} else {
			paypalCheckoutButton =
				<p><Link className="product__loginLink" to="/login">Inicia sesión </Link>para comprar</p>
		}

		productMarkup = (
			<article className="product">
				<div className="product__container">

					<div className="product__card">
						<div className="product__description">

							<div className="product__image">
								<div className="product__imageContainer">
									<p className="product__imageText">
										Imagen del producto
                                </p>
								</div>
							</div>

							<div className="product__content">

								<h2 className="product__title">{body}</h2>

								<div className="product__information">

									<div className="product__username">
										<p className="product__usernameParagraph">
											Publicado por {username}
										</p>
									</div>

									<div className="product__createdAt">
										<p className="product__createdAtParagraph">
											{moment(createdAt).fromNow()}
										</p>
									</div>

									<div className="product__price">
										<p className="product__priceParagraph">
											{price}$
                                        </p>
									</div>

									{paypalCheckoutButton}



								</div>

								{user && user.admin === true && (
									<DeleteProductButton productId={id} callback={deleteProductCallback} />
								)}

							</div>
						</div>

						<div className="product__interact">

							<div className="product__likes">
								<LikeButton user={user} product={{ id, likes, likeCount }} />
							</div>

							<div className="product__comment">

								<a className="product__commentLink" href="#comments">
									<i class="product__commentIcon far fa-comments"></i>
								</a>

								<div className="product__commentCount">
									{commentCount}
								</div>

							</div>
						</div>
					</div>

					{user && (
						<section className="product__comments">

							<h2 className="product__commentsTitle" id="comments">Commentarios</h2>

							<form
								className="product__commentsForm"
								onSubmit={createComment}>

								<input className="product__commentInput" type="text" placeholder="Comenta algo..."
									name="comment"
									onChange={e => setComment(e.target.value)}
									ref={commentInputRef}
								/>

								<button
									className="product__commentsButton"
									type="submit"
									disabled={comment.trim() === ''}
								>
									{loadingComment ? 'Cargando...' : 'Comentar'}
								</button>
							</form>

						</section>
					)}

					{comments.map(comment => (
						<div className="product__commentsList" key={comment.id}>

							<div className="product__commentDown">

								<div className="product__commentContainer">
									<div className="product__commentsListUsername">
										{comment.username}:
                                        </div>
									<div className="product__commentsListBody">
										{comment.body}
									</div>
								</div>

								<div className="product__commentsListCreatedAt">
									{moment(comment.createdAt).fromNow()}
								</div>

							</div>

							{user && user.admin === true && (
								<DeleteCommentProductButton productId={id} commentId={comment.id} />
							)}
						</div>
					))}

				</div>
			</article>
		)
	}

	return (
		productMarkup
	)
}
