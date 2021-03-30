import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants';

export default function OrderScreen(props) {
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const orderDetails = useSelector((state) => state.orderDetails);
    const {order, loading, error } = orderDetails;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, error: errorPay, success: successPay} = orderPay;
    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDeliver, error: errorDeliver, success: successDeliver} = orderDeliver;

    const dispatch = useDispatch();
    useEffect(() => {
        const addPayPalScript = async () => {
            // send request to backend to get CLIENT_ID
            const { data } = await Axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type ='text/javascript';
            script.src=`https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        }; 
        if(!order || successPay || successDeliver || (order && order._id !== orderId)) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(detailsOrder(orderId));
        } else {
            if(!order.isPaid) {
                if(!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, order, sdkReady, orderId, successPay, successDeliver]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    };

    const deliverHandler = () => {
        dispatch(deliverOrder(order._id));
    };

    return loading? (<LoadingBox></LoadingBox>) :
      error? (<MessageBox variant="danger">{error}</MessageBox>)
    : (
      <div className="padd">
            <h1>Tilaus {order._id}</h1>
        <div className="row top">
            <div className="col-2">
                <ul>
                    <li>
                        <div className="card card-body-placeorder">
                            <h2>Toimitus</h2>
                            <p><strong>Nimi: </strong> {order.shippingAddress.fullName} <br/></p>
                            <p><strong>Osoite: </strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {' '}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                        {
                        order.isDelivered? (<MessageBox variant="success">Toimitettu {order.deliveredAt}</MessageBox>) 
                        : <MessageBox variant="danger">Ei toimitettu</MessageBox>
                        }
                        </div>
                    </li>
                    <li>
                        <div className="card card-body-placeorder">
                            <h2>Maksu</h2>
                            <p>
                                <strong>Maksutapa: </strong> {order.paymentMethod}
                            </p>
                            {
                        order.isPaid? (<MessageBox variant="success">On maksettu {order.isPaid}</MessageBox>) 
                        : <MessageBox variant="danger">Ei maksettu</MessageBox>
                        }
                        </div>
                    </li>
                    <li>
                        <div className="card card-body-placeorder">
                            <h2>Tilata tuotteita</h2>
                        <ul>
                            {order.orderItems.map((item) => (
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
                                <div>{order.itemsPrice.toFixed(2)} &#8364;</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <strong><div>Toimitus</div></strong>
                                <div>{order.shippingPrice.toFixed(2)} &#8364;</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <strong><div>Yhteensä</div></strong>
                                <div><strong>{order.totalPrice.toFixed(2)} &#8364;</strong> (sisältää {order.taxPrice.toFixed(2)} &#8364; ALV 24 %)</div>
                            </div>
                        </li>
                        {
                        !order.isPaid && (
                        <li>
                            {
                                !sdkReady ? (<LoadingBox></LoadingBox>):
                                (
                                    <>
                                    {loadingPay && <LoadingBox></LoadingBox>}
                                    {errorPay && <MessageBox variant="danger">{errorPay}</MessageBox>}
                                    <PayPalButton 
                                    amount={order.totalPrice}
                                    onSuccess={successPaymentHandler}>
                                    </PayPalButton>
                                    </>
                                )
                            }
                        </li>)
                        }
                        {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <li>
                                {loadingDeliver && <LoadingBox></LoadingBox>}
                                {errorDeliver && <MessageBox variant="danger">{errorDeliver}</MessageBox>}
                                <button type="button" className="primary block" onClick={deliverHandler}>Toimita tilaus</button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
          </div>
       </div>
    )
};
