import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen(props) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    if(!userInfo) {
        props.history.push('/signin');
    }
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;

    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch save shipping address action
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country }));
        props.history.push('/payment');
        };
  return (
    <div>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <form className="form" onSubmit={submitHandler}>
            <div>
                <h1>Yhteystietosi</h1>
            </div>
            <div>
                <label htmlFor="fullName">Nimi ja sukunimi</label>
                <input type="text" id="fullName" placeholder=" Kirjoitaa nimi ja sukunimi" value={fullName} onChange={(e) => setFullName(e.target.value)} required></input>
            </div>
            <div>
                <label htmlFor="address">Osoite</label>
                <input type="text" id="address" placeholder=" Kirjoitaa osoitesi" value={address} onChange={(e) => setAddress(e.target.value)} required></input>
            </div>
            <div>
                <label htmlFor="city">Kaupunki</label>
                <input type="text" id="city" placeholder="Kirjoitaa kaupunkin nimi" value={city} onChange={(e) => setCity(e.target.value)} required></input>
            </div>
            <div>
                <label htmlFor="postalCode">Postinumero</label>
                <input type="text" id="postalCode" placeholder="Kirjoitaa postinumero" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required></input>
            </div>
            <div>
                <label htmlFor="country">Maa</label>
                <input type="text" id="country" placeholder=" Kirjoitaa maan nimi" value={country} onChange={(e) => setCountry(e.target.value)} required></input>
            </div>
            <div>
                <label />
                <button className="primary" type="submit">Jatka</button>
            </div>
        </form>
    </div>
  );
}
