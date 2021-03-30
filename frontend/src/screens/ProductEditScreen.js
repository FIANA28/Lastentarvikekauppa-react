import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Axios from 'axios';

export default function ProductEditScreen(props) {
    const productId = props.match.params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails; 

    const productUpdate = useSelector((state) => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate, } = productUpdate;

    const dispatch = useDispatch();
    useEffect(() => {
        if (successUpdate) {
            props.history.push('/productlist');
        }
        if (!product || product._id !== productId || successUpdate) {
          dispatch({ type: PRODUCT_UPDATE_RESET });
          dispatch(detailsProduct(productId));
        } else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setBrand(product.brand);
            setDescription(product.description);
        } 
    }, [product, dispatch, productId, props.history, successUpdate]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: productId, 
            name, 
            price, 
            image, 
            category, 
            brand, 
            countInStock, 
            description,
          })
        );
    }
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        try {
            const { data } = await Axios.post('/api/uploads', bodyFormData, {
                headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${userInfo.token}`},
            });
            setImage(data);
            setLoadingUpload(false);
        } catch(error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
;        }
    };

    return (
    <div>
        <form className="form" onSubmit={submitHandler}>
            <div>
                <h2>Päivittää Tuotetta <span className="success">{productId}</span></h2>
            </div>
            { loadingUpdate && <LoadingBox></LoadingBox>}
            { errorUpdate &&  <MessageBox variant="danger">{errorUpdate}</MessageBox>}
            { loading ? (<LoadingBox></LoadingBox>) 
            : error ? (<MessageBox variant ="danger"></MessageBox>)
            : (
                <>
                <div>
                    <label htmlFor="name">Nimi</label>
                    <input type="text" id="name" placeholder="Kirjoita nimi" value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="price">Hinta</label>
                    <input type="text" id="price" placeholder="Laita hinta" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="image">Kuva</label>
                    <input type="text" id="image" placeholder="Lataa kuva" value={image} onChange={(e) => setImage(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="imageFile">Kuvatiedosto</label>
                    <input type="file" id="imageFile" label="Valitse kuva" onChange={uploadFileHandler}></input>
                {loadingUpload && <LoadingBox></LoadingBox>}
                {errorUpload && (<MessageBox variant="danger">{errorUpload}</MessageBox>)}
                </div>
                <div>
                    <label htmlFor="category">Kategoria</label>
                    <input type="text" id="category" placeholder="Laita kategoria" value={category} onChange={(e) => setCategory(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="countInStock">Määrä</label>
                    <input type="text" id="countInStock" placeholder="Laita määrä" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="brand">Brändi</label>
                    <input type="text" id="brand" placeholder="Laita brändi" value={brand} onChange={(e) => setBrand(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="description"></label>
                    <textarea rows="3" type="text" id="description" placeholder="Laita kuvaus" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div>
                    <label></label>
                    <button className="primary" type="submit">Päivittää</button>
                </div>
                </>
                )
            }
        </form>
    </div>
  );
}
