import { React, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductInfo = () => {

    const classes = useStyles();
    let { id } = useParams();
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const getProduct = async () => {
        setIsLoading(true);
        setIsError(false);

        return await axios.get(`http://localhost:3000/api/products/${id}`)
            .then( res => setProduct(res.data) )
            .catch( err => setIsError(true) )
            .finally( res => setIsLoading(false) );
    }

    useEffect(() => {
        getProduct();
    }, [])

    return (
        (isLoading)
            ? 'Carngando datos...'
            : (isError)
                ? 'Ocurrió un error...'
                : (
                    <Card className={ classes.root }>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="h6">
                                    <strong>Número producto</strong> #{ product.id }
                                </Typography>
                                <Typography gutterBottom variant="h6" component="h6">
                                <strong>Nombre</strong> { product.name }
                                </Typography>
                                <Typography gutterBottom variant="h6" component="h6">
                                    <strong>Descripción</strong>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    { product.description }
                                </Typography>
                                <Typography gutterBottom variant="h6" component="h6">
                                    <strong>Imagen</strong>
                                    <img src={ product.url_image } width={'100%'}></img>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )
    );
}

const useStyles = makeStyles({
    root: {
    },
});

export default ProductInfo