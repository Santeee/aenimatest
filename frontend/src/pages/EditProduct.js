import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import querystring from 'querystring'

const EditProduct = () => {

    const classes = useStyles();
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    let { id } = useParams();

    const saveProduct = async () => {

        const formData = new FormData();

        if (image !== ''){
            formData.append(
                "image",
                image,
                image.name
            );
        }

        formData.append(
            "name",
            name
        );

        formData.append(
            "description",
            "\""+description+"\""
        );


        formData.append("_method", 'PATCH');

        await axios.post(`http://localhost:3000/api/products/${id}`, formData, {
                headers: {
                    "Content-Type": `multipart/form-data;`,
                }
            })
            .then( res => window.location.href = '/' )
            .catch( err => console.log(err) );
    }

    const onFileChange = event => {
        setImage(event.target.files[0]);
    };


    useEffect(() => {

        const getProduct = async () => {
            setIsLoading(true);
            setIsError(false);

            return await axios.get(`http://localhost:3000/api/products/${id}`)
                .then( res => {
                    setProduct(res.data)
                    setName(res.data.name)
                    setDescription(res.data.description)
                } )
                .catch( err => setIsError(true) )
                .finally( res => setIsLoading(false) );
        }

        getProduct();
    }, [])

    return (
        <div>
            <Button variant="contained" color="primary" onClick={ () => window.location.href = `/`}>
                Back
            </Button>
            <br></br>
            <br></br>
            <h2>Edit product data</h2>
            {
                (isLoading)
                ? 'Carngando datos...'
                : (isError)
                    ? 'Ocurrió un error...'
                    : (
                        <div>
                            <form
                                className={classes.root}
                                noValidate
                                autoComplete="off"
                            >
                                <Typography gutterBottom variant="h6" component="h6">
                                    <strong>Imagen</strong>
                                    <img src={ product.url_image } width={'100%'} alt={"Product"}></img>
                                </Typography>
                                <input type="file" name="image" onChange={onFileChange}/>
                                <TextField id="standard-basic" label="Name" name="name" onChange={(e) => { setName(e.target.value) }} value={name}/>
                                <TextField id="standard-basic" label="Description" name="description" onChange={(e) => { setDescription(e.target.value) }} value={description}/>
                                <Button variant="contained" color="primary" onClick={saveProduct}>
                                    Guardar
                                </Button>
                            </form>
                        </div>
                    )
            }
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
        margin: theme.spacing(1),
        width: '95%',
        },
    },
}));


export default EditProduct