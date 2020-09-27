import React, {useState, useEffect} from 'react'
import {Link }from 'react-router-dom'
import {gql, useMutation} from '@apollo/client'

const LIKE_PRODUCT = gql`
    mutation likeProduct($productId: ID!) {
        likeProduct(productId: $productId) {
        id
        likes {
            id
            username
        }
        likeCount
        }
    }
`;

export default function LikeButton({user, product: {id, likes, likeCount}}) {

    const [liked, setLiked] = useState(false);

    useEffect(() => {

        if (user && likes.find((like) => like.username === user.username)) {
            setLiked(true);
        } else setLiked(false);
    }, [user, likes]);

    const [likeProduct] = useMutation(LIKE_PRODUCT, {
        variables: { productId: id }
    });



    let likeButton

    if (user) {
        if (liked) {
            likeButton =
                <button className="products__productsDislikeButton product__productsDislikeButton">

                    <i class="products__productsDislikeIcon product__productsDislikeIcon far fa-thumbs-up"></i>

                    <p className="products__productsCardLikeCount product__productsCardLikeCount">
                        {likeCount}
                    </p>
                </button>
        } else {
            likeButton =
                <button className="products__productsLikeButton product__productsLikeButton">

                    <i class="products__productsLikeIcon product__productsLikeIcon far fa-thumbs-up"></i>
                    
                    <p className="products__productsCardLikeCount product__productsCardLikeCount">
                            {likeCount}
                    </p>
                </button>
        }
    } else if (!user) {
        likeButton =
            <button className="products__productsLikeButton product__productsLikeButton">
                <Link className="products__productsLink product__productsLink" to="/login">
                    <i class="products__productsLikeIcon product__productsLikeIcon far fa-thumbs-up"></i> 
                </Link>

                <p className="products__productsCardLikeCount product__productsCardLikeCount">
                        {likeCount}
                    </p>
                
            </button>
    }



    let linkButton

    if (user) {
        linkButton = 
        <div className="products__productsCardLike" onClick={likeProduct}>
            {likeButton}
        </div>
    } else if (!user) {
        linkButton = 
        <div className="products__productsCardLike">
            {likeButton}
        </div>
    }

    return (
        linkButton
    )
}
