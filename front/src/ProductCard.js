import * as React from 'react'
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

function ProductCard({ product, handleComnd, getData }) {
    const [quantity, setQuantity] = useState('');

    const handleChange = (e) => {
        setQuantity(e.target.value);
        getData(product.réf, e.target.value);
    }

    return (
        <Card sx={{md:4,sx:12,sm:6, maxWidth: 300, flex: '1 1 calc(33.333% - 20px)', margin: '10px', backgroundColor: '#E6F2FF' }}>
            <img src={'http://localhost:8000/api/consomable/' + product.réf + '/image'} alt={product.désignation} style={{ height: 140, objectFit: 'cover', marginLeft: '60px', height: '170px', backgroundColor: '#E6F2FF' }} />
            <CardContent sx={{backgroundColor: '#E6F2FF'}}>
                <Typography gutterBottom variant="h8" component="div">
                   réfernce: {product.réf}
                </Typography>
                <Typography gutterBottom variant="h8" component="div">
                    {product.désignation}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Quantité en stock: {product.quantité_stock}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Unité: {product.untité}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginRight: '8px' }}>
                    Quantité :
                </Typography>
                <TextField
                    type='number'
                    name='quantite'
                    variant='standard'
                    value={quantity}
                    onChange={handleChange}
                    sx={{ width: '100px' }}
                />
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
                <Button
                    size="small"
                    sx={{
                        width: '40%',
                        backgroundColor: '#001F3F',
                        color: '#ffffff',
                        '&:hover': {
                            backgroundColor: '#001F3F',
                        },
                    }}
                    onClick={handleComnd}
                >
                    Commander
                </Button>
            </CardActions>
        </Card>
    );
}

export default ProductCard;