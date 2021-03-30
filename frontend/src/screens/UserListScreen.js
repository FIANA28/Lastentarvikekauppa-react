import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function UserListScreen() {
    const userList = useSelector((state) => state.userList);
    const dispatch = useDispatch();
    const {loading, error, users } = userList;
    useEffect(() => {
        dispatch(listUsers());
    }, [dispatch]);
  return (
    <div>
        <h1>Käyttäjätilit</h1>
        {loading? (<LoadingBox></LoadingBox>) :
        error? (<MessageBox variant="danger">{error}</MessageBox>) :
        (
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>KÄYTTÄJÄn NIMI</th>
                        <th>SÄHKÖPOSTIOSOITE</th>
                        <th>MYYJÄ</th>
                        <th>ADMIN</th>
                        <th>TOIMINNOT</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isSeller? 'YES' : 'NO'}</td>
                                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                <td>
                                    <button>Muokkaa</button>
                                    <button>Poista</button>
                                </td>
                            </tr>
                        )) 
                    }
                </tbody>
            </table>
            )
        }
    </div>
  );
}
