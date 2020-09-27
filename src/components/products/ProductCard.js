import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useAuthState } from '../../context/auth'
import LikeButton from './LikeButton';

export default function ProductCard({
    product: { body, price, createdAt, id, username, likeCount, commentCount, likes }
}) {

    const { user } = useAuthState()

    return (
        <section className="products__productCard">

            <div className="products__eachProductCard">
                <div className="products__productsCardInfo">

                    <div className="products__productsCardImage">
                        <Link className="products__productsCardImageLink" to={`/product/${id}`}>
                            <div className="products__productsCardImageContainer">
                                <p className="products__productsCardImageText">
                                    Imagen del producto
                                </p>
                            </div>
                        </Link>
                    </div>

                    <div className="products__productsCardContent">
                        <h3 className="products__productsCardBody">
                            <Link className="products__productsCardLink" to={`/product/${id}`}>
                                {body}
                            </Link>
                        </h3>

                        <div className="products__productsCardDescription">
                            <div className="products__productsCardUsername">
                                <p className="products__productsCardUsernameDescription">Publicado por {username}</p>
                            </div>

                            <div className="products__productsCardCreatedAt">
                                {moment(createdAt).fromNow()}
                            </div>

                            <div className="products__productsCardPrice">
                                {price}$
                            </div>

                            <Link className="products__productsCardDetailsLink"
                            to={`/product/${id}`}>
                                <div className="products__productsCardDetails">
                                    Ver producto
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="products__productsCardInteract">

                    <div className="products__productsCardLikes">
                        <LikeButton user={user} product={{ id, likes, likeCount }} />
                    </div>

                    <div className="products__productsCardComment">

                            <Link className="products__productsCardCommentLink" to={`/product/${id}`}>
                                <i class="products__productsCommentIcon far fa-comments"></i>
                            </Link>

                            <div className="products__productsCardCommentCount">
                                {commentCount}
                            </div>
                            
                    </div>
                </div>
            </div>

        </section>
    )
}
