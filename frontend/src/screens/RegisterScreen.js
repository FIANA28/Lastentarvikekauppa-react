import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {
    const [name, setName] = useState('') ;
    const [email, setEmail] = useState('') ;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
         e.preventDefault();
         if(password !== confirmPassword){
             alert('Salasanat eivät täsmää');
         } else {
            dispatch(register(name, email, password));
         }
    };

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

  return (
    <div>
        <form className="form" onSubmit={submitHandler}>
            <div>
                <h1>Luo tili</h1>
            </div>
            { loading && <LoadingBox></LoadingBox> }
            { error && <MessageBox variant='danger'>{ error } </MessageBox> }
            <div>
                <label htmlFor="name">Nimi</label>
                <input type="text" id="name" placeholder="Kirjoita nimi" required onChange={ e => setName(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor="email">Sähköpostiosoite</label>
                <input type="email" id="email" placeholder="name@example.com" required onChange={ e => setEmail(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor="password">Salasana</label>
                <input type="password" id="password" placeholder="salasana" required onChange={ e => setPassword(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor="confirmPassword">Vahvista salasana</label>
                <input type="password" id="confirmPassword" placeholder="Vahvista salasana" required onChange={ e => setConfirmPassword(e.target.value)}></input>
            </div>
            <div>
                <label />
                <button className="primary" type="submit">Rekisteröidy</button>
            </div>
            <div>
                <label />
                <div>
                Onko sinulla jo tili? {' '}
                <Link to={`/signin?redirect=${redirect}`}>Kirjaudu sisään</Link>
                </div>
            </div>
        </form>
    </div>
  );
}
