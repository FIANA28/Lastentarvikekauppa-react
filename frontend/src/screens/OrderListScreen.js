import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';

export default function OrderListScreen(props) {
    const orderList = useSelector((state) => state.orderList);
    const {loading, error, orders} = orderList;
    const orderDelete = useSelector((state) => state.orderDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = orderDelete;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrders());
        dispatch({ type: ORDER_DELETE_RESET })
        dispatch(listOrders());
        }, [dispatch, successDelete]);
    const deleteHandler = (order) => {
        if(window.confirm('Haluatko varmasti poistaa tilauksen')) {
            dispatch(deleteOrder(order._id));
        } 
    };
  return (
    <div>
        <div className="padd">
            <h1>Tilauksia</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant='danger'>{errorDelete}</MessageBox>}
            { loading ? (<LoadingBox></LoadingBox>):
            error? (<MessageBox variant="danger">{error}</MessageBox>):
            (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>KÄYTTÄJÄ</th>
                            <th>PÄIVÄMÄÄRÄ</th>
                            <th>YHTEENSÄ</th>
                            <th>MAKSETTU</th>
                            <th>TOIMITETTU</th>
                            <th>TOIMINNOT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user.name}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice.toFixed(2)} &#8364;</td>
                                <td>{order.isPaid? order.paidAt.substring(0, 10): 'Ei'}</td>
                                <td>{order.isDelivered? order.deliveredAt.substring(0, 10): 'Ei'}</td>
                                <td>
                                    <button type="button" className="small" onClick={() => {props.history.push(`/order/${order._id}`)}}>Yksityiskohdat
                                    </button>
                                    <button type="button" className="small" onClick={() => deleteHandler(order)}>
                                        Poista
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    </div>
  );
}
