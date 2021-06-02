import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';

const ProductListItem = ({ product, getProducts }) => {
    const classes = useStyles();

    const deleteProduct = () => {
        axios.delete(`http://localhost:3000/api/products/${product.id}`)
            .then( res => getProducts() )
            .catch( err => console.log(err) );
    }

    return (
        <Card className={ classes.root }>

            <CardActionArea key={ product.id } onClick={ () => window.location.href = `product/${product.id}`}>
                <CardMedia
                    className={ classes.cover }
                    image="/static/images/cards/live-from-space.jpg"
                    title="Live from space album cover"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h6">
                        #{ product.id }
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        { product.name }
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        { product.description }
                    </Typography>
                </CardContent>
            </CardActionArea>

            <CardActions>
                <Button size="small" color="primary">
                    <EditIcon className={ classes.edit_button } onClick={ () => window.location.href = `product/${product.id}/edit`}/>
                </Button>
                <Button size="small">
                    <DeleteIcon color="error" onClick={deleteProduct} />
                </Button>
            </CardActions>

        </Card>
    );
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
    },
    edit_button: {
        color: 'green'
    }
});

export default ProductListItem