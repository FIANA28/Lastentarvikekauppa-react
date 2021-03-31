import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../constants/userConstants';

export default function UserEditScreen(props) {
    const userId = props.match.params.id;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSeller, setIsSeller] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdate;
    
    const dispatch = useDispatch();
    useEffect(() => {
        if (successUpdate) {
            dispatch({type: USER_UPDATE_RESET });
            props.history.push('/userlist');
        }
        if(!user) {
            dispatch(detailsUser(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
            setIsSeller(user.isSeller);
        }
    }, [dispatch, userId, user, successUpdate, props.history]);

    const submitHandler = (e) => {
        e.preventDefault();
        //dispatch update user
        dispatch(updateUser({ _id: userId, name, email, isSeller, isAdmin }));
    };
  return (
    <div>
        <form className="form" onSubmit={submitHandler}>
            <h1>Muokkaa käyttäjää: <span className="success">{name}</span></h1>
            { loadingUpdate && <LoadingBox></LoadingBox>}
            { errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
            {loading ? (<LoadingBox></LoadingBox>) :
            error ? (<MessageBox variant="danger">{error}</MessageBox>) :
            (<> 
            <div>
                <label htmlFor="name">Nimi</label>
                <input type="text" id="name" placeholder="Kirjoita nimi" value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor="email">Sähköpostiosoite</label>
                <input type="email" id="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor="isSeller">Myyjä</label>
                <input type="checkbox" id="isSeller" checked={isSeller} onChange={(e) => setIsSeller(e.target.checked)}></input>
            </div>
            <div>
                <label htmlFor="isSeller">Admin</label>
                <input type="checkbox" id="isAdmin" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}></input>
            </div>
            <div>
                <label />
                <button className="primary" type="submit">Päivittää</button>
            </div>
            </>)
            }
        </form>
    </div>
  );
}
