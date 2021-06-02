import React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ProductListItem from '../components/ProductListItem';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const ListProducts = () => {

    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
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

    const productsFiltered = () => {
        return (searchTitle !== '')
            ? products.filter( p => p.name.toLowerCase().indexOf(searchTitle.toLowerCase()) !== -1 )
            : products;
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <div>
            <Button variant="contained" color="primary" onClick={ () => window.location.href = `product/create`}>
                Add Product
            </Button>

            <br></br>
            <br></br>

            <form autoComplete={"off"}>
                <TextField
                    id="standard-basic"
                    label="Insert text to search products by name"
                    name="name"
                    className={classes.inputSearch}
                    onChange={ (e) => setSearchTitle(e.target.value) }
                />
            </form>

            { (isLoading)
            ? (products.length === 0)
                ? <Typography variant="body2" color="textSecondary" component="p">
                    No products in our database
                </Typography>
                : ''
            : ( isError )
                ? <Typography variant="body2" color="textSecondary" component="p">
                    We have a problem for fetching the data 😬
                </Typography>
                : productsFiltered().map( prod => (
                    <ProductListItem key={prod.id} product={prod} getProducts={getProducts}></ProductListItem>
                ) )
            }
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    inputSearch: {
        width: '100%'
    }
}));

export default ListProducts;