import React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import ProductListItem from '../components/ProductListItem';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const ListProducts = () => {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const getProducts = async () => {
        setIsLoading(true);
        setIsError(false);

        return await axios.get('http://localhost:3000/api/products')
        .then( res => setProducts(res.data) )
        .then( data => data )
        .catch( err => setIsError(true) )
        .finally( res => setIsLoading(false) );
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <div>
            <Button variant="contained" color="primary" onClick={ () => window.location.href = `product/create`}>
                Add Product
            </Button>

            { (isLoading)
            ? (products.length === 0)
                ? <Typography variant="body2" color="textSecondary" component="p">
                    No products in our data
                </Typography>
                : ''
            : ( isError )
                ? <Typography variant="body2" color="textSecondary" component="p">
                    We have a problem for fetching the data 😬
                </Typography>
                : products.map( prod => (
                    <ProductListItem key={prod.id} product={prod} getProducts={getProducts}></ProductListItem>
                ) )
            }
        </div>
    );
}

export default ListProducts;