import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderHistoryScreen(props) {
    const orderMineList = useSelector((state) => state.orderMineList);
    const { loading, error, orders } = orderMineList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrderMine());
    }, [dispatch]);
  return (
    <div className="padd">
        <h1>Tilaushistoria</h1>
        { loading ? (<LoadingBox></LoadingBox>):
        error? (<MessageBox variant="danger">{error}</MessageBox>):
        (
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
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
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.totalPrice.toFixed(2)} &#8364;</td>
                            <td>{order.isPaid? order.paidAt.substring(0, 10): 'Ei'}</td>
                            <td>{order.isDelivered? order.deliveredAt.substring(0, 10): 'Ei'}</td>
                            <td>
                                <button type="button" className="small" onClick={() => {props.history.push(`/order/${order._id}`);
                            }}>Yksityiskohdat
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
  );
}
