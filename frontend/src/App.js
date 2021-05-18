import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { listProductCategories } from './actions/productActions';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import PrivateRoute from './components/PrivateRoute';
import SearchBox from './components/SearchBox';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderListScreen from './screens/OrderListScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import SearchScreen from './screens/SearchScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';

function App() {
  const cart = useSelector(state => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {loading: loadingCategories, error: errorCategories, categories} = productCategoryList;

  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="grid-container">
          <header className="row">
              <div>
                <button type='button' className="open-sidebar" onClick={() => setSidebarIsOpen(true)}>
                  <i className="fa fa-bars"></i>
                </button>
                  <Link to="/" className="brand">LastenBoom</Link>
              </div>
              <div>
                  <Link to="/cart" className="big-screen">Ostokori {cartItems.length > 0 && (
                    <span className='badge'>{cartItems.length}</span>
                  )}
                  </Link>
                  <Link to="/cart" className="small-screen"><i className="fas fa-shopping-cart"></i>{cartItems.length > 0 && (
                    <span className='badge'>{cartItems.length}</span>
                  )}
                  </Link>
                  {
                  userInfo ? (
                    <div className="dropdown">
                      <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i></Link>
                      <ul className="dropdown-content">
                        <li><Link to="/profile">Käyttäjäprofiili</Link></li>
                        <li><Link to="/orderhistory">Tilaushistoria</Link></li>
                        <li><Link to="#signout" onClick={signoutHandler}>Kirjaudu ulos</Link></li>
                      </ul>
                    </div>
                  ) : (
                    <>
                      <Link to="/signin" className="small-screen"><i className="fas fa-user"></i></Link>
                      <Link to="/signin" className="big-screen">Kirjaudu sisään</Link>
                    </>
                  )
                  }
                  {userInfo && userInfo.isAdmin && (
                  <div className="dropdown">
                    <Link to="#admin">Admin <i className="fa fa-caret-down"></i></Link>
                    <ul className="dropdown-content">
                      {/* <li><Link to="/dashboard">Paneeli</Link></li> */}
                      <li><Link to="/productlist">Tuotteet</Link></li>
                      <li><Link to="/orderlist">Tilauksia</Link></li>
                      <li><Link to="/userlist">Käyttäjätilit</Link></li>
                    </ul>
                  </div>
                  )}
              </div>
          </header>
          <aside className={sidebarIsOpen ? 'open' : ''}>
            <ul className="categories">
              <li>
                <strong>Kategoriat</strong>
                <button onClick={() => setSidebarIsOpen(false)} className="close-sidebar" type="button">
                  <i className="fa fa-times"></i>
                </button>
              </li>
              { loadingCategories ? 
                (<LoadingBox></LoadingBox>) 
                : errorCategories ? (<MessageBox variant='danger'>{errorCategories}</MessageBox>) 
                : (
                   categories.map((c) => (
                        <li key={c}>
                            <Link to={`/search/category/${c}`} onClick={() => setSidebarIsOpen(false)}>{c}</Link>
                        </li>
                  ))
              )}
            </ul>
          </aside>
          <main>
              {/* passing react-router properties to SearchBox using render function */} 
            <div className="search-row"><Route render={({ history }) => <SearchBox history={history}></SearchBox>}></Route></div>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/product/:id" component={ProductScreen} exact></Route>
            <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
            <Route path="/signin" component={SigninScreen}></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/search/name/:name?" component={SearchScreen} exact></Route>
            <Route path="/search/category/:category" component={SearchScreen} exact></Route>
            <Route path="/search/category/:category/name/:name" component={SearchScreen} exact></Route>
            <Route path="/shipping" component={ShippingAddressScreen}></Route>
            <Route path="/payment" component={PaymentMethodScreen}></Route>
            <Route path="/placeorder" component={PlaceOrderScreen}></Route>
            <Route path="/order/:id" component={OrderScreen}></Route>
            <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
            <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
            <AdminRoute path="/productlist" component={ProductListScreen}></AdminRoute>
            <AdminRoute path="/orderlist" component={OrderListScreen}></AdminRoute>
            <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
            <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
            <Route path="/" component={HomeScreen} exact></Route>
          </main>
        <footer className="row padd">
              <div>Photo Credits: Shirota Yuri, Nathan Dumlao, Valeria Zoncoll on <strong><a href="https://unsplash.com/" target="_blank" rel="noreferrer">Unsplash</a></strong> and <strong><a href="https://www.bigzay.com/product/mickey-mouse-soft-toy/" target="_blank" rel="noreferrer">BigZay</a></strong></div>
        </footer>
        <small className="copyright"><span>Copyright &copy; 2021 | Anna Soini</span></small>
      </div>
    </BrowserRouter>
  );
}
export default App;
