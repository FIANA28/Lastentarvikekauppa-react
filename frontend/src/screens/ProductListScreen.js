import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, deleteProduct, listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';

export default function ProductListScreen(props, { name = '', category = '' }) {
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    const productCreate = useSelector(state => state.productCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate;

    const dispatch = useDispatch();
    const productDelete = useSelector((state) => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete;
    useEffect(() => {
        if(successCreate) {
            dispatch({type: PRODUCT_CREATE_RESET});
            props.history.push(`/product/${createdProduct._id}/edit`);
        }
        if (successDelete) {
            dispatch({type: PRODUCT_DELETE_RESET });
        }
        dispatch(listProducts(name, category));
    }, [dispatch, name, category, createdProduct, props.history, successCreate, successDelete]);
    
    const deleteHandler = (product) => {
        if(window.confirm('Haluatko varmasti poistaa tuotteen?')) {
            dispatch(deleteProduct(product._id));
        } 
    };
    const createHandler =() => {
        dispatch(createProduct());
    };
    return (
    <div className="padd">
        <div className="row">
          <h1>Tuoteet</h1>
          <button type="button" className="primary" onClick={createHandler}>Luo Tuote</button>
        </div>
        {loadingCreate && <LoadingBox></LoadingBox>}
        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {loading ? (<LoadingBox></LoadingBox>) 
        : error? (<MessageBox variant="danger">{error}</MessageBox>) 
        : (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NIMI</th>
                    <th>HINTA</th>
                    <th>MÄÄRÄ</th>
                    <th>KATEGORIA</th>
                    <th>BRÄNDI</th>
                    <th>TOIMINNOT</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.countInStock}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                            <button type="button" className="small" onClick={() => props.history.push(`/product/${product._id}/edit`)}>Muokkaa</button>
                            <button type="button" className="small" onClick={() => deleteHandler(product)}>Poistaa</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        )}
    </div>
  );
}
