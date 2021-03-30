import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createReview, detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';

export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const { 
        loading: loadingReviewCreate, 
        error: errorReviewCreate,  
        success: successReviewCreate,
    } 
        = productReviewCreate;

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (successReviewCreate) {
            window.alert('Arvostelu lähetetty');
            setRating('');
            setComment('');
            dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
        } 
        dispatch(detailsProduct(productId));
    }, [dispatch, productId, successReviewCreate]);

    const addToCartHandler = () => {
        // function below changes the route in the application, the cart will become dynamic
        props.history.push(`/cart/${productId}?qty=${qty}`);
    };
    const homepageHandler = () => {
        props.history.push('/');
      };
    const submitHandler = (e) => {
        e.preventDefault();
        if (comment && rating) {
            dispatch(createReview(productId, { rating, comment, name: userInfo.name }));
        } else {
            alert('Anna kommentti ja arvio');
        }
    };

    return (
        <div>
            {loading ? (
            <LoadingBox></LoadingBox>
            ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div className="padd">
                    <Link to="/"><i className="fas fa-arrow-left"></i> Etusivulle</Link>
                    <div className ="row top margin-top">
                        <div className="col-2">
                        <img className="large" src={product.image} alt={product.name}></img>
                        </div>
                        <div className="col-1">
                            <ul>
                                <li>{product.name}</li>
                                <li>
                                    <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                                </li>
                                <li>{product.price} &#8364;</li>
                                <li>Kuvaus: 
                                    <p>{product.description}</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-1">
                            <div className="card card-body">
                                <ul>
                                    <li>
                                        <div className="row">
                                            <div>Hinta: </div>
                                            <div>{product.price} &#8364;</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Status: </div>
                                            <div>{product.countInStock > 0 ? (
                                                <span className="success">Varastossa</span>) : 
                                                (<span className="danger">Ei saatavilla</span>)}
                                                </div>
                                        </div>
                                    </li>
                                    {/* conditional rendering */
                                    product.countInStock > 0 && (
                                        <>
                                            <li>
                                                <div className="row">
                                                    <div>Määrä</div>
                                                    <div>
                                                        <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                                            { 
                                                            [...Array(product.countInStock).keys()].map( (x) => 
                                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                                    )}
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                            <button className="primary block" onClick={addToCartHandler}>Lisää ostoskoriin</button>
                                            </li>
                                            <li>
                                                <button type="button" onClick={homepageHandler} className="secondary block">Jatka ostoksia</button>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 id='reviews'>Arvostelut</h2>
                        {product.reviews.length === 0 && (<MessageBox>Tuotteella ei ole arvosteluja.</MessageBox>)}
                        <ul>
                            {product.reviews.map((review) => (
                                <li key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating rating={review.rating} numReviews=''></Rating>
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                    <p>{review.comment}</p>   
                                </li>
                            ))}
                            <li>
                                {userInfo ? (
                                    <form className='form' onSubmit={submitHandler}>
                                        <div>
                                            <h2>Kirjoita oma arvostelu</h2>
                                        </div>
                                        <div>
                                            <label htmlFor='rating'>Arvio</label>
                                            <select id='rating' value={rating} onChange={(e) => setRating(e.target.value)}>
                                                <option value=''>Valitse...</option>
                                                <option value='1'>Todella huono</option>
                                                <option value='2'>Huono</option>
                                                <option value='3'>Keskitaso</option>
                                                <option value='4'>Erittäin hyvä</option>
                                                <option value='5'>Erinomainen</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor='comment'>Kommentti</label>
                                            <textarea id='comment' value={comment}
                                                onChange={(e) => setComment(e.target.value)}>
                                            </textarea>
                                        </div>
                                        <div>
                                            <label />
                                            <button className='primary' type='submit'>Lähetä</button>
                                        </div>
                                        <div>
                                            {loadingReviewCreate && <LoadingBox></LoadingBox>}
                                            {errorReviewCreate && (<MessageBox variant='danger'>
                                                {errorReviewCreate}
                                            </MessageBox>)}
                                        </div>
                                    </form>
                                ): (
                                    <MessageBox>
                                        Ole hyvä ja <Link to='/signin'>kirjaudu sisään</Link> kirjoittaaksesi arvostelun.
                                    </MessageBox>
                                )},
                            </li>
                        </ul>
                    </div>
                </div>
              )}
        </div>
        );
}