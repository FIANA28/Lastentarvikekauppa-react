import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PlaceOrderScreen(props) {
    const cart = useSelector(state => state.cart);
    if(!cart.paymentMethod){
        props.history.push('/payment');
    }

    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;

    const toPrice = (num) => Number(num.toFixed(2)); //4.321 = "4.32" = 4.32
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100? toPrice(0): toPrice(10);
    cart.taxPrice = toPrice(0.24 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const dispatch = useDispatch();
    const placeOrderHandler = () => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    };
    useEffect(() => {
        if (success) {
            props.history.push(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, success, order, props.history])
    return (
    <div>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <div className="row top">
            <div className="col-2">
                <ul>
                    <li>
                        <div className="card card-body-placeorder">
                            <h2>Toimitus</h2>
                            <p><strong>Nimi: </strong> {cart.shippingAddress.fullName} <br/></p>
                            <p><strong>Osoite: </strong> {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}</p>
                        </div>
                    </li>
                    <li>
                        <div className="card card-body-placeorder">
                            <h2>Maksu</h2>
                            <p>
                                <strong>Maksutapa: </strong> {cart.paymentMethod}
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className="card card-body-placeorder">
                            <h2>Tilata tuotteita</h2>
                        <ul>
                            {cart.cartItems.map((item) => (
                            <li key={item.product}>
                                <div className="row">
                                <div>
                                    <img src={item.image} alt={item.name} className="small"></img>
                                </div>
                                <div className="min-30">
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </div>
                                <div>
                                    {item.qty} x {item.price} &#8364; = <strong> {item.price * item.qty} &#8364; </strong>
                                </div>
                                </div>
                            </li>
                            ))}
                        </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="col-1">
                <div className="card card-body-placeorder">
                    <ul>
                        <li>
                            <h2>Kassa</h2>
                        </li>
                        <li>
                            <div className="row">
                                <strong><div>Välisumma</div></strong>
                                <div>{cart.itemsPrice.toFixed(2)} &#8364;</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <strong><div>Toimitus</div></strong>
                                <div>{cart.shippingPrice.toFixed(2)} &#8364;</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <strong><div>Yhteensä</div></strong>
                                <div><strong>{cart.totalPrice.toFixed(2)} &#8364;</strong> (sisältää {cart.taxPrice.toFixed(2)} &#8364; ALV 24 %)</div>
                            </div>
                        </li>
                        <li>
                            <button type="button" onClick={placeOrderHandler} className="primary block" disabled={cart.cartItemslength === 0}>Lähetä Tilaus</button>
                        </li>
                        { loading && <LoadingBox></LoadingBox>} 
                        {error && <MessageBox variant="danger">{error}</MessageBox>
                        }
                    </ul>
                </div>
            </div>
        </div>
    
    </div>
  );
}
