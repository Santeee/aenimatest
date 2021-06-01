import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import ProductListItem from './components/ProductListItem';

const App = () => {

  const classes = useStyles();
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
    <div className="App">
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap>
            Products
          </Typography>
        </Toolbar>
      </AppBar>

      <br></br>

      <main className={classes.layout}>
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
                <ProductListItem key={prod.id} product={prod}></ProductListItem>
              ) )
        }
      </main>
    </div>
  );
}

const useStyles = makeStyles(
  (theme) => ({
    appBar: {
      position: 'relative',
    },

    toolbar: {
      backgroundColor: '#409858',
      color: 'white',
    },

    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    }
  })
);

export default App;
