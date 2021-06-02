import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListProducts from './pages/ListProducts';
import ProductInfo from './pages/ProductInfo';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';

const App = () => {

  const classes = useStyles();

  return (
    <Router>
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
          <Switch>
            <Route path="/product/create">
              <CreateProduct />
            </Route>
            <Route path="/product/:id/edit">
              <EditProduct />
            </Route>
            <Route path="/product/:id">
              <ProductInfo />
            </Route>
            <Route path="/">
              <ListProducts />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
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
