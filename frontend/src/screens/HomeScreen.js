import React, { useEffect } from 'react';
import Product from '../components/Product';
import CarouselComponent from '../components/Carousel';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

export default function HomeScreen() {
const dispatch = useDispatch();
const productList = useSelector((state) => state.productList);
const { loading, error, products } = productList;

    useEffect(() => {
       dispatch(listProducts({}));
    }, [dispatch]);
    return (     
        <div>
            <CarouselComponent />
            {loading ? (<LoadingBox></LoadingBox>)
            :
            error ? (<MessageBox variant="danger">{error}</MessageBox>)
            : (
            <>
            {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                <div className="row center products">
                    {products.map((product) => (
                    <Product key={product._id} product={product} />
                    ))}
                </div>
             </>
            )}
        </div>
        );
    }