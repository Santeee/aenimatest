import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const CreateProduct = () => {
    const classes = useStyles();
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const saveProduct = async () => {

        const formData = new FormData();

        formData.append(
            "image",
            image,
            image.name
        );

        formData.append(
            "name",
            name
        );

        formData.append(
            "description",
            description
        );

        await axios.post('http://localhost:3000/api/products', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
            })
            .then( res => window.location.href = '/' )
            .catch( err => console.log(err) );
    }

    const onFileChange = event => {
        setImage(event.target.files[0]);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={ () => window.location.href = `/`}>
                Back
            </Button>
            <br></br>
            <br></br>
            <h2>New product data</h2>
            <form
                className={classes.root}
                noValidate
                autoComplete="off"
            >
                <input type="file" name="image" onChange={onFileChange}/>
                <TextField id="standard-basic" label="Name" name="name" onChange={(e) => { setName(e.target.value) }}/>
                <TextField id="standard-basic" label="Description" name="description" onChange={(e) => { setDescription(e.target.value) }}/>
                <Button variant="contained" color="primary" onClick={saveProduct}>
                    Guardar
                </Button>
            </form>
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


export default CreateProduct