import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {
    const productId = props.match.params.id;
    // below variable returns  section from useEffect ?qty={qty} from ProductScreen.js
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const dispatch = useDispatch();
    useEffect(() => {
      if(productId) {
        dispatch(addToCart(productId, qty));
      }
    }, [dispatch, productId, qty]);
    const removeFromCartHandler = (id) => {
      //delete action
      dispatch(removeFromCart(id));
    };
    const checkoutHandler = () => {
      props.history.push('/signin?redirect=shipping');
    };
    const homepageHandler = () => {
      props.history.push('/');
    };

  return (
    <div>
          <Link to="/"><i className="fas fa-arrow-left padd"></i> Etusivulle</Link>
      <div>
          <h1 className="header-cart">Ostokori</h1>
      </div>
      <div className="row top padd">
        <div className="col-2">
          {cartItems.length === 0 ? 
          (<MessageBox>
            Ostoskorisi on tyhjä. 
            <Link to='/'> Osta tuoteet</Link>
          </MessageBox>
          ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img src={item.image} alt={item.name} className="small"></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select value={item.qty} onChange={(e) =>
                    dispatch(addToCart(item.product, Number(e.target.value))
                    )}>
                    {[...Array(item.countInStock).keys()].map((x) => 
                            (<option key={x + 1} value={x + 1}>{x + 1}</option>)
                    )}
                    </select>
                  </div>
                  <div>
                    {item.price} &#8364;
                  </div>
                  <div>
                    <button type="button" onClick={() => removeFromCartHandler(item.product)}>Poista</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          )
        }
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>
                  Summa ({cartItems.reduce((a, c) => a + c.qty, 0)} tuotteet) : {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} &#8364;
                </h2>
              </li>
              <li>
                <button type="button" onClick={checkoutHandler} className="primary block" disabled={cartItems.length === 0 ? true : false}>Siirry maksamaan</button>
              </li>
              <li>
                <button type="button" onClick={homepageHandler} className="secondary block">Jatka ostoksia</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
